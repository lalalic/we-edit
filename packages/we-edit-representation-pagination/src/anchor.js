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
        const {x,y}=this.xy(frame)
        const {width,height}=this.props
        const rect={x,y,width,height}
        if(frame.isDirtyIn(rect)){
            //need recompose current page fully or partially
            this.context.notifyRecompose4Anchor(this)
            return false
        }else{
            const {margin:{left,right,top,bottom}}=this.props
            const {width, height}=content.props
            const outline={
                width:width+left+right,
                height:height+top+bottom,
                x,y,
                wrap:this.props.wrap,
            }
            outline.y=frame.currentY+outline.height
            frame.computed.composed.push(
                <ComposedFrame {...outline}>
                    {React.cloneElement(content,{x:left,y:top})}
                </ComposedFrame>
            )

        }
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
        return this.square(...arguments)
    }

    topAndBottom(){
        return this.square(...arguments)
    }

    throught(){
        return this.square(...arguments)
    }


    xy(frame){
        return {x:100,y:20}
        const x=new this.construcor.Positioning[this.props.x.base](frame).x(this.props.x)
        const y=new this.construcor.Positioning[this.props.y.base](frame).y(this.props.y)
        return {x,y}
    }

    static Positioning={
        page: class{
            constructor(frame){

            }
        },
        paragraph: class{

        },
        column: class{

        }
    }
}

class Positioning{
    constructor(frame){
        this.frame=frame
    }
}

class Column extends Positioning{
    x({align, offset}){

    }

    y({align, offset}){

    }
}
