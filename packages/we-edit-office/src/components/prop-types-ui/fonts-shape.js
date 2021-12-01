import React, { Fragment } from "react"
import base from "./base"
import FontList from "../fonts"

export default class FontsShape extends base{
    static displayName="FontsShape"
    renderRibbon(){
        const {value, name, label=name, style=this.theme.style||{}}=this.props
        return <FontList value={value?.current} onChange={font=>this.set(this.path,font)} placeholder={label} title={label} style={style}/>
    }

    renderDialog(){
        const {value, name, label=name, style=this.theme.style||{}}=this.props
        return (
            <Fragment>
                {this.lineField(<FontList value={value?.ascii||""} onChange={font=>this.set(this.path+".ascii",font)}/>,"Latin Text Font")}
                {this.lineField(<FontList value={value?.ea||""} onChange={font=>this.set(this.path+".ea",font)}/>, "Asian Text Font")}
            </Fragment>
        )
    }

    renderTree(){
        return this.renderRibbon()
    }
}