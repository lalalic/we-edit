import React,{Component} from "react"
import PropTypes from "prop-types"

export default ({Frame})=>class HeaderFooter extends Component{
    static displayName="headerFooter"
    
    static contextTypes={
        headerFooterWidth: PropTypes.number
    }

    render(){
        return <Frame {...this.props} width={this.context.headerFooterWidth}/>
    }
}