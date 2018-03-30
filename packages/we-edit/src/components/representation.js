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
	
	static support(Representation,name){
		supports[name]=Representation
	}
	
	static get(name){
		return supports[name]
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