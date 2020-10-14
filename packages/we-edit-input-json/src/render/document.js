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

export default ({Document})=>class __$1 extends Component{
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

    static extractProps({fonts, size, bold, italic,color,  ...props}){
        return {defaultStyle:trim({fonts, size:size ? parseFloat(size) : undefined, bold, italic,color,}), ...props}
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
