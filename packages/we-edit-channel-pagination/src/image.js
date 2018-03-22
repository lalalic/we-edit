import React, {Component} from "react"
import PropTypes from "prop-types"

import {NoChild} from "./composable"
import Base from "we-edit/model/image"

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
        return <image {...{
                width,
                height,
                xlinkHref: src,
                y:-height,
				preserveAspectRatio:"none"
            }} {...props}/>
    }
}
