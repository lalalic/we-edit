import React from "react"
import base from "./base"

/**
 * ribbon and tree select first,
 * dialog select last,
 * or on-demand
 */
export default class oneOfType extends base{
    renderDialog(){
        const {types, spread, ...props}=this.props
        const {type, props:{...props0}}=types[types.length-1].Type
        const UIType=this.Types[type]
        return <UIType {...props0} {...props}/>
    }

    renderRibbon(){
        if(this.props.spread){
            const {types, spread, ...props}=this.props
            return types.map(({Type:{type, props:{...props0}}},i)=>{
                const UIType=this.Types[type]
                return <UIType key={i} {...props0} {...props}/>
            })
        }
        return this.renderTree()
    }

    renderTree(){
        const {types:[{Type:{type, props:{...props0}}}], spread, ...props}=this.props
        const UIType=this.Types[type]
        return <UIType {...props0} {...props}/>
    }
}