import React,{Fragment,PureComponent} from "react"

import {connect,ACTION} from "we-edit"
import editable from "./editable"
import Container from "./container"
import Base from "../row"


export default class extends editable(Base){
	clearComposed(){
		super.clearComposed()
		this.composedCells.push([])
	}

	nextSelectable(at){
        switch(at){
        case undefined:
            return 0
        case 0:
            return 1
        }
        return false
    }

    prevSelectable(at){
        switch(at){
        case undefined:
            return 1
        case 1:
            return 0
        }
        return false
    }
}
