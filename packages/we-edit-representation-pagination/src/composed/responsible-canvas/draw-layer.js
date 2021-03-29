import React, {PureComponent} from "react"
import {connect, getUI, dom} from "we-edit"
import Shape from "../shape"
import Overlay from "./overlay"
export default connect(state=>{
    const {draw}=getUI(state)
    return {draw:draw||undefined}
})(class DrawLayer extends PureComponent{
    render(){
        const {props:{draw:{type, props:{children, ...props}={}}={}}}=this
        return type && React.createElement(Overlay[type]||type, props, this.normalize(children)) || null
    }

    normalize(children){
        if(typeof(children)!=="function")
            return children
        return state=>{
            const rendered=children(state)
            if(rendered?.type===dom.Shape){
                const {props:{geometry:d, outline, fill}}=rendered
                return React.createElement(Shape, {d,...outline,fill})
            }
            return rendered
        }
    }
})