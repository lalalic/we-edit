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

export const ableExceed=pieces=>pieces.reduce((state,a)=>state && a.type.ableExceed(),true)

export default Object.assign(Text,{ableExceed})