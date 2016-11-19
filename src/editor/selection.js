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
const INIT_STATE={
	start:{
		id:0
		,at:0
	}
	,end:{
		id:0
		,at:0
	}
}
export const reducer=(state=INIT_STATE, {type,payload})=>{
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

export const isCursor=({start:{id,at}, end})=> id && id==end.id && at=end.at

export default Selection
