import React, {Component, PropTypes} from "react"
import {NoChild} from "../any"
import HtmlWordWrapper from "../../wordwrap/html"
import {isChar, isWhitespace, find, isWord} from "../../wordwrap"

import Group from "../../composed/group"
import ComposedText from "../../composed/text"

import {category} from "./chars"

export default class Text extends NoChild{
	static displayName="text"

	render(){
		let composer=new this.constructor.WordWrapper(content, this.getStyle())
		return (
			<i>
			{
				this.computed.pieces.map(({type,chars,end,width})=>{
					return React.createElement(type, {chars,end,width,key:end})
				})
			}
			</i>
		)
	}

	_parseText(){
		let composer=new this.constructor.WordWrapper(content, this.getStyle())
		return this.computed.pieces=[...this.getContent()].reduce((pieces,a, offset)=>{
			let type=category(a)
			let last=pieces[pieces.length-1]
			if(last && last.type==type){
				last.chars.push(a)
				last.end=offset
			}else{
				pieces.push({type,chars:[a],end:offset})
			}
			return pieces
		},[]).map(a=>{
			a.width=composer.stringWidth(a.chars.join(""))
			return a
		})
	}

	compose(){
		let parent=this.context.parent
		let composer=new this.constructor.WordWrapper(this.getContent(), this.getStyle())
		let defaultStyle=composer.defaultStyle

		const commit=(state,needNewLine)=>{
			let {stack, contentWidth,end, space:{line}}=state
			let changed=false
			if(changed=stack.length){
				let text=this.createComposed2Parent({...defaultStyle,width:Math.floor(contentWidth),contentWidth,end,children:[...stack]})
				parent.appendComposed(text)
				state.contentWidth=0
				stack.splice(0,stack.length)
			}

			if(needNewLine)
				line.commit(true)

			if(changed || needNewLine)
				state.space=parent.nextAvailableSpace()

			return state
		}

		const push=(state,piece)=>{
			state.stack.push(piece)
			state.contentWidth+=piece.width
			state.end+=piece.chars.length
			state.space.bLineStart=false
		}

		const splitPiece=(piece,text)=>{
			const {width, end, chars}=piece
			let first={...piece, chars: [...text.children], width:text.width,end:end-piece.chars.length+text.children.length}
			let second={...piece, chars: chars.splice(text.children.length), width: width-text.width}
			return [first,second]
		}

		let handlePiece, state=this._parseText().reduce(handlePiece=(state,piece)=>{
			let {space:{width,bFirstLine,bLineStart,line},stack, contentWidth}=state
			if(width-contentWidth>0){
				if(width-contentWidth>=piece.width){//left space is bigger enough
					push(state,piece)
				}else{//left space is not enough
					({space:{width,bFirstLine,bLineStart,line},stack, contentWidth}=commit(state));
					if(bLineStart){
						if(bFirstLine){
							composer.composed=state.end
							let text=composer.next(state.space);//split
							let splitted=splitPiece(piece,text)
							push(state,splitted[0])
							commit(state,true)
							handlePiece(state,splitted[1])
						}else{
							if(piece.type.ableExceed()){
								push(state,piece)
							}else if(line.canSeperateWith(piece)){
								commit(state,true)
								handlePiece(state,piece)
							}else{
								line.rollback(piece);
								state.space=parent.nextAvailableSpace()
								handlePiece(state,piece)
							}
						}
					}else{
						if(piece.type.ableExceed()){
							push(state,piece)
						}else if(line.canSeperateWith(piece)){
							commit(state,true)
							handlePiece(state,piece)
						}else if(line.allCantSeperateWith(piece)){
							composer.composed=state.end
							let text=composer.next(state.space);//split
							let splitted=splitPiece(piece,text)
							push(state,splitted[0])
							commit(state,true)
							handlePiece(state,splitted[1])
						}else{
							line.rollback(piece)
							state.space=parent.nextAvailableSpace()
							handlePiece(state,piece)
						}
					}
				}
			}else{
				if(piece.type.ableExceed()){
					push(state,piece)
				}else{
					commit(state,true)
					handlePiece(state,piece)
				}
			}
			return state
		},{space:parent.nextAvailableSpace(),stack:[],contentWidth:0,end:0})

		commit(state)

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
		return <ComposedText {...props}/>
	}

	static contextTypes={
		...NoChild.contextTypes,
		inheritedStyle: PropTypes.object
	}

	static WordWrapper=HtmlWordWrapper
}
