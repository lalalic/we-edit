import React from "react"
import {dom} from "we-edit"

import {Image} from "../composed"
import {NoChild,editable} from "../composable"

import Shape from "./shape"
export default class __$1 extends editable(NoChild(dom.Image)){
	getShape(){
		const {width,height}=this.props
		return new Shape({width, height,...this.props.outline, margin:{},children:null},{})
	}

	createComposed2Parent(){
		const shape=this.getShape()
		const {width,height}=shape.geometry.contentBox
		const {src}=this.props
		const image=<Image {...{
			width,
			height,
			xlinkHref: src,
			preserveAspectRatio:"none",	
		}}/>
		return shape.transform(shape.geometry.createComposedShape(image))
	}
	
	getFocusShape(){
		return React.cloneElement(this.getShape().getFocusShape(),{id:this.props.id})
	}
}
