import React, {Component, PropTypes} from "react"
import Any from "./any"
import Group from "../compose/group"
import Line from "../compose/line"

export default class Paragraph extends Any{
	state={}

	_newLine(){
		return {
            width: this.maxSize.width,
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
			this.maxSize={width,height}
			composed.push(this._newLine())
		}
        let currentLine=composed[composed.length-1]

        let {width}=currentLine
        let availableWidth=currentLine.children.reduce((prev,a)=>prev-a.props.width,width)
        if(availableWidth<=minRequiredW){
			if(this.maxSize.height>minRequiredH){
				return this.maxSize
			}else{
				return this.maxSize=this.context.parent.nextAvailableSpace(required)
			}
        }
        return {width:availableWidth, height:this.maxSize.height}
    }

    appendComposed(text){
        const {composed}=this
        const {parent}=this.context

		let currentLine=composed[composed.length-1]
        let availableWidth=currentLine.children.reduce((prev,a)=>prev-a.props.width,currentLine.width)
        let {width:contentWidth, height:contentHeight}=text.props


		let piece=null
        if(availableWidth>=contentWidth){//not appended to parent
            piece=(
					<Group 
						x={currentLine.width-availableWidth}
						index={this.children.length}
						width={contentWidth} 
						height={contentHeight}>
						{text}
					</Group>
					)
            currentLine.children.push(piece)
			currentLine.height=Math.max(currentLine.height,contentHeight)
			if(availableWidth==contentWidth){
				parent.appendComposed(<Line {...currentLine}/>)
				this.maxSize.height-=currentLine.height
			}
		}else if(availableWidth<contentWidth){
			if(this.maxSize.height>=contentHeight){
				composed.push(this._newLine())
				if(contentWidth<=this.maxSize.width)
					this.appendComposed(text)
				else{
					//never be here
				}
			}else{

			}
		}
    }

	finished(child){//need append last non-full-width line to parent
		if(super.finished(child)){
			const {composed}=this
			const {parent}=this.context

			let currentLine=composed[composed.length-1]
			let availableWidth=currentLine.children.reduce((prev,a)=>prev-a.props.width,currentLine.width)
			if(availableWidth>0){
				parent.appendComposed(<Line {...currentLine}/>)
			}else if(availableWidth==0){
				//already appended to parent in appendComposed
			}
			
			this.maxSize={width:0, height:0}
			return true
		}

		return false;
	}
}
