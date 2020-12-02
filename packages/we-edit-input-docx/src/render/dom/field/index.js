import React, {Component} from "react"
import PropTypes from "prop-types"
import Field from "./fields"
import Context from "./context"

export const SimpleField=({Container})=>class SimpleField extends Component{
    static displayName="field"
    
    render(){
        return <Container {...this.props}/>
    }
}

export const FieldBegin=({Text})=>class FieldBegin extends Component{
	static displayName="fieldBegin"
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