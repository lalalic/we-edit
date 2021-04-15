import React, {Component} from "react"
import PropTypes from "prop-types"
import {dom} from "we-edit"

const trim=a=>{
    Object.keys(a).forEach(k=>{
        if(a[k]==undefined){
            delete a[k]
        }
    })
    return a
}

export default ({Document})=>{
    return class __$1 extends Component{
        static displayName="document"
        static propTypes={
            defaultStyles:PropTypes.shape({
                text: dom.Document.TextStyleShape.isRequired
            })
        }

        static childContextTypes={
            defaultStyles: PropTypes.object
        }

        static defaultProps={
            canvas:<span/>,
        }

        static extractProps({fonts, size, bold, italic,color,  ...props}){
            return {defaultStyle:trim({fonts, size:size ? parseFloat(size) : undefined, bold, italic,color,}), ...props}
        }

        getChildContext(){
            const {defaultStyles:{text={fonts:"Arial",size:12},...styles}={}}=this.props
            return{
                defaultStyles:{
                    ...styles,
                    text
                }
            }
        }

        render(){
            const {defaultStyles, canvas, ...props}=this.props
            return <Document {...props}/>
        }
    }
}
