import React, {Children, Component, Fragment} from "react"
import PropTypes from "prop-types"


import {HasChild} from "./composable"
import Base from "we-edit/model/document"

import ComposedDocument from "./composed/document"

const Super=HasChild(Base)
export default class Document extends Super{
    render(){
		const {canvas,scale, canvasStyle}=this.props
        return (
			<Fragment>
				{this.computed.children.length==0 ? super.render() : null}

				<ComposedDocument 
					pages={this.computed.composed} 
					{...{canvas,scale, canvasStyle}}/>
			</Fragment>
		)
    }

	appendComposed(page){
		this.computed.composed.push(page)
	}
}
