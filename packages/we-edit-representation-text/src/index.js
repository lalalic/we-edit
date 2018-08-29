import React, {PureComponent as Component} from "react"
import PropTypes from "prop-types"
import {Representation} from "we-edit"

import Html from "we-edit-representation-pagination"

import Viewers from "./all"
import Editors from "./edit"

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
		const {ViewerTypes=Viewers, EditorTypes=Editors, ...props}=this.props
		return <Html {...{ViewerTypes,EditorTypes,...props}}/>
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