import React,{Fragment,PureComponent} from "react"

import {connect,ACTION,ReactQuery} from "we-edit"
import editable from "./editable"
import {Cacheable} from "../../composable"
import Base from "../table"


export default Cacheable(class extends editable(Base){
	constructor(){
		super(...arguments)
		this.computed.spaces=[]
	}

	nextAvailableSpace(){
		const space=super.nextAvailableSpace(...arguments)
		const frame=space.frame
		if(this.computed.spaces.indexOf(frame)==-1){
			this.computed.spaces.push(frame)
		}
		return space
	}

	clearComposed(){
		this.computed.spaces=[]
		super.clearComposed(...arguments)
	}

	appendLastComposed(){
		if(this.computed.spaces.length>1){
			return false
		}
		const space=super.nextAvailableSpace()
		const height=this.computed.lastComposed.reduce((h,{props:{height}})=>h+=height,0)
		if(space.height<height){
			return false
		}
		try{
			this.computed.lastComposed.forEach(a=>this.context.parent.appendComposed(a))
			this.computed.spaces=[space.frame]
		}catch(e){
			console.warn(e)
			return false
		}
	}
})
