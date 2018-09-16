import React,{Children} from "react"
import PropTypes from "prop-types"

import Base from "../paragraph"

import {editify} from "we-edit"
import recomposable from "./recomposable"

const Super=editify(recomposable(Base))

//compose all or clear all
export class Paragraph extends Super{
	static contextTypes={
		...Super.contextTypes,
		shouldContinueCompose:PropTypes.func,
		shouldRemoveComposed:PropTypes.func,
	}

	constructor(){
		super(...arguments)
		this.computed.lastComposedLines=[]
	}

	createComposed2Parent(){
		let line=super.createComposed2Parent(...arguments)
		this.computed.lastComposedLines.push(line)
		return line
	}

	componentWillUnmount(){
		//this.emit("words", -this.computed.breakOpportunities.length)
	}

	clearComposed(){
		this.computed.lastText=""
		super.clearComposed()
	}

	/**
	*recompose [all|0]
	*/
	render(){
		const {shouldRemoveComposed, shouldContinueCompose,parent}=this.context
		const {changed, selfChanged}=this.props

		if(this.computed.lastComposedLines.length>0){
			if(shouldRemoveComposed() && changed){
				this.computed.lastComposedLines=[]
			}else{
				this.computed.lastComposedLines.forEach(line=>parent.appendComposed(line))
				return null
			}
		}

		return super.render()
	}
}

export default Paragraph
