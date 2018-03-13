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
					canvas={this.props.canvas}
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
}
