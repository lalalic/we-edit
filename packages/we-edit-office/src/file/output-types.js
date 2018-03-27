import React from "react"
import PropTypes from "prop-types"
import {compose, getContext} from "recompose"

import {Emitter} from "we-edit"

import {OutputInput} from "we-edit-output-input"

import ComboBox from "../components/combo-box"

export default compose(
	getContext({doc:PropTypes.object})
)(({doc,value=doc ? doc.type : "",  ...props})=>(
	<ComboBox 
		value={value}
		dataSource={
			Emitter.supports
				.map(({props:{name}})=>name||value)
				.filter(a=>!!a)
		} 
		{...props}
		/>
))