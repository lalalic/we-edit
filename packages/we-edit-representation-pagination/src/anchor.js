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
        return <Group anchor={this}>{super.createComposed2Parent(...arguments)}</Group>
    }

    xy(line){
        return this.props.xy(line,this)
    }
	
	wrap({x,y}){
		var {wrap,margin:distance,width,height,geometry=`M${x} ${y} h${width} v${height} h${-width} z`}=this.props
		if(wrap){
			let wrapper=new this.constructor.Wrap(wrap,geometry,distance)
			return line=>wrapper.intersects(line)
		}
	}
	
	static Wrap=class{
		constructor({mode:type, wrapText}, geometry,distance){
			this.type=type[0].toLowerCase()+type.substring(1)
			this.wrapText=wrapText
			this.distance=distance
			this.geometry=new SVGPath(geometry)
		}

		intersects(line){
			return this[this.type](...arguments)
		}

	    square({x2,y2,x1=0,y1=y2}){
			const points=this.geometry.intersects({x1,x2,y1,y2})
			if(points.length>0){
				const {left=0,right=0}=this.distance
				let {x}=points[0]
				let {x:x1}=points.pop()
				return {x:Math.max(0,Math.min(x,x1)-left), width:Math.abs(x1-x)+right}
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
