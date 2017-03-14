import React from "react"

import {HasChild} from "./composable"
import Base from "../header"

import Group from "./composed/group"

const Super=HasChild(Base)
export default class Header extends Super{
	nextAvailableSpace(){
		const {pgSz:{width}, pgMar:{right,left}}=this.context
		return {width:width-right-left,height:Number.MAX_VALUE}
	}

	appendComposed(line){
		this.computed.composed.push(line)
	}

	onAllChildrenComposed(){
		super.onAllChildrenComposed()
	}

	createComposed2Parent(){
		const {composed}=this.computed
		let size=composed.reduce(
			(p, {props:{width,height}})=>({width:Math.max(p.width, width),height:p.height+height})
			,{width:0,height:0}
		)
		return (<Group {...size}>{composed}</Group>)
	}
}
