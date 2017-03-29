import React, {Component, PropTypes} from "react"

import Group from "./composed/group"

import {HasParentAndChild} from "./composable"
import Base from "../table"
const Super=HasParentAndChild(Base)

export default class Table extends Super{
	nextAvailableSpace(required){
		let availableSpace=this.context.parent.nextAvailableSpace(required)
		return {width: this.props.width, height: availableSpace.height}
	}

	appendComposed(colGroups){
		const {width, cols}=this.props
		let height=0, self=this

		let x=0, rowNo=this.computed.children.length-1
		let groupsWithXY=colGroups.map((linesWithStyle,colNo)=>{
			let {border, margin, spacing, background}=linesWithStyle.style
			let y=0
			let grouped=linesWithStyle.map((line,i)=>{
					let a=<Group y={y} key={i}>{line}</Group>
					y+=line.props.height
					return a
				})
			y+=(spacing*.5
				+border.top.sz
				+margin.top
				+margin.bottom
				+border.bottom.sz
				+spacing*.5)
			let cell=(
				<Cell height={y} x={x} width={cols[colNo]} background={background}>
					<Spacing x={spacing/2} y={spacing/2}>
						<Border border={border} spacing={spacing}>
							<Margin x={margin.left} y={margin.top}>
								{grouped}
							</Margin>
						</Border>
					</Spacing>
				</Cell>
			);
			
			x+=cols[colNo]
			height=Math.max(height,y)
			if(rowNo+colNo===0)
				this.computed.composed.firstCellMarge=margin
			return cell
		})

		this.context.parent.appendComposed(this.createComposed2Parent({
			width,
			height,
			children:groupsWithXY
		}))
	}

	createComposed2Parent(props){
		let tblInd=this.props.indent
		return <Row x={tblInd-this.computed.composed.firstCellMarge.right} {...props}/>
	}
}

class Spacing extends Group{}
class Margin extends Group{}

class Cell extends Group{
	static contextTypes={
		cellSize: PropTypes.object
	}

	static childContextTypes={
		cellSize:PropTypes.object
	}

	getChildContext(){
		return {
			cellSize: {
				width: this.props.width,
				height: this.props.height
			}
		}
	}

	render(){
		const {width,height, background, children, ...others}=this.props
		return (
			<Group {...others}>
				{background ? (<rect width={width} height={height} fill={background}/>)  : null}
				{children}
			</Group>
		)
	}

}

class Row extends Group{
	static childContextTypes={
		rowSize:PropTypes.object
	}

	getChildContext(){
		return {
			rowSize: {
				width: this.props.width,
				height: this.props.height
			}
		}
	}
}

class Border extends Component{
	static contextTypes={
		rowSize: PropTypes.object,
		cellSize: PropTypes.object
	}
	render(){
		const {spacing,border:{left,right,bottom,top}, children, ...others}=this.props
		let {rowSize:{height}, cellSize:{width}}=this.context
		width-=spacing
		height-=spacing
		return (
			<Group {...others}>
				{top.sz && <path strokeWidth={top.sz} stroke={top.color} d={`M0 0 L${width} 0`}/> || null}
				{bottom.sz && <path strokeWidth={bottom.sz} stroke={bottom.color} d={`M0 ${height} L${width} ${height}`}/>  || null}
				{right.sz && <path strokeWidth={right.sz} stroke={right.color} d={`M${width} 0 L${width} ${height}`}/>  || null}
				{left.sz && <path strokeWidth={left.sz} stroke={left.color} d={`M0 0 L0 ${height}`}/>  || null}
				<Group x={left.sz} y={top.sz}>
					{children}
				</Group>
			</Group>
		)

	}
}
