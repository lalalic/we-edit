
import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"
import Frame from "./frame"

class Use extends Component{
    static displayName="template.use"
    static contextTypes={
        getComposedTemplate:PropTypes.func.isRequired
    }
    static childContextTypes={
        editable:PropTypes.any
    }

    getChildContext(){
        return {editable:false}
    }

    render(){
        const {context:{getComposedTemplate},props:{xhref}}=this
        const template=getComposedTemplate(xhref)
        if(!template)
            return null
        const {props:{master}}=template
        return (
            <Fragment>
                {master && <Use xhref={master}/>}
                {template.createComposed2Parent()}
            </Fragment>
        )
    }
}

export default class Template extends Frame{
    static Use=Use
    static defaultProps={
        ...Frame.defaultProps,
        isTop:true,
    }
    
    static isTemplate(a){
        return a?.isTemplate?.()
    }

    isTemplate(){
        return true
    }
}
