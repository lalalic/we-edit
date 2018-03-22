import React from "react"
import PropTypes from "prop-types"


import {HasParentAndChild} from "./composable"
import {Cell as Base} from "we-edit/model"
const Super=HasParentAndChild(Base)

export default class Cell extends Super{
	nextAvailableSpace(required){
		let {width,height}=super.nextAvailableSpace(...arguments)

		let {margin}=this.props
		width=width
			-margin.right
			-margin.left

		height=height
			-margin.top
			-margin.bottom

		return {width,height}
	}
}
