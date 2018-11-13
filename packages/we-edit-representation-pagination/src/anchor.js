import React,{PureComponent as Component} from "react"
import PropTypes from "prop-types"
import {Group, Frame as ComposedFrame} from "./composed"

import {HasParentAndChild} from "./composable"
import {models} from "we-edit"
const {Anchor:Base}=models
const Super=HasParentAndChild(Base)

export default class extends Super{
    createComposed2Parent(content){
        return React.cloneElement(super.createComposed2Parent(...arguments),{anchor:this})
    }

    appendTo(frame,content){
        let mode=this.props.wrap.mode
        return this[mode[0].toLowerCase()+mode.substring(1)](...arguments)
    }

    square(frame,content){
        const {margin:{left,right,top,bottom}}=this.props
        const {x, width, height}=content.props
        const outline={
            width:width+left+right,
            height:height+top+bottom,
            x:x-left
        }
        outline.y=frame.currentY+outline.height
        frame.computed.composed.push(
            <ComposedFrame {...outline}>
                {React.cloneElement(content,{x:left,y:top})}
            </ComposedFrame>
        )
        return outline
    }

    tight(frame,content){
        const {margin:{left,right,top,bottom}}=this.props
        const {x, width, height}=content.props

        const outline={
            width:width+left+right,
            height,
            x:x-left
        }
        outline.y=frame.currentY+outline.height

        frame.computed.composed.push(
            <ComposedFrame {...outline}>
                {React.cloneElement(content,{x:left,y:0})}
            </ComposedFrame>
        )
        return outline
    }

    topAndBottom(){
        return this.tight(...arguments)
    }

    throught(){
        return this.tight(...arguments)
    }


    x(frame){
        const {base, offset=0, align}=this.props.x
        switch(base){
        case "page":{
            if(!align){
                return frame.relative(base, offset)
            }else{
                return frame.align(base,align)
            }
        }
        break
        }
    }

    y(){
        const {base, offset, align}=this.props.x
    }
}
