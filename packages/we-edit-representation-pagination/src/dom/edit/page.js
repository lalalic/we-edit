import React from "react"
import Frame from "./frame"

export default class extends Frame{
	defineProperties(){
		super.defineProperties()
		Object.defineProperties(this,{
			composedHeight:{
				enumerable:false,
				configurable:false,
				get(){
					return Math.max(...this.columns.map(column=>column.y+(column.height-column.availableHeight)))
				}
			},
		})
	}

	createComposed2Parent(){
		debugger
		const {props:{i:key,width,height,margin}}=this
		const rendered=React.cloneElement(super.createComposed2Parent(),{key,width,height,margin})

		return Object.assign(this.clone(),{
			render(){
				debugger
				return rendered
			}
		})
	}
}
