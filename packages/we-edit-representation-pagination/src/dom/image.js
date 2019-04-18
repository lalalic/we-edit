import React, {Component} from "react"
import PropTypes from "prop-types"
import {dom} from "we-edit"

import {Image, Group} from "../composed"
import {NoChild} from "../composable"

import Shape from "./shape"
const {Image:Base}=dom

const Super=NoChild(Base)
export default class extends Super{
	getShape(){
		const {width,height}=this.props
		return new Shape({width, height,...this.props.outline, margin:{},children:null}, this.context)
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
		return shape.createComposed2Parent(image)
    }
}
