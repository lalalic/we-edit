import React, {Component, PropTypes} from "react"
import Any from "./any"

export default class Inline extends Any{
    render(){
        return <g/>
    }

    compose(){
        const {composed, finished}=this.state
        const {parent}=this.context
        let composer=new this.constructor.Composer(this)
        let line=null
        while(line=composer.next()){
            Object.assign(line,{onClick:e=>this.onClick(e,composer,line)})
            let content=(<text {...line}/>)
            composed.push(content)
            parent.append(content)
        }
        finished.count=1
        parent.finished(this)
    }

    onClick(event, composer, line){
        consoler.log(`clicked on "${line.children}"`)
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
            this.last=0
        }

        next(){
            if(this.last==this.text.length)
                return null

            this.tester.style="margin:0;padding:0;border:0;position:absolute;left:-1000px"
            const {width:maxWidth}=this.parent.next()
            this.tester.innerHTML=this.text
            const {width,height}=this.tester.getBoundingClientRect()
            if(width<=maxWidth){
                this.last=this.text.length
                return {width,height, start:0, children:this.text, content:this.content}
            }
        }
    }
}
