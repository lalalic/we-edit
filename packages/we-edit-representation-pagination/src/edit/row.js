import React,{Fragment,PureComponent} from "react"

import {connect,ACTION} from "we-edit"
import recomposable from "./recomposable"
import Container from "./container"
import Base from "../row"


export default class extends recomposable(Base){
	clearComposed(){
		super.clearComposed()
		this.composedCells.push([])
	}

	createComposed2Parent({colGroups,width}){
		let row=super.createComposed2Parent(...arguments)
		return React.cloneElement(row, {
			children: row.props.children.map((cell,iCol)=>React.cloneElement(cell,{
				"data-content":this.composedCells[iCol].props.id,
				"data-type":"cell"
			}))
		})
	}
}
