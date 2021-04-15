import React, {Component} from "react"
import PropTypes from "prop-types"

export default ({Paragraph})=>class __$1 extends Component{
    static displayName="paragraph"
    static contextTypes={
        defaultStyles: PropTypes.object
    }

    static childContextTypes={
        defaultStyles: PropTypes.object,
    }

    getChildContext(){
        const {defaultStyles:{text, ...defaultStyles}}=this.context
        return {
            defaultStyles:{
                ...defaultStyles,
                text:this.getDefaultStyle()
            }
        }
    }

    getDefaultStyle(){
        return {...trim({...this.context.defaultStyles.text}), ...trim({...this.props.defaultStyle})}
    }

    render(){
        return <Paragraph {...this.context.defaultStyles.paragraph} {...this.props} defaultStyle={this.getDefaultStyle()} />
    }

    static extractProps({fonts, size, bold, italic,color,  ...props}){
        return {defaultStyle:trim({fonts, size:size ? parseFloat(size) : undefined, bold, italic,color}), ...props}
    }
}

const trim=a=>{
    Object.keys(a).forEach(k=>{
        if(a[k]==undefined){
            delete a[k]
        }
    })
    return a
}
