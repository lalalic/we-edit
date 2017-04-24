import React, {PropTypes} from "react"

import {HasParentAndChild} from "./composable"
import Base from "../frame"

import ComposedFrame from "composed/frame"

const Super=HasParentAndChild(Base)

export default class Frame extends Super{
	nextAvailableSpace(required){
		let {width,height}=this.props
		return {width,height}
	}
	
	appendComposed(content){
		return this.computed.composed.push(content)
	}
	
	onAllChildrenComposed(){
		let composed=this.createComposed2Parent({children:[...this.computed.composed]})
		this.context.parent.appendComposed(composed)
		
		super.onAllChildrenComposed()
	}
	
	createComposed2Parent(props) {
		const {width,height,wrap}=this.props
		return <ComposedFrame {...props} {...{width,height,wrap}}/>
    }
}