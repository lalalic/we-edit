import React, {PropTypes} from "react"

import Any, {styleInheritable} from "./any"

let Super=styleInheritable(Any)
let asIsFunc=cond=>`is${cond.charAt(0).toUpperCase()}${cond.substr(1)}`
export default class Cell extends Super{
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
		if(this._style)
			return this._style

		let conditions=this.conditions

		const {tableStyle, rowStyle}=this.context
		const {directStyle}=this.props

		directStyle.basedOn=rowStyle
		rowStyle.basedOn=tableStyle
		
		
		let edges="lastCol,firstCol,lastRow,firstRow".split(",")
			.filter(cond=>!conditions.includes(cond) && this.context[asIsFunc(cond)+"Absolute"]())

		let border=directStyle.getBorder(conditions, edges)

		let margin={}
		"left,right,top,bottom".split(",").forEach(a=>margin[a]=directStyle.get(`margin.${a}`)||0)

		let spacing=rowStyle.get(`spacing`)||0

		let background=directStyle.get('tcPr.shd',conditions)

		return this._style={border, margin, spacing, background}
	}

	get conditions(){
		return "seCell,swCell,neCell,nwCell,lastCol,firstCol,lastRow,firstRow,band2Horz,band1Horz,band2Vert,band1Vert"
			.split(",").filter(cond=>this.context[asIsFunc(cond)]())
	}

	static contextTypes=Object.assign({
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
	}, Super.contextTypes)

	getChildContext(){
		let self=this
		let conditions=this.conditions
		const {tableStyle, rowStyle, inheritedStyle}=this.context
		const {directStyle}=this.props
        return Object.assign( super.getChildContext(),{
				inheritedStyle:{
                    get(path){
						directStyle.basedOn=rowStyle
						rowStyle.basedOn=tableStyle
                        let v=directStyle.get(path, conditions)
                        if(v==undefined)
                            return inheritedStyle.get(path, conditions)
                        return v
                    }
                }
			})
	}
}
