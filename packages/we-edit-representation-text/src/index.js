import React, {PureComponent as Component} from "react"
import PropTypes from "prop-types"
import {Representation} from "we-edit"

import ViewerTypes from "./all"
import EditorTypes from "./edit"

import Output from "./output"

export default class Text extends Representation.Base{
	static displayName="text"
	static propTypes={
		type: PropTypes.string.isRequired
	}

	static defaultProps={
		type:"text"
	}
	
	static Output=Output
	
	render(){
		return <Representation {...{ViewerTypes,EditorTypes,...this.props}}/>
	}
}

(function(A){
	let install=A.install.bind(A)
	A.install=function(){
		install(...arguments)
		A.Output.install()
	}
	
	let uninstall=A.uninstall.bind(A)
	A.uninstall=function(){
		uninstall(...arguments)
		A.Output.uninstall()
	}
})(Text);

Text.install()