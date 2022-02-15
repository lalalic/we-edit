import React, {Fragment} from "react"
import PropTypes from "prop-types"
import base from "./base"

export default class link extends base{
    static displayName="link"
    static contextTypes={
        ...super.contextTypes,
        dialogManager: PropTypes.shape({get:PropTypes.func}),
    }

    static propTypes={
        ...super.propTypes,

        dialog: PropTypes.oneOfType([PropTypes.string,PropTypes.element])
    }

    static isLink=true

    constructor(){
        super(...arguments)
        this.state={}
        this.show=this.show.bind(this)
    }

    render(){
        const {uiContext,  props:{children=this.Theme.link[uiContext]} }=this

        if(typeof(children)=="function")
            return children(this.context.setting,this)

        const {dialog}=this.state
        return (
            <Fragment>
                {React.cloneElement(children,{onClick:this.show, host:this})}
                {dialog}
            </Fragment>
        )
    }

    show(){
        const {dialog:type, value}=this.props
        const props={value,host:this}
        if(this.path){
            props.onSubmit=value=>this.set(this.path,value)
        }
        if(this.uiContext=="Menu"){
            //the link will be unmounted, so only global dialog, we don't check
            return this.context.setting(type,props)
        }

        const dialog=React.isValidElement(type) ? type : this.context.dialogManager.get(type)
        if(!dialog)//maybe panel
            return this.context.setting(type,props)

        this.setState({dialog: React.cloneElement(dialog,{
            ...props, 
            onRequestClose:e=>{
                this.setState({dialog:null})
            }
        })})
    }
}