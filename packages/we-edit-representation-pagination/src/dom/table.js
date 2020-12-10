import React from "react"
import {dom} from "we-edit"

import {HasParentAndChild} from "../composable"
import {Group} from "../composed"

/**
 * table/row/cell may be splitted into blocks
 * cell is the smallest unit of composing
 * but cell may be splitted into blocks
 * space is defined by cell->row->table->parent space, so it has to require space up
 */
export default class Table extends HasParentAndChild(dom.Table){
	/**row call it to append a block of row*/
	createComposed2Parent(row){
		const {width,indent}=this.props
		return (
			<Group width={width} height={row.props.height}>
				{React.cloneElement(row,{x:indent})}
			</Group>
		)
	}
}
