import React from "react"
import {dom} from "we-edit"

import {HasParentAndChild} from "../composable"
import {Group} from "../composed"

const Super=HasParentAndChild(dom.Table)

export default class Table extends Super{
	nextAvailableSpace(){
		const availableSpace=this.context.parent.nextAvailableSpace(...arguments)
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
