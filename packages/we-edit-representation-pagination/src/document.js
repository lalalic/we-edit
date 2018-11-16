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

    shouldContinueCompose(a){
        const should=!!!this.computed.anchor
        if(!should){
            this.notifyNotAllComposed(a)
        }
        return should
    }

	renderComposed(){
        if(this.computed.anchor)
            return null
		return <ComposedDocument pages={this.computed.composed}/>
	}

	appendComposed(page){
		this.computed.composed.push(page)
	}

    recompose4Anchor(){
        const anchor=this.computed.anchor
        this.setState({anchor})
        delete this.computed.anchor
    }

	componentDidMount(){
        if(this.computed.anchor){
            this.recompose4Anchor()
        }
		//this.dispatch(ACTION.Statistics({pages:this.computed.composed.length}))
	}

	componentDidUpdate(){
        if(this.computed.anchor){
            this.recompose4Anchor()
        }
		//this.dispatch(ACTION.Statistics({pages:this.computed.composed.length}))
	}
}

const Dummy=({content})=>content
