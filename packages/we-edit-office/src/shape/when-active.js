import React,{} from "react"
import UnitInput from "../components/unit-input"
import WhenActive from "../components/when-active"

export default ({children, style, selection})=>{
	return (
		<WhenActive label="Shape">	
			<UnitInput/>
			<UnitInput/>
			
			{children}	
		</WhenActive>
	)
}