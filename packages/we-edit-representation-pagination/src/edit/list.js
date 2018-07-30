import React from "react"
import PropTypes from "prop-types"
import Base from "../list"
import {Paragraph} from "./paragraph"

import {editify} from "we-edit"
import recomposable from "./recomposable"

import Group from "../composed/group"

export default class List extends Paragraph{
	static displayName=editify(recomposable(Base)).displayName
	static contextTypes={
		...Paragraph.contextTypes,
		Measure: PropTypes.func,
	}

	constructor(){
		super(...arguments)
		this._newLine=Base.prototype._newLine.bind(this)
	}
	
	createComposed2Parent(props){
		let list=super.createComposed2Parent(...arguments)
		return React.createElement(Group,{
				...list.props,
				"data-type":"paragraph"
			}, list)
	}
}
