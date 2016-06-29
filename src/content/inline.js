import React, {Component, PropTypes} from "react"
import Any from "./any"
import Group from "../compose/group"

export default class Inline extends Any{
    state={}
	
	render(){
		return null
	}

    compose(){
		super.compose()
        const {composed}=this
        const {parent}=this.context
		const {children: rawContent}=this.props
		const {text: modifiedContent}=this.state
        let composer=new this.constructor.TextComposer(modifiedContent||rawContent)
        let text=null
        while(text=composer.next(parent.nextAvailableSpace())){
			const info=text
			text.onClick=e=>this.onClick(e,info)
			let content=(<text {...text}/>)
            composed.push(content)
            parent.appendComposed(content)
        }
		this.context.parent.finished(this)
    }
	
	finished(){
		
	}

    onClick(event, text){
		const {offsetX}=event.nativeEvent
		let composer=new this.constructor.TextComposer(text.children)
		let loc=composer.next({width:offsetX})||{end:0}
		let index=text.end-text.children.length+loc.end
		this.setState({cursor:index, text:"Raymond changed it"})
    }

	/**
	 *  a simple text composer
	 */
    static TextComposer=class{
        static el;

        constructor(text, style){
            if(!this.constructor.el)
                document.body.appendChild(this.constructor.el=document.createElement('span'))
            this.text=text
			this.style=style
            this.tester=this.constructor.el
            this.composed=0
        }

        next({width:maxWidth}){
            if(this.composed==this.text.length)
                return null

            this.tester.style="margin:0;padding:0;border:0;position:absolute;left:-1000px"

            let text=this.tester.innerHTML=this.text.substr(this.composed)

            let {width,height}=this.tester.getBoundingClientRect()
            if(width<=maxWidth){
                return {width,height, end:this.composed+=text.length, children:text}
            }else{
				while(width>maxWidth && text.length){
					text=this.tester.innerHTML=text.slice(0,-1);
					({width, height}=this.tester.getBoundingClientRect())
				}
				if(text.length){
					return {width:maxWidth,height, end:this.composed+=text.length, children:text}
				}else{
					//@TODO
				}
			}
        }
    }
}
