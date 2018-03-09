import React, {Children, Component} from "react"
import PropTypes from "prop-types"


import {HasChild} from "./composable"
import Base from "../document"

import ComposedDocument from "./composed/document"

const Super=HasChild(Base)
export default class Document extends Super{
	static contextTypes={
		...Super.contextTypes,
		statistics: PropTypes.func
	}
	
    render(){
        return (
			<div>
				<div style={{display:"none"}}>
				{super.render()}
				</div>
				<ComposedDocument
					width={this.contentWidth}
					pages={this.computed.composed}
					/>
			</div>
		)
    }

	appendComposed(page){
		this.computed.composed.push(page)
		if(this.context.statistics)
			this.context.statistics("page",this.computed.composed.length)
	}

	get contentWidth(){
		return Children.toArray(this.props.children)
			.reduce((w,{props:{pgSz:{width}}})=>Math.max(w,width),0)
	}
}
