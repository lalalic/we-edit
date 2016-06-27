import React, {Component, PropTypes} from "react"
import Any from "./any"
import Group from "../compose/group"

export default class Inline extends Any{
    render(){
        return <g/>
    }

    compose(){
        const {composed}=this.state
        const {parent}=this.context
        let composer=new Inline.TextComposer(this)
        let text=null
        while(text=composer.next(parent.nextAvailableSpace())){
			const info=text
			text.onClick=e=>this.onClick(e,info)
			let content=(<text {...text}/>)
            composed.push(content)
            parent.appendComposed(content)
        }
        parent.finished()
    }

    onClick(event, text){
		const {offsetX}=event.nativeEvent
		let composer=new Inline.TextComposer(React.cloneElement(this,{children:text.children}))
		let loc=composer.next({width:offsetX})||{end:0}
		let index=text.end-text.children.length+loc.end
		const {parent}=this.context
		parent.setState({id:0,index,append:"ABC"})
		
		console.log(`clicked on text`)
    }

	/**
	 *  a simple text composer
	 */
    static TextComposer=class{
        static el;

        constructor(content){
            if(!this.constructor.el)
                document.body.appendChild(this.constructor.el=document.createElement('span'))
            const {children:text}=content.props
            this.text=text
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
