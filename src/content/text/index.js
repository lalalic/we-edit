import React, {Component, PropTypes} from "react"
import {NoChild} from "../any"
import SVGWordWrapper from "../../wordwrap/svg"

import Group from "../../composed/group"
import ComposedText from "../../composed/text"

import {category} from "./chars"

export default class Text extends NoChild{
	static displayName="text"

	compose(){
		let parent=this.context.parent
		let composer=new this.constructor.WordWrapper("", this.getStyle())
		let defaultStyle=composer.defaultStyle
		
		const breakOpportunities=this.context.getMyBreakOpportunities(parent)
		
		const commit=state=>{
			let {content,width,end}=state
			let composedText=this.createComposed2Parent({
					...defaultStyle,
					width:Math.floor(width),
					contentWidth:width,
					end,
					children:[...content]
				})
			parent.appendComposed(composedText)
		}
		let consume1
		
		let state=breakOpportunities.reduce(consume1=(state,opportunity,i)=>{
			let {
				word,
				start:{itemId:startItemId, at:startAt}, 
				end:{itemId:endItemId, at:endAt}
				}=opportunity
			if(startItemId==endItemId){
				//whole word
			}else if(i==0){//cross at begin
				word=word.substr(-endAt)
			}else{//cross at end
				word=word.substr(0,word.length-endAt)
			}
			let wordWidth=composer.stringWidth(word)
			let {space:{width:maxWidth},content,width}=state
			if(width+wordWidth<=maxWidth){
				content.push(word)
				state.width+=wordWidth
				state.end=endAt
			}else{//@TODO: end-of-line with whitespace,xx should be able to extend line width
				if(width!=0)
					commit(state)
				state.space=parent.nextAvailableSpace({height:composer.height,width:wordWidth})
				content.splice(0,content.length)
				state.width=0
				consume1(state,opportunity,i)
			}
			return state
		},{space:parent.nextAvailableSpace({height:composer.height}),content:[],width:0,end:0})
		
		commit(state)

		parent.on1ChildComposed(this)
	}

	getStyle(){
		const {inheritedStyle}=this.context

		return 'rFonts,sz,color,b,i,vanish'.split(",").reduce((style, key)=>{
			let value=inheritedStyle.key(`w\\:rPr w\\:${key}`)
            if(value!=undefined){
                style[key]=value
			}
            return style
        },{})
	}

	static contextTypes={
		...NoChild.contextTypes,
		inheritedStyle: PropTypes.object,
		getMyBreakOpportunities: PropTypes.func
	}

	createComposed2Parent(props){
		return <ComposedText {...props}/>
	}


	static WordWrapper=SVGWordWrapper
}
