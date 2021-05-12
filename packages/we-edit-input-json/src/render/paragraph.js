import React, {Component} from "react"
import PropTypes from "prop-types"

export default ({Paragraph})=>class __$1 extends Component{
    static displayName="paragraph"
    static contextTypes={
        defaultStyles: PropTypes.object,
        numbering: PropTypes.object,
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
        const {numbering,indent={},...props}=this.props
        if(numbering){
            const {indent:left=0,hanging=0}=props.numbering=this.context.numbering.get(numbering)
            indent.left=left
            indent.firstLine=-hanging
        }
        props.indent=indent
        return <Paragraph {...this.context.defaultStyles.paragraph} {...props} defaultStyle={this.getDefaultStyle()} />
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
