import React, {Component} from "react"
import PropTypes from "prop-types"

import {Editors} from "we-edit-representation-pagination"

export  default class Table extends Component{
	static contextTypes={
		parent: PropTypes.object
	}
	
	render(){
		let {width,cols, ...props}=this.props
		let total=this.context.parent.nextAvailableSpace().width-10
		cols=cols.map(a=>parseInt(a*total/width))
		return <Editors.Table {...props} {...{width:total, cols}}/>
	}
}