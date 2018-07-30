import React,{PureComponent} from "react"
import PropTypes from "prop-types"
import {compose, mapProps,getContext,setDisplayName} from "recompose"

import {IconButton} from "material-ui"

const styles={
	checked:{
		background:"lightblue",
	},
	unchecked:{
	},
	disabled:{
	}
}

export const SizeIconButton=compose(
	setDisplayName("SizableIconButton"),
	getContext({muiTheme:PropTypes.object}),
)(({status, disabled=status=="disabled",
	size,padding,style={},iconStyle={}, muiTheme:{sizeIconButton}, label, hint=label,
	...props})=>{
	if(sizeIconButton){
		if(!size && sizeIconButton.size)
			size=sizeIconButton.size
		if(!padding && sizeIconButton.padding)
			padding=sizeIconButton.padding
	}
	if(!padding)
		padding=2
		
	if(size){
		style.width=style.height=size
		iconStyle.width=iconStyle.height=size-padding*2
		style.padding=padding
	}
	
	style={...style, ...styles[status]}
	
	return <IconButton {...props} {...{style,iconStyle}} tooltip={hint}/>
})

export default SizeIconButton