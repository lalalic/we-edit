import React,{PureComponent as Component} from "react"
import PropTypes from "prop-types"
import {Group, Frame as ComposedFrame} from "../composed"

import composable,{HasParentAndChild} from "../composable"
import {dom, ReactQuery} from "we-edit"
import Path from "../tool/path"
const Super=HasParentAndChild(dom.Anchor)


/**
* xy for Positioning
* wrap boundary must be provided by children content, and then pass to frame
*/
export default class extends Super{
    createComposed2Parent(content){
        var {width,height,geometry}=content.props
        const {margin:{left=0,right=0,top=0,bottom=0}={}, wrap:{mode}}=this.props
        this.width=width+=(left+right)
        this.height=height+=(top+bottom)

        return (
            <Group width={0} height={0}
                anchor={(frame,line)=>{
                    var {x,y}=this.xy(frame,line)
                    x=x-left, y=y-top
                    if(geometry && geometry.origin){
                        x-=geometry.origin.x
                        y-=geometry.origin.y
                    }

                    const wrap=(fn=>{
                        if(fn){
                            if(mode=="Square" || mode=="TopAndBottom"){
                                return line=>fn.call(this, line, {bounds:()=>({left:x,top:y,right:x+width,bottom:y+height})})
                            }
                            return line=>fn.call(this, line, geometry.clone().translate(x,y))
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

    xy(frame,line){
        const {x,y, xy}=this.props
        if(xy){
            return xy(this.props, frame, line)
        }
        const PositionX=Types[x.base]
        const PositionY=Types[y.base]
        if(!PositionX || !PositionY){
            console.error(`anchor[x.base="${x.base}",y.base="${y.base}"] is not supported`)
            return {x:0,y:0}
        }

        return {
            x:new PositionX(frame,this,line).x(x),
            y:new PositionY(frame,this,line).y(y)
        }
    }

    applyWrapText(x1,x2, x, X){
        const {wrap:{wrapText}}=this.props
        const get=type=>{
            switch(type){
            case "left":
                return {x,width:x2-x}
            case "right":
                return {x:x1,width:X-x1}
            case "largest":
                return get((x-x1)>=(x2-X) ? "left" : "right")
            default:
                return {x, width:X-x}
            }
        }

        return get(wrapText)
    }

    wrapSquare({x1,x2,y2:y,y1=y},geometry){
        const {wrap:{mode, wrapText},margin:{right:mr=0, left:ml=0}}=this.props
        const {left,top,right,bottom}=geometry.bounds()
        if(y>=top && y<=bottom){
            if(!(x2<=left || x1>=right)){
                if(y1!==bottom){
                    return Object.assign(this.applyWrapText(x1,x2,left-ml, right+mr),{y:bottom})
                }
            }
        }
    }

    wrapTight(line,geometry){
        const {margin:{left=0,right=0}}=this.props
        const {x1,x2, y2}=line
        const points=geometry.intersects({x1,x2,y2,y1:y2}).sort((a,b)=>a.x-b.x)
        if(points.length>2){
            points.splice(1,points.length-1-1)
        }
        if(points.length>0){
            return this.applyWrapText(x1,x2,points[0].x-left,points.pop().x+right)
        }
    }

    wrapThrough(line,geometry){
        return this.wrapTight(...arguments)
    }

    wrapClear({x1,x2,y2:y, y1=y},geometry){
        const {left,top,right,bottom}=geometry.bounds()
        if(y>=top && y<=bottom){
            if(y1!==bottom){
                return {x:x1,width:x2-x1,y:bottom,type:"clear"}
            }
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

    x({align, offset=0}){
        if(align)
            return this[`x_${align}`]()
        else
            return this.x0+offset
    }

    y({align, offset=0}){
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
    x({align,...val}){
        return new Types[align+`Margin`](this.frame,this.anchor).x(val)
    }

    y({align,...val}){
        return new Types[align+`Margin`](this.frame,this.anchor).y(val)
    }
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
    constructor(frame,anchor,line){
        super(...arguments)
        const {first,parents}=new ReactQuery(line).findFirstAndParents(`[data-content="${this.anchor.props.id}"]`)
        const dx=[...parents,first.get(0)].reduce((X,{props:{x=0}})=>X+x,0)
        this.x0+=dx
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

    x({align,offset}){
        if(!align && offset!=undefined){
            return this.x0-offset
        }
        return super.x(...arguments)
    }
}

//y only
class paragraph extends column{
    constructor(frame,anchor, line){
        super(...arguments)
        this.y0+=this.frame.paragraphY(new ReactQuery(line).findFirst('[data-type="paragraph"]').attr("data-content"))
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

    y({align,offset}){
        if(!align && offset!=undefined){
            return this.y0-offset
        }
        return this.y(...arguments)
    }
}

class line extends column{
    constructor(){
        super(...arguments)
        this.y0=this.frame.currentY
    }
}

const Types={
    page,margin,//both x and y
    column,character,leftMargin, rightMargin, //only x
    paragraph,line,topMargin, bottomMargin, //only y
}
