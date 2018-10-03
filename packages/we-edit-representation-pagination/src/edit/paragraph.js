import React,{Children} from "react"
import PropTypes from "prop-types"
import {Cacheable} from "../composable"

import Base from "../paragraph"

import editable from "./editable"

export default Cacheable(class Paragraph extends editable(Base,{stoppable:true}){
	constructor(){
		super(...arguments)
		this.computed.lastText=""
	}

	componentWillUnmount(){
		//this.emit("words", -this.computed.breakOpportunities.length)
	}

	clearComposed(){
		this.computed.lastText=""
		super.clearComposed(...arguments)
	}
})
