import React, {Component, PropTypes} from "react"
import Any, {togglable} from "./any"
import Group from "../composed/group"
import Line from "../composed/line"

import Inline from "./inline"
import Text from "./text"

let Super=togglable(Any)
export default class Paragraph extends Super{
	displayName="paragraph"
	constructor(){
		super(...arguments)
		const {content}=this.state
		if(content.length==0){
			content.push(<Inline contentStyle={this.context.getDefaultStyle("inline")}><Text> </Text></Inline>)
		}
	}

	_newLine(){
		return {
            width: this.availableSpace.width,
			_id:this._id,
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
				return this.availableSpace
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
				parent.appendComposed(<Line {...currentLine}/>)
				this.availableSpace.height-=currentLine.height
			}
		}else if(availableWidth<contentWidth){
			if(this.availableSpace.height>=currentLine.height){
				parent.appendComposed(<Line {...currentLine}/>)
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
			parent.appendComposed(<Line {...currentLine}/>)
		}else if(availableWidth==0){
			//already appended to parent in appendComposed
		}

		this.availableSpace={width:0, height:0}

		super.onAllChildrenComposed()
	}
	
	static contextTypes=Object.assign({
		getDefaultStyle: PropTypes.func
	},Super.contextTypes)
}
