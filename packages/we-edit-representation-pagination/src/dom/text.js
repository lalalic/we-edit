import React from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"

import {NoChild} from "../composable"
import {dom} from "we-edit"
import breakOpportunities from "../wordwrap/line-break"
const {Text:Base}=dom

import {Text as ComposedText} from "../composed"

const Super=NoChild(Base)

export default class Text extends Super{
    static contextTypes={
		...Super.contextTypes,
		Measure: PropTypes.func,
	}

    get text(){
        let {children=""}=this.props
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

    get defaultStyle(){
        const {color,highlight,vanish,border,underline,strike}=this.props
        return {
            ...this.measure.defaultStyle,
            color, highlight,border,underline,strike
        }
    }

    /**
     * it's safe to override render since allChildrenComposed would be set manually at end of render
     */
    render(){
        try{
            if(this.props.vanish){
                return null
            }
            
            const defaultStyle=this.defaultStyle
            const measure=this.measure
            const whitespaceWidth=measure.stringWidth(" ")

            let start=0
            breakOpportunities(this.text).forEach(a=>{
                a.split(/(\s)/).filter(a=>!!a).forEach((b,i)=>{
                    const isWhitespace=b==" "
                    const ending=b.endsWith(",") ? b.substring(0,b.length-1) : false
                    this.appendComposed({
                        ...defaultStyle,
                        className:isWhitespace ? "whitespace" : undefined,
                        width:isWhitespace ? whitespaceWidth : measure.stringWidth(b),
                        minWidth:isWhitespace ? 0 : (ending ? measure.stringWidth(ending) : undefined),
                        "data-endat":start+=b.length,
                        children: b,
                    })
                })
            })
            return null
        }finally{
            this.onAllChildrenComposed()
        }
    }

	createComposed2Parent(props){
        const composed=<ComposedText {...props}/>
		this.computed.composed.push(composed)
		return composed
	}
}