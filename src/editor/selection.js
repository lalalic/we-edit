import React, {Component, PropTypes} from "react"

const DOMAIN="selection"
export const ACTION={
	SELECT: (start, at, end=start, endAt=at)=>({
		type:`${DOMAIN}/selected`
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
	,MOVE_RIGHT: a=>({type:`${DOMAIN}/MOVE_RIGHT`})
	,MOVE_LEFT: a=>({type:`${DOMAIN}/MOVE_LEFT`})
	,MOVE_UP: a=>({type:`${DOMAIN}/MOVE_UP`})
	,MOVE_DOWN: a=>({type:`${DOMAIN}/MOVE_DOWN`})

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
	case `${DOMAIN}/selected`:
		return ({...state, ...payload})
	case `${DOMAIN}/MOVE_DOWN`:
	case `${DOMAIN}/MOVE_RIGHT`:{
			let {start:{id,at},end}=state
			at++
			return {start:{id,at}, end:{id,at}}
		}
	case `${DOMAIN}/MOVE_UP`:
	case `${DOMAIN}/MOVE_LEFT`:{
			let {start:{id,at},end}=state
			at--
			return {start:{id,at}, end:{id,at}}
		}
	}
	return state
}

export class Selection extends Component{
	render(){
		return null
	}
}

export default Selection
