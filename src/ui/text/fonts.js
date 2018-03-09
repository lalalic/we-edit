import React, {Component} from "react"
import PropTypes from "prop-types"
import {compose,setDisplayName,getContext,mapProps} from "recompose"
import {connect} from "react-redux"

import {SelectField,MenuItem,Subheader} from 'material-ui'
import ComboBox from "we-edit-ui/components/combo-box"

import Fonts from "fonts"

const FontList=({fonts=Fonts.names().sort(), value, changeFont:set, ...props})=>(
	<ComboBox
		style={{width:150}}
		value={value}
		dataSource={fonts}
		onChange={set}
		inputStyle={{textAlign:"center"}}
		underlineShow={false}
		{...props}
		/>
)

export default FontList