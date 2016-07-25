import React, {PropTypes} from "react"

import Any, {styleInheritable} from "./any"

let Super=styleInheritable(Any)
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

		let border=directStyle.getBorder(conditions)

		let margin={}
		"left,right,top,bottom".split(",").forEach(a=>margin[a]=directStyle.get(`margin.${a}`)||0)

		let spacing=rowStyle.get(`spacing`)||0

		let background=directStyle.get('shd',conditions)

		return this._style={border, margin, spacing, background}
	}

	get conditions(){
		return "seCell,swCell,neCell,nwCell,lastCol,firstCol,lastRow,firstRow,band2Horz,band1Horz,band2Vert,band1Vert"
			.split(",").filter(cond=>this.context[`is${cond.charAt(0).toUpperCase()}${cond.substr(1)}`]())
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
		isNwCell: PropTypes.func
	}, Super.contextTypes)

	getChildContext(){
		let self=this
		const {tableStyle, rowStyle, inheritedStyle}=this.context
		const {directStyle}=this.props
        return Object.assign( super.getChildContext(),{
				inheritedStyle:{
                    get(path){
						directStyle.basedOn=rowStyle
						rowStyle.basedOn=tableStyle
						let conditions=self.confitions
                        let v=directStyle.get(path, conditions)
                        if(v==undefined)
                            return inheritedStyle.get(path, conditions)
                        return v
                    }
                }
			})
	}
}
