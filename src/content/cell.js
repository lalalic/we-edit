import React, {PropTypes} from "react"

import Any from "./any"

let asIsFunc=cond=>`is${cond.charAt(0).toUpperCase()}${cond.substr(1)}`

export default class Cell extends Any.StyleInheritable{
	static displayName="cell"
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
		let conditions=this.conditions

		const {tableStyle, rowStyle}=this.context
		const directStyle=this.props.directStyle.add(rowStyle, tableStyle)

		let edges="lastCol,firstCol,lastRow,firstRow".split(",")
			.filter(cond=>!conditions.includes(cond) && this.context[asIsFunc(cond)+"Absolute"]())

		let border=directStyle.cellBorder(conditions, edges)

		let margin=directStyle.cellMarge(conditions)
		//"left,right,top,bottom".split(",").forEach(a=>margin[a]=directStyle.get(`margin.${a}`)||0)

		let spacing=directStyle.cellKey("w\\:spacing")||0

		let background=directStyle.cellKey('w\\:tcPr>w\\:shd',conditions)

		return this._style={border, margin, spacing, background}
	}

	get conditions(){
		return "seCell,swCell,neCell,nwCell,lastCol,firstCol,lastRow,firstRow,band2Horz,band1Horz,band2Vert,band1Vert"
			.split(",").filter(cond=>this.context[asIsFunc(cond)]())
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
		const directStyle=this.props.directStyle.add(tableStyle,rowStyle)
		return {
				...super.getChildContext(),
				inheritedStyle:{
                    key(path){
						let v = directStyle.key(path,conditions)
                        if (v == undefined)
                            return inheritedStyle.key(path,conditions)
                        return v
                    }
                }
			}
	}
}
