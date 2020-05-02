import React,{PureComponent} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"

import {IconButton} from "material-ui"

export default class SizableIconButton extends PureComponent{
	static contextTypes={
		muiTheme:PropTypes.object,
		disabled:PropTypes.bool,
	}

	getStyle=memoize((style,size,padding,iconStyle, status)=>{
		const sizeIconButton=this.context.muiTheme.sizeIconButton
		style=style||{}
		iconStyle=iconStyle||{}
		
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

		return {style:{...style, ...styles[status]}, iconStyle}
	})

	render(){
		const {status,
			disabled=this.context.disabled || status=="disabled",
			size,padding,style,iconStyle, label, hint=label,
			...props}=this.props

		return <IconButton {...props} 
			{...this.getStyle(style,size,padding,iconStyle, status)}
			disabled={disabled} tooltip={hint}/>
	}
}
const styles={
	checked:{
		background:"lightblue",
	},
	unchecked:{
	},
	disabled:{
	}
}