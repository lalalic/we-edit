import PropTypes from "prop-types"
import {Emitter} from "we-edit"

export default class Output extends Emitter.Format.Base{	
	static defaultProps={
		...Emitter.Format.Base.defaultProps,
		representation:"text",
		type:"text",
		name:"Plain Text",
		ext:"txt"
	}
	
	output(content){
		content.pipe(this.stream)
	}
}