
import React from "react"
import editable from "./editable"
import Base from "../text"
import {Cacheable} from "../composable"

//cache doesn't help on performance
const Super=editable(Base)
export default class extends Super{
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

    appendComposed(props){
        if(props.children==" "){
            props={...props,children:String.fromCharCode(0x00b7)}
        }
        return super.appendComposed(props)
    }

    nextCursorable(id,at){
        if(this.text.length-1>at){
            return {id,at:at+1}
        }
		return super.nextCursorable(...arguments)
    }

    prevCursorable(id, at){
        if(at>0){
            return {id,at:at-1}
        }
        return super.prevCursorable(...arguments)
    }

	position(id,at){
        const {fontSize, fontFamily,height,descent}=this.measure.defaultStyle
        const paragraph=this.closest("paragraph").props.id
		const position=this.context.getComposer(paragraph).position(id,at)
		return {
			id,at,
			fontSize, fontFamily,height,descent,
			...position
		}
	}
}
