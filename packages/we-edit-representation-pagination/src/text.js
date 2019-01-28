import React from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"

import composable,{NoChild} from "./composable"
import {models} from "we-edit"
const {Text:Base}=models

import {Text as ComposedText,  Group} from "./composed"

const Super=NoChild(Base)

export default class Text extends Super{
    static contextTypes={
		...Super.contextTypes,
		Measure: PropTypes.func,
        getMyBreakOpportunities: PropTypes.func,
	}

    get text(){
        let {children}=this.props
        return Array.isArray(children) ? children.join("") : children
    }

    createMeasure=memoize((fonts,size,bold,italic)=>{
        const {Measure}=this.context
        const measure=new Measure({fonts,size,bold,italic})
        const _stringWidth=measure.stringWidth.bind(measure)
        const cache=new Map()
        measure.stringWidth=word=>{
            if(cache.has(word))
                return cache.get(word)
            const width=_stringWidth(word)
            cache.set(word,width)
            return width
        }
        return measure
    })

    get measure(){
        const {fonts, size, bold, italic, }=this.props
        return this.createMeasure(fonts,size,bold,italic)
    }

    getMyBreakOpportunities(text){
        return this.context.getMyBreakOpportunities(text)
    }

    render(){
        const {parent}=this.context
		const {color,highlight,vanish,border,underline,strike}=this.props
		if(vanish){
			return null
		}

        const measure=this.measure

        const defaultStyle={
                ...measure.defaultStyle,
                color, highlight,border,underline,strike
            }

		const whitespaceWidth=measure.stringWidth(" ")

		let start=0
		this.getMyBreakOpportunities(this.text).forEach(a=>{
			a.split(/(\s)/).filter(a=>!!a).forEach((b,i)=>{
				const isWhitespace=b==" "
                const ending=b.endsWith(",") ? b.substring(0,b.length-1) : false
				this.appendComposed({
					...defaultStyle,
                    color,
					highlight,
                    className:isWhitespace ? "whitespace" : undefined,
					width:isWhitespace ? whitespaceWidth : measure.stringWidth(b),
					minWidth:isWhitespace ? 0 : (ending ? measure.stringWidth(ending) : undefined),
					"data-endat":start+=b.length,
					children: b
				})
			})
		})

		this.onAllChildrenComposed()
        return null
    }

	createComposed2Parent(props){
        const composed=<ComposedText {...props}/>
		this.computed.composed.push(composed)
		return composed
	}
}
