import React, {PureComponent as Component, Children} from "react"
import PropTypes from "prop-types"

const supports={}
export default class  extends Component{
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
	
	static support(Presentation,name){
		supports[name]=Presentation
	}
	
	static get(name){
		return supports[name]
	}
	
	getChildContext(){
		const {domain, EditorTypes, ViewerTypes}=this.props
		return {
			ModelTypes: this.context.transformer(domain=="editor" ? EditorTypes : ViewerTypes),
		}
	}
	
	render(){
		return Children.only(this.props.children)
	}
}