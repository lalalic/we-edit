import React, {PropTypes} from "react"

import Any from "./any"
import Group from "../composed/group"

const Super=Any
export default class Row extends Super{
	static displayName="row"
	constructor(){
		super(...arguments)
		this.props.contentStyle.metadata.basedOn=this.context.tableStyle
	}

	nextAvailableSpace(){
		const {cols}=this.context.parent.props
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
		let indexes=new Array(this.computed.composed.length)
		indexes.fill(0)

		let isAllSent2Table=a=>indexes.reduce((prev,index, i)=>this.computed.composed[i].length==index && prev, true)

		let counter=0
		let minSpace={}
		do{
			let availableSpace=parent.nextAvailableSpace(minSpace)
			let currentGroupedLines=new Array(this.computed.composed.length)
			this.computed.composed.forEach((lines,i)=>{
				let style=this.computed.children[i].getStyle()
				let {border, margin,spacing}=style

				let height=availableSpace.height
					-border.top.sz
					-border.bottom.sz
					-margin.top
					-margin.bottom
					-spacing

				let index=indexes[i]
				let start=index
				for(let len=lines.length; index<len && height>0; index++){
					let line=lines[index]
					height-=line.props.height
					if(height<0){
						break
					}else{

					}
				}
				indexes[i]=index

				currentGroupedLines[i]=lines.slice(start,index)
				currentGroupedLines[i].style=style
			})

			if(!currentGroupedLines.find(a=>a.length>0)){
				//availableSpace is too small, need find a min available space
				let minHeight=indexes.reduce((p,index,i)=>{
					let {border, margin, spacing}=this.computed.children[i].getStyle()
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
				parent.appendComposed(currentGroupedLines)
			//if(counter++>100)
				//throw new Error("there should be a infinite loop during row split, please check")


		}while(!isAllSent2Table());

		super.onAllChildrenComposed()
	}

	static contextTypes=Object.assign({
		tableStyle: PropTypes.object
	}, Super.contextTypes)

	static childContextTypes=Object.assign({
		conditions: PropTypes.array,
		rowStyle: PropTypes.object,
		isFirstCol: PropTypes.func,
		isLastCol: PropTypes.func
	}, Super.childContextTypes)

	getChildContext(){
		let children=this.computed.children
		let contentLength=this.getContentCount()
		return Object.assign(super.getChildContext(),{
			conditions: this.props.contentStyle.get('cnfStyle')||[],
			rowStyle: this.props.contentStyle,
			isFirstCol(){
				return children.length==0
			},
			isLastCol(){
				return children.length==contentLength-1
			}
		})
	}
}

class CellLinesWithCellStyle extends Array{
	constructor(style,...others){
		super(others)
		this.style=style
	}
}
