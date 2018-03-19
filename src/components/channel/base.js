import React, {PureComponent as Component, Children} from "react"
import PropTypes from "prop-types"


export default class Channel extends Component{
	static propTypes={
		domain: PropTypes.string
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
			ModelTypes: this.context.transformer(domain=="editor" ? EditorTypes : ViewerTypes),
		}
	}
	
	render(){
		const {domain, EditorTypes, ViewerTypes}=this.props
		return Children.only(this.props.children)
	}
}