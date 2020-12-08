import React, {Component} from "react"
import PropTypes from "prop-types"
import {ReactQuery} from "we-edit"
import memoize from "memoize-one"

import Field from "./fields"
import Context from "./context"

export const SimpleField=({Container})=>class SimpleField extends Component{
    static displayName="field"
    static contextTypes={
        notifyVariable: PropTypes.func,
    }

    constructor(){
        super(...arguments)
        this.replaceVariable=this.replaceVariable.bind(this)
    }

    getVariableDefinition=memoize(props=>{
        return {
            ...props,
            replaceVariable:this.replaceVariable
        }
    })  

    render(){
        const {context:{notifyVariable}, props}=this
        if(notifyVariable){
            notifyVariable(this.getVariableDefinition(this.props))
        }
        return <Container {...this.props}/>
    }

    replaceVariable(element, values, composed){
        const {props:{display,id}}=this
        const value=values[id]
        if(value==display)
            return element
        const $=new ReactQuery(element)
        const text=$.findFirst(`[id="${id}"]`).findFirst('text')
        return $.replace(text,React.cloneElement(text.get(0),{children:value})).get(0)
    }
}

export const FieldBegin=({Text})=>class FieldBegin extends Component{
	static displayName="fieldBegin"
    static contextTypes={
        style: PropTypes.object,
        notifyVariable: PropTypes.func,
    }

    constructor(){
        super(...arguments)
        this.replaceVariable=this.replaceVariable.bind(this)
    }

    getVariableDefinition=memoize(props=>{
        return {
            ...props,
            replaceVariable:this.replaceVariable
        }
    })  

    render(){
        const {context:{notifyVariable}, props}=this
        if(notifyVariable){
            notifyVariable(this.getVariableDefinition(this.props))
        }
        return <Text {...{
                        ...this.context.style,
                        ...this.props,
                        children:String.fromCharCode(0),
                    }}/>
    }
    
    replaceVariable(element, values, composed){
        const {props:{display,id}}=this
        const value=values[id]
        if(value==display)
            return element
        const $=new ReactQuery(element)
        const text=(all=>all[1+all.findIndex(a=>a.props.id==id)])($.find(`[id="${id}"],text`).toArray());
        return $.replace(text,React.cloneElement(text,{children:value})).get(0)
    }
}

export const FieldEnd=({Text})=>class FieldBegin extends Component{
	static displayName="fieldEnd"
    static contextTypes={
        style: PropTypes.object
    }
    
    render(){
        return <Text {...{
            ...this.context.style, 
            ...this.props,
            children:String.fromCharCode(0),
        }}/>
	}
}

export const InstrText=({Container,Text})=>class InstrText extends Component{
    static displayName="instrText"
    render(){
        return null
    }
}

export {Field, Context}