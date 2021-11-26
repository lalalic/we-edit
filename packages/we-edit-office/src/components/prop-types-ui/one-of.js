import React, { Fragment } from "react"
import PropTypes from "prop-types"
import {MenuItem} from "material-ui/Menu"
import Divider from 'material-ui/Divider'
import SvgIcon from "material-ui/SvgIcon"
import {fromJS} from "immutable"
import IconChecked from "material-ui/svg-icons/action/done"
import IconArrowRight from 'material-ui/svg-icons/navigation-arrow-drop-right'

import base from "./base"
import CheckIconButton from "../check-icon-button"
import DropDownButton from "../drop-down-button"

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

    static contextTypes={
        ...base.contextTypes,
        onItemClick: PropTypes.func,
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
        const {values,defaultValue,value=defaultValue, name, label=name, required, labels=[], style}=this.$props
        return (
            <select name={name} value={value} onChange={e=>this.set(this.path, e.target.value)} style={style}>
                {!required && <option value={""}></option>}
                {values.map((a,i)=><option value={a} key={i}>{labels[i]||a}</option>)}
            </select>
        )
    }

    renderRibbonDropDown(){
        const {values, style,onClick=()=>this.set(this.path, values[0]), defaultValue,value=defaultValue, DropDown, check=a=>false, name, label=name, icon,  labels=[], icons=[],children}=this.$props
        return (
            <DropDownButton
                status={(value && check(value, values)) ? "checked":"unchecked"}
                onClick={onClick}
                icon={icon}
                hint={label}
                style={style}
                >
                {values.map((a,i)=>{
                    if(a==="-")
                        return <Divider key={i}/>
                    return DropDown===true ? 
                        <MenuItem key={i} primaryText={labels[i]||a} onClick={()=>this.set(this.path, a)} leftIcon={icons[i]} checked={this.equal(a,value)}/> : 
                        <DropDown key={i} value={a} label={labels[i]||a} checked={this.equal(a,value)} onClick={()=>this.set(this.path, a)}/>
                })}
                {children}
            </DropDownButton>
        )
    }

    renderMenu(){
        const {name,label=name, icon, icons=[],values=[],labels=[], children,value,}=this.$props
        const items=[
            ...values.map((a,i)=>{
                if(a==="-")
                    return <Divider key={i}/>
                return <MenuItem key={i} primaryText={labels[i]||a} leftIcon={icons[i]}
                    checked={this.equal(a,value)} 
                    onClick={e=>{
                        this.context.onItemClick(e)
                        this.set(this.path,a)
                    }}/>
            }),
            ...React.Children.toArray(children),
        ]
        const me=React.createRef()
        return (<MenuItem primaryText={label} ref={me}
                leftIcon={icon} 
                rightIcon={<IconArrowRight/>} 
                menuItems={items} 
                onMouseOver={(e)=>{
                    e.currentTarget.click()
                    this.context.onItemClick(e,me.current)
                }}
                />)
    }

    equal(a,b){
        return a===b || (!!a && !!b && typeof(a)=="object" && typeof(b)=="object" && fromJS(a).equals(fromJS(b)))
    }
}