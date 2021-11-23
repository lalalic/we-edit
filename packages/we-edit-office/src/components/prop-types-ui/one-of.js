import React, { Fragment } from "react"
import PropTypes from "prop-types"
import base from "./base"
import CheckIconButton from "../check-icon-button"
import DropDownButton from "../drop-down-button"
import {MenuItem} from "material-ui/Menu"

export default class oneOf extends base{
    static propTypes={
        ...super.propTypes,
        defaultValue: PropTypes.any,
        
        DropDown: PropTypes.oneOfType([PropTypes.func,PropTypes.bool]),
        check: PropTypes.func,
        icon: PropTypes.element,
        labels: PropTypes.arrayOf(PropTypes.string),
        icons: PropTypes.arrayOf(PropTypes.element),
    }
    
    renderRibbon(){
        const {values, defaultValue,value=defaultValue,DropDown, name, label=name, labels=[], icons=[]}=this.$props
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
        const {values,defaultValue,value=defaultValue, name, label=name, required, labels=[]}=this.$props
        return (
            <select name={name} value={value} onChange={e=>this.set(this.path, e.target.value)}>
                {!required && <option value={""}></option>}
                {values.map((a,i)=><option value={a} key={i}>{labels[i]||a}</option>)}
            </select>
        )
    }

    renderRibbonDropDown(){
        const {values, onClick=()=>this.set(this.path, values[0]), defaultValue,value=defaultValue, DropDown, check=a=>false, name, label=name, icon,  children}=this.$props
        return (
            <DropDownButton
                status={(value && check(value, values)) ? "checked":"unchecked"}
                onClick={onClick}
                icon={icon}
                hint={label}
                >
                {values.map((value,i)=>{
                    return DropDown===true ? 
                        <MenuItem key={i} primaryText={value} onClick={()=>this.set(this.path, value)}/> : 
                        <DropDown key={i} value={value} onClick={()=>this.set(this.path, value)}/>
                })}
                {children}
            </DropDownButton>
        )
    }
}