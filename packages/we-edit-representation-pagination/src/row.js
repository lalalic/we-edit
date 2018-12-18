import React,{PureComponent as Component} from "react"
import PropTypes from "prop-types"
import {models} from "we-edit"

import {Group} from "./composed"

import {HasParentAndChild} from "./composable"
const Super=HasParentAndChild(models.Row)

export default class extends Super{
	get composedCells(){
		return this.computed.composed
	}

	appendComposed(cell){
		if(!React.isValidElement(cell)){
			this.composedCells.push(cell)
		}else{
			return super.appendComposed(...arguments)
		}
	}

	nextAvailableSpace(){
		const {cols}=this.context
		return {width:cols[this.composedCells.length], height:Number.MAX_SAFE_INTEGER}
	}

	onAllChildrenComposed(){
		this.context.parent.appendComposed(this)

		const {parent}=this.context
		const {height, keepLines}=this.props
		let indexes=new Array(this.composedCells.length).fill(0)

		let isAllSent2Table=a=>indexes.reduce((prev,index, i)=>this.getCell(i).lines.length==index && prev, true)

		let counter=0
		let minSpace={}
		do{
			let availableSpace=parent.nextAvailableSpace(minSpace)
			if(keepLines)
				availableSpace.height=Number.MAX_SAFE_INTEGER

			let currentGroupedLines=new Array(this.composedCells.length)
			this.composedCells.forEach((a,iCol)=>{
				const cell=this.getCell(iCol)
				const lines=cell.lines
				let availableContentHeight=availableSpace.height-cell.cellHeight(0)

				let index=indexes[iCol]
				let start=index
				for(let len=lines.length; index<len && availableContentHeight>0; index++){
					let line=lines[index]
					if(line.props.y!=undefined){
						continue
					}
					availableContentHeight-=line.props.height
					if(availableContentHeight<0){
						break
					}else{

					}
				}
				indexes[iCol]=index

				currentGroupedLines[iCol]=lines.slice(start,index)
			})

			if(!currentGroupedLines.find(a=>a.length>0)){
				//availableSpace is too small, need find a min available space
				let minHeight=indexes.reduce((p,index,i)=>{
					const cell=this.getCell(i)
					let line=cell.lines[index]
					if(line){
						return Math.max(p, cell.cellHeight(line.props.height))
					}else
						return p
				},0)
				minSpace.height=minHeight
			}else{
				const row=this.createComposed2Parent({colGroups:currentGroupedLines,width:availableSpace.width})
				let nested=0

				const commit=()=>{
					let rollback=parent.appendComposed(row)
					if(Number.isInteger(rollback)){
						if(++nested>4){
							console.warn("there may be a dead loop in table row compose, ignore and continue")
							return
						}
						commit()
					}
				}

				commit()

			}

			if(counter++>100)
				throw new Error("there should be a infinite loop during row split, please check")
		}while(!isAllSent2Table());

		super.onAllChildrenComposed()
	}

	createComposed2Parent({colGroups,width}){
		const {cols}=this.context
		const rowHeight=Math.max(
				this.props.height||0,
				...colGroups.map((lines,i)=>this.getCell(i).cellHeight(lines.reduce((h,a)=>h+(a.props.height||0),0)))
			)

		let x=0
		let groupsWithXY=colGroups.map((linesWithStyle,iCol)=>{
			let cell=this.getCell(iCol).createComposed2Parent(linesWithStyle,rowHeight)
			cell=React.cloneElement(cell,{x, width:cols[iCol]})

			x+=cols[iCol]
			return cell
		})

		return <Row
			children={groupsWithXY}
			height={rowHeight}
			width={width}
			/>
	}

	getCell(iCol){
		return this.composedCells[iCol]
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
