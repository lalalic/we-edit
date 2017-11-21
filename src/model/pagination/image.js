import React, {Component} from "react"
import PropTypes from "prop-types"

import {NoChild} from "./composable"
import Base from "../image"

const Super=NoChild(Base)
export default class Image extends Super{
	static defaultProps={
		...Super.defaultProps,
		width: 1,
		height:1
	}
    createComposed2Parent(props){
        const {src, width,height}=this.props
        let availableSpace=this.context.parent.nextAvailableSpace({width,height})
        return <image {...{
                width,
                height,
                xlinkHref: src,
                y:-height,
				preserveAspectRatio:"none"
            }} {...props}/>
    }
}
