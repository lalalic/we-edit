import React, {Component, PropTypes} from "react"
import Any from "./any"
import Group from "../compose/group"

export default class Paragraph extends Any{
    compose(){
        const {composed}=this.state
        const {parent}=this.context
        const {width,height}=parent.next()
        composed.push({
            width,
            children:[]
        })
    }

    next(required={}){
        const {width:minW=0,height:minH=0}=required
        const {composed}=this.state
        let currentLine=composed[composed.length-1]
        let {width}=currentLine
        let availableWidth=currentLine.children.reduce((prev,a)=>prev-a.width,width)
        if(availableWidth<=0){
            const {parent}=this.context
            let {width, height}=parent.next(...arguments)
            //@TODO: what if paragraph margin, padding, border
            availableHeight=height
            availableWidth=width
            composed.push({})
        }
        return {width:availableWidth}
    }

    append(text){
        const {composed}=this.state
        let currentLine=composed[composed.length-1]
        let {width}=currentLine
        let availableWidth=currentLine.children.reduce((prev,a)=>prev-a.width,width)
        let {width:contentWidth, height:contentHeight}=text.props
        let line=null
        if(availableWidth>=contentWidth){
            line=(<Group x={width-availableWidth} y={0} width={contentWidth} height={contentHeight}>{text}</Group>)
            currentLine.children.push(line)
            if(currentLine.height!=contentHeight && currentLine.children.length>1){
                //@TODO: what if height not equal
                let newHeight=Math.max(currentLine.height, contentHeight)

            }
        }
        currentLine.height=contentHeight
        currentLine.y=contentHeight
        const {parent}=this.context
        parent.append(currentLine)
    }
}
