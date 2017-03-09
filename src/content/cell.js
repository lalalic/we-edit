import React, {Component, PropTypes} from "react"

import Any from "./any"
import Group from "../composed/group"

export default class Cell extends Any.StyleInheritable{
	static displayName="cell"

	render(){
		return <td>{this.getContent()}</td>
	}

	appendComposed(){
		this.computed.composed.push(...arguments)
	}

	createComposed2Parent(){
		const style=this.getStyle()
		let {margin,border,width,background}=style
		let gap=this.getContentGap(style)
		let y=0
		let positionedLines=this.computed.composed.map((line,i)=>{
			const {width,height}=line.props
			let positionedLine=(<Group y={y} width={width} height={height} key={i}>{line}</Group>)
			y+=height
			return positionedLine
		})

		return (
			<ComposedCell width={width} height={y+gap.top+gap.bottom} background={background}>
				<Border border={border}/>
				<Group x={gap.left} y={gap.top}>
					{positionedLines}
				</Group>
			</ComposedCell>
		)
	}

	nextAvailableSpace(required){
		const style=this.getStyle()
		const gap=this.getContentGap(style)
		let width=style.width-gap.right-gap.left

		return {width,height:Number.MAX_SAFE_INTEGER}
	}

	getContentGap(style){
		return {left:0,right:0,top:0,bottom:0}
	}
}

class ComposedCell extends Component{
	static contextTypes={
		rowSize: PropTypes.object
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
		const {rowSize}=this.context
		return (
			<Group {...others}>
				{background ? (<rect width={width} height={rowSize.height} fill={background}/>) : null}
				{children}
			</Group>
		)
	}
}

class Border extends Component{
	static contextTypes={
		rowSize: PropTypes.object,
		cellSize: PropTypes.object
	}
	render(){
		const {left,right,bottom,top}=this.props.border
		const {rowSize:{height}, cellSize:{width}}=this.context
		return (
			<Group>
				{top.sz && <path strokeWidth={top.sz} stroke={top.color} d={`M0 0 L${width} 0`}/>}
				{bottom.sz && <path strokeWidth={bottom.sz} stroke={bottom.color} d={`M0 ${height} L${width} ${height}`}/>}
				{right.sz && <path strokeWidth={right.sz} stroke={right.color} d={`M${width} 0 L${width} ${height}`}/>}
				{left.sz && <path strokeWidth={left.sz} stroke={left.color} d={`M0 0 L0 ${height}`}/>}
			</Group>
		)
	}
}
