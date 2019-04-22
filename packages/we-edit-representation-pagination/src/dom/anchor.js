import React,{PureComponent as Component} from "react"
import PropTypes from "prop-types"
import {Group, Frame as ComposedFrame} from "../composed"

import composable,{HasParentAndChild} from "../composable"
import {dom, ReactQuery} from "we-edit"
const {Anchor:Base}=dom
const Super=HasParentAndChild(Base)

/**
* xy for Positioning
* wrap boundary must be provided by children content, and then pass to frame
*/
export default class extends Super{
    createComposed2Parent(content){
        const {width,height}=content.props
        return (
            <Group width={0} height={0}
                anchor={frame=>{
                    const {x,y}=this.xy(frame)
                    const {geometry,wrap}=this.wrapGeometry({...this.xy(frame),width,height})
                    return (
                        <Group {...{...geometry,wrap,geometry,"data-content":this.props.id,"data-type":this.getComposeType()}}>
                            {content}
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

    wrapGeometry({x,y,width,height}){
        const {wrap,margin:{left=0,right=0,top=0,bottom=0}={}}=this.props
        const geometry={
            x:x-left,
            y:y-top,
            width:width+left+right,
            height:height+top+bottom,
        }

        const wrapper=wrap ? new this.constructor.Wrap(wrap,geometry) : undefined

        return {
            geometry,
            wrap: wrapper ? line=>wrapper.intersects(line) : undefined
        }
    }

	static Wrap=class{
		constructor({mode:type, wrapText}, geometry){
			this.type=type[0].toLowerCase()+type.substring(1)
			this.wrapText=wrapText
            this.geometry=new Rect(geometry)//["tight","throught"].includes(this.type) ? new SVGPath(geometry) : new Rect(geometry)
		}

		intersects(line){
			return this[this.type](...arguments)
		}

	    square({x2,y2,x1=0,y1=y2}){
			const points=this.geometry.intersects({x1,x2,y1,y2})
			if(points.length>0){
				let {x}=points[0]
				let {x:x1}=points.pop()
				return {x:Math.min(x,x1), width:Math.abs(x1-x)}
			}
	    }

	    tight(){
	        return this.square(...arguments)
	    }

	    throught(){
	        return this.square(...arguments)
	    }

		topAndBottom(){
	        return this.square(...arguments)
	    }
	}
}

class Rect{
    constructor(geometry){
        const {x,y,width,height}=this.bound(geometry)
        Object.assign(this,{x,y,width,height})
    }

    bound(geometry){
        return geometry
    }

    intersects({x1,x2,y1,y2}){
        console.assert(y1==y2)
        if(y1>=this.y && y1<=this.y+this.height){
            if(x2<=this.x || x1>=this.x+this.width){

            }else{
                return [{x:Math.max(this.x, x1), y1}, {x:Math.min(this.x+this.width, x2),y1}]
            }
        }
        return []
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
