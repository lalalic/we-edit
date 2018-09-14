import React,{PureComponent as Component} from "react"
import PropTypes from "prop-types"
import {Representation} from "we-edit"
import Pagination from "we-edit-representation-pagination"

import Viewers from "./all"
import Editors from "./edit"

import Output from "./output"

export {Viewers, Editors}

export default class Html extends Representation.Base{
	static displayName="html"

	static defaultProps={
		type:"html"
	}

	static Output=Output

	render(){
		const {ViewerTypes=Viewers, EditorTypes=Editors, ...props}=this.props
		return (<Pagination {...{ViewerTypes,EditorTypes, ...props,type:undefined}}/>)
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
