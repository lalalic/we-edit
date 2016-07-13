import React,{PropTypes} from "react"
import Group from "../composed/group"

import {Table} from "../content"
import editable from "./editable"

export default class extends editable(Table){
	createComposed2Parent(){
		let row=super.createComposed2Parent(...arguments)
		let {width,height}=row.props
		let ps={width,height}
		if(this.composed.length==1)
			ps._id=this._id
		return <Group {...ps}>{row}</Group>
	}
}