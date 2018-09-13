import React,{PureComponent as Component} from "react"
import PropTypes from "prop-types"
import {models} from "we-edit"

import Group from "./composed/group"

import {HasParentAndChild} from "./composable"


export default class extends HasParentAndChild(models.Row){
	nextAvailableSpace(){
		const {cols}=this.context
		return {width:cols[this.computed.children.length], height:Number.MAX_VALUE}
	}

	appendComposed(line){
		if(this.computed.composed.length==0)
			this.computed.composed.push([])
		const currentCell=this.computed.composed[this.computed.composed.length-1]
		currentCell.push(line)
	}

	on1ChildComposed(){
		this.computed.composed.push([])
		super.on1ChildComposed(...arguments)
	}

	onAllChildrenComposed(){
		this.computed.composed.splice(this.computed.children.length)//on1ChildComposed will always add 1

		const {parent}=this.context
		const {height}=this.props
		let indexes=new Array(this.computed.composed.length).fill(0)

		let isAllSent2Table=a=>indexes.reduce((prev,index, i)=>this.computed.composed[i].length==index && prev, true)

		let counter=0
		let minSpace={}
		do{
			let availableSpace=parent.nextAvailableSpace(minSpace)
			let currentGroupedLines=new Array(this.computed.composed.length)
			this.computed.composed.forEach((lines,iCol)=>{
				let {border, margin,spacing,background}=this.computed.children[iCol].props
				let availableContentHeight=availableSpace.height
					-border.top.sz
					-border.bottom.sz
					-margin.top
					-margin.bottom
					-spacing

				let index=indexes[iCol]
				let start=index
				for(let len=lines.length; index<len && availableContentHeight>0; index++){
					let line=lines[index]
					availableContentHeight-=line.props.height
					if(availableContentHeight<0){
						break
					}else{

					}
				}
				indexes[iCol]=index

				currentGroupedLines[iCol]=lines.slice(start,index)
				currentGroupedLines[iCol].style={border, margin,spacing,background}
			})

			if(!currentGroupedLines.find(a=>a.length>0)){
				//availableSpace is too small, need find a min available space
				let minHeight=indexes.reduce((p,index,i)=>{
					let {border, margin, spacing}=this.computed.children[i].props
					let line=this.computed.composed[i][index]
					if(line){
						return Math.max(p, line.props.height
							+border.top.sz
							+border.bottom.sz
							+margin.top
							+margin.bottom
							+spacing)
					}else
						return p
				},0)
				minSpace.height=minHeight
			}else
				parent.appendComposed(this.createComposed2Parent({colGroups:currentGroupedLines,width:availableSpace.width}))

			if(counter++>100)
				throw new Error("there should be a infinite loop during row split, please check")
		}while(!isAllSent2Table());

		super.onAllChildrenComposed()
	}
	
	createComposed2Parent({colGroups,width}){
		const {cols}=this.context
		let height=0

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
				this.computed.composed.firstCellMargin=margin
			return cell
		})
		
		return <Row 
			children={groupsWithXY} 
			height={Math.max(height, this.props.height||0)} contentHeight={height}
			width={width}
			/>
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

class Row extends Component{
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
	
	render(){
		const {contentHeight, ...props}=this.props
		return <Group {...props}/>
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

