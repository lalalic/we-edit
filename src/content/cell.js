import React, {Component, PropTypes} from "react"

import Any, {styleInheritable} from "./any"
import Group from "../composed/group"

let Super=styleInheritable(Any)
let asIsFunc=cond=>`is${cond.charAt(0).toUpperCase()}${cond.substr(1)}`
export default class Cell extends Super{
	static displayName="cell"

	render(){
		return <td>{this.getContent()}</td>
	}

	appendComposed(){
		this.computed.composed.push(...arguments)
	}

	createComposed2Parent(){
		let {margin,border,width,background}=this.getStyle()
		let gap="right,left,top,bottom".split(",").reduce((state,a)=>{
			state[a]=Math.max(margin[a],border[a].sz/2)
			return state
		},{})
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
		let {margin,border,width}=this.getStyle()
		width=width
			-Math.max(margin.right,border.right.sz/2)
			-Math.max(margin.left,border.left.sz/2)

		return {width,height:Number.MAX_SAFE_INTEGER}
	}

	getStyle(){
		if(this._style)
			return this._style

		let conditions=this.conditions

		const {tableStyle, rowStyle}=this.context
		const {directStyle}=this.props

		directStyle.basedOn=rowStyle
		rowStyle.basedOn=tableStyle


		let edges="lastCol,firstCol,lastRow,firstRow".split(",")
			.filter(cond=>!conditions.includes(cond) && this.context[asIsFunc(cond)+"Absolute"]())

		let border=directStyle.getBorder(conditions, edges)

		let margin={}
		"left,right,top,bottom".split(",").forEach(a=>margin[a]=directStyle.get(`margin.${a}`)||tableStyle.get(`tblPr.tblCellMar.${a}`)||0)

		let spacing=rowStyle.get(`spacing`)||0

		let background=directStyle.get('tcPr.shd',conditions)

		let width=directStyle.get('tcPr.tcW')

		let height=rowStyle.get('tcHeight')

		return this._style={border, margin, spacing, background,width,height}
	}

	get conditions(){
		return "seCell,swCell,neCell,nwCell,lastCol,firstCol,lastRow,firstRow,band2Horz,band1Horz,band2Vert,band1Vert"
			.split(",").filter(cond=>this.context[asIsFunc(cond)]())
	}

	static contextTypes=Object.assign({
		tableStyle: PropTypes.object,
		rowStyle: PropTypes.object,
		isFirstRow: PropTypes.func,
		isLastRow: PropTypes.func,
		isBand1Horz: PropTypes.func,
		isBand2Horz: PropTypes.func,
		isFirstCol: PropTypes.func,
		isLastCol: PropTypes.func,
		isBand1Vert: PropTypes.func,
		isBand2Vert: PropTypes.func,
		isSeCell: PropTypes.func,
		isSwCell: PropTypes.func,
		isNeCell: PropTypes.func,
		isNwCell: PropTypes.func,
		isFirstRowAbsolute: PropTypes.func,
		isLastRowAbsolute: PropTypes.func,
		isFirstColAbsolute: PropTypes.func,
		isLastColAbsolute: PropTypes.func
	}, Super.contextTypes)

	getChildContext(){
		let self=this
		let conditions=this.conditions
		const {tableStyle, rowStyle, inheritedStyle}=this.context
		const {directStyle}=this.props
        return Object.assign( super.getChildContext(),{
				inheritedStyle:{
                    get(path){
						directStyle.basedOn=rowStyle
						rowStyle.basedOn=tableStyle
                        let v=directStyle.get(path, conditions)
                        if(v==undefined)
                            return inheritedStyle.get(path, conditions)
                        return v
                    }
                }
			})
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
