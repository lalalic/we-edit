import React, {Component, PropTypes} from "react"
import Any from "./any"
import Group from "../compose/group"
import Line from "../compose/line"

var puuid=0//the line in paragraph != the line in section page, so use id

export default class Paragraph extends Any{
	state={}

    compose(){
		super.compose()
        const {composed}=this
        const {parent}=this.context
        const {width,height}=parent.nextAvailableSpace()
		this.maxSize={width,height}
        if(0==composed.length)
			composed.push(this._newLine())
    }

	_newLine(){
		return {
            width: this.maxSize.width,
			_id:puuid++,
			height:0,
            children:[]
        }
	}

    nextAvailableSpace(required={}){
        const {width:minRequiredW=0,height:minRequiredH=0}=required
        const {composed}=this
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
	
	_removeAllFrom(text){
		if(!text){
			this.composed.splice(0)
			this.children.splice(0)
			return
		}
		
		const {composed}=this
		let currentLine=composed[composed.length-1]
		let found=-1
		while(-1==(found=currentLine.children.findIndex(group=>{
			return group.props.children==text
		}))){
			composed.pop()
			if(composed.length){
				currentLine=composed[composed.length-1]
			}else{
				break
			}
		}
		
		if(found!=-1){
			let index=currentLine.children[found].props.index
			this.children.forEach((a,i)=>{
				if(i>index){
					a._removeAllFrom()
				}
			})
			this.children.splice(index+1)
			
			this.context.parent._removeAllFrom(currentLine)
			
			currentLine.children.splice(found)
			
			//current line's height should be max height of all children
			currentLine.height=currentLine.children.reduce((prev, a)=>Math.max(prev, a.props.height),0)
			
			
			
		}else{
			throw new Error(`you should find the text from paragraph, but not`)
		}
	}

	finished(child){//need append last non-full-width line to parent
		const {composed}=this
        const {parent}=this.context

		let currentLine=composed[composed.length-1]
        let availableWidth=currentLine.children.reduce((prev,a)=>prev-a.props.width,currentLine.width)
		if(availableWidth>0){
			parent.appendComposed(<Line {...currentLine}/>)
		}
		if(super.finished(child)){
			this.maxSize={width:0, height:0}
			return true
		}

		return false;
	}
}
