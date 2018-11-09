import React from "react"
import PropTypes from "prop-types"


import {HasParentAndChild} from "./composable"
import {models} from "we-edit"
const {Frame:Base}=models

import {Frame as ComposedFrame, Group} from "./composed"

const Super=HasParentAndChild(Base)

export default class Frame extends Super{
	nextAvailableSpace(required={}){
		const {width:maxWidth,height:maxHeight,blocks=[]}=this.props
		const {width:minRequiredW=0,height:minRequiredH=0}=required
		return {width:maxWidth,height:this.availableHeight}
	}

	appendComposed(content){
		this.computed.composed.push(content)
	}

	onAllChildrenComposed(){
		let composed=this.createComposed2Parent()
		this.context.parent.appendComposed(composed)

		super.onAllChildrenComposed()
	}

	createComposed2Parent() {
		let {width,height,margin,wrap, x,y,z}=this.props
		width+=(margin.left+margin.right)
		height+=(margin.top+margin.bottom)
		return (
			<ComposedFrame {...{width,height,wrap,x,y,z}}>
				<Group x={margin.left} y={margin.top}>
					{this.computed.composed.reduce((state,a,i)=>{
						if(a.props.y==undefined){
							state.positioned.push(React.cloneElement(a,{y:state.y,key:i}))
							state.y+=a.props.height
						}else{
							state.positioned.push(a)
						}
						return state
					},{y:0,positioned:[]}).positioned}
				</Group>
			</ComposedFrame>
		)
    }
	
	get availableHeight(){
		const {props:{height},computed:{composed:children}}=this
		return children.reduce((h, a)=>h-(a.props.y==undefined ? a.props.height : 0),height)
	}
}
