import React, {Children,Component} from "react"
import PropTypes from "prop-types"
import {Layout} from "../../composable"

import {ReactQuery} from "we-edit"

import {Group} from "../../composed"

export default class Line extends Component{
	constructor({width,maxWidth,height,exclude, wrappees=[],y}){
		super(...arguments)
		this.maxWidth=maxWidth
		const self=this
		this.content=Object.assign([],{
			push(){
				self.box.push(...arguments)
				Array.prototype.push.call(this,...arguments)
			}
		})
		this.wrappees=exclude(y,0).wrappees
		this.box=Layout.InlineSegments.create({wrappees:[...this.wrappees,{x:width}]})
		this.composedAt=y
		Object.defineProperties(this,{
			height:{
				enumerable:true,
				configurable:true,
				get(){
					return this.items.reduce((h,{props:{height}})=>Math.max(h,height),0)
				}
			},
			children:{
				enumerable:true,
				configurable:true,
				get(){
					return this.content
				}
			},
			width:{
				enumerable:true,
				configurable:false,
				get(){
					return width
				}
			},
			first:{
				enumerable:false,
				configurable:false,
				get(){
					const first=this.items[0]
					if(first && first.props.atom)
						return first.props.atom
					if(first && first.props.descent==undefined)
						return first.props.children
					return first
				}
			},
			last:{
				enumerable:false,
				configurable:false,
				get(){
					const last=this.items.pop()
					if(last && last.props.atom)
						return last.props.atom
					return last
				}
			},
			paragraph:{
				enumerable:false,
				configurable:false,
				get(){
					return this.context.parent
				}
			}
		})
	}

	isEmpty(){
		return !!!this.first
	}

	hasEqualSpace({width,maxWidth,wrappees=[]}){
		return this.props.maxWidth==maxWidth &&
			this.wrappees.length==wrappees.length &&
			!!!this.wrappees.find((a,i)=>{
				let b=wrappees[i]
				return Math.abs(a.x-b.x)>1 && Math.abs(a.width-b.width)>1
			})
	}

	appendComposed(atom,at){
		const {width,minWidth=parseInt(width),anchor}=atom.props
		if(anchor){
			const $anchor=new ReactQuery(atom).findFirst('[data-type="anchor"]')
			const anchorId=$anchor.attr("data-content")
			this.content.push(React.cloneElement($anchor.get(0),{atom,width:0}))//atom is the key
			if(!this.context.parent.context.isAnchored(anchorId)){
				this.anchor=anchor
				return false
			}
		}else{
			const height=this.lineHeight()
			if(this.box.push(atom)==false){
				return false
			}
			const newHeight=this.lineHeight()
			if(height!=newHeight){
				const {wrappees,y}=this.props.exclude(this.composedAt, newHeight)
				this.composedAt=y
				const newBlocks=this.mergeWrappees(wrappees)
				const box=Layout.InlineSegments.create({wrappees:[...newBlocks,{x:this.props.width}]})
				if(box.hold(this.box.items)===false){
					return false
				}else{
					this.box=box
					//return false
				}
			}
			return 


			const containable=()=>minWidth==0 || this.content.length==0 || this.availableWidth>=minWidth || this.availableWidth==this.maxWidth
			if(containable()){
				this.wrappees=this.wrappees.map((a,i)=>{
					if((this.currentX+minWidth)>a.x){
						this.content.push(<Group {...a} height={0}/>)
						this.wrappees[i]=null
					}else{
						return a
					}
				}).filter(a=>!!a)

				if(containable()){
					let height=this.lineHeight()
					this.content.push(atom)
					let newHeight=this.lineHeight()
					if(height!=newHeight){
						const {wrappees,y}=this.props.exclude(this.composedAt, newHeight)
						this.composedAt=y
						if(wrappees && wrappees.length>0 && this.shouldRecompose(wrappees)){
							const flowCount=this.content.reduce((count,a)=>a.props.x==undefined ? count+1 : count,0)
							at=at-flowCount+1
							this.required={height:newHeight}
							return at
						}
					}
					return
				}else if(this.isEmpty()){
					this.content.push(atom)
					this.required={width:minWidth,height:this.lineHeight()}
					return at
				}else{
					return false
				}
			}else{

				return false
			}
		}
	}

	lineHeight(){
		return this.paragraph.lineHeight(this.height)
	}

	shouldRecompose(newBlocks){
		newBlocks=this.mergeWrappees(newBlocks)
		const box=new Layout.InlineSegments.create({segments:newBlocks})
		if(box.hold(this.box.items)===false){
			//return true
		}else{
			this.box=box
			//return false
		}
		const applied=this.content.filter(a=>a.props.x!==undefined)
		const notShould=applied.reduce((notShould,{props:{x,width}},i)=>{
			if(notShould){
				let a=newBlocks[i]
				return!!a && parseInt(Math.abs(a.x-x))==0 && a.width==width
			}
			return false
		}, true)
		if(notShould){
			let notApplied=newBlocks.slice(applied.length)
			if(notApplied.slice(0,1).reduce((should,a)=>a.x<this.currentX,false)){
				this.wrappees=newBlocks
				return true
			}else{
				this.wrappees=notApplied
			}
			return false
		}else{
			this.wrappees=newBlocks
			return true
		}
	}

	mergeWrappees(segments){
	   const all=[...this.wrappees,...segments].sort((a,b)=>a.x-b.x)
	   if(all.length<2){
		   return all
	   }
	   all.forEach(a=>a.x2=a.x+a.width)
	   const wrappees=[]
	   for(let i=0;i<all.length;){
		   let {x,x2}=all[i]
		   for(let j=++i;j<all.length;j++,i++){
			   const b=all[j]
			   if(b.x<=x2){
				   x2=Math.max(b.x2,x2)
			   }else{
				   break
			   }
		   }
		   wrappees.push({x,width:x2-x})
	   }
	   return wrappees
	}

	commit(){
		//this.wrappees.forEach(a=>this.content.push(<Group {...a} height={0}/>))
		//this.wrappees=[]
		this.content=this.box.render()
		return this
	}
}
