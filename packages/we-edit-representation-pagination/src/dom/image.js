import React from "react"
import {dom} from "we-edit"

import ComposedImage from "../composed/image"
import {NoChild,editable} from "../composable"

import Shape from "./shape"
export default class Image extends editable(NoChild(dom.Image)){
	getShape(){
		const {width,height}=this.props
		return new Shape({width, height,...this.props.outline, margin:{},children:null},{})
	}

	createComposed2Parent(){
		const shape=this.getShape()
		const geometry=shape.geometry
		const {width,height}=geometry.contentBox
		const {src}=this.props
		const image=<ComposedImage {...{
			width,
			height,
			xlinkHref: src,
			preserveAspectRatio:"none",	
		}}/>
		return shape.transform(geometry.createComposedShape(image))
	}
	
	getFocusShape(){
		return React.cloneElement(this.getShape().getFocusShape(),{id:this.props.id})
	}
}
