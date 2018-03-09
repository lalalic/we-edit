import React from "react"
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

export default ({status, ...props, disabled=status=="disabled", style={}})=>(
	<IconButton {...{disabled,style:{...styles[status],...style}}} {...props}/>
)
