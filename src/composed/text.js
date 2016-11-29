import React, {Component, PropTypes} from "react"

export const Text=({children, contentWidth, whiteSpace, ...others})=>(
	<text style={{whiteSpace:"pre"}} {...others}>
	{
		children.reduce((s,a)=>{
			s.splice(s.length,0,...a.chars)
			return s
		},[]).join("")
	}	
	</text>
)

export default Text