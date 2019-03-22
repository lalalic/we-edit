import React, {Component} from "react"
import PropTypes from "prop-types"
import {dom, ReactQuery} from "we-edit"
import memoize from "memoize-one"

import {HasParentAndChild} from "../composable"
import {Group} from "../composed"

const Super=HasParentAndChild(dom.Table)

export default class Table extends Super{
	nextAvailableSpace(){
		let availableSpace=this.context.parent.nextAvailableSpace(...arguments)
		return {...availableSpace, width: this.props.width}
	}

	createComposed2Parent(row){
		return (
			<Group width={this.props.width} height={row.props.height}>
				{React.cloneElement(row,{x:this.props.indent})}
			</Group>
		)
	}
}
