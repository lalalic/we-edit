import React, {Component} from "react"
import {ReactQuery} from "we-edit"

import {Layout} from "../../composable"

/**
 * 
 */
export default class Line extends Component{
	constructor({blockOffset,exclude=a=>({wrappees:[]})}){
		super(...arguments)
		this.exclude=exclude
		const {wrappees=[],top=0}=this.exclude(blockOffset, 0)
		this.wrappees=wrappees
		this.top=top
		this.box=Layout.InlineSegments.create({wrappees:[...wrappees,{x:this.width}]})
	}

	get height(){
		return this.getLineHeight()
	}

	get currentX(){
		return this.box.currentX
	}
	
	get width(){
		const {width=0,left=0, right=width}=this.props
		return right-left
	}
		
	get first(){
		const first=this.atoms[0]
		if(first && first.props.atom)
			return first.props.atom
		if(first && first.props.descent==undefined)
			return first.props.children
		return first
	}

	get last(){
		const last=this.atoms.pop()
		if(last && last.props.atom)
			return last.props.atom
		return last
	}

	get atoms(){
		return this.box.items.filter(a=>a.props.x===undefined)
	}

	get items(){
		return [...this.props.positioned,...this.box.items]
	}
	
	get blockOffset(){
		return this.top+this.props.blockOffset
	}

	isEmpty(){
		return !!!this.first
	}

	hasEqualSpace({width,wrappees=[]}){
		return false
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
						const box=Layout.InlineSegments.create({wrappees:[...wrappees,{x:this.width}]})
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
		return this.items.reduce((H, { props: { height = 0 } }) => Math.max(H, height), 0);
    }

    get textHeight(){
        return this.items.reduce((H, { props: { height = 0, descent:isText } }) => Math.max(H, isText ? height : 0), 0);
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
		this.children.splice(0,0,...this.props.positioned)
		return this
	}
}
