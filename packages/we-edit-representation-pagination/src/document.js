import React, {Children, Component, Fragment} from "react"
import PropTypes from "prop-types"


import {HasChild} from "./composable"
import {models} from "we-edit"
const {Document:Base}=models

import {Document as ComposedDocument} from "./composed"

const Super=HasChild(Base)
export default class Document extends Super{
    render(){
		const {canvas=<Dummy/>}=this.props
        return (
			<Fragment>
				{super.render()}
                {React.cloneElement(canvas, {content:<ComposedDocument pages={this.computed.composed}/>})}
			</Fragment>
		)
    }

	appendComposed(page){
		this.computed.composed.push(page)
	}
}

const Dummy=({content})=>content
