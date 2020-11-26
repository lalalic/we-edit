import React, {Component} from "react"
import PropTypes from "prop-types"
export default ({Container})=>class Hyperlink extends Component{
    static displayName="hyperlink"
    static childContextTypes={
        isHyperlinkTOC:PropTypes.bool
    }

    getChildContext(){
        return {
            isHyperlinkTOC:(this.props.anchor||"").startsWith("_Toc")
        }
    }
    render(){
        return <Container {...this.props} type="hyperlink"/>
    }
}