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
		ModelTypes: PropTypes.object,
	}

	constructor(props,{ModelTypes:{Frame}}){
		super(...arguments)
		if(!this.constructor.CellFrame){
			this.constructor.CellFrame=class extends Frame{
				createComposed2Parent(){
					const createComposed2Parent=(...args)=>super.createComposed2Parent(...args)
					return {
						lines:this.lines,
						createComposed2Parent,
					}
				}
			}
		}
	}

	render(){
		let {width}=this.context.parent.nextAvailableSpace(...arguments)
		let {margin={right:0,left:0,top:0,bottom:0}, vertAlign, id}=this.props
		return (
			<this.constructor.CellFrame {
				...{width:width-margin.right-margin.left,
					vertAlign,id:`${id}-frame`,
					cols:[{x:0,width:width-margin.right-margin.left}]}
				}>
				{super.render()}
			</this.constructor.CellFrame>
		)
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

	appendComposed(frame){
		this.computed.composed.push(frame)
		this.context.parent.appendComposed(this)
	}

	get frame(){
		return this.computed.composed[0]
	}

	get lines(){
		return this.frame.lines
	}

	createComposed2Parent(lines, height){//called by row(after all cells of a row composed)
		const {border, margin, spacing, background,vertAlign}=this.props
		const contentHeight=lines.reduce((h,a)=>h+(a.props.height||0),0)
		const alignY=(()=>{
			switch(vertAlign){
				case "bottom":
					return height-this.cellHeight(contentHeight)
				case "center":
				case "middle":
					return (height-this.cellHeight(contentHeight))/2
				default:
					return 0
			}
		})();
		return (
			<Cell height={height} background={background}>
				<Spacing x={spacing/2} y={spacing/2}>
					<Border border={border} spacing={spacing}>
						<Margin x={margin.left} y={margin.top}>
							<Group y={alignY} className="frame">
								{this.frame.createComposed2Parent(lines).props.children}
							</Group>
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
