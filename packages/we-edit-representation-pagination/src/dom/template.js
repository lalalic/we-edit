
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
    static isTemplate(a){
        if(React.isValidElement(a)){
            return a.type==this || a.type=="symbol"
        }
        return a&& a.isTemplate && a.isTemplate()
    }

    isTemplate(){
        return true
    }

    shouldComponentUpdate(){
        return false
    }

    //since template is not updated, so no cache at all, it's ok if computed.lastComposed is empty
    recomposable_createComposed2Parent(){
        const {xhref,master}=this.props
        return (
            <symbol id={xhref}>
                {master ? <Use xhref={master}/> : null}
                {super.recomposable_createComposed2Parent(...arguments)}
            </symbol>
        )
    } 
    
    onAllChildrenComposed(){
        try{
            this.createComposed2Parent=()=>this
            super.onAllChildrenComposed()
        }finally{
            delete this.createComposed2Parent
        }
    }

    appendLastComposed(){
        const appended=super.appendLastComposed(...arguments)
        if(appended===true){
            this.onAllChildrenComposed()
        }
        return appended
    }
}
