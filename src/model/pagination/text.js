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

    constructor(){
        super(...arguments)
        this.computed.breakOpportunities=this.getBreakOpportunitiesWidth()
    }

    getBreakOpportunitiesWidth(){
        const {fonts,size,color,bold,italic,vanish,children:myText}=this.props
		const composer=this.composer=new this.constructor.WordWrapper({fonts,size,color,bold,italic,vanish})
		const [index,breakOpportunities]=this.context.getMyBreakOpportunities()
        return breakOpportunities.map(opportunity=>{
            let {
                word="",
                start:{itemIndex:startItemIndex, at:startAt},
                end:{itemIndex:endItemIndex, at:endAt}
                }=opportunity
            if(startItemIndex==endItemIndex){
                //whole word
            }else if(startItemIndex==index){
                word=word.substring(0,myText.length-startAt)
            }else if(endItemIndex==index){
                word=word.substr(-endAt)
            }
            return [word,composer.stringWidth(word)]
        })

    }

    render(){
		const parent=this.context.parent
        const composer=this.composer
		const defaultStyle=this.composer.defaultStyle
		let i=0
		const commit=state=>{
			let {content,width,end}=state
			let composedText=this.createComposed2Parent({
					...defaultStyle,
					width:Math.floor(width),
					contentWidth:width,
					"data-endAt":end,
					children:[...content]
				})
			this.appendComposed(composedText)
		}
		let consume1
        let state=this.computed.breakOpportunities.reduce(consume1=(state,opportunity,i)=>{
            let [word="", wordWidth]=opportunity
			let {space:{width:maxWidth},content,width}=state
			if(Math.floor(width+wordWidth)<=maxWidth){
				content.push(word)
				state.width+=wordWidth
				state.end+=word.length
			}else if((/\s+$/.test(word) && //doing: end-of-line with whitespace,xx should be able to extend line width
				Math.floor(width+(wordWidth=composer.stringWidth(word.replace(/\s+$/,''))))<=maxWidth)){
				content.push(word)
				state.width+=wordWidth
				state.end+=word.length
			}else{
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

        return null
    }

	createComposed2Parent(props, composed){
		this.computed.composed.push(composed=<ComposedText {...props} key={this.computed.composed.length}/>)
		return composed
	}
}
