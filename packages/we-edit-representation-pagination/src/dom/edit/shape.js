import React from "react"
import PropTypes from "prop-types"

import Base from "../shape"

import editable from "./editable"

const Super=editable(Base)

export default class Shape extends Super{
	static contextTypes={
		...Super.contextTypes,
		shouldRemoveComposed:PropTypes.func
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
}
