import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"
import {ReactQuery} from "we-edit"

import ObjectTree from "../object-tree"
import DropDownButton from "../drop-down-button"
import CheckIconButton from "../check-icon-button"
import Select from "../select"

export const LabelField=({host:{$props:{name,label:_l=name}},label=_l,children, 
    style={width:100,display:"inline-block",textAlign:"right",marginRight:5}})=>{
    if(!label){
        return children
    }
    return (
        <div style={{marginBottom:4}}>
            <span style={style}>
                {label}
            </span>
            <span>
                {children}
            </span>
        </div>
    )
}

export const RibbonField=({children, host:{$props:{name,label=name}}})=>(
    <span style={{zoom:0.8,marginLeft:2,marginRight:2}}>
        <span style={{fontSize:10,paddingLeft:4}}>{label}</span>
        <br/>		
        {children}
    </span>
)

export const RibbonInputField=({children, host:{$props:{name,label=name, style, labelStyle, isPrimitive, ...props}}})=>(
    <span style={{zoom:0.8,marginLeft:2,marginRight:2,...style}} {...props}>
        <span style={{fontSize:10,paddingLeft:4, ...labelStyle}}>{label}</span><br/>		
        {children}
    </span>
)


export const DropDownMenu=({children, host:{$props:{name,label=name, icon, onClick}}})=>(
    <DropDownButton
        onClick={onClick}
        icon={icon}
        hint={label}>
        {children}
    </DropDownButton>
)

export const ShapeGrid=({host:{$props:{name,label:label1=name,grid:_=2}}, style, label=label1, children, grid=_})=>(
    <div style={{borderBottom:"1px solid lightgray", marginTop:5, ...style}}>
        <h3 style={{fontSize:"bigger"}}>{label}</h3>
        <div style={{display:"grid",gridTemplateColumns:`repeat(${grid}, 1fr)`}}>
            {children}
        </div>
    </div>
)

export class ShapeTree extends Component{
    static contextTypes={
        propTypesUITheme: PropTypes.object,
        uiContext: PropTypes.string,
    }

    render(){
        const {children, host}=this.props
        const {choices}=host.$props
        const items=children.map(a=>{
            if(!React.isValidElement(a)){
                return a
            }

            const {props:{path,name, theme:{label:_}={},label=_,}, type}=a
            if(path){
                const props={name, value:a, key:path}
                if(label)
                    props.name=label

                if(type.isPrimitive?.(a, this.context)){
                    props.value=React.cloneElement(a,{isPrimitive:true})
                }

                if(choices?.includes(name)){
                    props.name=(
                        <span>
                            <input type="radio" name={`${name}_choice`} 
                                style={{margin:0,position:"relative",top:3}}
                                checked={name==host.choice}
                                onClick={e=>host.set(path,true)}/>
                            {name}
                        </span>
                    )
                }
                return <ObjectTree {...props}/>
            }

            return a
        })

        return items
    }
}

export const ShapeSummary=({host:{$props:{name,label=name}}, children})=>(
    <details style={{width:"100%"}}>
        <summary>{label}</summary>
        {children}
    </details>
)

export const ShapeLayout=({host,children, layout,idSelector="a[id]",othersSelector="[role='others']"})=>{
    let $=new ReactQuery(<Fragment>{layout}</Fragment>), source=$.findFirst(idSelector)
    while(source.length){
        const id=source.attr('id')
        const i=children.findIndex(a=>a.props?.name==id || (id=="$presets" && a.props?.isPresets))
        if(i>-1){
            const [target]=children.splice(i,1)
            $=$.replace(source,target)
        }
        source=$.findFirst(idSelector)
    }
    const others=$.findFirst(othersSelector).get(0)
    if(others){
        $=$.replace(others,React.cloneElement(others,{children,host}))
    }
    return $.root
}

export class HorizontalOneOf extends Component{
    render(){
        const {host}=this.props
        const {values, defaultValue,value=defaultValue, name, labels=[], icons=[]}=host.$props
        return values.map((a,i)=>
                <CheckIconButton key={i}
                    status={value===a?"checked":"unchecked"}
                    onClick={()=>host.set(host.path, value==a ? null : a)}
                    children={icons[i]}
                    hint={labels[i]||a}
                    />
        )
    }
}

export class GridOneOf extends Component{
    render(){
        const {host:{$props:{grid:_=4,selectorStyle:$1}, uiContext}, children:menu, grid=_, style, selector=true, selectorStyle=$1 }=this.props
        
        const [items, children]=menu.props[uiContext=="Ribbon" ? 'children' : 'menuItems']
        const gridItems=(
            <div key="grid" className="grid" style={{width:"100%",display:"grid", gridTemplateColumns:`repeat(${grid}, 1fr)`,...style}}>
                {items}
            </div>
        )
        
        switch(uiContext){
            case "Menu":
                return React.cloneElement(menu,{menuItems:[gridItems,children]})
            case "Tree":
            case "Dialog":{
                if(!selector){
                    return (<Fragment>{gridItems}{children}</Fragment>)
                }
                
                const {values, value}=this.props.host.$props
                const i=values.indexOf(value)
                return (
                    <Select value={items[i]} style={selectorStyle}>
                        {gridItems}
                        {children}
                    </Select>
                )
            }
            case 'Ribbon'://dropdown, children
                return React.cloneElement(menu, {}, gridItems, children)
        }
    }
}

export const Nest=({host,children,wrappers})=>[...wrappers].reverse().reduce((nested,a)=>React.cloneElement(a,{host,children:nested}),children)