import React,{Component} from "react"
import PropTypes from "prop-types"

export default ({Frame},displayName="headerFooter")=>class HeaderFooter extends Component{
    static displayName=displayName
    
    static contextTypes={
        headerFooterWidth: PropTypes.number
    }

    render(){
        return <Frame {...this.props} width={this.context.headerFooterWidth}/>
    }
}