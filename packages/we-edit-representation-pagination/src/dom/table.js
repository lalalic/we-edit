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
	//if table height is specified, it should be considered to require space
	//table width has nothing to do with cell layout since row has cols to constraint cell layout space
	nextAvailableSpace({height:requiredBlockSize=0}={}){
		const {width,height=0}=this.props
		return this.context.parent.nextAvailableSpace({height:Math.max(height,requiredBlockSize)})
	}

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
