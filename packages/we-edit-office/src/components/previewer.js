import React,{Component} from "react"
import {Viewers} from "we-edit-representation-pagination"


export default class Previewer extends Component{
    render(){
        const {children, style}=this.props
        const doc=this.transform(children)
        return React.cloneElement(doc, {canvas:<Canvas style={style}/>, id:"root"})
    }

    transform(el,id=0){
        if(!el)
            return el

        if(Array.isArray(el))
            return el.map(a=>this.transform(a,id))
        
        if(React.isValidElement(el)){
            const {type, props:{children}}=el
            if(typeof(type)=="string"){
                const Type=type[0].toUpperCase()+type.substring(1)
                if(Viewers[Type]){
                    return React.createElement(Viewers[Type],{id: id++,...el.props, children:this.transform(children,id)})
                }
            }
        }
        return el
    }
}

class Canvas extends Component{
    render(){
        const {document, style}=this.props
        const composed=document.pages[0].createComposed2Parent()
        const {width,height}=composed.props
        return <svg style={{...style}} viewBox={`0 0 ${parseInt(width)} ${parseInt(height)}`}>{composed}</svg>
    }
}
