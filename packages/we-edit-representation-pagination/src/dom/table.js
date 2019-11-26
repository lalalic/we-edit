import React from "react"
import {dom} from "we-edit"

import {HasParentAndChild} from "../composable"
import {Group} from "../composed"

const Super=HasParentAndChild(dom.Table)

/**
 * table/row/cell may be splitted into blocks
 * cell is the smallest unit of composing
 * but cell may be splitted into blocks
 * space is defined by cell->row->table->parent space, so it has to require space up
 */
export default class Table extends Super{
	/** table defines row width, but block size is ensured by parent space */
	//***simplified: not consider wrappees
	nextAvailableSpace(){
		const availableSpace=this.context.parent.nextAvailableSpace(...arguments)
		return {...availableSpace, width: this.props.width}
	}

	/**row call it to append a block of row*/
	createComposed2Parent(row){
		return (
			<Group width={this.props.width} height={row.props.height}>
				{React.cloneElement(row,{x:this.props.indent})}
			</Group>
		)
	}
}
