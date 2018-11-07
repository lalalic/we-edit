import React from "react"
import PropTypes from "prop-types"


import {HasParentAndChild} from "./composable"
import {models} from "we-edit"
const {Frame:Base}=models

import {Frame: ComposedFrame} from "./composed"

const Super=HasParentAndChild(Base)

export default class Frame extends Super{
	nextAvailableSpace(required={}){
		const {width:maxWidth,height:maxHeight,blocks=[]}=this.props
		const {width:minRequiredW=0,height:minRequiredH=0}=required
		const availableHeight=this.computed.composed.reduce((prev, a)=>prev-a.props.height,maxHeight)
		return {width:maxWidth,height:availableHeight}
	}

	appendComposed(line){
		this.computed.composed.push(React.cloneElement(line,{key:this.computed.composed.length}))
	}

	onAllChildrenComposed(){
		let composed=this.createComposed2Parent()
		this.context.parent.appendComposed(composed)

		super.onAllChildrenComposed()
	}

	createComposed2Parent() {
		let {width,height,margin,x,y,z}=this.props
		width+=(margin.left+margin.right)
		height+=(margin.top+margin.bottom)
		return (
			<ComposedFrame {...{width,height,x,y,z}}>
				<Group x={margin.left} y={margin.top} children={[...this.computed.composed]}/>
			</ComposedFrame>
		)
    }
}
