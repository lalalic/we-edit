import React from "react"

import Any from "./any"

export default class header extends Any{
	static displayName="header"
	nextAvailableSpace(){
		return {width:this.props.availableWidth,height:Number.MAX_VALUE}
	}
	
	appendComposed(line){
		this.composed.append(line)
	}
	
	onAllChildrenComposed(){
		super.onAllChildrenComposed()
	}
}
