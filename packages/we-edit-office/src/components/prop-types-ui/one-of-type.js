import React from "react"
import PropTypes from "prop-types"
import base from "./base"

/**
 * ribbon and tree select first,
 * dialog select last,
 * or on-demand
 */
export default class oneOfType extends base{
    static propTypes={
        ...super.propTypes,
        spread: PropTypes.bool,//Ribbon only, render all types for choice
    }

    get types(){
        const {types=[]}=this.$props
        return types.filter(a=>!!a.Type)
    }

    renderDialog(){
        const {types:_, spread, ...props}=this.$props
        const {type, UIType=this.getUIType(type), props:{...props0}}=this.types[this.types.length-1].Type
        return <UIType {...props0} {...props}/>
    }

    renderRibbon(){
        if(this.props.spread){
            const {types:_, spread, ...props}=this.$props
            return this.types.filter(a=>!!a.Type)
                .map(({Type:{type, UIType=this.getUIType(type),props:{...props0}}},i)=>{
                    return <UIType key={i} {...props0} {...props}/>
                })
        }
        return this.renderTree()
    }

    renderTree(){
        const {types:_, spread, ...props}=this.$props
        const [{Type:{type, UIType=this.getUIType(type), props:{...props0}}}]=this.types
        return <UIType {...props0} {...props}/>
    }
}