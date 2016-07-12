import React, {Component, PropTypes} from "react"
import Any, {styleInheritable} from "./any"
import Group from "../composed/group"
import Line from "../composed/line"

import Inline from "./inline"
import Text from "./text"

let Super=styleInheritable(Any)
export default class Paragraph extends Super{
	static displayName="paragraph"
	constructor(){
		super(...arguments)
		const {content}=this.state
		if(content.length==0){
			this.whatIfEmpty()
		}
	}

	whatIfEmpty(){
		this.state.content.push(<Inline contentStyle={this.context.getDefaultStyle("inline")}><Text> </Text></Inline>)
	}

	_newLine(){
        const {indent:{left=0,right=0,firstLine=0,hanging=0}}=this.getStyle()
        let {width}=this.availableSpace
        width-=(left+right)
        if(this.composed.length==0)
            width-=firstLine
        else
            width-=hanging

        return {
            width,
			height:0,
            children:[]
        }
	}

    nextAvailableSpace(required={}){
        const {width:minRequiredW=0,height:minRequiredH=0}=required
        const {composed}=this
		if(0==composed.length){
			let {width,height}=this.context.parent.nextAvailableSpace()
			this.availableSpace={width,height}
			composed.push(this._newLine())
		}
        let currentLine=composed[composed.length-1]

        let {width}=currentLine
        let availableWidth=currentLine.children.reduce((prev,a)=>prev-a.props.width,width)
        if(availableWidth<=minRequiredW){
			if(this.availableSpace.height>minRequiredH){
				return {width, height:this.availableSpace.height}
			}else{
				return this.availableSpace=this.context.parent.nextAvailableSpace(required)
			}
        }
        return {width:availableWidth, height:this.availableSpace.height}
    }

    appendComposed(content){//@TODO: need consider availableSpace
        const {composed}=this
        const {parent}=this.context

		let currentLine=composed[composed.length-1]
        let availableWidth=currentLine.children.reduce((prev,a)=>prev-a.props.width,currentLine.width)
        let {width:contentWidth, height:contentHeight}=content.props


		let piece=null
		if(availableWidth==0){
			composed.push(this._newLine())
			this.appendComposed(content)
		}else if(availableWidth>=contentWidth){//not appended to parent
            piece=(
					<Group
						x={currentLine.width-availableWidth}
						index={this.children.length}
						width={contentWidth}
						height={contentHeight}>
						{content}
					</Group>
					)
            currentLine.children.push(piece)
			currentLine.height=Math.max(currentLine.height,contentHeight)
			if(availableWidth==contentWidth){
				parent.appendComposed(this.createLine(currentLine))
				this.availableSpace.height-=currentLine.height
			}
		}else if(availableWidth<contentWidth){
			if(this.availableSpace.height>=currentLine.height){
				parent.appendComposed(this.createLine(currentLine))
				composed.push(this._newLine())

				if(contentWidth<=this.availableSpace.width)
					this.appendComposed(content)
				else{
					//never be here
				}
			}else{

			}
		}
    }

	onAllChildrenComposed(){//need append last non-full-width line to parent
		const {composed}=this
		const {parent}=this.context

		let currentLine=composed[composed.length-1]
		let availableWidth=currentLine.children.reduce((prev,a)=>prev-a.props.width,currentLine.width)
		if(availableWidth>0){
			parent.appendComposed(this.createLine(currentLine))
		}else if(availableWidth==0){
			//already appended to parent in appendComposed
		}

		this.availableSpace={width:0, height:0}

		super.onAllChildrenComposed()
	}

    createLine(props){
        let {height, width}=props
        let {spacing:{lineHeight="100%",top=0, bottom=0}, indent:{}}=this.getStyle()
        let contentY=0

        lineHeight=typeof(lineHeight)=='string' ? Math.ceil(height*parseInt(lineHeight)/100.0): lineHeight

        if(this.composed.length==0){
            lineHeight+=top
            contentY+=top
        }

        if(this.isAllChildrenComposed())
            lineHeight+=bottom

        return (
            <Group height={lineHeight} width={width}>
                <Group y={contentY}>
                    <Line {...props}/>
                </Group>
            </Group>
        )
    }

    getStyle(){
        if(this._style)
            return this._style
        let spacing=this.style('paragraph.spacing')||{}
        let indent=this.style('paragraph.ind')||{}
        return this._style={spacing,indent}
    }



	static contextTypes=Object.assign({
		getDefaultStyle: PropTypes.func
	},Super.contextTypes)
}
