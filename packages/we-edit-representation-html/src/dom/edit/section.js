import React, {Component} from "react"
import PropTypes from "prop-types"
import {Editors} from "we-edit-representation-pagination"


export default class extends Component{
	static contextTypes={
		parent: PropTypes.object,
		wrap: PropTypes.bool,
		margin: PropTypes.object
	}

	render(){
		const {wrap=true,margin,parent}=this.context
		const {page, create, ...props}=this.props
		const size={
			height:Number.MAX_SAFE_INTEGER,
			width:wrap ? parent.viewport.width : Number.MAX_SAFE_INTEGER
		}

		return <Editors.Section
			{...props}
			page={{
				...size,
				margin,
			}}/>
	}
}
