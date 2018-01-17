import React from "react"
import PropTypes from "prop-types"


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
                word,
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
			word=word||""

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
					"data-endat":end,
					children:[...content]
				})
			this.appendComposed(composedText)
			state.width=0
			content.splice(0,content.length)
		}
		
		const consume1=(state,opportunity,i)=>{
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
				let nextSpace=parent.nextAvailableSpace({height:composer.height,width:wordWidth})
				if(width!=0){
					commit(state)
				}else{
					if(nextSpace.width<wordWidth){
						let text=word.substr(0,this.composer.widthString(maxWidth, word))
						content.push(text)
						state.width+=maxWidth
						state.end+=text.length
						commit(state)
						
						let unComposedText=word.substr(text.length)
						opportunity=[unComposedText, this.composer.stringWidth(unComposedText)]
					}
				}
				state.space=nextSpace
				consume1(state,opportunity,i)
			}
			return state
		}
		
        let state=this.computed.breakOpportunities.reduce(
			consume1,
			{space:parent.nextAvailableSpace({height:composer.height}),content:[],width:0,end:0}
		)

		commit(state)

		parent.on1ChildComposed(this)

        return null
    }

	createComposed2Parent(props, composed){
		this.computed.composed.push(composed=<ComposedText {...props} key={this.computed.composed.length}/>)
		return composed
	}
}
