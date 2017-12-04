import React, {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {compose,setDisplayName} from "recompose"

import Input from "we-edit/input"

import {IconButton as IconButton0} from "material-ui"

const withNoDoc=A=>compose(
	setDisplayName(A.displayName||"AWithNoDoc"),
	connect(({"we-edit":{active}})=>({noDoc:!!!active})),
)(({noDoc, dispatch, ...props})=>{
	if(noDoc===true)
		return (<A {...props} disabled={true}/>)
	return (<A {...props}/>)
})

export default withNoDoc

export const IconButton=withNoDoc(IconButton0)
