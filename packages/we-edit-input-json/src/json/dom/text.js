import React, {Component} from "react"
import PropTypes from "prop-types"

export default ({Text})=>class extends Component{
    static displayName="text"
    static contextTypes={
        fonts: PropTypes.string,
		size: PropTypes.number,
		color: PropTypes.string,
		bold: PropTypes.bool,
		italic: PropTypes.bool,
    }

    render(){
        const {fonts,size,color,bold,italic}=this.context
        return <Text {...{fonts,size,color,bold,italic}} {...this.props}/>
    }
}
