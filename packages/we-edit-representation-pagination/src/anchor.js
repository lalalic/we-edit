import React,{PureComponent as Component} from "react"
import PropTypes from "prop-types"
import {Group, Frame as ComposedFrame} from "./composed"
import SVGPath from "./tool/svg-path"

import composable,{HasParentAndChild} from "./composable"
import {models} from "we-edit"
const {Anchor:Base}=models
const Super=HasParentAndChild(Base)

export default class extends Super{
    createComposed2Parent(content){
        const {width,height}=this.props
        return <Group {...{width,height,anchor:this}}>{super.createComposed2Parent(...arguments)}</Group>
    }

    xy(line){
        return this.props.xy(line,this)
    }

	wrap(geometry){
		var {wrap}=this.props
        const {x,y,width,height}=this.bounds(geometry)
		if(wrap){
			let wrapper=new this.constructor.Wrap(wrap,`M${x} ${y} h${width} v${height} h${-width} z`)
			return line=>wrapper.intersects(line)
		}
	}

    wrapGeometry({x,y}){
        const dft={left:0,right:0,top:0,bottom:0}
        const {width,height,wrap}=this.props
        const distance=((a=dft,b=dft)=>{
            return "left,right,top,bottom"
                .split(",")
                .reduce((o,k)=>{
                    o[k]=Math.max(a[k]||0,b[k]||0)
                    return o
                },{})
        })(this.props.distance, wrap.distance);
        return {
            x:x-distance.left,
            y:y-distance.top,
            width:width+distance.left+distance.right,
            height:height+distance.top+distance.bottom,
        }
    }

    bounds(geometry){
        return geometry
    }

	static Wrap=class{
		constructor({mode:type, wrapText}, geometry){
			this.type=type[0].toLowerCase()+type.substring(1)
			this.wrapText=wrapText
			this.geometry=new SVGPath(geometry)
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
