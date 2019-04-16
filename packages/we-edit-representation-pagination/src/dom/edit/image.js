import React from "react"
import editable from "./editable"
import Base from "../image"
import Shape from "./shape"

export default class extends editable(Base){
	splittable=false
	getOutline(){
		const {outline,width,height,id}=this.props
		return new Shape({width,height,...outline,id, margin:{},children:null}, this.context)
	}

	getFocusShape(){
		return this.getOutline().getFocusShape()
	}
}
