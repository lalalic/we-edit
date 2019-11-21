import React, {Children,Component} from "react"
import PropTypes from "prop-types"

import {ReactQuery} from "we-edit"

import {Group} from "../../composed"
import {Layout} from "../../composable"

export default class Line extends Component{
	constructor({width,wrappees=[], exclude=a=>({wrappees:[]}),top=0}){
		super(...arguments)
		this.exclude=exclude
		this.wrappees=wrappees
		this.box=Layout.InlineSegments.create({wrappees:[...wrappees,{x:width}]})
		this.top=top
		Object.defineProperties(this,{
			height:{
				enumerable:true,
				configurable:true,
				get(){
					return this.getLineHeight()
				}
			},
			currentX:{//used by range
				enumerable:false,
				configurable:false,
				get(){
					return this.box.currentX
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
					const first=this.box.items.find(a=>a.props.x===undefined)
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
					const last=this.box.items.findLast(a=>a.props.x===undefined)
					if(last && last.props.atom)
						return last.props.atom
					return last
				}
			},
			atoms:{
				enumerable:false,
				configurable:false,
				get(){
					return this.box.items.filter(a=>a.props.x===undefined)
				}
			},
		})
	}

	get blockOffset(){
		return this.top+this.props.blockOffset
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
		const {anchor}=atom.props
		if(anchor){
			const $anchor=new ReactQuery(atom).findFirst('[data-type="anchor"]')
			const anchorId=$anchor.attr("data-content")
			const placeholder=React.cloneElement($anchor.get(0),{atom,width:0})
			this.box.push(placeholder)
			if(!this.context.parent.context.isAnchored(anchorId)){
				this.anchor=anchor
				return false
			}
		}else{
			const height=this.getLineHeight()
			const newHeight=this.getLineHeight(atom.props.height)

			const appended=(()=>{
				if((newHeight-height)>1){
					const {wrappees,top}=this.exclude(this.blockOffset, newHeight)
					if(!this.wrappees.reduce((same,a,i,t,b=wrappees[i])=>b && a.x==b.x && a.width==b.width,true)){
						const box=Layout.InlineSegments.create({wrappees:[...wrappees,{x:this.props.width}]})
						if(box.hold([...this.box.items,atom])!==false){
							this.top=top
							this.box=box
							return 
						}else{
							return false
						}
					}
					
				}
				
				return this.box.push(atom)
			})();
			if(appended===false && this.isEmpty()){
				this.box.push(atom,true)
				return 
			}
			return appended
		}
	}

	get contentHeight() {
		return this.box.items.reduce((H, { props: { height = 0 } }) => Math.max(H, height), 0);
    }

    get textHeight(){
        return this.box.items.reduce((H, { props: { height = 0, descent:isText } }) => Math.max(H, isText ? height : 0), 0);
	}
	
	getLineHeight(contentHeight=this.contentHeight){
		const {lineHeight}=this.props
		if(typeof(lineHeight)=='string'){
			return contentHeight+(typeof(lineHeight)=='string' ? this.textHeight*(parseInt(lineHeight)-100)/100.0: 0)
		}else if(typeof(lineHeight)=="number"){
			return lineHeight
		}
		return contentHeight
        
	}

	commit(){
		this.children=this.box.render()
		return this
	}
}
