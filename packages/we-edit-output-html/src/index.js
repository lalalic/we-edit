import React, {Component} from "react"
import PropTypes from "prop-types"
import {Emitter} from "we-edit"

export default class HTML extends Emitter.Format{
	static displayName="HTML"
	static propTypes={
		type: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		ext: PropTypes.string.isRequired,
		representation: PropTypes.string.isRequired,
	}

	static defaultProps={
		type:"html",
		name:"HTML Document",
		ext:"html",
		representation: "html"
	}

	render(){
		return "html"
	}
}

Emitter.support(HTML)
