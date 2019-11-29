import React from "react"
import {dom, ReactQuery} from "we-edit"

import {Rect} from "../tool/geometry"
import {Layout, HasParentAndChild} from "../composable"
import {Group} from "../composed"

export default class Frame extends Layout.Block{
	static displayName=HasParentAndChild(dom.Frame).displayName
	getSpace(){
		if(this.cols)
			return super.getSpace()
		const {width,height,margin:{left=0,right=0,top=0,bottom=0}={},x=0,y=0}=this.props
		return {
			left:x+left,
			right:x+width-right,
			blockOffset:y+top,
			height:height-top-bottom,
		}
	}

	defineProperties(){
		super.defineProperties()
		Object.defineProperties(this,{
			composedHeight:{
				enumerable:true,
				configurable:true,
				get(){
					if(this.cols)
						return Math.max(...this.columns.map(a=>a.y+(a.height-a.availableBlockSize)))
					return this.blockOffset
				}
			}
		})
	}
	

	createComposed2Parent() {
		const {width,height=this.contentHeight, margin:{left=0,top=0,bottom=0,right=0}={}, x,y,z,named}=this.props
		const alignY=contentHeight=>{
			if(contentHeight==undefined)
				return undefined
			const {height=contentHeight, vertAlign}=this.props
			switch(vertAlign){
				case "bottom":
					return height-contentHeight
				case "center":
				case "middle":
					return (height-contentHeight)/2
				default:
					return 0
			}
		}
		const content=this.positionLines(this.lines)
		return (
			<Group {...{width,height,x,y,z,named, className:"frame"}}>
				{this.anchors.map((a,i)=>React.cloneElement(a,{key:i}))}
				<Group x={left} y={right}>
					{React.cloneElement(content,{y:alignY(content.props.height)})}
				</Group>
			</Group>
		)
    }

	paragraphY(id){
		const prevLineOfThisParagraph=this.lines.findLast(line=>this.getParagraph(line)!=id)
		if(prevLineOfThisParagraph){
			return this.lineY(prevLineOfThisParagraph)
		}
		return 0
	}

	lineY(line){
		if(!this.cols){
			return this.lines.slice(0,this.lines.indexOf(line)+1).reduce((Y,{props:{height=0}})=>Y+height,0)
		}

		const {y:y0=0,children:lines}=this.columns.find(a=>a.children.includes(line))||this.currentColumn
		return lines.slice(0,lines.indexOf(line)+1).reduce((Y,{props:{height=0}})=>Y+height,y0)
	}

	lineX(line){
		if(!this.cols)
			return 0
		return this.columns.find(a=>a.children.includes(line)).x
	}

	isDirtyIn(rect){
		//wrappee already take up
		if(this.wrappees.find(({props:{x,y,width,height}})=>this.isIntersect(rect,{x,y,width,height}))){
			return true
		}

		//content already take up
		if(this.isIntersect(rect,{x:0,y:0,width:this.props.width,height:this.blockOffset})){
			return true
		}

		if(this.cols){
			//if any non-current column content already take up
			return !!this.columns
				.filter(a=>a!=this.currentColumn)//current block has already checked in super as normal space
				.find(({x=0,y=0,width,blockOffset:height})=>this.isIntersect(rect,{x,y,width,height}))
		}

		return false
	}

	columnIndexOf(line){
		if(!this.cols)
			return 0
		return this.columns.reduce((c,column,i)=>{
			if(c.count>0){
				c.count-=column.children.length
				c.i=i
			}
			return c
		},{count:line+1,i:0}).i
	}

	layoutOf(){
		const {width,height}=this.props
		if(!this.cols)
			return {width,height}
		return {width,height,cols:this.cols}
	}

	includeContent(id){
		if(this.cols && !!this.columns.find(a=>a.id==id)){
			return true
		}
		return !![...this.lines,...this.anchors].find(a=>this.belongsTo(a,id))
	}

	getParagraph(line){
		return new ReactQuery(line)
			.findFirst(`[data-type="paragraph"]`)
			.attr("data-content")
	}

	lineIndexOf(position){
        const lines=this.lines
        const {lineIndexOfParagraph,paragraph,id,at}=position
        if(paragraph){
            return lines.findIndex(a=>new ReactQuery(a)
                .findFirst(({props:{"data-content":content,"data-type":type,pagination:{i}={}}})=>{
                    if(content==paragraph && i==lineIndexOfParagraph+1){
                        return true
                    }
                    if(type=="paragraph"){
                        return false
                    }
                }).length)
        }else{
            return lines[`find${at==0?"":"Last"}Index`](a=>new ReactQuery(a)[at==0 ? "findFirst" : "findLast"](`[data-content="${id}"]`).length)
        }
    }

	clone(props={}){
		const {computed}=this
		return Object.assign(new this.constructor({...this.props, ...props},this.context),{computed})
	}
}