import React, {Component,PureComponent, Children} from "react"
import PropTypes from "prop-types"
import extendible from "../tools/extendible"

class  Representation extends PureComponent{
	static propTypes={
		domain: PropTypes.string,
		type: PropTypes.string,
		EditorTypes: PropTypes.object,
		ViewerTypes: PropTypes.object,
		transformer: PropTypes.func,
	}
	
	static defaultProps={
		
	}

	static contextTypes={
		transformer: PropTypes.func
	}

	static childContextTypes={
		ModelTypes: PropTypes.object,
	}

	static Base=class extends Component{
		static install(conf){
			Representation.install(this,conf)
		}

		static uninstall(){
			Representation.uninstall(this)
		}
	}

	getChildContext(){
		const {domain, EditorTypes, ViewerTypes, transformer=a=>a}=this.props
		return {
			ModelTypes: this.context.transformer(transformer(domain=="edit" ? EditorTypes : ViewerTypes)),
		}
	}

	render(){
		const {type, children, ...props}=this.props
		if(type){
			const Typed=Representation.get(type)
			if(Typed){
				if(Typed!=this.constructor){
					return <Typed {...props}>{children}</Typed>
				}
			}
		}
		return Children.only(this.props.children)
	}
}

export default extendible(Representation, "representation", "Output")
