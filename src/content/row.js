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
