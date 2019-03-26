import React, {Component} from "react"
import PropTypes from "prop-types"
import {Editors} from "we-edit-representation-pagination"


export default class extends Component{
	static contextTypes={
		parent: PropTypes.object,
		wrap: PropTypes.bool,
		margin: PropTypes.shape({
			left: PropTypes.number,
			right: PropTypes.number
		})
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
				margin:{top:0,bottom:0,left:0,right:0,...margin}
			}}/>
	}
}
