import React from "react"
import PropTypes from "prop-types"
import {compose, getContext} from "recompose"

import {Emitter} from "we-edit"

import {OutputInput} from "we-edit-output-input"

import ComboBox from "../components/combo-box"

function getSupporttedFormats(supports=Emitter.supports){
	return Object.keys(supports)
		.reduce((collected,k)=>{
			if(k){
				let {name,ext}=supports[k].defaultProps
				collected[k]=`${name} (*.${ext})`
			}
			return collected
		},{})
}

export default compose(
	getContext({doc:PropTypes.object})
)(({doc,value=doc ? doc.type : "",  ...props})=>(
	<ComboBox
		value={value}
		dataSource={getSupportedFormats()}
		{...props}
		/>
))
