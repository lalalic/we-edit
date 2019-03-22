import React from "react"
import {ReactQuery} from "we-edit"
import {Cacheable} from "../../composable"
import editable from "./editable"
import Base from "../anchor"

export default Cacheable(class extends editable(Base){
	splittable=false
    getFocusShape(){
        var shape
        const target=new ReactQuery(this.computed.lastComposed[0])
            .findFirst(a=>{
                const {"data-content":id}=a.props
                if(id!=undefined && id!=this.props.id){
                    const composer=this.context.getComposer(id)
                    if(composer){
                        shape=composer.getFocusShape()
                        if(shape){
                            return true
                        }
                    }
                }
            })
        return React.cloneElement(shape,{absolute:true})
    }
})
