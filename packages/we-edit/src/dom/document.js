import Component from "./component"
import PropTypes from "prop-types"

export default class Document extends Component{
	static displayName="document"
	static propTypes={
		//target
		canvas: PropTypes.node,
		canvasId: PropTypes.string,
		
		//viewer/editor
		scale: PropTypes.number,
		screenBuffer: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
		viewport: PropTypes.shape({
			width: PropTypes.number,
			height: PropTypes.number
		}),
		
		//state
		content: PropTypes.object,//document memory content, immutable map
	}

	//emitter call it to output returned
	getComposed(){

	}
}
