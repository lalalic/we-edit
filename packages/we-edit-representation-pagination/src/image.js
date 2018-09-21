import React, {Component} from "react"
import PropTypes from "prop-types"

import {Image as ComposedImage} from "./composed"

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
        const {src, size:{width,height}}=this.props
        let availableSpace=this.context.parent.nextAvailableSpace({width,height})
        return <ComposedImage {...{
                width,
                height,
                xlinkHref: src,
                y:-height,
				preserveAspectRatio:"none"
            }} {...props}/>
    }
}
