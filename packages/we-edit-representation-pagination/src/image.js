import React, {Component} from "react"
import PropTypes from "prop-types"

import {Image as ComposedImage,Frame, Group} from "./composed"

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
		const {x,y, ...frameProps}=Frame.rect({width,height,rotate})
		const image=(
			<ComposedImage {...{
				width,
				height,
				xlinkHref: src,
				preserveAspectRatio:"none"
			}}/>
		)
		return (
			<Group {...frameProps}>
				<Group {...{x,y,rotate}}>
					{image}
				</Group>
			</Group>
		)
    }
}
