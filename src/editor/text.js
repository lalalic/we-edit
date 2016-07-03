import React,{PropTypes} from "react"
import {Text} from "../content"
import editable from "./editable"

export default class extends editable(Text){
    createComposedPiece(props){
        return <text {...props} onClick={e=>this.onClick(e,props)}/>
    }

    onClick(event, text){
        const {offsetX}=event.nativeEvent
        let composer=new this.constructor.WordWrapper(text.children)
        let loc=composer.next({width:offsetX})||{end:0}
        let index=text.end-text.children.length+loc.end
        this.setState({cursor:index, content:"Raymond changed it"}, a=>this.reCompose())
    }
}
