import PropTypes from "prop-types"
import {Emitter} from "we-edit"
import ReactDOMServer from "react-dom/server.node"

export default class Output extends Emitter.Format.Base{	
	static defaultProps={
		representation:"text"
	}
	
	emit(){
		const {content}=this.props
		let stream=ReactDOMServer.renderToStaticNodeStream(content)
		this.output(stream)
		return null
	}
	
	output(stream){
		stream.pipe(this.stream,{end:false})
	}
}