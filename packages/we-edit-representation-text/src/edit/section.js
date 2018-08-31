import React, {Component} from "react"
import PropTypes from "prop-types"
import {Editors} from "we-edit-representation-pagination"


export default class extends Component{
	static contextTypes={
		parent: PropTypes.object
	}
	
	render(){
		const {pgSz,pgMar, cols, ...props}=this.props
		const {width}=this.context.parent.viewport
		const margin={top:0,bottom:0,left:10,right:30,header:0,footer:0}
		const size={height:Number.MAX_SAFE_INTEGER,width:width}
		
		return <Editors.Section {...props} pgSz={size} pgMar={margin} />
	}
}