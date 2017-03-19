import React, {PropTypes} from "react"

import {NoChild} from "./composable"
import Base from "../text"

import SVGWordWrapper from "./wordwrap/svg"
import Group from "./composed/group"
import ComposedText from "./composed/text"

const Super=NoChild(Base)

export default class Text extends Super{
    static WordWrapper=SVGWordWrapper
    static contextTypes={
		...Super.contextTypes,
		getMyBreakOpportunities: PropTypes.func
	}
	static propTypes={
		...(Super.propTypes||{}),
		//line break opportunity need it in paragraph, how can we remove it
		id:PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
	}

	static get breakable(){
		return true
	}

    compose(){
		const parent=this.context.parent
        const {fonts,size,color,bold,italic,vanish}=this.style
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

	createComposed2Parent(props){
		return <ComposedText {...props}/>
	}
}
