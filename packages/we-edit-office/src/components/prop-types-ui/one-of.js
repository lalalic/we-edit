import React from "react"
import PropTypes from "prop-types"
import {MenuItem} from "material-ui/Menu"
import Divider from 'material-ui/Divider'
import {fromJS} from "immutable"
import IconArrowRight from 'material-ui/svg-icons/navigation-arrow-drop-right'

import base from "./base"
import DropDownButton from "../drop-down-button"

export default class oneOf extends base{
    static displayName="oneOf"
    static propTypes={
        ...super.propTypes,
        defaultValue: PropTypes.any,
        
        check: PropTypes.func,
        icon: PropTypes.element,
        labels: PropTypes.arrayOf(PropTypes.node),
        icons: PropTypes.arrayOf(PropTypes.element),
    }

    static defaultProps={
        isPrimitive:true,
    }

    iterate() {
        const {values, wrapper1=<MenuItem/>, labels=[], icons=[], value}=this.$props
        return values.map((a, i) => {
            if (a === "-")
                return <Divider key={i} />
            const checked=this.equal(a, value)
            return React.cloneElement(wrapper1, {
                key: i,
                value: a,
                primaryText: labels[i] || a,
                leftIcon: !checked ? (icons[i]||<span/>) : null,
                checked,
                onClick: e => {
                    this.context.onItemClick?.(e)
                    this.set(this.path, a)
                }
            })
        })
    }

    renderRibbon(){
        const {
            values, defaultValue,value=defaultValue,style, icons=[],
            onClick=()=>this.set(this.path, values[0]), 
            check=a=>typeof(a)!='undefined', name, label=name, icon,children
        }=this.$props
        
        return (
            <DropDownButton 
                status={value && check(value) ? "checked":"unchecked"} 
                {...{onClick, icon:icons[values.indexOf(value)]||icon, hint:label,style}}>
                {this.iterate()}
                {children}
            </DropDownButton>
        )
    }

    renderTree(){
        const {values,labels=[],value,isRequired, wrapper1,style}=this.$props
        if(wrapper1){
            return this.renderMenu()
        }
        return (
            <select onChange={a=>this.set(host.path,a)} value={value} style={style}>
                {!isRequired && <option/>}
                {values.map((a,i)=><option key={a} value={a}>{labels[i]||a}</option>)}
            </select>
        )
    }

    renderMenu(){
        const {name,label=name, icon, Layout:_1, children,value,style,}=this.$props
        const me=React.createRef()
        return (<MenuItem ref={me} value={value} style={style}
                primaryText={label} 
                leftIcon={icon} 
                rightIcon={<IconArrowRight/>} 
                menuItems={[
                    this.iterate(),
                    children,
                ]} 
                onMouseOver={(e)=>{
                    e.currentTarget.click()
                    this.context.onItemClick?.(e,me.current)
                }}
                />)
    }

    equal(a,b){
        return a===b || (!!a && !!b && typeof(a)=="object" && typeof(b)=="object" && fromJS(a).equals(fromJS(b)))
    }
}