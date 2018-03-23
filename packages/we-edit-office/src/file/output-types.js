import React from "react"
import PropTypes from "prop-types"
import {compose, getContext} from "recompose"

import {Emitter} from "we-edit"

import ComboBox from "../components/combo-box"

export default compose(
	getContext({doc:PropTypes.object})
)(({doc,  ...props})=>(
	<ComboBox 
		value={"supported document types"}
		dataSource={
			Emitter.supports
				.map(({props:{name}})=>name)
				.filter(a=>!!a)
		} 
		{...props}
		/>
))