import React, { Fragment, Component } from "react"
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
    static displayName="oneOf"
    
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
        const {values, children, defaultValue,value=defaultValue,DropDown, name, label=name, labels=[], icons=[]}=this.$props
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
                {children}
            </Fragment>
        )
    }

    renderTree(){
        const {values,defaultValue,value=defaultValue, name, label=name, required, labels=[], style}=this.$props
        return (
            <select name={name} value={value} onChange={e=>this.set(this.path, e.target.value)} style={style}>
                {!required && <option value={""}></option>}
                {values.map((a,i)=><option value={a} key={i}>{labels[i]||a}</option>)}
                {children}
            </select>
        )
    }

    renderRibbonDropDown(){
        const {values, style,
            onClick=()=>this.set(this.path, values[0]), 
            defaultValue,value=defaultValue, DropDown:_1,
            check=a=>false, name, label=name, icon,  
            labels=[], icons=[],children}=this.$props
        const DropDown=_1===true ? MenuItem : _1
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
                    return <DropDown key={i} value={a} primaryText={labels[i]||a} onClick={()=>this.set(this.path, a)} leftIcon={icons[i]} checked={this.equal(a,value)}/>
                })}
                {children}
            </DropDownButton>
        )
    }

    renderMenu(){
        const {name,label=name, icon, icons=[],values=[],labels=[],
            Layout:_1, children,value,Item=MenuItem,style,}=this.$props
        const Layout=typeof(_1)=="string" ? this.constructor.Layouts[_1.toLowerCase()] : (_1||Fragment)
        const items=[
            <Layout>
                {
                    values.map((a,i)=>{
                        if(a==="-")
                            return <Divider key={i}/>
                        return <Item key={i} value={a}
                            primaryText={labels[i]||a} 
                            leftIcon={icons[i]}
                            checked={this.equal(a,value)} 
                            set={v=>this.set(this.path,v)}
                            onClick={e=>{
                                this.context.onItemClick(e)
                                this.set(this.path,a)
                            }}/>
                    })
                }
            </Layout>,
            ...React.Children.toArray(children),
        ]
        const me=React.createRef()
        
        return (<MenuItem ref={me} value={value} style={style}
                primaryText={label} 
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

    static Layouts={
        grid: class Grid extends Component{
            render(){
                const {children}=this.props
                const i=children.findIndex(a=>a.type===Divider)
                return [
                    <div key="grid" className="grid"
                        style={{width:"100%",display:"grid", gridTemplateColumns:`repeat(4, 1fr)`}}>
                        {children.slice(0,i)}
                    </div>,
                    children.slice(i)
                ]
            }
        }
    }
}

