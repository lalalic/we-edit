import ReactDOMServer from "react-dom/server.node"
import {Emitter} from "we-edit"

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
	emit(){
		super.emit(...arguments)
		//this.output(ReactDOMServer.renderToStaticNodeStream(this.props.content))
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

		content.on('error',e=>{	
			this.stream.write(`<pre>${e.stack}</pre>`)
			this.stream.end(wrapperEnd)
		})
	}
}