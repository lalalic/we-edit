import React, {Component} from "react"
import {connect, getUI} from "we-edit"
export default connect(state=>{
    const {scale}=getUI(state)
    return {scale}
})(class extends Component{
    static displayName="ScaleNotify"

    shouldComponentUpdate({scale}){
        return scale!==this.props.scale
    }

    render(){
        return null
    }

    componentDidUpdate(){
        this.props.notify(this.props.scale)
    }
})