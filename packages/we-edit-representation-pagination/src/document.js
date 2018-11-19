import React, {Children, Component, Fragment} from "react"
import PropTypes from "prop-types"


import composable,{HasChild, Locatable,} from "./composable"
import {models,ACTION} from "we-edit"
const {Document:Base}=models

import {Document as ComposedDocument} from "./composed"

const Super=Locatable.Locatorize(HasChild(Base))

export default class Document extends Super{
    render(){
		const {canvas=<Dummy/>}=this.props
        return (
			<Fragment>
				{super.render()}
                {React.cloneElement(canvas, {content: this.renderComposed()})}
			</Fragment>
		)
    }

    renderComposed(){
        return <ComposedDocument pages={this.computed.composed}/>
	}

	appendComposed(page){
		this.computed.composed.push(page)
	}

    componentDidMount(){
        this.dispatch(ACTION.Statistics({pages:this.computed.composed.length}))
	}

	componentDidUpdate(){
        this.dispatch(ACTION.Statistics({pages:this.computed.composed.length}))
	}
}

const Dummy=({content})=>content
