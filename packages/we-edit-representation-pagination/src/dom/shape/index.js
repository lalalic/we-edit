import React from "react"
import {dom} from "we-edit"
import memoize from "memoize-one"

import {Group} from "../../composed"
import {HasParentAndChild} from "../../composable"

import {custom, rect, ellipse, circle} from "./shapes"

export default class Shape extends HasParentAndChild(dom.Shape){
	get geometry(){
		return memoize(()=>{
			const {geometry="rect"}=this.props
			const Geometry=this.constructor[geometry]||this.constructor.custom
			return new Geometry(this.props, this.context)
		})()
	}

	render(){
		const {Frame}=this.context.ModelTypes
		const {width}=this.geometry.availableSpace()
		const {id,children}=this.props
		return (
			<Frame id={`layout${id}`} width={width}>
				{children}
			</Frame>
		)
	}

	createComposed2Parent(content){
		return this.transform(this.geometry.createComposedShape(content))
	}

	transform(shape, path=shape.props.geometry, strokeWidth=this.geometry.strokeWidth){
		var {rotate, scale}=this.props
		const translate={}
		if(rotate){
			const {x,y}=path.center()
			const a=path.bounds()

			path.rotate(rotate, x, y)
			rotate=`${rotate} ${x} ${y}`

			const b=path.bounds()
			translate.x=parseInt(a.left-b.left)
			translate.y=parseInt(a.top-b.top)
			path.translate(translate.x, translate.y)
			path.origin={x:translate.x,y:translate.y}
		}

		if(scale){
			path.scale(scale)
		}

		path.strokeWidth=strokeWidth
		const {width,height}=path.size(strokeWidth)
		return (
			<Group {...{width,height, geometry:path}}>
				{/*<path d={`M0 0L${width}  0 ${width} ${height} 0 ${height}Z`}
					stroke="red" strokeWidth="2" fill="none"/>*/}
				<Group {...{scale, rotate, ...translate}}>
					{shape}
				</Group>
			</Group>
		)
	}

	static custom=custom

	static rect=rect

	static ellipse=ellipse

	static circle=circle
}
