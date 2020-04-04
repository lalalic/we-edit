import React from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"
import {shallowEqual} from "recompose"

import {NoChild,editable} from "../composable"
import {dom} from "we-edit"
import breakOpportunities from "../wordwrap/line-break"

import {Text as ComposedText} from "../composed"

const Super=NoChild(dom.Text)
const LineBreak=String.fromCharCode(13)
class Text extends Super{
    static contextTypes={
		...Super.contextTypes,
		Measure: PropTypes.func,
	}

    get text(){
        const {children=""}=this.props
        return Array.isArray(children) ? children.join("") : children
    }

    createMeasure=memoize((fonts,size,bold,italic)=>{
        if(this.props.measure)
            return this.props.measure
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
            const text=this.text
            const defaultStyle=this.defaultStyle
            const measure=this.measure

            if(this.props.wrap===false){
                this.appendComposed({
                    ...defaultStyle,
                    width:measure.stringWidth(text),
                    "data-endat":text.length,
                    children:text,
                    mergeOpportunity:false,
                })
                return null
            }

            const whitespaceWidth=measure.stringWidth(" ")
            let start=0
            breakOpportunities(text).forEach((a,j,_1,_2,jLast=_1.length-1==j)=>{
                a.split(/(\s)/).filter(a=>!!a).forEach((b,i,$1,$2,iLast=$1.length-1==i)=>{
                    const isWhitespace=b==" "
                    const ending=b.endsWith(",") ? b.substring(0,b.length-1) : false
                    this.appendComposed({
                        ...defaultStyle,
                        className:isWhitespace ? "whitespace" : undefined,
                        width:isWhitespace ? whitespaceWidth : measure.stringWidth(b),
                        minWidth:isWhitespace||b==LineBreak ? 0 : (ending ? measure.stringWidth(ending) : undefined),
                        "data-endat":start+=b.length,
                        children: b,
                        mergeOpportunity:((i+j)==0||(jLast&&iLast))&&!isWhitespace&&b//first or last
                    })
                })
            })
            return null
        }finally{
            this.onAllChildrenComposed()
        }
    }

	createComposed2Parent(props){
        return <ComposedText {...props}/>
	}
}

export default class EditableText extends editable(Text){
    isAtomChanged(props){
        if(!super.isAtomChanged(...arguments)){
            return !shallowEqual(props,this.props)
        }
        return true
    }

    render(){
        if(this.text.length==0){
            this.appendComposed({
                ...this.defaultStyle,
                width:0,
                minWidth:0,
                "data-endat":0,
                children: ""
            })

            this.onAllChildrenComposed()
            return null
        }
        return super.render()
    }
}
