import PropTypes from "prop-types"
import {Emitter} from "we-edit"
import ReactDOMServer from "react-dom/server.node"

export default class Output extends Emitter.Format.Base{	
	static defaultProps={
		...Emitter.Format.Base.defaultProps,
		representation:"text",
		type:"text",
		name:"Plain Text",
		ext:"txt"
	}
	
	static contextTypes={
		...Emitter.Format.Base.contextTypes,
		root:PropTypes.node
	}
	
	emit(){
		this.output(ReactDOMServer.renderToStaticNodeStream(this.context.root))
	}
	
	output(content){
		content.pipe(this.stream)
	}
}