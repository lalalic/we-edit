import React, {Component} from "react"
import PropTypes from "prop-types"

import {Image as ComposedImage,Frame} from "./composed"

import {NoChild} from "./composable"
import {models} from "we-edit"
const {Image:Base}=models

const Super=NoChild(Base)
export default class Image extends Super{
	static defaultProps={
		...Super.defaultProps,
		size:{
			width: 1,
			height:1
		},
	}
    createComposed2Parent(props){
        const {src, size:{width,height},rotate}=this.props
		const frameProps=Frame.rect({width,height,rotate})
		
        frameProps.y=-frameProps.height
		return (
			<Frame {...frameProps}>
				<ComposedImage {...{
					width,
					height,
					xlinkHref: src,
					preserveAspectRatio:"none"
				}} {...props}/>
			</Frame>
		)
    }
}
