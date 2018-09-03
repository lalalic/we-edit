import React, {Children, Component, Fragment} from "react"
import PropTypes from "prop-types"


import {HasChild} from "./composable"
import {models} from "we-edit"
const {Document:Base}=models

import ComposedDocument from "./composed/document"

const Super=HasChild(Base)
export default class Document extends Super{
    render(){
		const {canvas=<Dummy/>}=this.props
        return (
			<Fragment>
				{this.computed.children.length==0 ? super.render() : null}
                {React.cloneElement(canvas, {content:<ComposedDocument pages={this.computed.composed}/>})}
			</Fragment>
		)
    }

	appendComposed(page){
		this.computed.composed.push(page)
	}
}

const Dummy=({content})=>content
