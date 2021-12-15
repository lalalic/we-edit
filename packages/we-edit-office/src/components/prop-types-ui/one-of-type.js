import React from "react"
import PropTypes from "prop-types"
import base from "./base"
import Shape from "./shape"

/**
 * oneOfType has 2 scenarios
 * 1. shortcut or the whole shape
 * 2. choices 
 * ribbon and tree select first,
 * dialog select last,
 * or on-demand
 * or choices
 */
export default class oneOfType extends base{
    static displayName="oneOfType"
    static propTypes={
        ...super.propTypes,
        i: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        choices: PropTypes.oneOfType(PropTypes.arrayOf(PropTypes.string),PropTypes.bool),
        spread: PropTypes.bool,//Ribbon only, render all types for choice
    }

    get types(){
        const {types=[]}=this.$props
        return types.filter(a=>!!a.Type)
    }

    get choices(){
        let {choices, i}=this.$props
        if(i!=undefined || choices===false)
            return
        
        if(choices===true){
            return true
        }

        if(choices?.length>1){
            return choices
        }
    }

    getType(i){
        if(typeof(i)=="string"){
            return this.types.find(({Type:{props:{type:choice}}})=>choice==i)
        }
        return this.types[i]
    }

    renderRibbon(){
        const {types:_, spread, ...props}=this.$props
        if(!spread)
            return this.renderTree()
        
        return this.types.map((a,i)=>{
            const {type, props:{type:kind=`$type${i}`,...props0}}=(()=>{
                if(props[kind]){
                    a=props[kind]
                    delete props[kind]
                }

                if(React.isValidElement(a))
                    return a
                return a.Type||{}
            })();
            const UIType=this.getUIType(type)
            return UIType && <UIType key={i} {...props0} {...props}/>
        })
    }

    iterate(){
        const {types, i, spread,}=this.props
        return this.types.map((a,i)=>{
            const {type, props:{type:kind=`$type${i}`,...props0}}=(()=>{
                if(props[kind]){
                    a=props[kind]
                    delete props[kind]
                }

                if(React.isValidElement(a))
                    return a
                return a.Type||{}
            })();
            const UIType=this.getUIType(type)
            return <UIType key={kind} {...props0} {...props}/>
        })
    }

    renderTree(){
        let {types:_, i, spread, value, ...props}=this.$props
        if(i==undefined && this.choices){
            const items=this.types.map((a,i)=>{
                const {type, props:{type:kind=`$type${i}`,...props0}}=(()=>{
                    if(props[kind]){
                        a=props[kind]
                        delete props[kind]
                    }
    
                    if(React.isValidElement(a))
                        return a
                    return a.Type||{}
                })();
                const UIType=this.getUIType(type)
                return <UIType key={kind} {...props0} {...props}/>
            })

         /*
            const schema=choices.reduce((s,k)=>(s[k]=this.getType(k),s),{})
            return <Shape schema={schema} 
                choices={choices} 
                choice={value?.type} 
                value={value} 
                {...props}
                theme={choices.reduce((s,k)=>(s[k]={type:false},s),{})}
                />
                */
        }

        if(i==undefined){
            i=({"Dialog":this.types.length-1}[this.uiContext])||0
        }
        const {type, props:{...props0}}=this.getType(i).Type
        const UIType=this.getUIType(type)
        return <UIType key={i} {...props0} value={value} {...props}/>
    }

    renderMenu1(){
        return this.renderRibbon()
    }

    static isPrimitive(el,context){
        const instance=new this(el.props, context)
        return instance.render()?.props?.isPrimitive
    }
}