import React, {Component} from "react"
import PropTypes from "prop-types"

import memoize from "memoize-one"
import Fields from "./categories"

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
    }

    getValue=memoize(instr=>parse(instr).execute())

    render(){
        const {showCode,display,instr}=this.props
        if(!showCode){
            const current=this.getValue(instr)
            if(current===display){
                return null
            }else{
                return <Text {...{...this.context.style,...this.props, color:"red", children:"!", transformComposed:a=>React.cloneElement(a,{"data-field":this.props.id})}}/>
            }
        }
        
        return <Text {...{...this.context.style,...this.props, children:"{",transformComposed:a=>React.cloneElement(a,{"data-field":this.props.id})}}/>
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
        
        return <Text {...{...this.context.style, ...this.props,children:"}",transformComposed:a=>React.cloneElement(a,{"data-field":id})}}/>
	}
}

//FieldName [...parameters] [\[@#*]] [\MERGEFORMAT|CHARFORMAT]
export function parse(instr){
    const [field, ...formats]=instr.trim().split("\\")
    const switches=formats.filter(a=>!formats[a.trim()[0]])
    const [command,...parameters]=field.split(/\s+/g)
    return {
        command,
        parameters:parameters.map(a=>a.trim()),
        formats:formats.map(a=>a.trim()), 
        switches:switches.map(a=>a.trim()), 
        execute(){
            return Fields.invoke(this)
        }
    }
}