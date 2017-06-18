import React, {Children, Component, PropTypes} from "react"

import {HasChild} from "./composable"
import Base from "../document"

import ComposedDocument from "./composed/document"

const Super=HasChild(Base)
export default class Document extends Super{
    render(){
        return (
			<div>
				<div style={{display:"none"}}>
				{super.render()}
				</div>
				<this.constructor.Composed
					width={this.contentWidth}
					pages={this.computed.composed}
					/>
			</div>
		)
    }

	appendComposed(page){
		this.computed.composed.push(page)
	}

	get contentWidth(){
		return Children.toArray(this.props.children)
			.reduce((w,{props:{pgSz:{width}}})=>Math.max(w,width),0)
	}

	static Composed=ComposedDocument
}
