import React, {Component} from "react"
import {ReactQuery} from "we-edit"

import {Layout} from "../../composable"

/**
 * 
 */
export default class Line extends Component{
	constructor({left, right, findInlineSegments}){
		super(...arguments)
		this.findInlineSegments=findInlineSegments||(()=>({segments:[{x:left, width:this.width}]}));
		const {top=0,segments=[]}=this.findInlineSegments(0,left,right)
		this.inlineSegments=Layout.InlineSegments.create({left,top,segments})
	}

	isAnchored(){
		return this.props.isAnchored(...arguments)
	}

	get height(){
		return this.getLineHeight()
	}

	get contentHeight() {
		return this.items.reduce((H, { props: { height = 0 } }) => Math.max(H, height), 0);
    }

    get textHeight(){
        return this.items.reduce((H, { props: { height = 0, descent:isText } }) => Math.max(H, isText ? height : 0), 0);
	}	

	get currentX(){
		return this.inlineSegments.currentX
	}
	
	get width(){
		const {width=0,left=0, right=width}=this.props
		return right-left
	}
		
	get firstAtom(){
		const first=this.inlineSegments.items.find(a=>a.props.x===undefined)
		if(first && first.props.atom)
			return first.props.atom
		if(first && first.props.descent==undefined)
			return first.props.children
		return first
	}

	get lastAtom(){
		const last=this.inlineSegments.items.findLast(a=>a.props.x===undefined)
		if(last && last.props.atom)
			return last.props.atom
		return last
	}

	get items(){
		return [...this.props.positioned,...this.inlineSegments.items]
	}
	
	get blockOffset(){
		return this.inlineSegments.props.top+this.props.blockOffset
	}

	isEmpty(){
		return !!!this.firstAtom
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

	/**
	 * anchor content may alreay anchored, or may not
	 * if already anchored, continue next atom
	 * if not, let parent block layout it since it possibly affect layout space, block offset
	 */
	appendAnchorAtom(atom){
		const $anchor=new ReactQuery(atom).findFirst('[data-type="anchor"]')
		const anchorId=$anchor.attr("data-content")
		const placeholder=React.cloneElement($anchor.get(0),{atom,width:0,"data-anchor":anchorId})
		this.inlineSegments.push(placeholder)
		if(!this.isAnchored(anchorId)){//let frame anchor this atom first
			/**
			 * anchor position MAY not decided, so it's NOT sure if space can hold anchor
			 * to Let it simply, let block/parent layout engine layout it immediatly 
			 */
			this.anchor=atom.props.anchor
			//commit for anchor, this line should be rollback
			return false
		}else{
			//not full, continue next atom
		}
	}

	/**
	 * inline layout doesn't consider block layout capacity,
	 * leave it to block layout engine decide how to handle overflow block size
	 */
	appendAtom(atom){
		if(atom.props.anchor){
			return this.appendAnchorAtom(atom)
		}
		
		const appended=(newHeight=>{
			if((newHeight-this.height)>1){
				/**
				 * line rect change may lead to different inline opportunities and top
				 * get opportunities again
				 */
				const {left,right}=this.props
				const {top,segments}=this.findInlineSegments(newHeight+this.top,left,right)
				if(this.inlineSegments.shouldRelayout(segments)){
					const relayouted=this.inlineSegments.relayout({segments,top},atom)
					if(relayouted!==false){
						this.inlineSegments=relayouted
						//new inline opportunities can hold layouted and atom, replace inlineSegments, and top
						//not full, continue next atom
						return 
					}else{
						//new inline opportunities can NOT hold atom, commit to block layout
						return false
					}
				}else{
					//same inline opportunities, continue normal inline layout later 
				}
			}else{
				//line rect doesn't change, continue normal inline layout later 
			}
			
			return this.inlineSegments.push(atom)
		})(this.getLineHeight(atom.props.height));

		if(appended===false && this.isEmpty()){
			//empty inline layout is not allowed
			this.inlineSegments.push(atom,true/*append atom without considering inline size*/)
			return
		}

		return appended
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

	freeze(){
		const {props:{children}}=this.inlineSegments.render()
		this.children=[...this.props.positioned,...children]
		return this
	}
}
