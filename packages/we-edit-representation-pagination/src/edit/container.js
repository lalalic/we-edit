import React from "react"
import {Container} from "../all"
import recomposable from "./recomposable"

export default class extends recomposable(Container){
    getComposeType(){
        return this.props.type || super.getComposeType()
    }
    
    appendComposed(element){
        super.appendComposed(this._containerize(element))
    }
}
