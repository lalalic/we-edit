import React, {PureComponent} from "react"
import PropTypes from "prop-types"

export default class base extends PureComponent{
    static contextTypes={
        uiContext: PropTypes.string,
        PropTypes: PropTypes.object,
        set: PropTypes.func,
        theme: PropTypes.object,
        onEvent: PropTypes.func,
    }

    get Types(){
        return this.context.PropTypes
    }

    get path(){
        const {path=""}=this.props
        return path
    }

    get theme(){
        const {theme}=this.context
        if(!this.path)
            return theme.toJS()
        return this.context.theme.getIn(this.path.split("."))?.toJS()||{}
    }

    get uiContext(){
        return this.props.uiContext||this.context.uiContext||"Dialog"
    }

    getUIType(type){
        return typeof(type)=="string" ? this.Types[type] : type
    }

    makePath(key){
        return `${this.path}${this.path ? "." : ""}${key}`
    }

    render(){
        const {uiContext, theme:{[uiContext]:show=true}}=this
        return !show ? null : (this[`render${uiContext}`]||this.render).call(this)
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