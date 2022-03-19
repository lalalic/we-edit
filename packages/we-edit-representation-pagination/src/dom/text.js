import React from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"

import {NoChild,editable} from "../composable"
import {dom} from "we-edit"
import breakOpportunities from "../wordwrap/line-break"

import {Text as ComposedText} from "../composed"

/**
 * fonts make composing complex
 * *tokenizeOpportunity is a shortcut for line-break algorithm
 */
class Text extends NoChild(dom.Text){
    static contextTypes={
		...super.contextTypes,
        Measure: PropTypes.func,
    }
    
    get text(){
        const {children=""}=this.props
        return Array.isArray(children) ? children.join("") : children
    }

    createMeasure=memoize((fonts,size,bold,italic,underline,vertAlign)=>{
        if(this.props.measure)
            return this.props.measure
        return new this.context.Measure({fonts,size,bold,italic,vertAlign,underline})
    })

    get measure(){
        const {fonts, size, bold, italic,underline,vertAlign}=this.props
        return this.createMeasure(fonts,size,bold,italic,underline,vertAlign)
    }

    get defaultStyle(){
        const {color,highlight,vanish,border,strike}=this.props
        return {
            ...this.measure.defaultStyle,
            color, highlight,border,strike
        }
    }

    /**
     * extend to honer fonts, so measure could be simpler
     * @param {*} text 
     */
    breakOpportunities=memoize((text,measure=this.measure)=>{
        return breakOpportunities(
            text, 
            a=>a.split(/(\r\n?)/).filter(a=>!!a)
                .map(a=>a.startsWith(dom.Text.LineBreak) ? [a] : a.split(/(\s)/))
                .flat().filter(a=>!!a)//linebreaks
                .map(a=>measure.break(a)).flat()//break by fonts
        )
    })

    removeLineOrphan(a){
        const orphans=a.match(/([,.，。]+)$/)?.[0]
        return orphans ? a.substr(0,a.length-orphans.length) : a
    }
    
    fontFamily(at){
        return this.measure.getCharFontFamily(this.text.charCodeAt(at))
    }

    /**
     * it's safe to override render since allChildrenComposed would be set manually at end of render
     */
    render(){
        try{
            if(this.props.vanish){
                return null
            }
            const {LineBreak, LineFeed, Tab, PageBreak, FormFeed}=dom.Text
            const text=this.text, measure=this.measure
            
            let start=0
            this.breakOpportunities(text, measure)
            .forEach((b,j,_1,_2,bLast=_1.length-1==j, bFirst=j==0)=>{
                const props={  
                    width:0,
                    minWidth:0,
                    "data-endat":start+=b.length,
                    children: b,   
                }

                switch(b){
                    case PageBreak:
                    case FormFeed:
                        props.tokenizeOpportunity=b
                        break
                    case Tab:
                        props.width=measure.stringWidth(b)
                        props.tokenizeOpportunity=b
                        break
                    case LineBreak:
                    case LineBreak+LineFeed:
                        props.tokenizeOpportunity=LineBreak
                        break
                    case " ":
                        props.width=measure.stringWidth(b)
                        props.className="whitespace"
                        props.tokenizeOpportunity=false
                        break
                    default:{
                        delete props.minWidth
                        props.width=measure.stringWidth(b)
                        const withoutLineOrphan=this.removeLineOrphan(b)
                        if(withoutLineOrphan!=b){
                            props.minWidth=measure.stringWidth(withoutLineOrphan)
                        }
                        props.tokenizeOpportunity=(bFirst||bLast)&&b
                    }
                }
                this.appendComposed({
                    ...this.defaultStyle,
                    ...props
                })
            })
            return null
        }finally{
            this.onAllChildrenComposed()
        }
    }

	createComposed2Parent(props){
        return super.createComposed2Parent(<ComposedText {...props}/>)
	}
}

export default class EditableText extends editable(Text){
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
