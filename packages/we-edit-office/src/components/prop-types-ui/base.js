import React, {PureComponent} from "react"
import PropTypes from "prop-types"
import {fromJS} from "immutable"
import PropTypesUI from "."
import { LabelField, Nest } from "./wrappers"

function clean(ob, keys=[]){
    const cloned={...ob}
    Object.keys(cloned).forEach(k=>{
        if(typeof(cloned[k])=="undefined" || keys.includes(k)){
            delete cloned[k]
        }
    })
    return cloned
}
export default class base extends PureComponent{
    static displayName="any"
    static contextTypes={
        uiContext: PropTypes.string,
        PropTypes: PropTypes.object,
        set: PropTypes.func,
        propTypesUITheme: PropTypes.object,
        setting: PropTypes.func,
        disabled: PropTypes.bool,
    }

    static propTypes={
        theme: PropTypes.object,//type self explained, {Dialog,Tree,Ribbon,Tab, ...}
        path: PropTypes.string,//set(path,name)
        value: PropTypes.any,
        name: PropTypes.string,
        label: PropTypes.string
    }

    static clean=clean

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

    get parentPath(){
        const keys=this.path.split(".")
        keys.pop()
        return keys.join(".")
    }
    
    get theme(){
        return this.getShapeTheme(this.props.theme)
    }

    get $props(){
        const {Dialog, Ribbon, Tree, Tab, name, path, key, label, ...theme}=this.theme
        if(label?.notUILabel || label?.props?.notUILabel || label===false){
            return {...theme,...this.props}
        } 

        return {...theme,label,...this.props}
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
                    return this.__createTypedShape(baseShape, typedShape, type)
                }
                return this.Types[baseShape]
            }
        }
        return this.Types[type]||type
    }

    /**cached, so react will not recreate instance */
    __createTypedShape(baseShape, typedShape, type) {
        this.adHocTypes=this.adHocTypes||{}
        if(type in this.adHocTypes){
            return this.adHocTypes[type]
        }

        const Type = props => React.createElement(this.Types[baseShape], { typedShape, ...props })
        Type.defaultProps = this.Types[baseShape].defaultProps
        Type.displayName = type
        return this.adHocTypes[type]=Type
    }

    makePath(key){
        return `${this.path}${this.path ? "." : ""}${key}`
    }

    isLink(el){
        const getTypedShape=type=>{
            const i=type.indexOf("(")
            return i==-1 ? null : type.substring(i+1).replace(")","").trim()
        }
        const {type, props:{typedShape=getTypedShape(type.displayName)}}=el
        if(typedShape && this.Theme[typedShape]){
            const TypedShape=this.Theme[typedShape]
            const link=TypedShape[this.uiContext]||TypedShape
            if(React.isValidElement(link) && link.type.isLink){
                return link
            }
        }
    }

    render(){
        const {uiContext, theme:{[uiContext]:show=true}, $props:{$presets, isPrimitive}}=this
        if(!show) 
            return null 
            
        const rendered=(()=>{
            const link=this.isLink({type:this.constructor, props:this.props})
            if(link){
                const {typedShape:_,...props}=this.props
                return React.cloneElement(link,...props)
            }

            //to change type
            if(React.isValidElement(show)){
                const UIType=this.getUIType(show.type)
                if(UIType){
                    const {theme:{[uiContext]:_, ...theme}={}, typedShape, ...props}=this.props
                    return <UIType {...{theme,...clean(show.props),...clean(props)}}/>
                }
            }

            if(isPrimitive && $presets){
                const {$presets:_2,style,...theme}=this.theme
                const {theme:_1, typedShape,$presets:_,...props}=this.props
                const UIType=this.getUIType($presets.type)
                return <UIType {...{...clean($presets.props,Object.keys(theme)),...props,theme}}/>
            }
    
            if(!(`render${uiContext}` in this)){
                return null
            }
    
            return this[`render${uiContext}`]()
        })();
        

        let wrapper=this.$props.wrapper
        if(typeof(wrapper)=="undefined")
            wrapper=this.getDefaultWrapper()
        
        if(Array.isArray(wrapper)){
            wrapper=<Nest wrappers={wrapper}/>
        }

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
        const {onChange}=this.$props
        if(onChange){
            onChange(value,this, path)
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