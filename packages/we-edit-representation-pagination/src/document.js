import React, {Children, Component, Fragment} from "react"
import PropTypes from "prop-types"


import composable,{HasChild, Locatable,} from "./composable"
import {models,ACTION} from "we-edit"
const {Document:Base}=models

import {Document as ComposedDocument} from "./composed"

const Super=composable(Locatable.Locatorize(HasChild(Base)),{continuable:true})

export default class Document extends Super{
    constructor(){
        super(...arguments)
        this.state={...this.state,anchor:null}
    }

    render(){
		const {canvas=<Dummy/>}=this.props
        return (
			<Fragment>
				{super.render()}
                {React.cloneElement(canvas, {content: this.renderComposed()})}
			</Fragment>
		)
    }

    shouldContinueCompose(){
        return !!this.computed.anchor
    }

	renderComposed(){
		return <ComposedDocument pages={this.computed.composed}/>
	}

	appendComposed(page){
		this.computed.composed.push(page)
	}

	componentDidMount(){
        if(this.computed.anchor){
            let anchor=this.computed.anchor
            this.setState({anchor})
        }
		//this.dispatch(ACTION.Statistics({pages:this.computed.composed.length}))
	}

	componentDidUpdate(){
		//this.dispatch(ACTION.Statistics({pages:this.computed.composed.length}))
	}
}

const Dummy=({content})=>content
