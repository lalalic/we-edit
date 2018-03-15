import React from "react"
import SizeIconButton from "./size-icon-button"

const styles={
	checked:{
		background:"lightblue",
	},
	unchecked:{
	},
	disabled:{
	}
}

export default ({status, ...props, disabled=status=="disabled", style={}})=>(
	<SizeIconButton {...{disabled,style:{...styles[status],...style}}} {...props}/>
)
