import React, {Children,Component} from "react"
import PropTypes from "prop-types"

import {ReactQuery} from "we-edit"

import {Group} from "../../composed"

export default class Line extends Component{
	constructor({width,maxWidth,height,wrappees=[]}){
		super(...arguments)
		this.maxWidth=maxWidth
		this.content=[]
		this.wrappees=wrappees
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
			},
			first:{
				enumerable:false,
				configurable:false,
				get(){
					const first=this.content.find(a=>a.props.x===undefined)
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
					const last=this.content.findLast(a=>a.props.x===undefined)
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
		return this.children.length==0
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
			this.content.push(React.cloneElement(
				new ReactQuery(atom).findFirst('[data-type="anchor"]').get(0),
				{children:null,width:0,height:0, atom}
			))
			if(!this.context.parent.context.isAnchored(anchor.props.id)){
				this.anchor=atom
				return false
			}
		}else{
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
					if(atom.props.descent==undefined){
						atom=<Group width={width} height={atom.props.height} y={-atom.props.height}>{atom}</Group>
					}
					this.content.push(atom)
					let newHeight=this.lineHeight()
					if(height!=newHeight){
						const newBlocks=this.context.parent.context.exclusive(newHeight)
						if(this.shouldRecompose(newBlocks)){
							const flowCount=this.content.reduce((count,a)=>a.props.x==undefined ? count+1 : count,0)
							at=at-flowCount
							this.content=[]
							return at
						}
					}
					return
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

	commit(){
		this.wrappees.forEach(a=>this.content.push(<Group {...a} height={0}/>))
		this.wrappees=[]
		return this
	}
}
