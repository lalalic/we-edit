import React from "react"
import {Section as Base} from "we-edit/model"

export default class Section extends Base{
	render(){
		const {pgSz:{width, height},  pgMar:{top, bottom, left, right}, cols:{num, space, data}}=this.props
		let style={
			paddingTop:top,
			paddingRight:right,
			paddingBottom:bottom,
			paddingLeft:left
		}
		return (
			<section style={style}>{this.props.children}</section>
		)
	}
}
