import React,{Fragment} from "react"
import {dom} from "we-edit"

export default class extends dom.Document{
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
