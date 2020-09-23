import React, {PureComponent, Fragment} from "react"
import PropTypes from "prop-types"

export default class ContextProvider extends PureComponent{
	static propTypes={
		doc: PropTypes.object,
		transformer: PropTypes.func.isRequired,
		onQuit: PropTypes.func,
	}

	static contextTypes={
		debug: PropTypes.bool,
	}

	static childContextTypes={
		doc: PropTypes.object,
		transformer: PropTypes.func,
	}

	constructor({doc}){
		super(...arguments)
		if(!('debug' in doc)){
			let debug, self=this
			Object.defineProperties(doc,{
				debug:{
					get(){
						return typeof(debug)==="boolean" ? debug : self.context.debug
					},
					set(v){
						debug=v
					}
				}
			})
		}
	}

	getChildContext(){
		const {doc, transformer}=this.props
		return {doc, transformer}
	}

	render(){
		return (
			<Fragment>
				{this.props.children}
			</Fragment>
		)
	}

	componentWillUnmount(){
		const {onQuit}=this.props
		onQuit && onQuit()
	}
}
