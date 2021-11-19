import React, { Fragment } from "react"
import base from "./base"
import CheckIconButton from "../check-icon-button"
import DropDownButton from "../drop-down-button"

export default class oneOf extends base{
    renderRibbon(){
        const {values, defaultValue,value=defaultValue,DropDown, name, label=name, labels=this.theme.labels||[], icons=this.theme.icons||[]}=this.props
        if(DropDown)
            return this.renderRibbonDropDown()
        return (
            <Fragment>
                {values.map((a,i)=>
                    <CheckIconButton key={i}
                        status={value===a?"checked":"unchecked"}
                        onClick={()=>this.set(this.path, value==a ? null : a)}
                        children={icons[i]}
                        hint={labels[i]||a}
                        />
                )}
            </Fragment>
        )
    }

    renderTree(){
        const {values, defaultValue,value=defaultValue, name, label=name, required, labels=this.theme.labels||[]}=this.props
        return (
            <select name={name} value={value} onChange={e=>this.set(this.path, e.target.value)}>
                {!required && <option value={""}></option>}
                {values.map((a,i)=><option value={a} key={i}>{labels[i]||a}</option>)}
            </select>
        )
    }

    renderRibbonDropDown(){
        const {values, defaultValue,value=defaultValue, DropDown, check, name, label=name, icon,  children}=this.props
        return (
            <DropDownButton
                status={(value && check(value)) ? "checked":"unchecked"}
                onClick={()=>this.set(this.path, values[0])}
                icon={icon}
                hint={label}
                >
                {values.map((value,i)=><DropDown key={i} {...value} onClick={()=>this.set(this.path, value)}/>)}
                {children}
            </DropDownButton>
        )
    }
}