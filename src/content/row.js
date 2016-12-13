import React, {Component, PropTypes} from "react"

import Any from "./any"
import Group from "../composed/group"

export default class Row extends Any{
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
