import React from "react"
import PropTypes from "prop-types"

import Base from "../shape"

import {editable} from "we-edit/model/edit"
import recomposable from "./recomposable"

const Super=editable(recomposable(Base))

export default class Shape extends Super{
	static contextTypes={
		...Super.contextTypes,
		shouldRemoveComposed:PropTypes.func,
		shouldContinueCompose:PropTypes.func
	}
	
	shouldContinueCompose(){
		return true
	}
	
	componentWillReceiveProps({width,height,changed,children}){
		if(this.context.shouldRemoveComposed(this)){
			if(changed){
				if(width==this.props.width && height==this.props.height){
					//@TODO: optimize to clear changed only
					this.clearComposed()
				}else{
					this.clearComposed()
				}
			}else{
				this.onAllChildrenComposed()
			}
		}
	}	

	render(){
		if(!this.context.shouldContinueCompose()){
			return null
		}

		if(this.computed.children.length>0){ //@TODO: optimize to clear changed only
			return null
		}
				
		return super.render()
	}
}