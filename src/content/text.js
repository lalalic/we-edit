import React, {Component, PropTypes} from "react"
import {NoChild} from "./any"
import HtmlWordWrapper from "../wordwrap/html"
import {isChar, isWhitespace} from "../wordwrap"

import Group from "../composed/group"

export default class Text extends NoChild{
	static displayName="text"

    compose(){
		const {composed}=this.computed
        const {parent}=this.context
		const content=this.getContent()
		const length=content.length

		let composer=new this.constructor.WordWrapper(content, this.getStyle())
        let text=null
		let minWidth=0

		let nextAvailableSpace=parent.nextAvailableSpace()
		if(isWhitespace(content[0])){
			//all whitespace should be appended to last line end
			let {whitespaces}=[...content].reduce((state,a)=>{
					if(!state.end){
						if(isWhitespace(a))
							state.whitespaces+=a
						else
							state.end=true
					}
					return state
				},{whitespaces:"",end:false})
			text=composer.next({len:whitespaces.length})
			composed.push(text)
			parent.appendComposed(this.createComposed2Parent(text))
			nextAvailableSpace=parent.nextAvailableSpace()
		}else if(isChar(content[0])){
			//first word should be wrapped to merge with last line's ending word
			let {firstWord}=[...content].reduce((state,a)=>{
					if(!state.end){
						if(isChar(a))
							state.firstWord+=a
						else
							state.end=true
					}
					return state
				},{firstWord:"",end:false})
			text=composer.next({len:firstWord.length})

			if(false===parent.appendComposed(this.createComposed2Parent(text)))
				composer.rollback(firstWord.length)

			nextAvailableSpace=parent.nextAvailableSpace()
		}


        while(text=composer.next(this.getWrapContext(nextAvailableSpace))){
			if(text.contentWidth==0){
				//width of available space is too small, request a bigger space
				minWidth=nextAvailableSpace.width+1
			}else{
				const isLastPiece=text.end==length
				const endWithChar=isChar(text.children[text.children.length-1])
				if(isLastPiece && endWithChar && ![...text.children].reduce((state,a)=>state&&isChar(a),true)){
					/* <t>xxx he</t><t>llo</t>=>line: [<text children="xxx "/><text children="he"/>]
					make it ready to side by side arrange splitted word text
					*/
					let {word}=[...text.children].reduceRight((state,chr)=>{
						if(state.end)
							return state

						if(isChar(chr))
							state.word=chr+state.word
						else
							state.end=true

						return state
					},{word:"",end:false})

					let wordWidth=composer.stringWidth(word)

					let {children, contentWidth,width,end,...others}=text
					composed.push(text={...others,
						children:children.substr(0,children.length-word.length)
						,contentWidth:contentWidth-wordWidth
						,width:width-wordWidth
						,end:end-word.length
					})
					parent.appendComposed(this.createComposed2Parent(text))

					composed.push(text={...others,
						children:word
						,contentWidth:wordWidth
						,width:wordWidth
						,end
					})
					parent.appendComposed(this.createComposed2Parent(text))
				}else{
					composed.push(text)
					parent.appendComposed(this.createComposed2Parent(text))
				}
				if(text.end==length)
					break;
				minWidth=0

			}

			nextAvailableSpace=parent.nextAvailableSpace({width:minWidth})
        }
		parent.on1ChildComposed(this)
    }

	getStyle(){
		const {inheritedStyle}=this.context

		return 'rFonts,sz,color,b,i,vanish'.split(",").reduce((style, key)=>{
            let stylePath=`rPr.${key}`
			let value=inheritedStyle.get(stylePath)
            if(value!=undefined){
                style[key]=value
			}
            return style
        },{})
	}

	createComposed2Parent(props){
		const {color}=this.getStyle()
		const {width, height, descent, contentWidth, whiteSpace, ...others}=props
		return (
			<Group width={width} height={height} descent={descent}>
				<text {...{width,height,descent}} {...others} style={{whiteSpace:"pre"}}/>
			</Group>
		)
	}

	getWrapContext({width,height,lineWidth}){
		const {isComposingLastChildInParent,parent}=this.context
		const wholeLine=width==lineWidth

		return {
			width
			,height
			,wordy(text, isEnd){
				if(isComposingLastChildInParent(this)
					&& parent.context.isComposingLastChildInParent(parent)
					&& isEnd)
					return false

				const hasOnlyOneWord=[...text].reduce((state,next)=>state&&isChar(next),true)
				if(wholeLine && hasOnlyOneWord)
					return false

				return true
			}
		}
	}

	static contextTypes={
		...NoChild.contextTypes,
		inheritedStyle: PropTypes.object
	}

	static WordWrapper=HtmlWordWrapper
}
