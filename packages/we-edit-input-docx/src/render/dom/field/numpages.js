import React,{Component} from "react"

export default class extends Component{
    static displayName="numpages"
    render(){
        const {children, getValue}=this.props
        return React.cloneElement(children,{children:getValue()})
    }
}