import React,{Children, PropTypes} from "react"
import Base from "../paragraph"

import {editable} from "model/edit"
import recomposable from "./recomposable"

const Super=editable(recomposable(Base))

//compose all or clear all
export default class Paragraph extends Super{
	static contextTypes={
		...Super.contextTypes,
		shouldContinueCompose:PropTypes.func,
		shouldRemoveComposed:PropTypes.func
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

    componentWillReceiveProps({children,getChildText,changed},{shouldRemoveComposed,parent}){
		if(this.computed.composed.length>0){
			if(shouldRemoveComposed(this)){
				if(changed){
					this.clearComposed()
					this.computed.breakOpportunities=this.getBreakOpportunities(Children.toArray(children))
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

	render(){
		if(!this.context.shouldContinueCompose()){
			return null
		}

		if(this.computed.composed.length>0){
			return null
		}

		return super.render()
	}
}
