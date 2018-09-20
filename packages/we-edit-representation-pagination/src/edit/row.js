import React,{Fragment,PureComponent} from "react"

import {connect,ACTION} from "we-edit"
import recomposable from "./recomposable"
import Base from "../row"


export default class extends recomposable(Base){
	clearComposed(){
		super.clearComposed()
		this.composedCells.push([])
	}
}
