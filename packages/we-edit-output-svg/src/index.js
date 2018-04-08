import PropTypes from "prop-types"
import {Emitter} from "we-edit"
import {Output} from "we-edit-representation-pagination"


export default class SVG extends Output{
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
	
	output(stream){
		stream.pipe(this.props.stream)
	}
}

Emitter.support(SVG)
