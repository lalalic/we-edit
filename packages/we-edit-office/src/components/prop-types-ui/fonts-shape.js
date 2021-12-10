import React, { Fragment } from "react"
import base from "./base"
import FontList from "../fonts"

export default class FontsShape extends base{
    static displayName="FontsShape"
    static defaultProps={
        isPrimitive:true,
    }
    renderRibbon(){
        const {value, name, label=name, style}=this.$props
        return <FontList value={value?.current} onChange={font=>this.set(this.path,font)} placeholder={label} title={label} style={style}/>
    }

    renderDialog(){
        const {value, name, label=name, style}=this.$props
        return (
            <div style={{borderBottom:"1px solid lightgray", marginTop:5}}>
                <h3 style={{fontSize:"bigger"}}>{label}</h3>
                <div style={{display:"grid",gridTemplateColumns:"repeat(2, 1fr)"}}>
                    {this.lineField(<FontList value={value?.ascii||""} onChange={font=>this.set(this.path+".ascii",font)}/>,"Latin Text Font")}
                    {this.lineField(<FontList value={value?.ea||""} onChange={font=>this.set(this.path+".ea",font)}/>, "Asian Text Font")}
                </div>
            </div>
        )
    }

    renderTree(){
        return this.renderRibbon()
    }
}