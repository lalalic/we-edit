import React from "react"
import {createPortal} from "react-dom"
import {Dialog, FlatButton} from "material-ui"

export default ({
    container=document.body, moreActions,
    onRequestClose,
    onSubmit,
    style,
    actions=[
        ...[moreActions].flat(),
        
        <FlatButton
            label="Cancel"
            onClick={onRequestClose}
        />,
        
        <FlatButton
            label="Submit"
            primary={true}
            onClick={e=>{
                onSubmit?.()
                onRequestClose?.()
            }}
        />,
    ],
    ...props})=>{
    
    const dialog=<Dialog {...{
            onRequestClose,
            open:true,modal:true,
            style:{zoom:0.8,...style},
            titleStyle:{textAlign:"center"},
            actions,
            ...props}}/>

    return createPortal(dialog, container)
}