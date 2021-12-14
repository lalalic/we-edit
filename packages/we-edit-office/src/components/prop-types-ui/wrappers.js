import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"

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

export class ShapeMenu extends React.Component{
    static displayName="ShapeAsMenu"
    static childContextTypes={
        uiContext: PropTypes.string
    }

    getChildContext(){
        return {
            uiContext:"Menu"
        }
    }

    render(){
        const {children, host:{props:{name,label=name, icon, onClick}}}=this.props
        return (
            <DropDownButton
                onClick={onClick}
                icon={icon}
                hint={label}>
                {children}
            </DropDownButton>
        )
    }
}

export const ShapeGrid=({host:{$props:{name,label=name,grid:_=2}}, children, grid=_})=>(
    <div style={{borderBottom:"1px solid lightgray", marginTop:5}}>
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

            const {props:{path,name,label},type}=a
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
                                checked={a==host.choice}
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
        const {
            host:{$props:{grid:_=4}, uiContext}, children:menu, grid=_, 
            style={width:"100%",display:"grid", gridTemplateColumns:`repeat(${grid}, 1fr)`},
            selector=true, selectorStyle
        }=this.props
        const {menuItems:[items, children]}=menu.props
        const gridItems=(
            <div key="grid" className="grid" style={style}>
                {items}
            </div>
        )
        
        switch(uiContext){
            case "Menu":{
                return React.cloneElement(menu,{menuItems:[gridItems,children]})
            }
            case "Tree":
            case "Dialog":{
                if(!selector){
                    return gridItems
                }
                
                const {values, value}=this.props.host.$props
                const i=values.indexOf(value)
                return <Select value={items[i]} style={selectorStyle}>{gridItems}</Select>
            }
        }
    }
}

export const Nest=({host,children,wrappers})=>wrappers.reverse().reduce((nested,a)=>React.cloneElement(a,{host,children:nested}),children)