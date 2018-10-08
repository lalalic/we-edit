import React from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"

import {NoChild} from "./composable"
import {models} from "we-edit"
const {Text:Base}=models

import {Text as ComposedText,  Group} from "./composed"

const Super=NoChild(Base)

export default class Text extends Super{
    static contextTypes={
		...Super.contextTypes,
		Measure: PropTypes.func
	}

    get text(){
        let {children}=this.props
        return Array.isArray(children) ? children.join("") : children
    }

    getBreakOpportunities=memoize((myText,fonts,size,bold,italic)=>{
		const {Measure,getMyBreakOpportunities}=this.context
		const measure=this.measure=new Measure({fonts:fonts,size,bold,italic})
		const breakOpportunities=getMyBreakOpportunities(myText)
        return breakOpportunities.map(word=>[word,measure.stringWidth(word)])
    })

    render(){
		const parent=this.context.parent
		const {color,highlight,vanish,border,underline,strike}=this.props
		if(vanish){
			return null
		}

		const breakOpportunities=(({myText=this.text,fonts,size,bold,italic})=>
			this.getBreakOpportunities(myText,fonts,size,bold,italic))(this.props);

        const measure=this.measure
		const defaultStyle={...this.measure.defaultStyle, color, highlight,border,underline,strike}


		let i=0
		const commit=state=>{
			let {content,width,end}=state
			let composedText=this.createComposed2Parent({
					...defaultStyle,
					color,
					highlight,
					width,
					contentWidth:width,
					"data-endat":end,
					children:[...content]
				})
			this.appendComposed(composedText)
			state.width=0
			content.splice(0,content.length)
		}

		const consume1=(function(state,opportunity,i, a, loopCounter=0){
            let [word="", wordWidth]=opportunity
			let {space:{width:maxWidth},content,width}=state
			if(Math.floor(width+wordWidth)<=maxWidth){
				content.push(word)
				state.width+=wordWidth
				state.end+=word.length
			}else if((/\s+$/.test(word) && //doing: end-of-line with whitespace,xx should be able to extend line width
				(width+(wordWidth=measure.stringWidth(word.replace(/\s+$/,''))))<=maxWidth)){
				content.push(word)
				state.width+=wordWidth
				state.end+=word.length
			}else{
                if(width!=0){
					commit(state)
				}

                if(loopCounter>3){//
                    console.warn("possible dead loop, commit first")
					//commit(state)
                    debugger
                }

				let nextSpace=parent.nextAvailableSpace({height:measure.height,width:wordWidth})

				if(width==0){
					if(nextSpace.width<wordWidth){
						let text=word.substr(0,this.measure.widthString(maxWidth, word))
						content.push(text)
						state.width+=maxWidth
						state.end+=text.length
						commit(state)

						let unComposedText=word.substr(text.length)
						opportunity=[unComposedText, this.measure.stringWidth(unComposedText)]
					}
				}
				state.space=nextSpace
				consume1(state,opportunity,i,a, loopCounter+1)
			}
			return state
		}).bind(this)

        let state=breakOpportunities.reduce(
			consume1,
			{space:parent.nextAvailableSpace({height:measure.height}),content:[],width:0,end:0}
		)

		commit(state)

        return null
    }

	createComposed2Parent(props, composed){
		this.computed.composed.push(composed=<ComposedText {...props} key={this.computed.composed.length}/>)
		return composed
	}
}
