import React, {Component} from "react"
import PropTypes from "prop-types"
import {dom} from "we-edit"

export default ({Document})=>{
    return class __$1 extends Component{
        static displayName="document"
        static propTypes={
            defaultStyles:PropTypes.shape({
                text: dom.Document.TextStyleShape.isRequired
            })
        }

        static childContextTypes={
            defaultStyles: PropTypes.object,
            numbering: Document.childContextTypes.numbering,
        }

        getChildContext(){
            const {defaultStyles:{text={fonts:"Arial",size:12},...styles}={}}=this.props
            return{
                defaultStyles:{
                    ...styles,
                    text
                },
                numbering:{
                    reset:()=>{
                        if(this.props.numbering){
                            Object.values(this.props.numbering).forEach(levels=>levels.forEach(level=>level && (delete level.i)))
                        }
                        console.log("numbering reset")
                    },
                    get:({id,level=0,...props},paragraph)=>{
                        const {numberings={}}=this.props
                        const numbering=numberings[id]
                        let {i=0, label}={...numbering[level],...props}
                        label=label.replace(/\%(\d+)/g,(a,ith)=>{
                            const {format="decimal",start=1,i=0}=numbering[parseInt(ith)-1]||{}
                            return Document.numberings[format](i+start-1)
                        })
                        numbering[level].i=i+1
                        console.log(`numbering get for paragraph[${paragraph}]`)
                        return label
                    },
                }
            }
        }

        render(){
            const {defaultStyles, ...props}=this.props
            return <Document {...props}/>
        }
    }
}