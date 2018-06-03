import React, {PureComponent as Component, Children} from "react"
import PropTypes from "prop-types"

const supports={}
export default class  Representation extends Component{
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

	static support(Representation){
		supports[Representation.defaultProps.type]=Representation
		console.log(`Representation[${Representation.defaultProps.type}] installed`)
	}

	static unsupport(Representation){
		const type=Representation.defaultProps.type
		if(suppors[type]){
			delete supports[type]
			console.log(`Representation[${type}] uninstalled`)
		}
	}

	static get(name){
		return supports[name]
	}

	static get Pagination(){
		return supports['pagination']
	}

	static get Html(){
		return supports['html']
	}

	static get Text(){
		return supports['text']
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
