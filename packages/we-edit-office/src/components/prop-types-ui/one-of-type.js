import React from "react"
import PropTypes from "prop-types"
import base from "./base"
import Shape from "./shape"
import {fromJS} from "immutable"

/**
 * oneOfType has 2 scenarios
 * 1. shortcut or the whole shape
 * 2. choices 
 * ribbon and tree select first,
 * dialog select last,
 * or on-demand
 * or choices
 */
const clean=base.clean
export default class oneOfType extends base{
    static displayName="oneOfType"
    static propTypes={
        ...super.propTypes,
        i: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        choices: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string),PropTypes.bool]),
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

    iterate(i,$choice=`$${i}`){
        const $props=this.$props
        return this.types.map((a,i)=>{
            const possibleSpecifiedChoice=[`$${a.Type.props.type}`,`$${i}`]
            if(arguments.length!=0 && !possibleSpecifiedChoice.includes($choice)){
                return 
            }
            let theme=clean(this.theme,["i","types",'*',...possibleSpecifiedChoice])
            
            const {type, props:props0={}}=(()=>{
                if(React.isValidElement(a))
                    return a
                
                const choice=$props[possibleSpecifiedChoice.find(a=>a in $props)]
                if(choice){
                    if(React.isValidElement(choice)){
                        return choice
                    }else if(typeof(choice)=="object"){
                        theme=fromJS(theme,this.constructor.reviver).mergeDeep(fromJS(choice,this.constructor.reviver)).toJS()
                    }
                }

                return a.Type||{}
            })();

            const UIType=this.getUIType(type)
            return <UIType key={i} 
                {...clean(props0,Object.keys(theme))} 
                {...clean(this.props,["theme","i","types","typedShape",...possibleSpecifiedChoice])} 
                theme={theme}
                />
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
        const choices=this.choices
        if(!choices){
            let {i}=this.$props
            if(i==undefined){
                i=({"Dialog":this.types.length-1}[this.uiContext])||0
            }
            return this.iterate(i).filter(a=>!!a)[0]||null
        }

        if(choices===true)
            return this.iterate()

        const {value}=this.props
        const schema=choices.reduce((s,k)=>(s[k]=this.getType(k),s),{})
        return <Shape schema={schema} choices={choices} choice={value?.type}
            {...clean(this.props,["choice","choices","typedShape"])}
            theme={choices.reduce((s,k)=>(s[k]={type:false},s),{})}
            />
    }

    static isPrimitive(el,context){
        const instance=new this(el.props, context)
        return instance.render()?.props?.isPrimitive
    }
}