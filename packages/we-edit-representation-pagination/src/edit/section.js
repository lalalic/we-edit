import React, {Fragment,Children} from "react"
import PropTypes from "prop-types"

import Base from "../section"

import {editify} from "we-edit"
import recomposable from "./recomposable"

const Super=editify(recomposable(Base))

export default class Section extends Super{

	onAllChildrenComposed(){
		super.onAllChildrenComposed()
		let last=this.computed.composed[this.computed.composed.length-1]
		last && (last.lastSectionPage=true);
	}

	render(){
		return super.render()
	}

	//page has section info, so content doesn't need
	createComposed2Parent=Base.prototype.createComposed2Parent.bind(this)
	_newPage(){
		let page=super._newPage(...arguments)
		page["data-content"]=this.props.id
		page["data-type"]="section"
		return page
	}
}
