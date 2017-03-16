import React, {Component, PropTypes} from "react"

import {HasChild} from "./composable"
import Base from "../document"

import Composed from "./composed/document"

const Super=HasChild(Base)
export default class Document extends Super{
    render(){
        return (
			<div>
				<div style={{display:"none"}}>
				{super.render()}
				</div>
				<Composed sections={this.computed.children}/>
			</div>
		)
    }
}


