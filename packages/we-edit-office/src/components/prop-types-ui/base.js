import React, {PureComponent} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"
import {fromJS} from "immutable"
import PropTypesUI from "."
import { LabelField } from "./wrappers"


export default class base extends PureComponent{
    static displayName="any"
    static contextTypes={
        uiContext: PropTypes.string,
        PropTypes: PropTypes.object,
        set: PropTypes.func,
        propTypesUITheme: PropTypes.object,
        onItemClick: PropTypes.func,
        setting: PropTypes.func,
    }

    static propTypes={
        theme: PropTypes.object,//type self explained, {Dialog,Tree,Ribbon,Tab, ...}
        path: PropTypes.string,//set(path,name)
        value: PropTypes.any,
        name: PropTypes.string,
        label: PropTypes.string
    }

    get Types(){
        return {...PropTypesUI.Types,...this.Theme.$Types}
    }

    get Theme(){
        return this.context.propTypesUITheme||PropTypesUI.Theme
    }

    get path(){
        const {path=""}=this.props
        return path
    }
    
    get theme(){
        return this.getShapeTheme(this.props.theme)
    }

    get $props(){
        const {Dialog, Ribbon, Tree, Tab, name, path, ...theme}=this.theme
        return {...theme,...this.props}
    }

    get uiContext(){
        return this.props.uiContext||this.context.uiContext||"Dialog"
    }

    setting(){
        this.context.setting(...arguments)
    }

    /**
     * uiContext resolved, so don't return any uiContext 
     */
    getShapeTheme(theme){
        const Theme=this.Theme
        const reviver=PropTypesUI.reviver
        let merged=fromJS({},reviver)
        if(Theme[this.constructor.displayName]){
            const shapeTheme=Theme[this.constructor.displayName]
            merged=merged.mergeDeep(fromJS(shapeTheme,reviver))
            if(!React.isValidElement(shapeTheme?.[this.uiContext])){
                merged=merged.mergeDeep(fromJS(shapeTheme?.[this.uiContext]||{}))
            }
        }

        if(Theme[this.props.typedShape]){
            const typedShapeTheme=Theme[this.props.typedShape]
            merged=merged.mergeDeep(fromJS(typedShapeTheme||{},reviver))
            if(!React.isValidElement(typedShapeTheme?.[this.uiContext])){
                merged=merged.mergeDeep(fromJS(typedShapeTheme?.[this.uiContext]||{}))
            }
        }

        if(theme){
            merged=merged.mergeDeep(fromJS(theme,reviver))
            if(!React.isValidElement(theme?.[this.uiContext])){
                merged=merged.mergeDeep(theme?.[this.uiContext]||{})
            }
        }
        const {Dialog,Tree,Menu,Tab,Ribbon, ...mergedTheme}=merged.toJS()
        const context={Dialog,Tree,Menu,Tab,Ribbon}[this.uiContext]
        if(React.isValidElement(context)){
            mergedTheme[this.uiContext]=context
        }
        return mergedTheme
    }

    getUIType(type){
        if(!type || typeof(type)!="string")
            return type

        let i=type.indexOf("(")
        if(i!=-1){//oneOf(ColorShape)->ColorShape, shape(LineShape)->shape
            const typedShape=type.substring(i+1).replace(")","").trim()
            const baseShape=type.substring(0,i).trim()
            if(this.Types[typedShape])
                return this.Types[typedShape]
            if(this.Types[baseShape]){
                if(this.Theme[typedShape]){
                    const Type=props=>React.createElement(this.Types[baseShape],{typedShape,...props})
                    Type.defaultProps=this.Types[baseShape].defaultProps
                    Type.displayName=type
                    return Type
                }
                return this.Types[baseShape]
            }
        }
        return this.Types[type]||type
    }

    makePath(key){
        return `${this.path}${this.path ? "." : ""}${key}`
    }

    render(){
        const {uiContext, theme:{[uiContext]:show=true}}=this
        if(!show) 
            return null 
            
        if(React.isValidElement(show)){//to change type
            const UIType=this.getUIType(show.type)
            if(UIType){
                const {theme:{[uiContext]:_, ...theme}={}, typedShape, ...props}=this.props
                return <UIType {...{theme,...show.props,...props}}/>
            }
        }

        if(!(`render${uiContext}` in this)){
            return null
        }

        const rendered=this[`render${uiContext}`]()

        let wrapper=this.$props.wrapper
        if(typeof(wrapper)=="undefined")
            wrapper=this.getDefaultWrapper()
        if(wrapper){
            return React.cloneElement(wrapper, {children:rendered,host:this})
        }
        return rendered
    }

    getDefaultWrapper(){
        switch(this.uiContext){
            case "Dialog":
                if(this.$props.isPrimitive){
                    return <LabelField/>
                }
            default:
        }
    }



    set(path, value){
        const {onChange}=this.props
        if(onChange){
            onChange(value)
        }else{
            this.context.set(path,value)
        }
    }

    renderDialog(){
        return this.renderTree()
    }

    renderTree(){
        return null
    }

    renderRibbon(){
        return this.renderTree()
    }
}