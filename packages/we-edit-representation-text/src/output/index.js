import React, {PureComponent, Children} from "react"
import PropTypes from "prop-types"
import {Emitter} from "we-edit"
import ReactDOMServer from "react-dom/server.node"

export default class Output extends Emitter.Format{
	render(){
		const {content}=this.props
		let stream=ReactDOMServer.renderToStaticNodeStream(content)
		this.output(stream)
		return null
	}
	
	output(stream){
		stream.pipe(this.props.stream,{end:false})
	}
}