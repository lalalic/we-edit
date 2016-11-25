import React, {Component, PropTypes} from "react"
import Any, {styleInheritable} from "./any"
import Group from "../composed/group"
import Line from "../composed/line"

import Inline from "./inline"
import Text from "./text"

import {isChar, isWhitespace, isWord, testAll} from "../wordwrap"

let Super=styleInheritable(Any)
export default class Paragraph extends Super{
	static displayName="paragraph"

	render(){
		return <p>{this.getContent()}</p>	
	}
	
	_newLine(){
        return {
            width: this.lineWidth(),
			height:0,
			descent:0,
            children:[]
        }
	}

	lineWidth(){
		const {indent:{left=0,right=0,firstLine=0,hanging=0}}=this.getStyle()
        let {width}=this.availableSpace
        width-=(left+right)
        if(this.computed.composed.length==0)
            width-=firstLine
        else
            width-=hanging
		return width
	}

    nextAvailableSpace(required={}){//@TODO: need consider availableSpace.height
        const {width:minRequiredW=0,height:minRequiredH=0}=required
        const {composed}=this.computed
		if(0==composed.length){
			let {width,height}=this.context.parent.nextAvailableSpace()
			this.availableSpace={width,height}
			composed.push(this._newLine())
		}
        let currentLine=composed[composed.length-1]

        let {width}=currentLine
        let availableWidth=currentLine.children.reduce((prev,a)=>prev-a.props.width,width)
        if(availableWidth<=minRequiredW){
			if(this.availableSpace.height<minRequiredH)
				this.availableSpace=this.context.parent.nextAvailableSpace(required)

			availableWidth=this.lineWidth()
        }
        return {width:availableWidth, height:this.availableSpace.height, lineWidth:this.availableSpace.width}
    }

    appendComposed(content){//@TODO: need consider availableSpace.height
        const {composed}=this.computed
        const {parent}=this.context

		let currentLine=composed[composed.length-1]
        let availableWidth=currentLine.children.reduce((prev,a)=>prev-a.props.width,currentLine.width)
        let {width:contentWidth, height:contentHeight, descent:contentDescent=0}=content.props


		let piece=null
		if(availableWidth==0){
			composed.push(this._newLine())
			this.appendComposed(content)
		}else if(availableWidth>=contentWidth){//not appended to parent
            piece=(
					<Group
						x={currentLine.width-availableWidth}
						index={this.computed.children.length}
						descent={contentDescent}
						width={contentWidth}
						height={contentHeight}>
						{content}
					</Group>
					)
            currentLine.children.push(piece)
			currentLine.height=Math.max(currentLine.height,contentHeight)
			currentLine.descent=Math.max(currentLine.descent, contentDescent)
			if(availableWidth==contentWidth){
				parent.appendComposed(this.createComposed2Parent(currentLine))
			}
		}else if(availableWidth<contentWidth){
			const allWhitespace=({props:{children:{props:{children:text}}}})=>{
				return text && typeof(text)=='string' && testAll(text,isWhitespace)
			}

			if(allWhitespace(content)){
				this.appendComposed(React.cloneElement(content,{width:0}))
				return
			}

			let poped=[]
			const hasOnlyOneWord=({props:{children:{props:{children:text}}}})=>{
				return text && typeof(text)=='string' && [...text].reduce((state,a)=>state && isChar(a),true)
			}
			if(hasOnlyOneWord(content)){
				poped=currentLine.children.reduceRight((state,a)=>{
					if(!state.end){
						let {children:text}=a.props
						if(hasOnlyOneWord(text)){
							state.poped.unshift(text)
						}else
							state.end=true
					}
					return state
				},{end:false,poped:[]}).poped
				if(poped.length){
					if(poped.length<currentLine.children.length){
						currentLine.children.splice(-poped.length,poped.length)
						Object.assign(currentLine, currentLine.children.reduce((state,{props:{height,descent}})=>{
							state.height=Math.max(state.height,height)
							state.descent=Math.max(state.descent,descent)
							return state
						},{height:0,descent:0}))
					}else if(poped.length==currentLine.children.length){
						return false
					}
				}
			}


			if(this.availableSpace.height>=currentLine.height){
				parent.appendComposed(this.createComposed2Parent(currentLine))
				composed.push(this._newLine())
				availableWidth=this.availableSpace.width

				if(poped.length){
					poped.forEach(a=>this.appendComposed(a))
					currentLine=composed[composed.length-1]
			        availableWidth=currentLine.children.reduce((prev,a)=>prev-a.props.width,currentLine.width)
				}

				if(contentWidth<=availableWidth)
					this.appendComposed(content)
				else{
					return false
				}
			}else{

			}
		}
    }

	onAllChildrenComposed(){//need append last non-full-width line to parent
		const {composed}=this.computed
		const {parent}=this.context

		let currentLine=composed[composed.length-1]
		let availableWidth=currentLine.children.reduce((prev,a)=>prev-a.props.width,currentLine.width)
		if(availableWidth>0){
			parent.appendComposed(this.createComposed2Parent(currentLine))
		}else if(availableWidth==0){
			//already appended to parent in appendComposed
		}

		this.availableSpace={width:0, height:0}

		super.onAllChildrenComposed()
	}

    createComposed2Parent(props){
        let {height, width}=props
        let {spacing:{lineHeight="100%",top=0, bottom=0}, indent:{left=0,right=0,firstLine=0,hanging=0}}=this.getStyle()
        let contentY=0, contentX=left

       lineHeight=typeof(lineHeight)=='string' ? Math.ceil(height*parseInt(lineHeight)/100.0): lineHeight

        if(this.computed.composed.length==1){//first line
            lineHeight+=top
            contentY+=top
			contentX+=firstLine
        }else{
			contentX+=hanging
		}

        if(this.isAllChildrenComposed()){//last line
            lineHeight+=bottom
		}

		this.availableSpace.height-=lineHeight

        return (
            <Group height={lineHeight} width={width}>
                <Group x={contentX} y={contentY}>
                    <Line {...props}/>
                </Group>
            </Group>
        )
    }

    getStyle(){
        if(this._style)
            return this._style
        let spacing=this.style('pPr.spacing')||{}
        let indent=this.style('pPr.ind')||{}
        return this._style={spacing,indent}
    }

	static contextTypes={
		...Super.contextTypes
		,getDefaultStyle: PropTypes.func
	}
	
	static childContextTypes={
		...Super.childContextTypes
		,currentLineHasOnlyOneWord: PropTypes.func
	}
	
	getChildContext(){
		const {composed}=this.computed
		return {
			...super.getChildContext()
			,currentLineHasOnlyOneWord(){
				const currentLine=composed[composed.length-1]
				const hasOnlyOneWord=({props:{children:{props:{children:text}}}})=>{
					return text && typeof(text)=='string' && isWord(text)
				}
				return currentLine && currentLine.children.reduce((state,{props:{children:text}})=>state && hasOnlyOneWord(text),true)
			}
		}
	}
}
