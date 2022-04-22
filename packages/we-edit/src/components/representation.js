import React, {Component,PureComponent, Children} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"
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
		transformer: PropTypes.func,
		representation: PropTypes.string,
	}

	static childContextTypes={
		ModelTypes: PropTypes.object,
		representation: PropTypes.string,
	}

	static Base=class __$1 extends Component{
		static install(conf){
			Representation.install(this,conf)
		}

		static uninstall(){
			Representation.uninstall(this)
		}
	}

	constructor(){
		super(...arguments)
		const {domain, EditorTypes, ViewerTypes, transformer=a=>a}=this.props
		const models=domain=="edit" ? EditorTypes : ViewerTypes
		this.ModelTypes=models ? transformer(this.context.transformer(models)) : undefined
	}

	getChildContext(){
		return {
			ModelTypes: this.ModelTypes,
			representation: this.props.type||this.context.representation,
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
