import React,{PropTypes} from "react"
import Group from "../composed/group"

import {Table} from "../content"
import editable from "./editable"

export default class extends editable(Table){
	createComposed2Parent(props){
		this.computed.composed.push(props)
		let row=super.createComposed2Parent(props)
		let {width,height}=row.props
		let ps={width,height}
		if(this.computed.composed.length==1)//that's why fill this.computed.composed in appendComposed
			ps._id=this._id
		return <Group {...ps}>{row}</Group>
	}

	_isLastComposedFitIntoParent(){
		return true
	}

	/**
	 *  isAllChildrenComposed will affect last line height, so here we need make it right
	 */
	appendLastComposed(){
		let {width,height}=this.nextAvailableSpace()
		let [{width:tableWidth}]=this.computed.lastComposed
		let tableHeight=this.computed.lastComposed.reduce((prev, line)=>prev+line.height,0)
		if(tableHeight<=height && tableWidth<=width){
			const {parent}=this.context
			this.computed.lastComposed.forEach(line=>parent.appendComposed(this.createComposed2Parent(line)))
		}else{
			let children=this.computed.children.splice(0)
			children.forEach(row=>{
				row.onAllChildrenComposed()
			})
		}

		this.computed.lastComposed=null
		super.onAllChildrenComposed()
	}
}
