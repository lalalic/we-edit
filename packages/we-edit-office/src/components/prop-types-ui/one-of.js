import React, { Fragment } from "react"
import base from "./base"
import CheckIconButton from "../check-icon-button"

export default class oneOf extends base{
    renderRibbon(){
        const {values, value, name, label=name, labels=this.theme.labels||[], icons=this.theme.icons||[]}=this.props
        return (
            <Fragment>
                {values.map((a,i)=>
                    <CheckIconButton key={i}
                        status={value===a?"checked":"unchecked"}
                        onClick={()=>this.set(this.path, value==a ? null : a)}
                        children={icons[i]}
                        hint={labels[i]||`${label.replace('%s',a)}`}
                        />
                )}
            </Fragment>
        )
    }

    renderTree(){
        const {values, value, name, label=name, labels=this.theme.labels||[]}=this.props
        return (
            <select name={name} value={value} onChange={e=>this.set(this.path, e.target.value)}>
                {values.map((a,i)=><option value={a} key={i}>{labels[i]||`${label.replace('%s',a)}`}</option>)}
            </select>
        )
    }
}