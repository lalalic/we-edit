import React, {Component} from "react"
import PropTypes from "prop-types"
import {Emitter} from "we-edit"

const EmptyView=()=>null

export class Input extends Component{
	static contextTypes={
		doc: PropTypes.object
	}
	render(){
		
	}
}

Emitter.support(<Emitter view={<EmptyView/>}><Input/></Emitter>)