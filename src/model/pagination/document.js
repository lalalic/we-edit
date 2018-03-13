import React, {Children, Component} from "react"
import PropTypes from "prop-types"


import {HasChild} from "./composable"
import Base from "../document"

import ComposedDocument from "./composed/document"

const Super=HasChild(Base)
export default class Document extends Super{
	static contextTypes={
		...Super.contextTypes
	}
	
    render(){
		const {canvas}=this.props
        return (
			<div>
				<div style={{display:"none"}}>
				{super.render()}
				</div>
				
				{canvas ? 
					React.cloneElement(canvas, {pages:this.computed.composed}) : 
					<ComposedDocument pages={this.computed.composed}/>
				}
				
			</div>
		)
    }

	appendComposed(page){
		this.computed.composed.push(page)
	}
}
