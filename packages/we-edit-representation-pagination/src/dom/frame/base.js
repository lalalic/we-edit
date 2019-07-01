import React, {Component} from "react"
import PropTypes from "prop-types"
import {dom, ReactQuery} from "we-edit"

import {Rect} from "../../tool/geometry"
import composable,{HasParentAndChild} from "../../composable"
import {Frame as ComposedFrame, Group} from "../../composed"

const Super=HasParentAndChild(dom.Frame)

export default class Fixed extends Super{
	static IMMEDIATE_STOP=Number.MAX_SAFE_INTEGER

	constructor(){
		super(...arguments)
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
					return this.computed.composed.filter(a=>a.props.y==undefined)
				},
				set(values){
					if(!values || values.length==0){
						return this.computed.composed=this.anchors
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
			dividing:{//current exclusive bounds line
				enumerable:true,
				configurable:true,
				get(){
					return (({x=0,y=0,width})=>({x1:x,x2:x+width,y2:y+this.currentY}))(this.props)
				}
			},
			currentY:{//current composed y IN frame
				enumerable:false,
				configurable:true,
				get(){
					const {props:{height},computed:{composed:children}}=this
					return children.reduce((Y, {props:{height,y=Y}})=>y+height,0)
				}
			},
			anchors: {
				enumerable:true,
				configurable:true,
				get(){
					return this.computed.composed.filter(a=>a.props.y!==undefined)
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
					return this.currentY
				}
			}
		})
	}

	appendComposed(content){
		this.computed.composed.push(content)
	}

	onAllChildrenComposed(){
		this.context.parent.appendComposed(this.createComposed2Parent())
		super.onAllChildrenComposed()
	}

	createComposed2Parent() {
		let {width,height=this.contentHeight, x,y,z,named}=this.props
		return (
			<Group {...{width,height,x,y,z,named, className:"frame"}}>
				{this.positionLines(this.computed.composed)}
			</Group>
		)
    }

	positionLines(lines){
		const {positioned}=lines.reduce((state,a,i)=>{
			if(a.props.y==undefined){
				state.positioned.push(React.cloneElement(a,{y:state.y,key:i}))
				state.y+=a.props.height
			}else{
				state.positioned.push(React.cloneElement(a,{key:i}))
			}
			return state
		},{y:0,positioned:[]})
		return positioned
	}

	belongsTo(a,id){
		return new ReactQuery(a).findFirst(`[data-content="${id}"]`).get(0)
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

		return this.isIntersect(rect,{x:0,y:0,width,height:this.currentY})
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

	isEmpty(){
		return this.totalLines==0
	}

	reset4Recompose(){
		const lines=this.lines
		this.lines=[]
		return lines
	}

	exclusive(y1,y2){
		const line=this.dividing
		if(y2!=undefined)
			line.y2=y2
		if(y1!=undefined)
			line.y1=y1

		return this.wrappees.reduce((collected,{props:{wrap}})=>{
			const blocks=wrap(line)
			collected.splice(collected.length,0,...(Array.isArray(blocks) ? blocks : [blocks]))
			return collected
		},[])
			.filter(a=>!!a)
			.filter(a=>a.width>0)
			.map(a=>(a.x-=line.x1,a))
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
		const {width,height,margin}=this.props
		return {width,height,margin}
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
