import React, {Component, PropTypes} from "react"

import Any from "./any"
import Group from "../composed/group"

const Super=Any
export default class Row extends Super{
	static displayName="row"
	render(){
		return <tr>{this.getContent()}</tr>
	}

	appendComposed(){

	}


	on1ChildComposed(){
		this.computed.composed.push([])
		super.on1ChildComposed(...arguments)
	}

	createComposed2Parent(){
		let w=0,h=0
		let positionedCells=this.computed.children.map((cell,i)=>{
			let composedCell=cell.createComposed2Parent()
			const {width,height}=composedCell.props
			h=Math.max(h,height)
			let positionedCell=(
				<Group x={w} key={i}>
					{composedCell}
				</Group>
			)

			w+=width
			return positionedCell
		})

		return (
			<ComposedRow width={w} height={h}>
				{positionedCells}
			</ComposedRow>
		)
	}

	onAllChildrenComposed(){
		this.computed.composed.splice(this.computed.children.length)//on1ChildComposed will always add 1
/*
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
*/
		super.onAllChildrenComposed()
	}


	static contextTypes=Object.assign({
		tableStyle: PropTypes.object
	}, Super.contextTypes)

	static childContextTypes=Object.assign({
		rowStyle: PropTypes.object,
		isFirstCol: PropTypes.func,
		isLastCol: PropTypes.func,
		isFirstColAbsolute: PropTypes.func,
		isLastColAbsolute: PropTypes.func,
		isBand1Vert: PropTypes.func,
		isBand2Vert: PropTypes.func,
		isSeCell: PropTypes.func,
		isSwCell: PropTypes.func,
		isNeCell: PropTypes.func,
		isNwCell: PropTypes.func
	}, Super.childContextTypes)

	getHeaderColCount(){
		const {firstColumn}=this.context.tableStyle.get('tblPr.tblLook') ||{}
		if(firstColumn=="0")
			return 0
		return 1
	}

	getChildContext(){
		let self=this
		const {firstColumn, lastColumn, noVBand}=this.context.tableStyle.get('tblPr.tblLook')||{}
		let children=this.computed.children
		return Object.assign(super.getChildContext(),{
			rowStyle: this.props.directStyle,
			isFirstCol(){
				return firstColumn=="1"
					&& !this.isFirstRow()
					&& !this.isLastRow()
					&& this.isFirstColAbsolute()

			},
			isFirstColAbsolute(){
				return self.computed.children.length==0
			},
			isLastCol(){
				return lastColumn=="1"
					&& !this.isFirstRow()
					&& !this.isLastRow()
					&& this.isLastColAbsolute()
			},
			isLastColAbsolute(){
				return self.computed.children.length==self.getContentCount()-1
			},
			isBand1Vert(){
				return noVBand=="0"
					&& !this.isFirstCol()
					&& !this.isLastCol()
					&& (self.computed.children.length-self.getHeaderColCount())%2==1
			},
			isBand2Vert(){
				return noVBand=="0"
					&& !this.isFirstCol()
					&& !this.isLastCol()
					&& (self.computed.children.length-self.getHeaderColCount())%2==0
			},
			isSeCell(){
				return this.isLastRowAbsolute() && this.isLastColAbsolute()
			},
			isSwCell(){
				return this.isLastRowAbsolute() && this.isFirstColAbsolute()
			},
			isNeCell(){
				return this.isFirstRowAbsolute()  && this.isLastColAbsolute()
			},
			isNwCell(){
				return this.isFirstRowAbsolute() && this.isFirstColAbsolute()
			}
		})
	}
}


class ComposedRow extends Group{
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
