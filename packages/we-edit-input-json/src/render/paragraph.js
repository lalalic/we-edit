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
       return <Paragraph {...this.context.defaultStyles.paragraph} {...this.props} defaultStyle={this.getDefaultStyle()} />
    }

    static createElement(el,content){
        const {numbering,hash,indent}=el.props
        if(!numbering){
            return el
        }
        const {id,level=0}=numbering
        const {format,label,indent:left=0,hanging=0,...style}=Paragraph.NumberingShape.normalize({...content.getIn(["root","props","numberings",id,level])?.toJS(),...numbering})
        if(format==="bullet"){
            style.label=label
        }
        return React.cloneElement(el,{
            hash:`${hash}-${content.getIn(["root","props","numberings",id]).hashCode()}`,
            numbering:style,
            indent:{...indent,left,firstLine:-hanging}
        })
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
