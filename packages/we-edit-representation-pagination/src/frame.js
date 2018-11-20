import React, {Component} from "react"
import PropTypes from "prop-types"


import composable,{HasParentAndChild} from "./composable"
import {models} from "we-edit"
const {Frame:Base}=models

import {Frame as ComposedFrame, Group} from "./composed"

const Super=HasParentAndChild(Base)

export default class Frame extends Super{
	static contextTypes={
		...Super.contextTypes,
		currentPage: PropTypes.func
	}

	constructor(){
		super(...arguments)
		this.anchorHost=this
	}

	nextAvailableSpace(required={}){
		const {width:maxWidth}=this.props
		const {height:minHeight}=required
		return {
			width:maxWidth,
			height:this.availableHeight,
			blocks:this.exclusive(minHeight)
		}
	}

	isDirtyIn(rect){
		const isIntersect=(A,B)=>!(
				((A.x+A.width)<B.x) ||
				(A.x>(B.x+B.width)) ||
				(A.y>(B.y+B.height))||
				((A.y+A.height)<B.y)
			)

		return !!this.blocks.find(({props:{x,y,width,height}})=>isIntersect(rect,{x,y,width,height}))
	}

	exclusive(height){
		const {x=0,y=0}=this.props
		return this.blocks.reduce((collected,a)=>{
			let framed=new ComposedFrame(a.props)
			let y2=y+this.currentY, x2=x+this.props.width
			collected.push(framed.intersects({
				x1:x,
				x2,
				y2,
			}))
			if(height){
				collected.push(framed.intersects({
					x1:x,
					x2,
					y2:y2+height
				}))
			}
			return collected
		},[])
		.filter(a=>!!a)
		.sort((a,b)=>a.x-b.x)
		.reduce((all,{x,width},key)=>{
			all.push({key,pos:"start",x})
			all.push({key,pos:"end",x:x+width})
			return all
		},[])
		.sort((a,b)=>a.x-b.x)
		.reduce((state,a,i)=>{
			state[`${a.pos}s`].push(a)
			if(a.pos=="end"){
				if(state.ends.reduce((inclusive,end)=>inclusive && !!state.starts.find(start=>start.key==end.key),true)){
					let x0=state.starts[0].x
					let x1=a.x
					state.merged.push({x:x0, width:x1-x0})
					state.starts=[]
					state.ends=[]
				}
			}
			return state
		},{merged:[],starts:[], ends:[]})
		.merged
		.map(a=>({x:a.x-x0, ...a}))
	}

	appendComposed(content){
		if(content.props.anchor){
			return content.props.anchor.appendTo(this, React.cloneElement(content,{anchor:undefined}))
		}else{
			this.computed.composed.push(content)
		}
	}

	onAllChildrenComposed(){
		let composed=this.createComposed2Parent()
		this.context.parent.appendComposed(composed)

		super.onAllChildrenComposed()
	}

	createComposed2Parent() {
		let {width,height=this.currentY,wrap,margin, x,y,z,geometry,named}=this.props
		return (
			<ComposedFrame {...{width,height,wrap,margin,x,y,z,geometry,named}}>
				{this.computed.composed.reduce((state,a,i)=>{
					if(a.props.y==undefined){
						state.positioned.push(React.cloneElement(a,{y:state.y,key:i}))
						state.y+=a.props.height
					}else{
						state.positioned.push(React.cloneElement(a,{key:i}))
					}
					return state
				},{y:0,positioned:[]}).positioned}
			</ComposedFrame>
		)
    }

	get availableHeight(){
		if(this.props.height==undefined)
			return Number.MAX_SAFE_INTEGER

		const {props:{height},computed:{composed:children}}=this
		return children.reduce((h, a)=>h-(a.props.y==undefined ? a.props.height : 0),height)
	}

	get currentY(){
		const {props:{height},computed:{composed:children}}=this
		return children.reduce((y, a)=>y+(a.props.y==undefined ? a.props.height : 0),0)
	}

	get blocks(){
		return this.computed.composed.filter(({props:{x,y}})=>x!=undefined || y!=undefined)
	}
}

class Line extends Component{
	constructor({width,height,blocks,frame}){
		super(...arguments)
		this.content=[]
		Object.defineProperties(this,{
			height:{
				enumerable:true,
				configurable:true,
				get(){
					return this.content.reduce((h,{props:{height}})=>Math.max(h,height),0)
				}
			},
			children:{
				enumerable:true,
				configurable:true,
				get(){
					return this.content
				}
			}
		})
		this.availableHeight=height
	}
	
	/**
	* -2:avaialbeWidth
	* -1:availableWidth not enough
	* 0: appended
	* 2: recompose full line 
	*/
	appendComposed(){
		
	}

	appendAnchored(anchored){
		const anchorHost=this.props.frame.anchorHost
		const anchor=anchored.props.anchor
		const {x,y}=anchor.xy()
		const {width,height}=anchor.props
		const dirty=anchorHost.isDirtyIn({x,y,height,width})
		anchorHost.appendComposed(anchor)
		if(dirty){
			if(anchorHost.recompose(this)){//can hold in current page
				//it can be recovered from here
			}else{//can't hold in current page
				//
			}
		}
		return dirty
	}


	get first(){
		return this.content.find(a=>a.x===undefined)
	}

	spaceEquals({blocks=[]}){
		const {blocks:myBlocks=[]}=this.space
		return myBlocks.length==blocks.length && -1==blocks.findIndex((a,i)=>a.x!==myBlocks[i].x && a.width!==myBlocks[i].width)
	}

	availableWidth(min=0){
		if(min==0)
			return 1
		this.blocks=this.blocks.map((a,i)=>{
			if((this.currentX+min)>a.props.x){
				this.content.push(a)
				this.blocks[i]=null
			}else{
				return a
			}
		}).filter(a=>!!a)

		let avW=this.width-this.currentX
		if(avW>=min)
			return avW
		return 0
	}

	push(piece){
		if(piece.props.x!=undefined){
			if(piece.props.x<this.currentX){
				const pops=[]
				while(piece.props.x<this.currentX){
					pops.unshift(this.content.pop())
				}
				this.content.push(piece)
				this.content.splice(this.content.length,0,...pops)
			}else{
				this.content.push(piece)
			}
		}else{
			this.content.push(piece)
		}
	}

	commit(){
		this.blocks.forEach(a=>this.content.push(a))
		this.blocks=[]
		return this
	}

	isEmpty(){
		return !!this.first
	}

	get currentX(){
		return this.content.reduce((x,{props:{width,x:x0}})=>x0!=undefined ? x0+width : x+width,0)
	}
}
