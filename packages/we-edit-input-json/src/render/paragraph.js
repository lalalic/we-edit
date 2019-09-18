import React, {Component} from "react"
import PropTypes from "prop-types"

export default ({Paragraph})=>class __$1 extends Component{
    static displayName="paragraph"
    static contextTypes={
        defaultStyle:PropTypes.shape({
			fonts:PropTypes.string,
			size:PropTypes.number,
			bold: PropTypes.bool,
			italic: PropTypes.bool,
		})
    }

    static childContextTypes={
        fonts: PropTypes.string,
		size: PropTypes.number,
		color: PropTypes.string,
		bold: PropTypes.bool,
		italic: PropTypes.bool
    }

    getChildContext(){
        return this.getDefaultStyle()
    }

    getDefaultStyle(){
        return {...(this.context.defaultStyle||{}), ...(this.props.defaultStyle||{})}
    }

    render(){
        const {defaultStyle, ...props}=this.props
        return <Paragraph defaultStyle={this.getDefaultStyle()} {...props}/>
    }
}
