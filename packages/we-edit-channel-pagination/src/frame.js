import React from "react"
import PropTypes from "prop-types"


import {HasParentAndChild} from "./composable"
import Base from "../frame"

import ComposedFrame from "./composed/frame"
import Group from "./composed/group"

const Super=HasParentAndChild(Base)

export default class Frame extends Super{
	shouldContinueCompose(){
		return true
	}

	nextAvailableSpace(required){
		let {width,height}=this.props
		return {width,height}
	}

	appendComposed(content){
		return this.computed.composed.push(content)
	}

	onAllChildrenComposed(){
		let composed=this.createComposed2Parent()
		this.context.parent.appendComposed(composed)

		super.onAllChildrenComposed()
	}

	createComposed2Parent() {
		let {width,height,margin,wrap}=this.props
		width+=(margin.left+margin.right)
		height+=(margin.top+margin.bottom)
		this.context.parent.nextAvailableSpace({width,height})
		return (
			<ComposedFrame {...{width,height,wrap}}>
				<Group x={margin.left} y={margin.top} children={[...this.computed.composed]}/>
			</ComposedFrame>
		)
    }
}
