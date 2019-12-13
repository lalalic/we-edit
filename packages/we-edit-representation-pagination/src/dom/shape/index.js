import React from "react"
import {dom} from "we-edit"
import memoize from "memoize-one"

import {Group} from "../../composed"
import {HasParentAndChild,editable} from "../../composable"
import Entity from "../../composed/responsible-canvas/selection/entity"
import Path from "../../tool/path"


import {custom, rect, ellipse, circle} from "./shapes"

export default class Shape extends editable(HasParentAndChild(dom.Shape)){
	get geometry(){
		return memoize(()=>{
			const {geometry="rect"}=this.props
			const Geometry=this.constructor[geometry]||this.constructor.custom
			return new Geometry(this.props, this.context)
		})()
	}

	render(){
		try{
			const {Frame}=this.context.ModelTypes
			const {width}=this.geometry.availableSpace()
			const {id,children}=this.props
			return (
				<Frame id={`shape_frame_${id}`} for={id} width={width}>
					{children}
				</Frame>
			)
		}finally{
			this.onAllChildrenComposed()
		}
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

	getFocusShape(){
		const x=this.geometry.strokeWidth/2, y=x
		const {width:right, height:bottom,rotate=0,id}=this.props
		const left=0, top=0
		const path=`M${left} ${top} h${right-left} v${bottom-top} h${left-right} Z`
		return (<Entity
			id={id}
			x={x}
			y={y}
			path={path}
			resizeSpots={[
					{x:left,y:top,resize:"nwse"},
					{x:(left+right)/2,y:top,resize:"ns",},
					{x:right,y:top,resize:"nesw"},
					{x:right,y:(top+bottom)/2,resize:"ew"},
					{x:right,y:bottom,resize:"-nwse"},
					{x:(left+right)/2,y:bottom,resize:"-ns"},
					{x:left,y:bottom,resize:"-nesw"},
					{x:left,y:(top+bottom)/2,resize:"-ew"},
			]}
			rotate={{
				r:12,
				x:(left+right)/2,
				y:top-20,
				degree: parseInt(rotate),
			}}
			transform={el=>this.transform(el,new Path(path),1)}
		/>)
	}

	static custom=custom

	static rect=rect

	static ellipse=ellipse

	static circle=circle
}
