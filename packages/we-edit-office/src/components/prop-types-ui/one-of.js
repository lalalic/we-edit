import React from "react"
import PropTypes from "prop-types"
import {MenuItem} from "../menu"
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
            const checked=this.equal(a, value, i, values)
            return React.cloneElement(wrapper1, {
                key: i,
                value: a,
                primaryText: labels[i] || a,
                leftIcon: !checked ? (icons[i]||<span/>) : null,
                checked,
                onClick: e => {
                    this.set(this.path, a)
                }
            })
        })
    }

    renderRibbon(){
        const {
            values, defaultValue,value=defaultValue,style, icons=[],
            name, label=name, icon,children,
            status=values.find((a,i)=>this.equal(a,value,i,values)) ? "checked":"unchecked",
            onClick=()=>this.set(this.path, status=="checked" ? null : values[0]), 
        }=this.$props
        
        return (
            <DropDownButton 
                status={status} 
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
            <select onChange={e=>this.set(this.path,e.target.value)} value={value} style={style}>
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
                />)
    }

    equal(a,b){
        const {equal}=this.$props
        if(equal)
            return equal(...arguments)
        return a===b || (!!a && !!b && typeof(a)=="object" && typeof(b)=="object" && fromJS(a).equals(fromJS(b)))
    }
}