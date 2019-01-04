import React, {Component} from "react"
import PropTypes from "prop-types"
import {models, ReactQuery} from "we-edit"
import memoize from "memoize-one"

import {HasParentAndChild} from "./composable"
import {Group} from "./composed"
const Super=HasParentAndChild(models.Table)

export default class Table extends Super{
	nextAvailableSpace(){
		let availableSpace=this.context.parent.nextAvailableSpace(...arguments)
		return {width: this.props.width, height: availableSpace.height}
	}

	createComposed2Parent(row){
		return (
			<Group width={this.props.width} height={row.props.height} replaceable={this.replaceable.bind(this)}>
				{React.cloneElement(row,{x:this.props.indent})}
			</Group>
		)
	}

	replaceable(replacing,replaced){
		const info=(a)=>{
			if(a){
				const table=new ReactQuery(a).findFirst(`[data-type="table"]`)
				const row=table.findFirst(`[data-type="row"]`)
				if(row.length){
					return {table,row}
				}
			}
		}

		const A=info(replacing), B=info(replaced)

		const sameTable=(A && B &&A.table.attr("data-content")==B.table.attr("data-content"))
		const sameRow=sameTable && A.row.attr("data-content")==B.row.attr("data-content")
		const replaceable=sameRow && A.row.children().length>B.row.children().length
		return replaceable
	}
}
