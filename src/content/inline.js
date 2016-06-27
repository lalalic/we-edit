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
        let composer=new this.constructor.Composer(this)
        let text=null
        while(text=composer.nextAvailableSpace()){
            Object.assign(text,{onClick:e=>this.onClick(e,composer,text)})
			let content=(<text {...text}/>)
            composed.push(content)
            parent.append(content)
        }
        parent.finished()
    }

    onClick(event, composer, text){
       console.log(`clicked on text`)
    }

    static Composer=class{
        static el;

        constructor(content){
            if(!this.constructor.el)
                document.body.appendChild(this.constructor.el=document.createElement('span'))
            const {children:text}=content.props
            const {parent}=content.context
            this.text=text
            this.parent=parent
            this.tester=this.constructor.el
            this.composed=0
        }

        nextAvailableSpace(){
            if(this.composed==this.text.length)
                return null

            this.tester.style="margin:0;padding:0;border:0;position:absolute;left:-1000px"
            const {width:maxWidth}=this.parent.nextAvailableSpace()
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
