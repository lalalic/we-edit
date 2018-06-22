import PropTypes from "prop-types"
import {Emitter, Representation} from "we-edit"

export default class HTML extends Representation.Output.Html{
	static displayName="HTML"
	static propTypes={
		...Representation.Output.Html,
		wrapperStart: PropTypes.string,
		wrapperEnd: PropTypes.string,
	}

	static defaultProps={
		type:"html",
		name:"HTML Document",
		ext:"html",
		representation: "html",
		wrapperStart:"<html><body>",
		wrapperEnd:"</body></html>"
	}
	
	output(){
		const stream=this.stream
		stream.write(wrapperStart)
		super.output(...arguments)
		stream.end(wrapperEnd)
	}
}

Emitter.install(HTML)
