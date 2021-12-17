import React, {Fragment} from "react"
import PropTypes from "prop-types"
import base from "./base"

export default class show extends base{
    static displayName="show"
    static contextTypes={
        setting:PropTypes.func,
        dialogManager: PropTypes.shape({get:PropTypes.func}),
    }

    static propTypes={
        ...super.propTypes,

        dialog: PropTypes.oneOfType([PropTypes.string,PropTypes.element])
    }

    constructor(){
        super(...arguments)
        this.state={}
        this.show=this.show.bind(this)
    }

    render(){
        const {children=<button/>}=this.props
        if(typeof(children)=="function")
            return children(this.context.setting,this)

        const {dialog}=this.state
        return (
            <Fragment>
                {React.cloneElement(children,{onClick:this.show})}
                {dialog}
            </Fragment>
        )
    }

    show(){
        const {dialog:type, value}=this.props
        const dialog=React.isValidElement(type) ? type : this.context.dialogManager.get(type)
        if(!dialog)//maybe panel
            return this.context.setting(type)

        this.setState({dialog: React.cloneElement(dialog,{
            value,
            host:this,
            onRequestClose:e=>{
                this.setState({dialog:null})
            },
            onSubmit:value=>{
                this.set(this.path,value)
            }
        })})
    }
}