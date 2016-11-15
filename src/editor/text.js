import React,{PropTypes} from "react"
import ReactDOM from "react-dom"

import {Text} from "../content"
import editable from "./editable"

import Group from "../composed/group"
import {Shape as CursorShape} from "./cursor"

let Super=editable(Text)
export default class extends Super{
	constructor(){
		super(...arguments)
		this.state=Object.assign(super.state||{},{content:this.props.children})
	}
	
	getContentCount(){
		return 1
	}
	
	createComposed2Parent(props){
		let composed=super.createComposed2Parent(...arguments)
		let {width, height, descent, children:text}=composed.props
		text=React.cloneElement(text,{onClick:e=>this.onClick(e,props)})

		let ps={width,height,descent}
		const {end, children: textpiece}=props

		let cursor=this.context.cursor()||{state:{}}
		let {target,at: cursorAt}=cursor.state
		
		if(target==this && end-textpiece.length<cursorAt && cursorAt<=end){
			ps.ref=a=>{
				let node=ReactDOM.findDOMNode(a)
				let text=textpiece.substr(0,cursorAt-(end-textpiece.length))
				let style=this.getStyle()
				let composer=new this.constructor.WordWrapper(text, style)
				let {contentWidth, fontFamily}=composer.next({width})||{end:0}
				cursor.setState({
					target:this,
					at:cursorAt,
					node,
					width:contentWidth,
					height:composer.height, 
					descent: composer.descent, 
					style})
			}
		}
		return (
			<Group {...ps}>
			{text}
			</Group>
		)
    }

    onClick(event, text){
		const {nativeEvent:{offsetX=0, offsetY=0}, target}=event
		let x=offsetX-(function(p){
			let offset=0
			while(p && p.tagName!="svg"){
				let x=p.getAttribute("x")
				if(x)
					offset+=parseFloat(x)
				p=p.parentElement
			}
			return offset
		})(target.parentElement);
        let style=this.getStyle()
        let composer=new this.constructor.WordWrapper(text.children, style)
        let {contentWidth,end}=composer.next({width:x})||{end:0,contentWidth:0}
        let index=text.end-text.children.length+end
		let cursor=this.context.cursor()
		cursor.setState({
			target:this,
			at: index,
			node:target.parentNode,
			width:Math.ceil(contentWidth),
			height:composer.height,
			descent: composer.descent,
			style })
    }

	splice(start, length, str){
		const {content}=this.state
		this.setState({content:content.splice(start,length,str)},e=>{
			this.reCompose()	
		})
	}

	static contextTypes=Object.assign({
		cursor: PropTypes.func
	},Super.contextTypes)
}
