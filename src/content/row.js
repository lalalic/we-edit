import React, {PropTypes} from "react"

import Container from "./container"
import Group from "../composed/group"

export default class Row extends Container{
	static displayName="row"
	constructor(){
		super(...arguments)
		this.props.contentStyle.metadata.basedOn=this.context.tableStyle
	}
	
	nextAvailableSpace(){
		const {cols}=this.context.parent.props
		return {width:cols[this.children.length], height:Number.MAX_VALUE}
	}

	compose(){
		super.compose()
		this.composed.push([])
	}

	appendComposed(line){
		const currentCell=this.composed[this.composed.length-1]
		currentCell.push(line)
	}

	on1ChildComposed(){
		this.composed.push([])
		super.on1ChildComposed(...arguments)
	}

	onAllChildrenComposed(){
		this.composed.pop()
		this.context.parent.children.push(this)
		const {parent}=this.context
		let indexes=new Array(this.composed.length)
		indexes.fill(0)

		let isAllSent2Table=a=>indexes.reduce((prev,index, i)=>this.composed[i].length==index && prev, true)

		let counter=0
		let minSpace={}
		do{
			let availableSpace=parent.nextAvailableSpace(minSpace)
			let currentGroupedLines=new Array(this.composed.length)
			this.composed.forEach((lines,i)=>{
				let {border, margin,spacing}=this.children[i].getStyle()

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
			})

			if(!currentGroupedLines.find(a=>a.length>0)){
				//availableSpace is too small, need find a min available space
				let minHeight=indexes.reduce((p,index,i)=>{
					let {border, margin, spacing}=this.children[i].getStyle()
					let line=this.composed[i][index]
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

		this.context.parent.children.pop()
		super.onAllChildrenComposed()
	}
	
	static contextTypes=Object.assign({
		tableStyle: PropTypes.object
	}, Container.contextTypes)

	static childContextTypes=Object.assign({
		conditions: PropTypes.array,
		rowStyle: PropTypes.object,
		isFirstCol: PropTypes.func,
		isLastCol: PropTypes.func
	}, Container.childContextTypes)

	getChildContext(){
		let children=this.children
		let content=this.state.content
		return Object.assign(super.getChildContext(),{
			conditions: this.props.contentStyle.get('cnfStyle')||[],
			rowStyle: this.props.contentStyle,
			isFirstCol(){
				return children.length==0
			},
			isLastCol(){
				return children.length==content.length-1
			}
		})
	}
}
