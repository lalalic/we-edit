import React, {Component, PropTypes} from "react"

export const ACTION={
	SELECT: (start, at, end=start, endAt=at)=>({
		type:"selected"
		,payload: {
			start:{
				id:start
				,at
			}
			,end:{
				id:end
				,at:endAt
			}
		}
	})	
}

export const reducer=(state={}, {type,payload})=>{
	switch(type){
	case "selected":
		return ({...state, ...payload})
	}
	return state
}

export class Selection extends Component{
	render(){
		return null
	}
}
