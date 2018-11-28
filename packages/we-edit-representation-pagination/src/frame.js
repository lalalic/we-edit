import React, {Component} from "react"
import PropTypes from "prop-types"
import {Rect} from "./tool/geometry"


import composable,{HasParentAndChild} from "./composable"
import {models} from "we-edit"
const {Frame:Base}=models

import {Frame as ComposedFrame, Group} from "./composed"

const Super=HasParentAndChild(Base)

export default class Frame extends Super{
	nextAvailableSpace(required={}){
		const {width:maxWidth}=this.props
		const {height:minHeight}=required
		return {
			maxWidth,
			width:maxWidth,
			height:this.availableHeight,
			blocks:this.exclusive(minHeight),
			frame:this,
		}
	}

	isIntersect(A,B){
		return new Rect(A.x, A.y, A.width, A.height).intersects(new Rect(B.x, B.y, B.width, B.height))
	}

	isDirtyIn(rect){
		if(this.blocks.find(({props:{x,y,width,height}})=>this.isIntersect(rect,{x,y,width,height}))){
			return true
		}
		if(this.isIntersect(rect,{x:0,y:0,width:this.props.width,height:this.currentY})){
			return 1
		}
		return false
	}

	exclusive(height,current){
		current=current||(({x=0,y=0,width})=>({x1:x,x2:x+width,y2:y+this.currentY}))(this.props);
		const x0=current.x1
		const lines=[current]
		if(height)
			lines.push({...current, y2:current.y2+height})

		return this.blocks.reduce((collected,{props:{wrap}})=>{
			lines.forEach(line=>collected.push(wrap(line)))
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
		.map(a=>(a.x-=x0,a))
	}

	rollbackCurrentParagraphUntilClean(pid,rect){
		const {props:{x=0,y=0,width,height},currentY,computed:{composed:lines}}=this
		const contentRect={x,y,width,height:currentY}

		for(let i=lines.length-1,pline;i>=0;i--){
			let line=lines[i]
			if(line.props.y!=undefined)
				continue
			if((pline=this.belongsTo(line,pid))){
				contentRect.height-=line.props.height
				if(!this.isIntersect(rect,contentRect)){
					const removed=lines.splice(i)
					lines.splice(lines.length,0,...removed.filter(a=>a.props.y!=undefined))
					return pline
				}
			}else{
				return false
			}
		}
	}

	appendComposed(content){
		this.computed.composed.push(content)
	}

	onAllChildrenComposed(){
		let composed=this.createComposed2Parent()
		this.context.parent.appendComposed(composed)

		super.onAllChildrenComposed()
	}

	createComposed2Parent() {
		let {width,height=this.currentY, x,y,z,named}=this.props
		return (
			<Group {...{width,height,x,y,z,named, className:"frame"}}>
				{this.computed.composed.reduce((state,a,i)=>{
					if(a.props.y==undefined){
						state.positioned.push(React.cloneElement(a,{y:state.y,key:i}))
						state.y+=a.props.height
					}else{
						state.positioned.push(React.cloneElement(a,{key:i}))
					}
					return state
				},{y:0,positioned:[]}).positioned}
			</Group>
		)
    }

	recompose(){
		throw new Error("not support yet")
	}

	replaceComposedWith(recomposed){
		throw new Error("not support yet")
	}

	next(){
		throw new Error("not support yet")
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
		return this.computed.composed.filter(({props:{wrap}})=>!!wrap)
	}

	belongsTo(a,id){
		while(a && a.props){
			if(a.props["data-content"]===id)
				return a
			a=React.Children.toArray(a.props.children)[0]
		}
		return false
	}

	composed(id){
		return !!this.computed.composed.find(a=>this.belongsTo(a,id))
	}

	paragraphY(id){
		const lines=this.computed.composed

		const lastLineNotBelongTo=((id)=>{
			for(let k=lines.length-1;k>=0;k--){
				let line=lines[k]
				if(line.props.y==undefined && !this.belongsTo(line,id)){
					return line
				}
			}
		})(id)

		if(!lastLineNotBelongTo){
			return 0
		}

		const lineEndY=line=>{
			return lines.slice(0,lines.indexOf(line)+1).reduce((Y,{props:{y,height}})=>Y+(y==undefined ? height : 0),0)
		}

		return lineEndY(lastLineNotBelongTo)
	}

	static Group=Group

	static Line=class extends Component{
		constructor({width,maxWidth,height,blocks=[],frame}){
			super(...arguments)
			this.maxWidth=maxWidth
			this.content=[]
			this.blocks=blocks
			this.frame=frame
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
				},
				availableHeight:{
					enumerable:false,
					configurable:false,
					get(){
						return height
					}
				},
				availableWidth:{
					enumerable:false,
					configurable:false,
					get(){
						return width-this.currentX
					}
				},
				currentX:{
					enumerable:false,
					configurable:false,
					get(){
						return this.content.reduce((x,{props:{width,x:x0}})=>x0!=undefined ? x0+width : x+width,0)
					}
				},
				width:{
					enumerable:true,
					configurable:false,
					get(){
						return width
					}
				}

			})
		}

