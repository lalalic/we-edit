import React, {Children, Component, Fragment} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"

import composable,{HasChild, Locatable,} from "./composable"
import {models,ACTION} from "we-edit"
const {Document:Base}=models

import {Document as ComposedDocument} from "./composed"

const Super=Locatable.Locatorize(HasChild(Base))

export default class Document extends Super{
    static contextTypes={
        ...Super.contextTypes,
        Measure: PropTypes.func,
    }

    static childContextTypes={
        ...Super.childContextTypes,
        Measure: PropTypes.func
    }

    getChildContext(){
        return {
            ...super.getChildContext(),
            Measure: this.getMeasure(),
        }
    }

    getMeasure=memoize(()=>{
        const {precision=1}=this.props
        if(precision==1)
            return this.context.Measure

        return class extends this.context.Measure{
            lineHeight(){
                const {height,descent}=super.lineHeight(...arguments)
                return {
                    height:height*precision,
                    descent:descent*precision
                }
            }

            stringWidth(){
                return precision*super.stringWidth(...arguments)
            }
        }
    })

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
        const {precision=1}=this.props
        return <ComposedDocument pages={this.computed.composed} precision={precision}/>
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
