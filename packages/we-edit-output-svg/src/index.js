import React, {PureComponent, Children} from "react"
import PropTypes from "prop-types"
import {Emitter} from "we-edit"
import ReactDOMServer from "react-dom/server"

export default class SVG extends Emitter.Format{
	static displayName="SVG"
	static propTypes={
		type: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		ext: PropTypes.string.isRequired,
		representation: PropTypes.string.isRequired,
	}

	static defaultProps={
		type:"svg",
		name:"SVG Document",
		ext:"svg",
		representation: "pagination"
	}

	render(){
		const {content, stream}=this.props
		ReactDOMServer.renderToStaticNodeStream(content).pipe(stream)
		return null
	}
}

Emitter.support(SVG)
