import React, {PropTypes} from "react"

import Any, {styleInheritable, isToggleStyle} from "./any"

let Super=styleInheritable(Any)
export default class Cell extends Super{
	static displayName="cell"
	constructor(){
		super(...arguments)
		this.props.contentStyle.metadata.basedOn=this.context.rowStyle||this.context.tableStyle
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
		if(this._style)
			return this._style
		const {tableStyle, rowStyle, conditions:rowConditions, isFirstRow, isLastRow, isFirstCol, isLastCol}=this.context
		const {contentStyle}=this.props
		let conditions=(contentStyle.cnfStyle||[]).concat(rowConditions)
		if(!conditions.includes("firstRow") && isFirstRow())
			conditions.push("firstRow")
		if(!conditions.includes("lastRow") && isLastRow())
			conditions.push("lastRow")
		if(!conditions.includes("firstCol") && isFirstCol())
			conditions.push("firstCol")
		if(!conditions.includes("lastCol") && isLastCol())
			conditions.push("lastCol")

		let border=contentStyle.getBorder(conditions)

		let margin={}
		"left,right,top,bottom".split(",").forEach(a=>margin[a]=contentStyle.get(`margin.${a}`)||0)

		let spacing=rowStyle.get(`spacing`)||0

		let background=contentStyle.get('shd',conditions)


		return this._style={border, margin, spacing, background}
	}


	static contextTypes=Object.assign({
		tableStyle: PropTypes.object,
		conditions: PropTypes.array,
		rowStyle: PropTypes.object,
		isFirstRow: PropTypes.func,
		isFirstCol: PropTypes.func,
		isLastRow: PropTypes.func,
		isLastCol: PropTypes.func
	}, Super.contextTypes)

	getChildContext(){
            const {contentStyle}=this.props
            const {containerStyle, conditions:rowConditions}=this.context
			let conditions=(contentStyle.cnfStyle||[]).concat(rowConditions)

            return Object.assign( super.getChildContext(),{
					containerStyle:{
                        get(path){
                            let v=contentStyle.get(path, conditions)
                            if(v==undefined)
                                return containerStyle.get(path, conditions)
                            else if(isToggleStyle(path) && v==-1){
                                let toggles=containerStyle.get(path, conditions)
                                if(typeof(toggles)=='number'){
                                    if(toggles<0)
                                        v=toggles-1
                                    else
                                        v=toggles
                                }
                            }
                            return v
                        }
                    }
				})
		}
}
