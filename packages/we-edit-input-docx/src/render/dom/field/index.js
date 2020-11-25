import React, {Component} from "react"
import PropTypes from "prop-types"
import {getFile} from "we-edit"

import memoize from "memoize-one"
import Field from "./fields"
import Context from "./context"

export const SimpleField=({Container})=>class SimpleField extends Component{
    static displayName="simpleField"
    static contextTypes={
        style: PropTypes.object,
    }

    render(){
        const {showCode, id, instr}=this.props
        if(showCode){
            return (
                <Container {...this.props}>
                    <Text id={`instr_${id}`} children={`{${instr}}`} {...this.context.style} transformComposed={a=>React.cloneElement(a,{"data-field":id})}/>
                </Container>
            )
        }

        return <Container {...this.props}/>
    }
}

export const FieldBegin=({Text})=>class FieldBegin extends Component{
	static displayName="fieldBegin"
    
    static contextTypes={
        style: PropTypes.object,
        getField: PropTypes.func,
        activeDocStore: PropTypes.object
    }

    getField=memoize(instr=>Field.create(instr))

    render(){
        const {showCode,display,instr,id}=this.props
        const text=<Text {...{
                        ...this.context.style,
                        ...this.props,
                        transformComposed:a=>React.cloneElement(a,{"data-field":this.props.id}),
                        children:""
                    }}/>
        if(!showCode){
            return text
            const current=this.getField(instr).execute(new Context(this.context.activeDocStore.getState(),id))
            if(current===display){
                return text
            }else{
                return React.cloneElement(text,{color:"red", children:"!"})
            }
        }
        
        return React.cloneElement(text,{color:"red", children:"{"})
	}
}

export const FieldEnd=({Text})=>class FieldBegin extends Component{
	static displayName="fieldEnd"
    
    static contextTypes={
        style: PropTypes.object,
        getField: PropTypes.func,
    }

    render(){
        const id=this.props.id.replace(/^endField/,"")
        const field=this.context.getField(id)
        if(!field.showCode)
            return null
        
        return <Text {...{...this.context.style, ...this.props,children:"}",color:"red",transformComposed:a=>React.cloneElement(a,{"data-field":id})}}/>
	}
}

export {Field, Context}