		appendAnchor(atom,at){
			const anchor=atom.props.anchor
			const {x,y}=anchor.xy(this)
			const geometry=anchor.wrapGeometry({x,y},atom)
			const dirty=this.frame.isDirtyIn(geometry)
			const rect=anchor.bounds(geometry)

			this.frame.appendComposed(
				<Group {...rect} wrap={anchor.wrap(geometry)}>
					{React.cloneElement(atom,{x:x-rect.x,y:y-rect.y,anchor:undefined})}
				</Group>
			)

			if(dirty){
				if(dirty==1){//possibly fixable in current paragraph
					const p=this.context.parent
					let backedLine=this.frame.rollbackCurrentParagraphUntilClean(p.props.id,rect)
					if(backedLine){
						let backedLineAt=p.computed.composed.indexOf(backedLine)
						p.computed.composed.splice(backedLineAt,-1)
						this.content=[]
						this.blocks=this.frame.exclusive()
						let backedAtom=backedLine.props.children.props.children.props.children.find(a=>a.props.x==undefined)
						return this.context.parent.computed.atoms.indexOf(backedAtom)
					}
				}
				const recomposed=this.frame.recompose()
				if(recomposed){
					this.frame.replaceComposedWith(recomposed)
					return recomposed.to
				}else{
					const next=this.frame.next()
					if(next){
						this.frame=next
						return this.appendComposed(...arguments)
					}
				}
			}

			return this.updateExclusive(at)
		}

		appendComposed(atom,at){
			const {width,minWidth=parseInt(width),anchor,height}=atom.props
			if(anchor){
				if(!this.frame.composed(anchor.props.id)){
					return this.appendAnchor(...arguments)
				}
			}else{
				const containable=()=>minWidth==0 || this.availableWidth>=minWidth || this.availableWidth==this.maxWidth
				if(containable()){
					this.blocks=this.blocks.map((a,i)=>{
						if((this.currentX+minWidth)>a.x){
							this.content.push(<Group {...a} height={0}/>)
							this.blocks[i]=null
						}else{
							return a
						}
					}).filter(a=>!!a)

					if(containable()){
						let height=this.lineHeight()
						this.content.push(atom)
						if(height<this.lineHeight()){
							return this.updateExclusive(at)
						}
					}else{
						return false
					}
				}else{
					return false
				}
			}
		}

		lineHeight(){
			return this.context.parent.lineHeight(this.height)
		}

		updateExclusive(at){
			const newBlocks=this.frame.exclusive(this.lineHeight())
			if(this.shouldRecompose(newBlocks)){
				const flowCount=(this.content.reduce((count,a)=>a.props.x==undefined ? count+1 : count,0))
				at=at-flowCount
				this.content=[]
				return at
			}else{

			}
		}

		shouldRecompose(newBlocks){
			const applied=this.content.filter(a=>a.props.x!==undefined)
			const notShould=applied.reduce((notShould,{props:{x,width}},i)=>{
				if(notShould){
					let a=newBlocks[i]
					return!!a && a.x==x && a.width==width
				}
				return false
			}, true)
			if(notShould){
				let notApplied=newBlocks.slice(applied.length)
				if(notApplied.slice(0,1).reduce((should,a)=>a.x<this.currentX,false)){
					this.blocks=newBlocks
					return true
				}else{
					this.blocks=notApplied
				}
				return false
			}else{
				this.blocks=newBlocks
				return true
			}
		}

		commit(){
			this.blocks.forEach(a=>this.content.push(<Group {...a} height={0}/>))
			this.blocks=[]
			return this
		}
	}
}
