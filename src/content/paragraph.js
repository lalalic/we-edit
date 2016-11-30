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
        return new LineInfo(this.lineWidth(),this)
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

    nextAvailableSpace(required={}){
        const {width:minRequiredW=Number.MIN_VALUE,height:minRequiredH=Number.MIN_VALUE,splitable=true}=required
        const {composed}=this.computed
		if(0==composed.length){
			let {width,height}=this.context.parent.nextAvailableSpace(required)
			this.availableSpace={width,height}
			composed.push(this._newLine())
		}
        let currentLine=composed[composed.length-1]

        let {width}=currentLine
        let availableWidth=currentLine.children.reduce((prev,a)=>prev-a.props.width,width)
        if(availableWidth<minRequiredW || this.availableSpace.height<minRequiredH){
			if(this.availableSpace.height<minRequiredH)
				this.availableSpace=this.context.parent.nextAvailableSpace(required)

			availableWidth=this.lineWidth()
        }
        return {
			width:availableWidth, 
			height:this.availableSpace.height, 
			bFirstLine: composed.length<2,
			bLineStart: availableWidth==this.availableSpace.width,
			line: currentLine
		}
    }

    appendComposed(content){//@TODO: need consider availableSpace.height
        const {composed}=this.computed
        const {parent}=this.context

		let currentLine=composed[composed.length-1]
        let availableWidth=currentLine.children.reduce((prev,a)=>prev-a.props.width,currentLine.width)
        let {width:contentWidth, height:contentHeight}=content.props
		const push=a=>{
			currentLine.children.push(content)
			currentLine.height=Math.max(currentLine.height,contentHeight)
		}
		
		if(availableWidth>=contentWidth){
           push()
		}else if(availableWidth<contentWidth){
			if(content.type.ableExceed(content.props.children)){
				push()
			}else{
				this.commitCurrentLine(true)
				this.appendComposed(content)
			}
		}
    }
	
	commitCurrentLine(needNewLine=false){
		const {composed}=this.computed
		const {parent}=this.context
		let currentLine=composed[composed.length-1]
		
		parent.appendComposed(this.createComposed2Parent(currentLine))
		
		if(needNewLine)
			composed.push(this._newLine())
	}

	onAllChildrenComposed(){//need append last non-full-width line to parent
		this.commitCurrentLine()
		
		this.availableSpace={width:0, height:0}

		super.onAllChildrenComposed()
	}

    createComposed2Parent(props){
		console.log("append new line to section")
        let {height, width, paragraph, ...others}=props
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
                    <Line width={width} height={height} {...others}/>
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
}


class LineInfo{
	constructor(width,p){
		this.paragraph=p
		this.width=width
		this.height=0
		this.children=[]
	}
	
	rollback({type}){
		let removed=[]
		for(let i=this.children.length-1;i>-1;i--){
			let text=this.children[i]
			let {width,children:pieces}=text.props

			let j=pieces.length-1 
			for(;j>-1;j--){
				let chars=pieces[j]
				if(chars.type!=type){
					break
				}
			}
			
			if(j==-1){
				removed.unshift(this.children.pop())
				continue;
			}else if(j==pieces.length-1){
				break
			}else {
				let removedPieces=pieces.splice(j)
				this.children[i]=React.cloneElement(text,{children:pieces, width:pieces.reduce((w,{width})=>w+width,0)})
				removed.unshift(React.cloneElement(text,{children:removedPieces,width:removedPieces.reduce((w,{width})=>w+width,0)}))
				break
			}
		}

		this.paragraph.commitCurrentLine(true)
		
		removed.map(a=>this.paragraph.appendComposed(a))
	}
	
	commit(needNewLine){
		this.paragraph.commitCurrentLine(needNewLine)
	}
	
	canSeperateWith({type}){
		if(this.children.length==0)
			return true
		
		let text=this.children[this.children.length-1]
		let pieces=text.props.children
		let lastPiece=pieces[pieces.length-1]
		return type.canSeperateWith(lastPiece.type)
	}
	
	allCantSeperateWith({type}){
		return this.children.reduce((cantSeperate,text)=>{
			if(!cantSeperate)
				return false
			
			return text.props.children.reduce((state,a)=>{
				if(!state)
					return false
				return !type.canSeperateWith(a.type)
			},true)
			
		},true)
	}
	
}
