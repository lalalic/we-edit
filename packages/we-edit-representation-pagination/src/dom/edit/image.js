import React from "react"
import editable from "./editable"
import Base from "../image"
import Shape from "./shape"

export default class extends editable(Base){
	getOutline(){
		const {outline,width,height}=this.props
		return new Shape({width,height,...outline, margin:{},children:null}, this.context)
	}

	getFocusShape(){
		return React.cloneElement(this.getOutline().getFocusShape(),{id:this.props.id})
	}
}
