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
		this.computed.lines=[]
	}

	createComposed2Parent(){
		let line=super.createComposed2Parent(...arguments)
		this.computed.lines.push(line)
		return line
	}

	componentWillUnmount(){
		this.emit("words", -this.computed.breakOpportunities.length)
	}

    componentWillReceiveProps({children,getChildText,changed},{shouldRemoveComposed,parent}){
		if(this.computed.composed.length>0){
			if(shouldRemoveComposed(this)){
				if(changed){
					this.clearComposed()
					let lastBreakOpportunities=this.computed.breakOpportunities
					this.computed.breakOpportunities=this.getBreakOpportunities(Children.toArray(children))
					this.emit("words", this.computed.breakOpportunities.length-lastBreakOpportunities.length)
				}else{
					this.computed.lines.forEach(line=>parent.appendComposed(line))
					this.availableSpace={width:0, height:0}
					parent.on1ChildComposed(this)
				}
			}else{
				parent.on1ChildComposed(this)
			}
		}
    }

	clearComposed(){
		super.clearComposed()
		this.computed.lines=[]
	}

	/**
	*recompose [all|0]
	*/
	render(){
		if(this.computed.composed.length>0){
			return null
		}

		if(!this.context.shouldContinueCompose()){
			return null
		}

		return super.render()
	}
}

export default Paragraph
