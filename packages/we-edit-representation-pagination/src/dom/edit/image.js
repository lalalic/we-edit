import React from "react"
import {editable} from "../../composable"
import Base from "../image"
import Shape from "./shape"

export default class __$1 extends editable(Base){
	constructor(){
		super(...arguments)
		this.splittable=false
	}
	
	getOutline(){
		const {outline,width,height}=this.props
		return new Shape({width,height,...outline, margin:{},children:null}, this.context)
	}

	getFocusShape(){
		return React.cloneElement(this.getOutline().getFocusShape(),{id:this.props.id})
	}
}
