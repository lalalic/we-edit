import React, {Component} from "react"
import PropTypes from "prop-types"

export default ({Document, Container,Frame})=>class extends Component{
    static displayName="document"
    static propTypes={
        defaultStyle:PropTypes.shape({
			fonts:PropTypes.string,
			size:PropTypes.number,
			bold: PropTypes.bool,
			italic: PropTypes.bool,
            color: PropTypes.string,
		})
    }

    static childContextTypes={
        defaultStyle:PropTypes.shape({
			fonts:PropTypes.string,
			size:PropTypes.number,
			bold: PropTypes.bool,
			italic: PropTypes.bool,
            color: PropTypes.string,
		})
    }

    getChildContext(){
        return{
            defaultStyle:this.props.defaultStyle
        }
    }

    render(){
        const {defaultStyle, ...props}=this.props
        return <Document {...props}/>
    }
}
