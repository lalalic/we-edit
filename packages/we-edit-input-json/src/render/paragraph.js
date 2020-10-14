import React, {Component} from "react"
import PropTypes from "prop-types"

const trim=a=>{
    Object.keys(a).forEach(k=>{
        if(a[k]==undefined){
            delete a[k]
        }
    })
    return a
}

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

    static extractProps({fonts, size, bold, italic,color,  ...props}){
        return {defaultStyle:trim({fonts, size:size ? parseFloat(size) : undefined, bold, italic,color}), ...props}
    }

    getChildContext(){
        return this.getDefaultStyle()
    }

    getDefaultStyle(){
        return {...trim({...this.context.defaultStyle}), ...trim({...this.props.defaultStyle})}
    }

    render(){
        const {defaultStyle, ...props}=this.props
        return <Paragraph defaultStyle={this.getDefaultStyle()} {...props}/>
    }
}
