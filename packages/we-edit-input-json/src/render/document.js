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
                    },
                    get:({id,level=0,...props})=>{
                        const {numberings={}}=this.props
                        const numbering=numberings[id]
                        const {i=0, ...style}=Document.NumberingShape.normalize({...numbering[level],...props})
                        style.label=style.label.replace(/\%(\d+)/g,(a,ith)=>{
                            const {format="decimal",start=1,i=0}=numbering[parseInt(ith)-1]||{}
                            return Numberings[format](i+start-1)
                        })
                        numbering[level].i=i+1
                        return style
                    }
                }
            }
        }

        render(){
            const {defaultStyles, ...props}=this.props
            return <Document {...props}/>
        }
    }
}

const Numberings={
    decimal(n){
		return n+1
	},

	lowerLetter(n){
		return String.fromCharCode("a".charCodeAt(0)+n)
	},
	
	upperLetter(n){
		return String.fromCharCode("A".charCodeAt(0)+n)
	},
	
	lowerRoman(n){
		return Roman[n].toLowerCase()
	},
	
	upperRoman(n){
		return Roman[n]
	},

    chinese(n){
        return Chinese[n]
    },
}

const Roman=["I","II","III","IV","V","VI","VII","VIII","IX"]
const Chinese=["一","二","三","四","五","六","七","八","九","十"]