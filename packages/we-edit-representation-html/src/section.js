import React,{Fragment} from "react"
import {models} from "we-edit"
const {Section:Base}=models

export default class Section extends Base{
	render(){
		const {pgSz:{width, height},  pgMar:{top, bottom, left, right}}=this.props
		let style={
			paddingTop:top,
			paddingRight:right,
			paddingBottom:bottom,
			paddingLeft:left
		}
		return (
			<Fragment>{this.props.children}</Fragment>
		)
	}
}
