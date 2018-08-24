import React,{PureComponent as Component} from "react"
import PropTypes from "prop-types"
import {Representation} from "we-edit"

import ViewerTypes from "./all"
import EditorTypes from "./edit"

import Output from "./output"

export default class Html extends Representation.Base{
	static displayName="html"
	static propTypes={
		type: PropTypes.string.isRequired
	}

	static defaultProps={
		type:"html"
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
})(Html);

Html.install()
