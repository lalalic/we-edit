import React, {Component, PropTypes} from "react"
import Container from "./container"
import Group from "../composed/group"

/**
 *  
 *  
 *  conditional formatting: http://officeopenxml.com/WPstyleTableStylesCond.php
 */
export default class Table extends Container{
	static displayName="table"
	nextAvailableSpace(required){
		let availableSpace=this.context.parent.nextAvailableSpace(required)
		return {width: this.props.width, height: availableSpace.height}
	}
	
	appendComposed(colGroups){
		const {width, cols}=this.props
		let height=0, self=this
		
		let x=0, rowNo=this.children.length-1
		let groupsWithXY=colGroups.map((lines,colNo)=>{
			let {border, margin, spacing}=self.children[rowNo].children[colNo].getStyle()
			let y=0
			let grouped=lines.map(line=>{
					let a=<Group y={y}>{line}</Group>
					y+=line.props.height
					return a
				})
			y+=(border.top.sz
				+border.bottom.sz
				+margin.top
				+margin.bottom
				+spacing)
			let cell=(
				<Group height={y} x={x}>
					<Group x={spacing} y={spacing/2}>
						<Group x={border.left ? border.left.sz : 0} y={border.left ? border.left.sz : 0}>
							{<path strokeWidth={border.top.sz} stroke={border.top.color} d={`M0 0 L${cols[colNo]-spacing*0.5} 0`}/>}
							{<path strokeWidth={border.bottom.sz} stroke={border.bottom.color} d={`M0 ${y-spacing*0.5} L${cols[colNo]-spacing*0.5} ${y-spacing*0.5}`}/>}
							{<path strokeWidth={border.right.sz} stroke={border.right.color} d={`M${cols[colNo]-spacing*0.5} 0 L${cols[colNo]-spacing*0.5} ${y-spacing*0.5}`}/>}
							{<path strokeWidth={border.left.sz} stroke={border.left.color} d={`M0 0 L0 ${y-spacing*0.5}`}/>}
							<Group x={margin.left} y={margin.top}>
								{grouped}
							</Group>
						</Group>
					</Group>
				</Group>	
			);
			x+=cols[colNo]
			height=Math.max(height,y)
			return cell
		})

		this.context.parent.appendComposed(<Group width={width} height={height}>{groupsWithXY}</Group>)
	}
	
	static childContextTypes=Object.assign({
		tableStyle: PropTypes.object
	}, Container.childContextTypes)
	
	getChildContext(){

		return Object.assign(super.getChildContext(),{
			tableStyle: this.props.contentStyle
		})
	}
}
