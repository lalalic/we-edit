import React, {Children, Component, Fragment} from "react"
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
			<Fragment>
				{super.render()}
				
				{canvas ? 
					React.cloneElement(canvas, {pages:this.computed.composed}) : 
					<ComposedDocument pages={this.computed.composed}/>
				}
				
			</Fragment>
		)
    }

	appendComposed(page){
		this.computed.composed.push(page)
		this.emit("pages",this.computed.composed.length)
	}
}
