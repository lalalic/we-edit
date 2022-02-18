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
 * if there's value, props.$choice should be called to get choice
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
        let {choices, i}=this.$props
        if(i!=undefined)
            return
        
        if(choices==undefined){
            choices=this.types.map(({Type:{props:{choice}}})=>choice).filter(a=>!!a)
            if(choices.length==0)
                return false
        }

        return choices
    }

    get choice(){
        const {choices, $props:{$choice, value}}=this
        return choices && $choice?.(value)
    }

    getType(i){
        if(typeof(i)=="string"){
            return this.types.find(({Type:{props:{choice}}})=>choice==i)
        }
        return this.types[i]
    }

    renderForType(a,i=this.types.indexOf(a)){
        const $props=this.$props
        const possibleSpecifiedChoice=[`$${a.Type.props.choice}`,`$${i}`]
        
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
        const typeProps=clean({...props0},Object.keys(theme))
        const instanceProps=clean({...this.props},["theme","i","types","typedShape","$choice",...possibleSpecifiedChoice])
        
        if(this.choice){
            if(this.choice!=a.Type.props.choice){
                delete instanceProps.value
            }else{
                instanceProps.status="checked"
            }
        }

        return <UIType key={i} {...typeProps} {...instanceProps} theme={theme}/>
    }

    iterate(){
        return this.types.map((a,i)=>this.renderForType(a,i))
    }

    renderForShortcut(){
        const {i=this.types.length-1}=this.$props
        const type=this.getType(i)
        return type ? this.renderForType(type) : null
    }

    renderMenu(){
        if(!this.choices){
            return this.renderForShortcut()
        }
        return this.iterate()
    }

    renderRibbon(){
        if(!this.choices){
            return this.renderForShortcut()
        }
        return this.iterate()
    }

    renderTree(){
        const choices=this.choices
        if(!choices){
            return this.renderForShortcut()
        }

        const {value, $choice}=this.$props
        const choice=$choice?.(value)
        const schema=choices.reduce((s,k)=>(s[k]=this.getType(k),s),{})
        return <Shape
            {...clean(this.props,["choice","typedShape","types"])}
            schema={schema} choices={choices} value={{[choice]:value}}
            theme={choices.reduce((s,k)=>(s[k]={type:false},s),{})}
            />
    }

    static isPrimitive(el,context){
        const instance=new this(el.props, context)
        return instance.render()?.props?.isPrimitive
    }
}