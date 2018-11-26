import React, {Component} from "react"
import PropTypes from "prop-types"
import {models} from "we-edit"

import {HasParentAndChild} from "./composable"
import {Group} from "./composed"
const Super=HasParentAndChild(models.Table)

export default class Table extends Super{
	static childContextTypes={
		...Super.childContextTypes,
		composed1Row:PropTypes.func,
	}

	getChildContext(){
		return {
			...super.getChildContext(),
			composed1Row:this.composed1Row
		}
	}

	composed1Row=this.composed1Row.bind(this)
	composed1Row(row){
		this.computed.composedRows++
		if(0==this.computed.composedRows){
			this.computed.marginRight=row.getCell(0).props.margin.right
		}
	}

	constructor(){
		super(...arguments)
		this.computed.composedRows=-1
	}

	nextAvailableSpace(required){
		let availableSpace=this.context.parent.nextAvailableSpace(required)
		return {width: this.props.width, height: availableSpace.height}
	}

	createComposed2Parent(row){
		return (
			<Group width={this.props.width} height={row.props.height}>
				{React.cloneElement(row,{x:this.props.indent-(this.computed.marginRight||0)})}
			</Group>
		)
	}
}
