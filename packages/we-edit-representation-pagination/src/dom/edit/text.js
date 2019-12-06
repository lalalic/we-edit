
import React from "react"
import editable from "./editable"
import Base from "../text"
import {Cacheable} from "../../composable"

//cache doesn't help on performance
const Super=editable(Base)
export default class __$1 extends Super{
    render(){
        if(this.text.length==0){
            this.appendComposed({
                ...this.defaultStyle,
                width:0,
                minWidth:0,
                "data-endat":0,
                children: ""
            })

            this.onAllChildrenComposed()
            return null
        }
        return super.render()
    }
}
