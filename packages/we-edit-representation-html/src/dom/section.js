import React,{Fragment} from "react"
import {dom} from "we-edit"
const {Section:Base}=dom

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
