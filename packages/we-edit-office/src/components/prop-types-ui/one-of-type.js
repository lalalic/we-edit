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
    }

    get types(){
        const {types=[]}=this.$props
        return types.filter(a=>!!a.Type)
    }

    get choices(){
        let {choices=true, i}=this.$props
        if(i!=undefined)
            return
        
        if(choices===true){
            choices=this.types.map(({Type:{props:{type}}})=>type).filter(a=>!!a)
            if(choices.length==0)
                return true
        }

        return choices
    }

    getType(i){
        if(typeof(i)=="string"){
            return this.types.find(({Type:{props:{type:choice}}})=>choice==i)
        }
        return this.types[i]
    }

    iterate(){
        const {types, i , ...props}=this.$props
        return this.types.map((a,i)=>{
            const {type, props:{...props0}}=(()=>{
                if(props[`$${i}`]){
                    a=props[`$${i}`]
                    delete props[`$${i}`]
                }

                if(React.isValidElement(a))
                    return a
                return a.Type||{}
            })();
            const UIType=this.getUIType(type)

            return <UIType key={i} {...props0} {...props}/>
        })
    }

    renderMenu(){
        if(!this.choices){
            return super.renderMenu()
        }
        return this.iterate()
    }

    renderRibbon(){
        if(!this.choices){
            return super.renderRibbon()
        }
        return this.iterate()
    }

    renderTree(){
        const {types:_, value, ...props}=this.$props
        const choices=this.choices
        if(!choices){
            let {i}=this.$props
            if(i==undefined){
                i=({"Dialog":this.types.length-1}[this.uiContext])||0
            }
            const {type, props:{...props0}}=this.getType(i).Type
            const UIType=this.getUIType(type)
            return <UIType key={i} {...props0} value={value} {...props}/>
        }

        if(choices===true)
            return this.iterate()

        const schema=choices.reduce((s,k)=>(s[k]=this.getType(k),s),{})
        return <Shape schema={schema} 
            choices={choices} 
            choice={value?.type} 
            value={value} 
            {...props}
            theme={choices.reduce((s,k)=>(s[k]={type:false},s),{})}
            />
    }

    static isPrimitive(el,context){
        const instance=new this(el.props, context)
        return instance.render()?.props?.isPrimitive
    }
}