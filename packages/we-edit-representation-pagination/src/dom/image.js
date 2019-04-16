import React, {Component} from "react"
import PropTypes from "prop-types"
import {dom} from "we-edit"

import {Image, Group} from "../composed"
import {NoChild} from "../composable"

import Shape from "./shape"
const {Image:Base}=dom

const Super=NoChild(Base)
export default class extends Super{
	getOutline(){
		const {outline,width,height}=this.props
		return new Shape({width,height,...outline, margin:{},children:null}, this.context)
	}

	createComposed2Parent(){
		const {src, width,height, outline}=this.props
		const image=<Image {...{
			width,
			height,
			xlinkHref: src,
			preserveAspectRatio:"none",
		}}/>
		return this.getOutline().createComposed2Parent(image)
    }
}
