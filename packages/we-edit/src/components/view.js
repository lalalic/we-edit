import React, {PureComponent as Component, Children} from "react"
import PropTypes from "prop-types"


export class View extends Component{
	static propTypes={
		domain: PropTypes.string,
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
			ModelTypes: this.context.transformer(domain=="editor" ? EditorTypes : ViewerTypes),
		}
	}
	
	render(){
		const {domain, EditorTypes, ViewerTypes}=this.props
		return Children.only(this.props.children)
	}
}

export default View