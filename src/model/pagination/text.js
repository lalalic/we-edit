import React, {PropTypes} from "react"

import {NoChild} from "./composable"
import Base from "../text"

import SVGWordWrapper from "./wordwrap/svg"
import NodeWordWrapper from "./wordwrap/node"

import Group from "./composed/group"
import ComposedText from "./composed/text"

const Super=NoChild(Base)

export default class Text extends Super{
    static WordWrapper=typeof(window)!="undefined" ? SVGWordWrapper : NodeWordWrapper
	
    static contextTypes={
		...Super.contextTypes,
		getMyBreakOpportunities: PropTypes.func
	}
	static propTypes={
		...(Super.propTypes||{}),
		//line break opportunity need it in paragraph, how can we remove it?????
		id:PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
	}

	static get breakable(){
		return true
	}

    compose(){
		const parent=this.context.parent
        const {fonts,size,color,bold,italic,vanish,children:myText}=this.props
		const composer=new this.constructor.WordWrapper({fonts,size,color,bold,italic,vanish})
		const defaultStyle=composer.defaultStyle

		const breakOpportunities=this.context.getMyBreakOpportunities(this)
		
		const commit=state=>{
			let {content,width,end}=state
			let composedText=this.createComposed2Parent({
					...defaultStyle,
					width:Math.floor(width),
					contentWidth:width,
					end,
					children:[...content]
				})
			this.appendComposed(composedText)
		}
		let consume1, id=this.props.id
        let state=breakOpportunities.reduce(consume1=(state,opportunity,i)=>{
			let {
				word,
				start:{itemId:startItemId, at:startAt},
				end:{itemId:endItemId, at:endAt}
				}=opportunity
			if(startItemId==endItemId){
				//whole word
			}else if(startItemId==id){
				if(endItemId==id)
					word=word.substring(0,word.length-endAt)
				else{
					word=word.substring(0,myText.length)
					endAt=myText.length
				}
			}else if(endItemId==id){
				word=word.substr(-endAt)
			}
			let wordWidth=composer.stringWidth(word)
			let {space:{width:maxWidth},content,width}=state
			if(Math.floor(width+wordWidth)<=maxWidth){
				content.push(word)
				state.width+=wordWidth
				state.end=endAt
			}else if((/\s+$/.test(word) && //doing: end-of-line with whitespace,xx should be able to extend line width
				Math.floor(width+(wordWidth=composer.stringWidth(word.replace(/\s+$/,''))))<=maxWidth)){
				content.push(word)
				state.width+=wordWidth
				state.end=endAt
			}
			else{
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

	createComposed2Parent(props, composed){
		this.computed.composed.push(composed=<ComposedText {...props}/>)
		return composed
	}
}
