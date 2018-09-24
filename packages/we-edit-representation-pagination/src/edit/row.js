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

	createComposed2Parent(){
		return super.createComposed2Parent(...arguments)
	}
}
