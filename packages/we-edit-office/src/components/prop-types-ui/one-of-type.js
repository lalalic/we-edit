import React from "react"
import PropTypes from "prop-types"
import base from "./base"

/**
 * ribbon and tree select first,
 * dialog select last,
 * or on-demand
 */
export default class oneOfType extends base{
    static displayName="oneOfType"
    static propTypes={
        ...super.propTypes,
        spread: PropTypes.bool,//Ribbon only, render all types for choice
    }

    get types(){
        const {types=[]}=this.$props
        return types.filter(a=>!!a.Type)
    }

    renderDialog(){
        const {types:_, i=this.types.length-1, spread, ...props}=this.$props
        const {type, props:{...props0}}=this.types[i].Type
        const UIType=this.getUIType(type)
        return UIType&&<UIType {...props0} {...props}/>
    }

    renderRibbon(){
        const {types:_, spread, ...props}=this.$props
        if(!spread)
            return this.renderTree()
        
        return this.types.map((a,i)=>{
            const {type, props:{...props0}}=(()=>{
                if(props[`$type${i}`]){
                    a=props[`$type${i}`]
                    delete props[`$type${i}`]
                }

                if(React.isValidElement(a))
                    return a
                return a.Type||{}
            })();
            const UIType=this.getUIType(type)
            return UIType && <UIType key={i} {...props0} {...props}/>
        })
    }

    renderTree(){
        const {types:_, i=0, spread, ...props}=this.$props
        const {Type:{type, props:{...props0}}}=this.types[i]
        const UIType=this.getUIType(type)
        return UIType && <UIType {...props0} {...props}/>
    }

    renderMenu(){
        return this.renderRibbon()
    }
}