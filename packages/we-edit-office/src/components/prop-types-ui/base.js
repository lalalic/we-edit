import React, {PureComponent} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"
import {fromJS} from "immutable"
import Theme from "./theme"

export default class base extends PureComponent{
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
        return this.context.PropTypes
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

    getShapeTheme=memoize(()=>{
        const shapeTheme=Theme[this.constructor.displayName]
        return fromJS(shapeTheme||{})
            .mergeDeep(fromJS(shapeTheme?.[this.uiContext]||{}))
            .mergeDeep(this.props.theme||{})
            .mergeDeep(this.props.theme?.[this.uiContext]||{})
            .toJS()
    })

    getKeyTheme(key){
        return fromJS(this.theme[key]||{}).mergeDeep(fromJS(this.theme[key]?.[this.uiContext]||{})).toJS()
    }

    getUIType(type){
        return typeof(type)=="string" ? this.Types[type] : type
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