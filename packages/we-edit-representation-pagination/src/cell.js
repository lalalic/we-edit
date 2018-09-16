import React from "react"
import PropTypes from "prop-types"


import {HasParentAndChild} from "./composable"
import {models} from "we-edit"
const {Cell:Base}=models
const Super=HasParentAndChild(Base)

export default class Cell extends Super{
	static contextTypes={
		...Super.contextTypes,
		composed1Cell: PropTypes.func
	}
	
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

	onAllChildrenComposed(){
		super.onAllChildrenComposed()
		this.context.composed1Cell(this)
	}
}
