import React, {PureComponent as Component, Children} from "react"
import PropTypes from "prop-types"
import extendible from "../tools/extendible"

class  Representation extends Component{
	static propTypes={
		domain: PropTypes.string,
		type: PropTypes.string,
		EditorTypes: PropTypes.object,
		ViewerTypes: PropTypes.object,
	}

	static contextTypes={
		transformer: PropTypes.func
	}

	static childContextTypes={
		ModelTypes: PropTypes.object,
	}

	getChildContext(){
		const {domain, EditorTypes, ViewerTypes}=this.props
		return {
			ModelTypes: this.context.transformer(domain=="edit" ? EditorTypes : ViewerTypes),
		}
	}

	render(){
		return Children.only(this.props.children)
	}
}

export default extendible(Representation, "representation", "Output")
