import React, {Component, PropTypes} from "react"
import Container from "./container"
import Group from "../composed/group"

export default class Table extends Container{
	static displayName="table"
	nextAvailableSpace(required){
		let availableSpace=this.context.parent.nextAvailableSpace(required)
		return {width: this.props.width, height: availableSpace.height}
	}
	appendComposed(colGroups){
		const {width, cols}=this.props
		let height=0

		let x=0, rowNo=this.children.length
		let groupsWithXY=colGroups.map((lines,colNo)=>{
			let y=0
			let grouped=lines.map(line=>{
					let a=<Group y={y}>{line}</Group>
					y+=line.props.height
					return a
				})
			let cell=(<Group height={y} x={x}>{grouped}</Group>)
			x+=cols[colNo]
			height=Math.max(height,y)
			return cell
		})

		x=0
		let borders=groupsWithXY.map((a,colNo)=>this.borders(rowNo, colNo, cols[colNo], height,x, x+=cols[colNo]))

		this.context.parent.appendComposed(<Group width={width} height={height}>{borders}{groupsWithXY}</Group>)
	}

	borders(rowNo, colNo, width, height, x){
		return (<Group x={x}><path
			strokeWidth={1}
			stroke="black"
			fill="none"
			d={`M0 0 L${width} 0 L${width} ${height} L0 ${height} L0 0`}/></Group>)
	}
}
