
import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"
import Frame from "./frame"

class Use extends Component{
    static contextTypes={
        getComposedTemplate:PropTypes.func.isRequired
    }

    render(){
        const composedTemplate=this.context.getComposedTemplate(this.props.xhref)
        if(!composedTemplate)
            return null

        return (<Fragment>{composedTemplate.props.children}</Fragment>)
    }
}

export default class Template extends Frame{
    static Use=Use
    createComposed2Parent(){
        const {xhref,master}=this.props
        return (
            <symbol id={xhref}>
                {master ? <Use xhref={master}/> : null}
                {super.createComposed2Parent(...arguments)}
            </symbol>
        )
    } 
    static isTemplate(a){
        return a && a.type==="symbol"
    }
}
