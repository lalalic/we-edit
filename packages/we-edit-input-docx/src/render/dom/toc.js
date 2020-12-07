import React, {Component} from "react"
export default ({Container})=>class ToC extends Component{
    static displayName="ToC"
    render(){
        return <Container {...this.props}/>
    }
}