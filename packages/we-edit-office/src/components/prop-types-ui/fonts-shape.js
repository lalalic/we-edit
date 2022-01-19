import React, { Fragment } from "react"
import base from "./base"
import FontList from "../fonts"
import Shape from "./shape"
import { LabelField } from "./wrappers"

export default class FontsShape extends base{
    static displayName="FontsShape"
    static defaultProps={
        isPrimitive:true,
    }
    
    renderDialog(){
        const {value}=this.$props
        return (
            <div style={{display:"grid",gridTemplateColumns:"repeat(2, 1fr)", borderBottom:"1px solid lightgray", marginTop:5}}>
                <LabelField host={this} label="Latin Text Font">
                    <FontList value={value?.ascii||""} onChange={font=>this.set(this.path+".ascii",font)}/>
                </LabelField>
                <LabelField host={this} label="Asian Text Font">
                    <FontList value={value?.ea||""} onChange={font=>this.set(this.path+".ea",font)}/>
                </LabelField>
            </div>
        )
    }

    renderTree(){
        const {value, name, label=name, style}=this.$props
        return <FontList value={value?.current||value?.ascii} onChange={font=>this.set(this.path,font)} placeholder={label} title={label} style={style}/>
    }
}