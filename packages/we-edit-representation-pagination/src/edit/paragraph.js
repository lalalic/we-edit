import React,{Children} from "react"
import PropTypes from "prop-types"

import Base from "../paragraph"

import editable from "./editable"

//compose all or clear all
export class Paragraph extends editable(Base,{stoppable:true,cacheable:true}){
	constructor(){
		super(...arguments)
		this.computed.lastText=""
	}

	componentWillUnmount(){
		//this.emit("words", -this.computed.breakOpportunities.length)
	}

	clearComposed(){
		this.computed.lastText=""
		super.clearComposed()
	}
}

export default Paragraph
