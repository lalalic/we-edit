import React, {Component} from "react"
import PropTypes from "prop-types"


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
                    <Text id={`instr_${id}`} children={`{${instr}}`} {...this.context.style}/>
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

    render(){
        const {showCode}=this.props
        if(!showCode)
            return null
        
        return <Text {...{...this.context.style,...this.props, children:"{"}}/>
	}
}

export const FieldEnd=({Text})=>class FieldBegin extends Component{
	static displayName="fieldEnd"
    
    static contextTypes={
        style: PropTypes.object,
        getField: PropTypes.func,
    }

    render(){
        const {field:id}=this.props
        const field=this.context.getField(id)
        if(!field.showCode)
            return null
        
        return <Text {...{...this.context.style, ...this.props,children:"}"}}/>
	}
}
