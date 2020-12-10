
import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"
import {ReactQuery} from "we-edit"
import {withContext} from "recompose"

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
        const {context:{getComposedTemplate},props:{xhref, varables}}=this
        const template=getComposedTemplate(xhref)
        if(!template)
            return null
        const {props:{master}}=template
        return (
            <Fragment>
                {master && <Use xhref={master}/>}
                {template.createComposed2Parent(varables)}
            </Fragment>
        )
    }
}

/**
 * Template should keep instances for positioning
 */
export default class Template extends Frame{
    static displayName=Frame.displayName.replace("frame","template")
    static Use=Use
    static defaultProps={
        ...Frame.defaultProps,
        isTop:true,
    }

    static childContextTypes={
        ...Frame.childContextTypes,
        notifyVariable:PropTypes.func,
    }
    
    static isTemplate(a){
        return a?.isTemplate?.()
    }

    constructor(){
        super(...arguments)
        this.variables=this.props.variables||new Variables()
        this.notifyVariable=this.notifyVariable.bind(this)
        this.instances={}
    }

    getChildContext(){
        return {
            ...super.getChildContext(),
            notifyVariable:this.notifyVariable,
        }
    }

    isTemplate(){
        return true
    }

    notifyVariable(name){
        this.variables.add(name)
    }

    createComposed2Parent(variables){
        const content=super.createComposed2Parent()
        if(!variables || Object.keys(variables).length==0)
            return content

        if(this.variables.size==0)
            return content

        if(this.variables.equals(variables))
            return content

        const values=this.variables.getValues(variables)
        const replaced=this.replaceVariables(content,values, this.props.children)
        if(replaced==this.props.children || replaced==content)
            return content

        const variableId=this.variables.id(variables)
        const frameId=`${content.props['data-frame']}_${variableId}`
        if(new ReactQuery(replaced).findFirst("[data-content]").length){
            /**
             * replace variable in content, so don't need recompose
             */
            return React.cloneElement(replaced,{"data-frame":frameId})
        }

        const replaceableComposed=[]

        replaceableComposed[0]=(<Frame.Async {...{
            ...this.props,
            i:variableId,
            children:replaced, 
            onComposed(composed, frame){
                replaceableComposed[0]=composed
            }
        }}/>)

        return React.cloneElement(content,{children:replaceableComposed,"data-frame":frameId})
    }

    replaceVariables(composed, values){
        const replaced=Array.from(this.variables).reduce((element,a)=>
            a.replaceVariable(element,values,composed)
        ,<div>{this.props.children}</div>)
        return replaced.props.children
    }
}

class Variables extends Set{
    equals(variables){
        return true
    }

    getValues(variables){
        return {}
    }

    id(variables){
        return 1
    }
}
