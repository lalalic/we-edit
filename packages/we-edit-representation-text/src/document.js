import React,{Fragment} from "react"
import {models} from "we-edit"

export default class extends models.Document{
	render(){
		const {canvas}=this.props
		const content=<Fragment>{this.props.children}</Fragment>
		if(canvas){
			return React.cloneElement(canvas,{content})
		}else{
			return content
		}
	}
}