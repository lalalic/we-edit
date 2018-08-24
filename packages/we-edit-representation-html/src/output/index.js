import PropTypes from "prop-types"
import {Emitter} from "we-edit"
import ReactDOMServer from "react-dom/server.node"

export default class Output extends Emitter.Format.Base{	
	static defaultProps={
		...Emitter.Format.Base.defaultProps,
		representation: "html",
		type:"html",
		name:"HTML Document",
		ext:"html",
		wrapperStart:"<html><body>",
		wrapperEnd:"</body></html>"
	}
	
	static contextTypes={
		...Emitter.Format.Base.contextTypes,
		root:PropTypes.node
	}
	
	emit(){
		this.output(ReactDOMServer.renderToStaticNodeStream(this.context.root))
	}
	
	output(content){
		const {wrapperStart, wrapperEnd}=this.props
		if(wrapperStart){
			this.stream.write(wrapperStart)
		}
		
		content.pipe(this.stream,{end:false})
		content.on("end",()=>{
			this.stream.end(wrapperEnd)
		})
	}
}