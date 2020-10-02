import React from "react"
import PropTypes from "prop-types"
import {dom} from "we-edit"

import ComposedImage from "../composed/image"
import {NoChild,editable} from "../composable"

import Shape from "./shape"
const Super=editable(NoChild(dom.Image))
export default class Image extends Super{
	static contextTypes={
		...Super.contextTypes,
		editable: PropTypes.any,
	}
	
	focusable=true

	getShape(){
		const {width,height,id,}=this.props
		return new Shape({width, height,id,...this.props.outline, margin:{},children:null},{...this.context,mount:false,unmount:false})
	}

	createComposed2Parent(){
		const geometry=this.getShape().geometry
		const {width,height}=geometry.contentBox
		const {src}=this.props
		const image=<ComposedImage {...{
			width,
			height,
			xlinkHref: src,
			preserveAspectRatio:"none",	
		}}/>
		return geometry.createComposedShape(image, {focusableContent:false, composedUUID:this.computed.composedUUID})
	}
}
