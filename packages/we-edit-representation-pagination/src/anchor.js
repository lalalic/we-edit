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
		var {wrap,geometry=`M${x} ${y} h${width} v${height} h${-width} z`}=this.props
		if(wrap){
			wrap=new this.constructor.Wrap(wrap,geometry)
		}
		
        return React.cloneElement(super.createComposed2Parent(...arguments),{anchor:this,wrap})
    }

    xy(line){
        return this.props.xy(line,this)
    }
	static Wrap=class{
		constructor(type, geometry){
			this.type=type
			this.geometry=new SVGPath(geometry)
		}

		intersects(line){
			debugger
			return this[type](...arguments)
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
