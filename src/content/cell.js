import React, {PropTypes} from "react"

import Any from "./any"

const asIsFunc=cond=>`is${cond.charAt(0).toUpperCase()}${cond.substr(1)}`

/**
 * conditional formatting: http://officeopenxml.com/WPstyleTableStylesCond.php
 * The conditional formats are applied in the following order:
	>Whole table/table
	>Banded columns/band1Vert , even column banding/band2Vert
	>Banded rows/band1Horz , even row banding/band2Horz
	>First row/firstRow , last row/lastRow
	>First column/firstCol, last column/lastCol
	>Top left/nwCell, top right/neCell, bottom left/swCell, bottom right/seCell
 */
const PRIORIZED='seCell,swCell,neCell,nwCell,lastCol,firstCol,lastRow,firstRow,band2Horz,band1Horz,band2Vert,band1Vert'.split(',')


export default class Cell extends Any.StyleInheritable{
	static displayName="cell"
	render(){
		return <td>{this.getContent()}</td>
	}
	nextAvailableSpace(required){
		let {width,height}=super.nextAvailableSpace(...arguments)

		let {margin}=this.getStyle()
		width=width
			-margin.right
			-margin.left

		height=height
			-margin.top
			-margin.bottom

		return {width,height}
	}

	getStyle(){
		const conditions=this.conditions
		const cellStyle=this.cellStyle

		let border=cellStyle.cellBorder(conditions)

		let margin=cellStyle.cellMargin(conditions)

		let spacing=cellStyle.cellKey("w\\:tblPr w\\:spacing")||0

		let background=cellStyle.cellKey('w\\:tcPr>w\\:shd',conditions)

		return {border, margin, spacing, background}
	}

	get conditions(){
		let conds="seCell,swCell,neCell,nwCell,lastCol,firstCol,lastRow,firstRow,band2Horz,band1Horz,band2Vert,band1Vert"
			.split(",").filter(cond=>this.context[asIsFunc(cond)]())
		let edges="lastCol,firstCol,lastRow,firstRow".split(",")
			.filter(cond=>!conds.includes(cond) && this.context[asIsFunc(cond)+"Absolute"]())
		return conds.concat(edges).sort((a,b)=>PRIORIZED.indexOf(a)-PRIORIZED.indexOf(b))
	}
	
	get cellStyle(){
		const {tableStyle, rowStyle}=this.context
		const directStyle=this.props.directStyle
		const table=directStyle.closest("w\\:tbl")
		let cellStyle=table.find(tableStyle.get(0)).add(rowStyle.get(0)).add(directStyle.get(0))
		return cellStyle
	}

	static contextTypes={
		...Any.StyleInheritable.contextTypes,
		tableStyle: PropTypes.object,
		rowStyle: PropTypes.object,
		isFirstRow: PropTypes.func,
		isLastRow: PropTypes.func,
		isBand1Horz: PropTypes.func,
		isBand2Horz: PropTypes.func,
		isFirstCol: PropTypes.func,
		isLastCol: PropTypes.func,
		isBand1Vert: PropTypes.func,
		isBand2Vert: PropTypes.func,
		isSeCell: PropTypes.func,
		isSwCell: PropTypes.func,
		isNeCell: PropTypes.func,
		isNwCell: PropTypes.func,
		isFirstRowAbsolute: PropTypes.func,
		isLastRowAbsolute: PropTypes.func,
		isFirstColAbsolute: PropTypes.func,
		isLastColAbsolute: PropTypes.func
	}

	getChildContext(){
		let self=this
		let conditions=this.conditions
		const {tableStyle, rowStyle, inheritedStyle}=this.context
		const cellStyle=this.cellStyle
		return {
				...super.getChildContext(),
				inheritedStyle:{
                    key(path){
						let v = cellStyle.cellKey(path,conditions)
                        if (v == undefined)
                            return inheritedStyle.key(path)
                        return v
                    }
                }
			}
	}
}
