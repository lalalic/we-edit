import React,{Fragment,PureComponent} from "react"

import {editify,connect,ACTION} from "we-edit"
import recomposable from "./recomposable"
import Base from "../row"


export default class extends editify(recomposable(Base)){
	clearComposed(){
		super.clearComposed()
		this.composedCells.push([])
	}
}
