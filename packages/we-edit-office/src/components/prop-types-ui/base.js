import React, {PureComponent} from "react"
import PropTypes from "prop-types"

export default class extends PureComponent{
    static contextTypes={
        uiContext: PropTypes.string,
        PropTypes: PropTypes.object,
        set: PropTypes.func,
        theme: PropTypes.object,
    }

    constructor(...args){
        super(...args)
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

    makePath(key){
        return `${this.path}${this.path ? "." : ""}${key}`
    }

    render(){
        const {uiContext="Dialog"}=this.context
        const {[uiContext]:show=true}=this.theme
        if(!show)
            return null
        return (this[`render${uiContext}`]||this.render).call(this)
    }

    set(path, value){
        const {onChange}=this.props
        if(onChange){
            onChange(value)
        }else{
            this.context.set(path,value)
        }
    }

    lineField(input, title){
        const {name, label=name}=this.props
        return (
            <div>
                <span>{title||label}</span>
                <span>
                {input}
                </span>
            </div>
        )
    }

    renderDialog(){
        return this.lineField(this.renderTree())
    }
}