import React, {Component} from "react"
import PropTypes from "prop-types"
import {compose,setDisplayName,getContext,withProps} from "recompose"

import {SelectField,MenuItem,Subheader} from 'material-ui'
import ComboBox from "../components/combo-box"
import {when} from "we-edit"

const FontList=compose(
	setDisplayName("FontList"),
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
		inputStyle={{border:"1px solid lightgray"}}
		underlineShow={false}
		{...props}
		/>
))

export default FontList
