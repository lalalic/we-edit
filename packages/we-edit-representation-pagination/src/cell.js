import React,{PureComponent as Component} from "react"
import PropTypes from "prop-types"
import {Group} from "./composed"

import {HasParentAndChild} from "./composable"
import {models} from "we-edit"
const {Cell:Base}=models
const Super=HasParentAndChild(Base)

export default class extends Super{
	static contextTypes={
		...Super.contextTypes,
		composed1Cell: PropTypes.func
	}
	
	nextAvailableSpace(required){
		let {width,height}=super.nextAvailableSpace(...arguments)

		let {margin}=this.props
		width=width
			-margin.right
			-margin.left

		height=height
			-margin.top
			-margin.bottom

		return {width,height}
	}

	onAllChildrenComposed(){
		super.onAllChildrenComposed()
		this.context.composed1Cell(this)
	}
	
	cellHeight(contentHeight){
		const {border, margin, spacing}=this.props
		return contentHeight
				+border.top.sz
				+border.bottom.sz
				+margin.top
				+margin.bottom
				+spacing
	}
	
	createComposed2Parent(lines){//called by row(after all cells of a row composed)
		const {border, margin, spacing, background}=this.props
		let height=0
		let grouped=lines.map((line,i)=>{
				let a=<Group y={height} key={i}>{line}</Group>
				height+=line.props.height
				return a
			})
		height+=(spacing*.5
			+border.top.sz
			+margin.top
			+margin.bottom
			+border.bottom.sz
			+spacing*.5)
		return (
			<Cell height={height} background={background}>
				<Spacing x={spacing/2} y={spacing/2}>
					<Border border={border} spacing={spacing}>
						<Margin x={margin.left} y={margin.top}>
							{grouped}
						</Margin>
					</Border>
				</Spacing>
			</Cell>		
		)
	}
}


const Spacing=Group
const Margin=Group

class Cell extends Component{
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
				{background&&background!="transparent" ? (<rect width={width} height={height} fill={background}/>)  : null}
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

