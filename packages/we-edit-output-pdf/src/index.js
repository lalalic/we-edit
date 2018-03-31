import React, {Component} from "react"
import PropTypes from "prop-types"
import {Emitter} from "we-edit"

export default class PDF extends Emitter.Format{
	static displayName="PDF"
	static propTypes={
		type: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		ext: PropTypes.string.isRequired,
		representation: PropTypes.string.isRequired,
	}

	static defaultProps={
		type:"pdf",
		name:"PDF Document",
		ext:"pdf",
		representation: "pagination"
	}

	render(){
		return "pdf"
	}
}

Emitter.support(PDF)
