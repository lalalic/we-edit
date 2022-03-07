import React,{Component} from "react"
import PropTypes from "prop-types"
import {fromJS} from "immutable"
import {dom} from "we-edit"
import OneOf from "../one-of"
import * as Wrappers from "../wrappers"
import { createPortal } from "react-dom"
const {UnitShape, numberings}=dom.Unknown

export const NumberingFormats=Object.getOwnPropertyNames(numberings).filter(a=>typeof(numberings[a])=="function")

const levelIndent=(i, hanging=0.63)=>({indent:`${Math.round((i+1)*hanging*100)/100}cm`, hanging:`${hanging}cm`})
const align="left"
export const Bullets=[
    {style:{fonts:"Arial"},label:String.fromCharCode(0x25CF),...levelIndent(1)},
    {style:{fonts:"Arial"},label:String.fromCharCode(0x25CB),...levelIndent(1)},
    {style:{fonts:"Arial"},label:String.fromCharCode(0x25A0),...levelIndent(1)},
    {style:{fonts:"Arial"},label:String.fromCharCode(0x2666),...levelIndent(1)},
    {style:{fonts:"Arial"},label:String.fromCharCode(0x263A),...levelIndent(1)},
    {style:{fonts:"Arial"},label:String.fromCharCode(0x263B),...levelIndent(1)},
]

export const Numberings=[
    {format:"decimal",label:"%1.",...levelIndent(1), align},
    {format:"lowerLetter",label:"%1.",...levelIndent(1), align},
    {format:"upperLetter",label:"%1.",...levelIndent(1), align},
    {format:"lowerRoman",label:"%1.",...levelIndent(1), align},
    {format:"upperRoman",label:"%1.",...levelIndent(1), align},
    {format:"chinese",label:"%1",...levelIndent(1), align},
]

export const Outlines=[
    {levels:[
        {format:"decimal",level:0, label:"%1.",...levelIndent(1)},
        {format:"lowerLetter",level:1, label:"%2.",...levelIndent(2)},
        {format:"lowerRoman",level:2, label:"%3.",...levelIndent(3)},
    ]},
    {levels:[
        {format:"decimal",level:0, label:"%1.",...levelIndent(1)},
        {format:"lowerLetter",level:1, label:"%2.",...levelIndent(2)},
        {format:"lowerRoman",level:2, label:"%3.",...levelIndent(3)},
    ]},
    {levels:[
        {format:"decimal",level:0, label:"%1.",...levelIndent(1)},
        {format:"decimal",level:1, label:"%1.%2.",...levelIndent(2)},
        {format:"decimal",level:2, label:"%1.%2.%3.",...levelIndent(3)}
    ]},
]

export const DemoList=Object.assign(({defaultValue,  label=a=>a?.label},{outline, host:{$props:{value=defaultValue}}})=>{
    if(outline)
        return <OutlineDemo host={outline}/>
    const lineStyle={marginLeft:value?.indent}
    return (
        <div style={{width:200,border:"1px solid black",padding:10,marginTop:5}}>
            <Line background="lightgray"/>
            <Line background="lightgray"/>
            <Li {...value} label={label(value,0)}/>
            <Line style={lineStyle}/>

            <Li {...value} label={label(value,1)}/>
            <Line style={lineStyle}/>

            <Li {...value} label={label(value,2)}/>
            <Line style={lineStyle}/>

            <Line background="lightgray"/>
            <Line background="lightgray"/>
        </div>
    )
},{contextTypes:{outline:PropTypes.any, host: PropTypes.any}})

const Line=({background="gray", style, children=<i>&nbsp;</i>})=><p style={{background,...style}}>{children}</p>
class Li extends React.Component{
    constructor(){
        super(...arguments)
        this.state={width:0}
        this.label=React.createRef()
    }

    render(){
        const {state:{width=0},props:{background, indent=0,hanging=0,label,pStyle, style:{fonts,size, underline, color}={}}}=this
        const ind=UnitShape.normalize(indent), han=UnitShape.normalize(hanging)
        const marginLeft=Math.max(ind,ind-han+width)
        return (
            <Line background={background} style={{marginLeft,position:"relative", ...pStyle}}>
                <Span ref={this.label} 
                    onSetWidth={width=>this.setState({width})}
                    style={{
                        whiteSpace:"nowrap",
                        position:"absolute",
                        left:marginLeft==ind ? -han : -width,
                        top:0,
                        fontFamily:toFont(fonts),
                        fontSize:size,
                        color,
                        textDecoration:underline ? "underline" : "none"
                    }}>{label}</Span>
                <i style={{visibility:"hidden"}}>&nbsp;</i>
            </Line>
        )
    }
}

export const BulletWrapper1=({value:{label,style}, onClick, checked})=>{
    return (
        <span onClick={onClick}
            style={{
                ...toStyle(style),
                width:20,height:20,lineHeight:"20px",margin:2,textAlign:"center", borderColor:checked ? "lightblue" : undefined}}>
            {label}
        </span>
    )
}

