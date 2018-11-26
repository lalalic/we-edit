import React,{PureComponent as Component} from "react"
import PropTypes from "prop-types"
import {Group} from "./composed"

import {HasParentAndChild} from "./composable"
import Frame from "./frame"
import {models} from "we-edit"
const {Cell:Base}=models
const Super=HasParentAndChild(Base)

class CellFrame extends Frame{
	currentColumn={x:0,y:0}
	createComposed2Parent(){
		return this
	}
}

export default class extends Super{
	static displayName=Frame.displayName.replace(/frame$/,"cell")
	static contextTypes={
		...Super.contextTypes,
		composed1Cell: PropTypes.func
	}
	render(){
		let {width}=this.context.parent.nextAvailableSpace(...arguments)
		let {margin={right:0,left:0,top:0,bottom:0}}=this.props
		return (
			<CellFrame {...{width:width-margin.right-margin.left}}>
				{super.render()}
			</CellFrame>
		)
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

	appendComposed(frame){
		this.frame=frame
	}

	get lines(){
		return this.frame.computed.composed
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
							{lines.reduce((state,a,i)=>{
								if(a.props.y==undefined){
									state.positioned.push(React.cloneElement(a,{y:state.y,key:i}))
									state.y+=a.props.height
								}else{
									state.positioned.push(React.cloneElement(a,{key:i}))
								}
								return state
							},{y:0,positioned:[]}).positioned}
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
