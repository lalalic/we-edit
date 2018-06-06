import PropTypes from "prop-types"
import {Emitter, Representation} from "we-edit"

export default class HTML extends Representation.Html.Output{
	static displayName="HTML"
	static propTypes={
		type: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		ext: PropTypes.string.isRequired,
		representation: PropTypes.string.isRequired,
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
		const {stream}=this.props
		stream.write(wrapperStart)
		super.output(...arguments)
		stream.end(wrapperEnd)
	}
}

Emitter.support(HTML)
