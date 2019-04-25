import React,{PureComponent as Component} from "react"
import PropTypes from "prop-types"
import {Group, Frame as ComposedFrame} from "../composed"

import composable,{HasParentAndChild} from "../composable"
import {dom, ReactQuery} from "we-edit"
import Path from "../tool/path"
const {Anchor:Base}=dom
const Super=HasParentAndChild(Base)


/**
* xy for Positioning
* wrap boundary must be provided by children content, and then pass to frame
*/
export default class extends Super{
    createComposed2Parent(content){
        var {width,height}=content.props
        return (
            <Group width={0} height={0}
                anchor={frame=>{
                    var {x,y}=this.xy(frame)
                    const {margin:{left=0,right=0,top=0,bottom=0}={}, wrap:{mode}}=this.props
                    x=x-left, y=y-top, width+=(left+right), height+=(top+bottom)

                    const wrap=(fn=>{
                        if(fn){
                            if(mode=="Square" || mode=="TopAndBottom"){
                                return line=>fn.call(this, line, {bounds:()=>({left:x,top:y,right:x+width,bottom:y+height})})
                            }
                            return line=>fn.call(this, line, Object.create(geometry).translate(x,y))
                        }
                    })(this[`wrap${mode}`]);

                    return (
                        <Group {...{
                            x,y,
                            wrap,
                            geometry:{x,y,width,height},
                            "data-content":this.props.id,"data-type":this.getComposeType()}}>
                            <Group x={left} y={top}>
                                {content}
                            </Group>
                        </Group>
                    )
                }
            }
            />
        )
    }

    xy(frame){
        const {x,y}=this.props
        return {
            x:new (Types[x.base])(frame,this).x(x),
            y:new (Types[y.base])(frame,this).y(y)
        }
    }

    applyWrapText(x1,x2, x, X){
        const {wrap:{wrapText}}=this.props
        const get=type=>{
            switch(wrapText){
            case "left":
                return {x,width:x2-x}
            case "right":
                return {x:X,width:x2-X}
            case "largest":
                return get((x-x1)>=(x2-X) ? "left" : "right")
            default:
                return {x, width:X-x}
            }
        }

        return get(wrapText)
    }

    wrapSquare({x1,x2,y2:y},geometry){
        const {wrap:{mode, wrapText},margin:{}}=this.props
        const {left,top,right,bottom}=geometry.bounds()
        if(y>=top && y<=bottom){
            if(!(x2<=left || x1>=right)){
                return this.applyWrapText(x1,x2,Math.max(x1,left),Math.min(x2,right))
            }
        }
    }

    wrapTight({x1,x2},geometry){
        const points=geometry.intersects(line)
        if(points.length>2){
            points.splice(1,points.length-1-1)
        }
        if(points.length>0){
            return this.applyWrapText(x1,x2,points[0].x,points.pop().x)
        }
    }

    wrapThrough(line,geometry){
        return this.wrapTight(...arguments)
    }

    wrapClear({x1,x2,y2:y},geometry){
        const {left,top,right,bottom}=geometry.bounds()
        if(y>=top && y<=bottom){
            return {x:x1,width:x2-x1}
        }
    }

    wrapTopAndBottom(){
        return this.wrapClear(...arguments)
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

class page extends Positioning{
    y_top(){
        return 0
    }

    y_bottom(){
        return this.frame.props.height-this.anchor.height
    }
}

class margin extends page{

}

class insideMargin extends page{

}

class outsideMargin extends page{

}

//x only
class column extends page{
    constructor(){
        super(...arguments)
        const {x=0,y=0}=this.frame.currentColumn
        this.x0=x
        this.y0=y
    }
}


class character extends column{
    constructor(){
        super(...arguments)
        this.y0+=this.frame.currentY
    }
}

class leftMargin extends page{
    constructor(){
        super(...arguments)
        const {margin:{left=0}}=this.frame.props
        this.x0=left
    }
}

class rightMargin extends page{
    constructor(){
        super(...arguments)
        const {margin:{right=0},width}=this.frame.props
        this.x0=width-right-this.anchor.width
    }
}

//y only
class paragraph extends column{
    constructor(){
        super(...arguments)
        this.y0+=this.frame.paragraphY(new ReactQuery(this.frame.lastLine).findFirst('[data-type="paragraph"]').attr("data-content"))
    }
}

class topMargin extends page{
    constructor(){
        super(...arguments)
        const {margin:{top=0}}=this.frame.props
        this.y0=top
    }
}

class bottomMargin extends page{
    constructor(){
        super(...arguments)
        const {margin:{bottom=0},height}=this.frame.props
        this.y0=height-bottom-this.anchor.height
    }
}

class line extends column{
    constructor(){
        super(...arguments)
        this.y0+=this.frame.currentY
    }
}

const Types={
    page,column,paragraph,line,character,
    margin, leftMargin, rightMargin, topMargin, bottomMargin,
    outsideMargin, insideMargin
}
