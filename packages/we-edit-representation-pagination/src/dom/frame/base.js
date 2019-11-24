import React, {Component} from "react"
import PropTypes from "prop-types"
import {dom, ReactQuery} from "we-edit"

import {Rect} from "../../tool/geometry"
import composable,{HasParentAndChild} from "../../composable"
import {Frame as ComposedFrame, Group} from "../../composed"

const Super=HasParentAndChild(dom.Frame)

export default class Fixed extends Super{
	static Fixed=Fixed
	static IMMEDIATE_STOP=Number.MAX_SAFE_INTEGER
	
	constructor(){
		super(...arguments)
		this.computed.anchors=[]
		this.defineProperties()
	}

	defineProperties(){
		Object.defineProperties(this,{
			firstLine:{
				enumerable:true,
				configurable:true,
				get(){
					return this.lines[0]
				}
			},
			lastLine:{
				enumerable:true,
				configurable:true,
				get(){
					const lines=this.lines
					return lines[lines.length-1]
				}
			},
			lines:{
				enumerable:true,
				configurable:true,
				get(){
					return this.computed.composed//.filter(a=>a.props.y==undefined)
				},
				set(values){
					if(!values || values.length==0){
						return this.computed.composed=values//this.anchors
					}else{
						throw new Error("not support")
					}
				}
			},
			totalLines:{
				enumerable:true,
				configurable:true,
				get(){
					return this.lines.length
				}
			},
			blockOffset:{//current composed y IN frame
				enumerable:false,
				configurable:true,
				get(){
					return this.lines.reduce((Y, {props:{height,y=Y}})=>y+height,0)
				}
			},
			anchors: {
				enumerable:true,
				configurable:true,
				get(){
					return this.computed.anchors//composed.filter(a=>a.props.y!=undefined)
				}
			},
			wrappees: {
				enumerable:true,
				configurable:true,
				get(){
					return this.anchors.filter(({props:{wrap}})=>!!wrap)
				}
			},
			contentHeight:{
				enumerable:true,
				configurable:true,
				get(){
					return this.blockOffset
				}
			}
		})
	}

	appendComposed(content){
		if(content.props.y!=undefined){
			this.computed.anchors.push(content)
		}else{
			this.computed.composed.push(content)
		}
	}

	nextAvailableSpace(){
		const {width,height}=this.props
		return {
			width,
			height,
			getInlineSegments(){

			},
			blockOffset:this.blockOffset,
			top:0,
		}
	}

	onAllChildrenComposed(){
		const content=this.createComposed2Parent()
		this.context.parent.appendComposed(content)
		super.onAllChildrenComposed()
	}

	createComposed2Parent() {
		const {width,height=this.contentHeight, x,y,z,named}=this.props
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
				{React.cloneElement(content,{y:alignY(content.props.height)})}
			</Group>
		)
    }

	positionLines(lines){
		var y=0
		const content=lines.map((a,i,me,{props:{height=0}}=a)=>{
			const b=React.cloneElement(a,{key:i,y})
			y+=height
			return b
		})
        return (
            <Group height={y}>
                {content}
            </Group>    
        )
	}

	belongsTo(a,id){
		return new ReactQuery(a).findFirst(`[data-content="${id}"]`).get(0)
	}

	isEmpty(){
		return this.lines.length==0 && this.anchors.length==0
	}

	isAnchored(id){
		return !!this.anchors.find(a=>this.belongsTo(a,id))
	}

	isIntersect(A,B){
		return new Rect(A.x, A.y, A.width, A.height).intersects(new Rect(B.x, B.y, B.width, B.height))
	}

	isDirtyIn(rect){
		if(this.wrappees.find(({props:{x,y,width,height}})=>this.isIntersect(rect,{x,y,width,height}))){
			return true
		}

		return this.isIntersect(rect,{x:0,y:0,width,height:this.blockOffset})
	}

	paragraphY(id){
		const prevLineOfThisParagraph=this.lines.findLast(line=>this.getParagraph(line)!=id)
		if(prevLineOfThisParagraph){
			return this.lineY(prevLineOfThisParagraph)
		}
		return 0
	}

	lineY(line){
		return this.lines.slice(0,this.lines.indexOf(line)+1)
			.reduce((Y,{props:{height=0}})=>Y+height,0)
	}

	getFlowableComposerId(line,filter){
		return new ReactQuery(line)
			.findFirst(`[data-type="paragraph"],[data-type="table"]`)
			.filter(filter)
			.attr("data-content")
	}
	getParagraph(line){
		return new ReactQuery(line)
			.findFirst(`[data-type="paragraph"]`)
			.attr("data-content")
	}

	reset4Recompose(){
		const lines=this.lines
		this.lines=[]
		return lines
	}

	/**
	 * @param {*} y1 
	 * @param {*} y2 
	 * @param {*} x1 
	 * @param {*} x2 
	 * @returns 
	 * 	[{x,width},...]: exclude areas
	 * 	number: there's opportunity until the value
	 */
	exclusive(y1,y2,x1=0,x2=this.props.width){
		const line={x1,x2,y1,y2}
		
		var excludes=this.wrappees.reduce((collected,{props:{wrap}})=>{
			const blocks=wrap(line)
			collected.splice(collected.length,0,...(Array.isArray(blocks) ? blocks : [blocks]))
			return collected
		},[])
			.filter(a=>!!a)
			.filter(a=>a.width>0)
			.sort((a,b)=>a.x-b.x)
		
		const clears=excludes.filter(a=>a.type=="clear")
		if(clears.length>0){
			return Math.max(...clears.map(a=>a.y))
		}

		if(excludes.length>1){
			//merge such as [{x:3,width:5},{x:4,width:6}]=>[{x:3,width:7}]
			excludes.forEach(a=>a.x2=a.x+a.width)
			excludes=excludes.reduce((wrapees,a)=>{
				const b=wrapees[wrapees.length-1]
				if(a.x2>b.x2){
					if(a.x>b.x2){//seperated
						wrapees.push(a)
					}else{//intersect
						b.x2=a.x2
						b.width=b.x2-b.x
					}
				}
				return wrapees
			},[excludes[0]])
			excludes.forEach(a=>delete a.x2)
		}

		return excludes
	}

	recompose(){
		const lines=this.reset4Recompose()
		var currentParagraph=null
		var currentParagraphLines=[]
		for(let i=0, line;i<lines.length;i++){
			line=lines[i]
			const linePID=this.getFlowableComposerId(line,`[data-type="paragraph"]`)
			if(!linePID){//not paragraph, then append directly
				if(currentParagraph){
					this.context.getComposer(currentParagraph).recommit(currentParagraphLines)
					currentParagraph=null
					currentParagraphLines=[]
				}
				this.appendComposed(line)
			}else{
				if(!currentParagraph){
					currentParagraph=linePID
					currentParagraphLines.push(line)
				}else{
					if(linePID!==currentParagraph){
						this.context.getComposer(currentParagraph).recommit(currentParagraphLines)
						currentParagraph=linePID
						currentParagraphLines=[line]
						continue
					}else{
						currentParagraphLines.push(line)
						continue
					}
				}
			}
		}
		if(currentParagraph){
			this.context.getComposer(currentParagraph).recommit(currentParagraphLines)
		}
	}

	layoutOf(){
		const {width,height}=this.props
		return {width,height}
	}

	//to make caller simple
	columnIndexOf(){
		return 0
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
