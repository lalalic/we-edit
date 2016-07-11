import React, {PropTypes} from "react"

import Container from "./container"
import {styleInheritable} from "./any"

let Super=styleInheritable(Container)
export default class Cell extends Super{
	static displayName="cell"
	nextAvailableSpace(required){
		let {width,height}=super.nextAvailableSpace(...arguments)

		let {border, margin, spacing}=this.getStyle()
		width=width
			-border.right.sz
			-border.left.sz
			-margin.right
			-margin.left
			-spacing*1.5

		height=height
			-border.top.sz
			-border.bottom.sz
			-margin.top
			-margin.bottom
			-spacing
		return {width,height}
	}

	getStyle(){
		const {tableStyle, rowStyle, conditions:rowConditions}=this.context
		const {contentStyle}=this.props
		let conditions=(contentStyle.cnfStyle||[]).concat(rowConditions)

		contentStyle.metadata.basedOn=tableStyle
		let border={}
		"left,right,top,bottom,insideH,insideV".split(",")
			.forEach(a=>border[a]=contentStyle.get(`border.${a}`,conditions)||{sz:0})

		let margin={}
		"left,right,top,bottom".split(",").forEach(a=>margin[a]=contentStyle.get(`margin.${a}`)||0)


		rowStyle.metadata.basedOn=tableStyle
		let spacing=rowStyle.get(`spacing`)||0

		rowStyle.metadata.basedOn=undefined
		contentStyle.metadata.basedOn=undefined

		return {border, margin, spacing}
	}


	static contextTypes=Object.assign({
		tableStyle: PropTypes.object,
		conditions: PropTypes.array,
		rowStyle: PropTypes.object
	}, Super.contextTypes)
}
