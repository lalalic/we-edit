import React from "react"
import WhenActive from "../components/when-active"
export default ({children, style, selection})=>{
	return (
		<WhenActive label="Picture Format">
            {children}	
		</WhenActive>
	)
}