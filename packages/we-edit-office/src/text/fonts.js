import React, {Component} from "react"
import PropTypes from "prop-types"
import {compose,setDisplayName,getContext,withProps} from "recompose"
import {connect} from "react-redux"

import {SelectField,MenuItem,Subheader} from 'material-ui'
import ComboBox from "../components/combo-box"
import {when} from "we-edit"

const FontList=compose(
	getContext({muiTheme:PropTypes.object}),
	withProps(({muiTheme:{fonts}})=>({fonts})),
	when("fonts.loaded", fonts=>({fonts})),
	when("fonts.unloaded", ({muiTheme:{fonts}})=>({fonts}))
)(({fonts=[], value, changeFont:set, muiTheme, ...props})=>(
	<ComboBox
		style={{width:150}}
		value={value}
		dataSource={fonts}
		onChange={set}
		inputStyle={{paddingLeft:16}}
		underlineShow={false}
		{...props}
		/>
))

export default FontList
