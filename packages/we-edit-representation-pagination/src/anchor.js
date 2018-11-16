import React,{PureComponent as Component} from "react"
import PropTypes from "prop-types"
import {Group, Frame as ComposedFrame} from "./composed"

import composable,{HasParentAndChild} from "./composable"
import {models} from "we-edit"
const {Anchor:Base}=models
const Super=composable(HasParentAndChild(Base),{locatable:true,recomposable:true})

class Anchor extends Super{
    static contextTypes={
        ...Super.contextTypes,
        currentPage: PropTypes.func,
        notifyRecompose4Anchor: PropTypes.func
    }
    createComposed2Parent(content){
        return React.cloneElement(super.createComposed2Parent(...arguments),{anchor:this})
    }

    appendTo(frame,content){
        const {width,height}=this.props
        const {x,y}=this.xy(frame)
        const composed=(()=>{
            const {margin:{left,right,top,bottom}}=this.props
            return (
                <ComposedFrame {...{
                    width:width+left+right,
                    height:height+top+bottom,
                    x,y,
                    wrap:this.props.wrap,
                    ["data-content"]:this.props.id,
                    ["data-type"]:this.getComposeType(),
                }}>
                    {React.cloneElement(content,{x:left,y:top})}
                </ComposedFrame>
            )
        })

        const rect={x,y,width,height}
        if(frame.page.isDirtyIn(rect)){
            frame.page.addAnchor(composed)
            //need recompose current page fully or partially
            this.context.notifyRecompose4Anchor(this)
            return false
        }else{
            frame.page.addAnchor(composed)
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
        const x=new (this.constructor.Positioning[this.props.x.base])(frame,this).x(this.props.x)
        const y=new (this.constructor.Positioning[this.props.y.base])(frame,this).y(this.props.y)
        return {x,y}
    }
}

class Positioning{
    constructor(frame,anchor){
        this.frame=frame
        this.anchor=anchor
        this.x0=0
        this.y0=0
    }

    x({align, offset}){
        if(align)
            return this[`x_${align}`]()
        else
            return this.x0+offset
    }

    y({align, offset}){
        if(align)
            return this[`y_${align}`]()
        else
            return this.y0+offset
    }
}

class Page extends Positioning{
    y_top(){
        return 0
    }

    y_bottom(){
        return this.frame.page.height-this.anchor.height
    }
}

class Column extends Positioning{
    constructor(){
        super(...arguments)
        const {margin:{left=0,top=0}, currentColumn:{props:{x,y}}}=this.frame.page
        this.x0=left+x
        this.y0=top+y
    }
}

class Paragraph extends Column{
    constructor(){
        super(...arguments)
        this.y0+=this.frame.currentY
    }
}

Anchor.Positioning={
    column:Column,
    paragraph:Paragraph,
    page: Page,
}

export default Anchor
