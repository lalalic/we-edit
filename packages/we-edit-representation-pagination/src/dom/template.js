
import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"
import {ReactQuery} from "we-edit"

import Frame from "./frame"
import Container from "./container"

const {Locatable:{Locatorize}}=Frame.composables
const locatorize=Locatorize(class{}).prototype.locatorize

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
export default class extends Container{
    static childContextTypes={
        ...super.childContextTypes,
        notifyVariable:PropTypes.func,
        parent: PropTypes.object,
        variables: PropTypes.object,
        shouldContinueCompose: PropTypes.func,
    }

    constructor(){
        super(...arguments)
        this.state=this.state||{}
        this.variables=this.props.variables||new Variables()
        this.notifyVariable=this.notifyVariable.bind(this)
        this.composed=[]
    }

    notifyVariable(variable){
        this.variables.add(variable)
    }

    getChildContext(){
        return {
            notifyVariable:this.notifyVariable,
            parent:this.state.asyncer ? this : this.context.parent,
            variables: this.state.values,
            shouldContinueCompose(){
                return true
            }
        }
    }

    appendComposed(a){
        this.composed[this.variables.id(a.props.values)]=a
    }

    render(){
        const {state:{asyncer}, props:{hash,...props}}=this
        if(asyncer){
            const {values, children}=asyncer.props
            return <Template {...props} manager={this} children={children} hash={`${hash}${this.variables.id(values)}`} values={values}/>
        }else{
            return <Template {...this.props} manager={this}/>
        }
    }

    componentDidUpdate(){
        const {asyncer}=this.state
        if(!asyncer)
            return 
        asyncer.onComposed(asyncer.frame=this.composed[this.variables.id(asyncer.props.values)])
    }
}



class Template extends Frame{
    static Use=Use
    static displayName=super.displayName.replace("frame","template")
    
    static defaultProps={
        ...super.defaultProps,
        autoCompose2Parent:false,
    }

    get isTemplate(){
        return true
    }

    get variables(){
        return this.props.manager.variables
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

        if(new ReactQuery(replaced).findFirst("[data-content]").length){
            /**
             * replace variable in content, so don't need recompose
             */
            return replaced
        }

        return this.renderVariables(replaced, content, variables)
    }

    onAllChildrenComposed(){
        super.onAllChildrenComposed(...arguments)
    }

    renderVariables(replaced, content, variables) {
        const replaceableComposed = []

        replaceableComposed[0] = (<this.constructor.Async {...{
            ...this.props,
            children: replaced,
            values: variables,
            onComposed: (composed, frame, responsible) => {
                replaceableComposed[0] = composed
                this.onTemplated(variables,responsible)
            },
            childContext: locatorize.call({}, new Map()),
        }} />)

        return React.cloneElement(content, { children: replaceableComposed })
    }

    replaceVariables(composed, values){
        const replaced=Array.from(this.variables).reduce((element,a)=>
            a.replaceVariable(element,values,composed)
        ,<div>{this.props.children}</div>)
        return replaced.props.children
    }

    onTemplated(variables,responsible){
        if(!responsible)
            return 
        if(this.context.getComposer(responsible.cursor.id)?.closest(a=>a.props.id==this.props.id)){
            responsible.__updateSelectionStyle()
        }
    }

    /**
     * A template re-render trigger by setState
     */
    static Async=class extends super.Async{
        constructor(...args){
            super(...args)
            
        }
        render(){
            return this.state.composed||null
        }

        componentDidMount(){
            this.props.manager.setState({asyncer:this})
        }
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
