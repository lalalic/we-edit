import React, {Component} from "react"
import PropTypes from "prop-types"
import {models} from "we-edit"

import {HasParentAndChild} from "./composable"
import {Group} from "./composed"
const Super=HasParentAndChild(models.Table)

export default class Table extends Super{
	get composedRows(){
		return this.computed.composed
	}

	get marginRight(){
		return this.composedRows[0].getCell(0).props.margin.right||0
	}

	appendComposed(row){
		if(!React.isValidElement(row)){
			this.composedRows.push(row)
		}else{
			return super.appendComposed(...arguments)
		}
	}

	nextAvailableSpace(required){
		let availableSpace=this.context.parent.nextAvailableSpace(required)
		return {width: this.props.width, height: availableSpace.height}
	}

	createComposed2Parent(row){
		return (
			<Group width={this.props.width} height={row.props.height}>
				{React.cloneElement(row,{x:this.props.indent-this.marginRight})}
			</Group>
		)
	}
}
