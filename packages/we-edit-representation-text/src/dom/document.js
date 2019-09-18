import React,{Fragment} from "react"
import {dom} from "we-edit"

export default class __$1 extends dom.Document{
	render(){
		const {canvas}=this.props
		return React.cloneElement(canvas,{content:<Fragment>{this.props.children}</Fragment>})
	}
}
