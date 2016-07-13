import React,{PropTypes} from "react"
import {Text} from "../content"
import editable from "./editable"

import Group from "../composed/group"
import {Shape as CursorShape} from "./cursor"

let Super=editable(Text)
export default class extends Super{
	_refs=new Map()
	
    createComposed2Parent(props){
		let composed=super.createComposed2Parent(...arguments)
		let {width, height, children:text}=composed.props
		text=React.cloneElement(text,{onClick:e=>this.onClick(e,props)})
		
        return (
			<CursorableText 
				ref={a=>this._refs.set(props,a)}
				width={width} height={height} 
				createCursor={a=>this.createCursorElement(props)}>
				{text}
			</CursorableText>
		)
    }
	
	createCursorElement(props){
		const {end, children: textpiece}=props
		const {cursorAt, content}=this.state
        let style=this.getStyle()

		if(cursorAt==undefined)
			return null
		
		if(end-textpiece.length<cursorAt && cursorAt<=end){
			let locText=content.substring(end-textpiece.length, cursorAt)
			let composer=new this.constructor.WordWrapper(locText, style)
			let size=composer.next({width:Number.MAX_SAFE_INTEGER})
			size.height=composer.height
			return <CursorShape {...size} style={style}/>
		}
		
		return null
	}

    onClick(event, text){
		const {nativeEvent:{offsetX, offsetY}, target}=event
        let style=this.getStyle()
        let composer=new this.constructor.WordWrapper(text.children, style)
        let loc=composer.next({width:offsetX})||{end:0}
        let index=text.end-text.children.length+loc.end
		this.setState({cursorAt:index}, a=>{
			let cursor=this.context.cursor()
			cursor.setState({target:this, textpiece:text}, a=>{
				let ref=this._refs.get(text)
				if(ref)
					ref.setState({composedAt:new Date().toString()})
			})
		})
    }

	insert(str){
		const {content, cursorAt}=this.state
		this.setState({
			content:content.splice(cursorAt,0,str), 
			cursorAt:cursorAt+str.length},e=>{
				this.reCompose()
			})
	}

	blur(text){
		console.log(`blured ${JSON.stringify(text)}`)
		this.setState({cursorAt:undefined}, a=>{
			let ref=this._refs.get(text)
			if(ref)
				ref.setState({composedAt: new Date().toString()})
		})
	}

	static contextTypes=Object.assign({
		cursor: PropTypes.func
	},Super.contextTypes)
}

class CursorableText extends Group{
	render(){
		const {width, height, children, createCursor}=this.props
		
		let cursor=createCursor()
		return (
			<Group width={width} height={height}>
				{createCursor()}
				{children}
			</Group>
		)
	}
}
