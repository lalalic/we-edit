import React, {Component} from "react"
import PropTypes from "prop-types"
import {ACTION} from "we-edit"
import {createPortal} from "react-dom"
import {Dialog, FlatButton} from "material-ui"

export default class extends Component{
    static contextTypes={
        dispatch: PropTypes.func,
    }
    static childContextTypes={
        uiContext: PropTypes.string
    }

    getChildContext(){
        return {
            uiContext:"Dialog"
        }
    }
    
    render(){
        const {
            container=document.body, moreActions,
            onRequestClose=()=>this.context.dispatch(ACTION.UI({dialog:null})),
            onSubmit,
            style,
            actions=[
                ...[moreActions].flat(),
                
                <FlatButton
                    label="Cancel"
                    onClick={onRequestClose}
                />,
                
                onSubmit && <FlatButton
                    label="Submit"
                    primary={true}
                    onClick={e=>{
                        onSubmit?.()
                        onRequestClose?.()
                    }}
                />,
            ].filter(a=>!!a),
            ...props}=this.props
            
        const dialog=<Dialog {...{
                onRequestClose,
                open:true,modal:true,
                style:{zoom:0.8,...style},
                titleStyle:{textAlign:"center"},
                autoScrollBodyContent:true,
                actions,
                ...props}}/>

        return createPortal(dialog, container)
    }
}