import React, {Component, PropTypes} from "react"

export const ACTION={
	SELECT: (id,start,end=start)=>({type:"selected", payload: {target:id,start,end}})
}

export const reducer=(state={}, {type,payload})=>{
	switch(type){
	case "selected":
		return Object.assign({},state,payload)
	}
	return state
}

export class Selection extends Component{
	render(){
	}
}