export const NumberingWrapper1=({value:{format="decimal", label="%1", style}, onClick, checked})=>(
    <div onClick={onClick}
        style={{
            ...toStyle(style),
            width:75,height:50, fontSize:9, borderColor:checked ? "lightblue" : undefined
        }} >
        <Li indent={10} hanging={10} label={label.replace('%1',numberings[format]?.(0))} pStyle={{marginTop:0,background:"lightgray",}}/>
        <Li indent={10} hanging={10} label={label.replace('%1',numberings[format]?.(1))} pStyle={{background:"lightgray"}}/>
        <Li indent={10} hanging={10} label={label.replace('%1',numberings[format]?.(2))} pStyle={{background:"lightgray"}}/>
    </div>
)

export const OutlineWrapper1=({value:{levels},onClick, checked})=>{
    return (
        <div onClick={onClick}
            style={{width:75,height:50, fontSize:9, borderColor:checked ? "lightblue" : undefined}} 
            >
            <Li indent={10} hanging={10} label={outlineLabel(levels,0)} pStyle={{marginTop:0,background:"lightgray",}}/>
            <Li indent={16} hanging={8} label={outlineLabel(levels,1)} pStyle={{background:"lightgray"}}/>
            <Li indent={18} hanging={6} label={outlineLabel(levels,2)} pStyle={{background:"lightgray"}}/>
        </div>
    )
}

export class OutlineLayout extends Component{
    static childContextTypes={
        outline: PropTypes.object,
    }

    getChildContext(){
        return {
            outline:this.props.host,
        }
    }
    render(){
        const {collection, active}=this.props
        return (
        <div style={{display:"flex",flexDirection:"row"}}>
            <div style={{width:50,marginRight:10, display:"flex", flexDirection:"column"}}>
                <h3>Level</h3>
                {React.cloneElement(collection,{style:{...collection.props.style,flex:"auto"}})}
            </div>
            <div style={{flex:"auto"}}>
                {active}
            </div>
        </div>
        )
    }
}

const OutlineDemo=({host:{$props:{value:levels}, state:{active}}})=>(
    <div style={{width:200,border:"1px solid black",padding:10,marginTop:5}}>
        {(()=>{
            const all=levels.map((value,i)=><Li key={i} {...value} label={outlineLabel(levels,i)} background={i==active ? "black" : undefined}/>)
            all.splice(active+1, 0, <Line key={`active${active}`} style={{marginLeft:levels[active]?.indent}} background="black"/>)
            return all
        })()}
    </div>
)

const toFont=({ascii,ea,hansi}={})=>Array.from(new Set([ascii,ea,hansi])).filter(a=>!!a).join(",")
const outlineLabel=(levels, i)=>{
    const {style}=levels[i]
    const label=levels[i].label.replace(/\%(\d)/g, (sub,d)=>numberings[levels[parseInt(d)-1].format]?.(0))
    return (<span style={toStyle(style)}>{label}</span>)
}

const toStyle=({fonts, color, strike, underline}={})=>({
    fontFamily:`${toFont(fonts)}`, color,
    textDecoration: (strike&&"line-through")||(underline&&"underline")||"none",
})
    
export class DocumentLists extends Component{
    static contextTypes={
        doc: PropTypes.any,
    }

    render(){
        const {type, label=`Document ${type}s`}=this.props
        if(type=="Outline")
            return this.renderOutline()
        let list=this.context.doc.styles?.[`get${type}List`]?.()
        if(!list || list.length==0)
            return null
        
        const hashs=new Set()
        list=list.reduceRight((uniques, {label, style, start, format}, i)=>{
            const hash=fromJS({label, format, start, ...style}).hashCode()
            if(!hashs.has(hash)){
                hashs.add(hash)
            }else{
                uniques.splice(i,1)
            }
            return uniques
        },list)

        const grid=type=="Bullet" ? 4 : 3
        
        return <OneOf values={list} 
                    uiContext="Ribbon"
                    wrapper1={type=="Bullet" ? <BulletWrapper1/> : <NumberingWrapper1/>} 
                    wrapper={<Wrappers.GridOneOf selector={false} grid={grid} label={label}/>}/>
    }

    renderOutline(){
        const all=[]
        const {styleList, docList}=this.context.doc.styles?.getOutlineList?.()||{}
        if(styleList && styleList.length>0){
            all.push(
                <OneOf values={styleList} key="styles"
                uiContext="Ribbon"
                wrapper1={<OutlineWrapper1/>} 
                wrapper={<Wrappers.GridOneOf selector={false} grid={3} label={"List Styles"}/>}/>
            )
        }

        if(docList && docList.length>0){
            all.push(
                <OneOf values={docList} key="doc"
                uiContext="Ribbon"
                wrapper1={<OutlineWrapper1/>} 
                wrapper={<Wrappers.GridOneOf selector={false} grid={3} label={"Document List"}/>}/>
            )
        }

        return all
    }
}
class Span extends Component{
    constructor(){
        super(...arguments)
        this.label=React.createRef()
        this.state={width:0}
    }

    get width(){
        return this.state.width
    }

    render(){
        const {onSetWidth, ...props}=this.props
        const el=<span ref={this.label} {...props}/>
        if(!this.state.width){
            return createPortal(<div style={{position:"fixed",left:0,top:0,visibility:"hidden"}}>{el}</div>,document.body)
        }
        return el
    }

    componentDidMount(){
        this.setState({width:this.label.current?.getBoundingClientRect()?.width||1}, ()=>this.props.onSetWidth?.(this.state.width))
    }
}