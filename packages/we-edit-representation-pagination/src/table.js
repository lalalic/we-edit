import React, {Component} from "react"
import PropTypes from "prop-types"
import {models} from "we-edit"

import {HasParentAndChild} from "./composable"


export default class Table extends HasParentAndChild(models.Table){
	nextAvailableSpace(required){
		let availableSpace=this.context.parent.nextAvailableSpace(required)
		return {width: this.props.width, height: availableSpace.height}
	}

	appendComposed(row){
		this.context.parent.appendComposed(this.createComposed2Parent(row))
	}

	createComposed2Parent(row){
		let tblInd=this.props.indent
		return React.cloneElement(row,{x:tblInd/*-this.computed.composed.firstCellMargin.right*/})
	}
}
