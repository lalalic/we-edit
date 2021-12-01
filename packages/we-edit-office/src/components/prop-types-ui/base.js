import React, {PureComponent} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"
import {fromJS} from "immutable"
import Theme from "./theme"
import PropTypesUI from "."

export default class base extends PureComponent{
    static displayName="any"
    static contextTypes={
        uiContext: PropTypes.string,
        PropTypes: PropTypes.object,
        set: PropTypes.func,
        onEvent: PropTypes.func,
    }

    static propTypes={
        theme: PropTypes.object,//type self explained, {Dialog,Tree,Ribbon,Tab, ...}
        path: PropTypes.string,//set(path,name)
        value: PropTypes.any,
        name: PropTypes.string,
        label: PropTypes.string,
        onEvent: PropTypes.func,//(name,data)=>{}
    }

    get Types(){
        return this.context.PropTypes||PropTypesUI.Types
    }

    get path(){
        const {path=""}=this.props
        return path
    }
    get theme(){
        return this.getShapeTheme()
    }

    get $props(){
        const {Dialog, Ribbon, Tree, Tab, ...theme}=this.theme
        return {...theme,...this.props}
    }

    get uiContext(){
        return this.props.uiContext||this.context.uiContext||"Dialog"
    }

    /**
     * uiContext resolved, so don't return any uiContext 
     */
    getShapeTheme=memoize(()=>{
        let merged=fromJS({})
        if(Theme[this.constructor.displayName]){
            const shapeTheme=Theme[this.constructor.displayName]
            merged=merged
                .mergeDeep(fromJS(shapeTheme))
                .mergeDeep(fromJS(shapeTheme?.[this.uiContext]||{}))
        }

        if(Theme[this.props.typedShape]){
            const typedShapeTheme=Theme[this.props.typedShape]
            merged=merged
                .mergeDeep(fromJS(typedShapeTheme||{}))
                .mergeDeep(fromJS(typedShapeTheme?.[this.uiContext]||{}))
        }

        if(this.props.theme){
            merged=merged
                .mergeDeep(this.props.theme||{})
                .mergeDeep(this.props.theme?.[this.uiContext]||{})
        }
        const {Dialog,Tree,Menu,Tab,Ribbon, ...theme}=merged.toJS()
        return theme
    })

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
                if(Theme[typedShape]){
                    return props=>React.createElement(this.Types[baseShape],{typedShape,...props})
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
        if(!show||!this[`render${uiContext}`]) 
            return null 
            
        return (this[`render${uiContext}`]).call(this)
    }

    set(path, value){
        const {onChange}=this.props
        if(onChange){
            onChange(value)
        }else{
            this.context.set(path,value)
        }
    }

    fire(event,data){
        const {onEvent}=this.props
        if(onEvent){
            onEvent(...arguments)
        }else{
            this.context.onEvent(...arguments)
        }
    }

    lineField(input, title){
        const {name, label=name}=this.props
        return (
            <div style={{marginBottom:4}}>
                <span style={{width:150,display:"inline-block",textAlign:"right",marginRight:5}}>{title||label}</span>
                <span>
                {input}
                </span>
            </div>
        )
    }

    renderDialog(){
        return this.lineField(this.renderTree())
    }

    renderTree(){
        return null
    }

    renderRibbon(){
        return null
    }
}