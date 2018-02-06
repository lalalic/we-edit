import React, {Component} from "react"
import PropTypes from "prop-types"
import {compose,setDisplayName,getContext,mapProps} from "recompose"
import {connect} from "react-redux"

import {SelectField,MenuItem,Subheader} from 'material-ui'

import Fonts from "fonts"

const FontList=({fonts=Fonts.names(), value, changeFont:set})=>(
	<SelectField 
		style={{width:150}}
		value={value}
		onChange={(e,i,value)=>set(value)}>
		<Subheader>All Fonts</Subheader>
	{
		fonts.sort().map(a=>(
			<MenuItem key={a} value={a} 
				primaryText={<span style={{fontFamily:a}}>{a}</span>}
				/>
			))
	}
	</SelectField>
)

export default FontList