import React, {Component} from "react"
import PropTypes from "prop-types"

import {Image, Group} from "./composed"

import {NoChild} from "./composable"
import {models} from "we-edit"
const {Image:Base}=models

const Super=NoChild(Base)
export default class extends Super{
	static defaultProps={
		...Super.defaultProps,
		size:{
			width: 1,
			height:1
		},
	}
    createComposed2Parent(){
        const {src, size:{width,height}}=this.props
		return this.transform(<Image {...{
			width,
			height,
			xlinkHref: src,
			preserveAspectRatio:"none"
		}}/>)
    }

	transform(element){
		const {rotate,scale}=this.props
		if(rotate){
			element=this.rotate(element)
		}

		if(scale){

		}

		return element
	}

	rotate(element){
		const {rotate,width,height}=this.props
		const radians=rotate*Math.PI/180
		return (
			<Group {...{
				width:width * Math.abs(Math.cos(radians)) + height * Math.abs(Math.sin(radians)),
				height:height * Math.abs(Math.cos(radians)) + width * Math.abs(Math.sin(radians)),
			}}>
				<Group {...{x:height*Math.abs(Math.sin(radians)),rotate}}>
					{element}
				</Group>
			</Group>
		)
	}
}
