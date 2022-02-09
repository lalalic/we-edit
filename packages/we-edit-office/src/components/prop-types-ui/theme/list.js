import React from "react"
import {fromJS} from "immutable"
import {dom} from "we-edit"
const {UnitShape, numberings}=dom.Unknown

const indent="1.27cm", hanging="0.63cm", align="left"
export const Bullets=[
    {style:{fonts:"Arial"},label:String.fromCharCode(0x25CF),indent,hanging},
    {style:{fonts:"Arial"},label:String.fromCharCode(0x25CB),indent,hanging},
    {style:{fonts:"Arial"},label:String.fromCharCode(0x25A0),indent,hanging},
    {style:{fonts:"Arial"},label:String.fromCharCode(0x2666),indent,hanging},
    {style:{fonts:"Arial"},label:String.fromCharCode(0x263A),indent,hanging},
    {style:{fonts:"Arial"},label:String.fromCharCode(0x263B),indent,hanging},
]

export const Numberings=[
    {format:"decimal",label:"%1.",indent,hanging, align},
    {format:"lowerLetter",label:"%1.",indent,hanging, align},
    {format:"upperLetter",label:"%1.",indent,hanging, align},
    {format:"lowerRoman",label:"%1.",indent,hanging, align},
    {format:"upperRoman",label:"%1.",indent,hanging, align},
    {format:"chinese",label:"%1",indent,hanging, align},
]

export const Outlines=[
    [
        {format:"decimal",level:0, label:"%1."},
        {format:"decimal",level:1, label:"%1.%2."},
        {format:"decimal",level:2, label:"%1.%2.%3."}
    ],
    [
        {format:"decimal",level:0, label:"%1."},
        {format:"lowerLetter",level:1, label:"%1."},
        {format:"lowerRoman",level:2, label:"%1."},
    ],
    [
        {format:"decimal",level:0, label:"%1."},
        {format:"lowerLetter",level:1, label:"%1."},
        {format:"lowerRoman",level:2, label:"%1."},
    ],
]

export const DemoList=({host:{$props:{value}}, label=a=>a?.label})=>{
    const lineStyle={marginLeft:value?.indent}
    return (
        <div style={{width:200,border:"1px solid black",padding:10}}>
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
}

const Line=({background="gray", style, children=<i>&nbsp;</i>})=><p style={{background,...style}}>{children}</p>
class Li extends React.Component{
    constructor(){
        super(...arguments)
        this.state={width:0}
        this.label=React.createRef()
    }

    render(){
        const {state:{width=0},props:{indent=0,hanging=0,label,pStyle, style:{fonts,size}={}}}=this
        const ind=UnitShape.normalize(indent), han=UnitShape.normalize(hanging)
        const marginLeft=Math.max(ind,ind-han+width)
        return (
            <Line style={{marginLeft,position:"relative", ...pStyle}}>
                <span ref={this.label} style={{
                    position:"absolute",
                    left:marginLeft==ind ? -han : -width,
                    top:0,fontFamily:fonts,fontSize:size}}>{label}</span>
                <i>&nbsp;</i>
            </Line>
        )
    }
    componentDidMount(){
        this.setState({width:this.label.current?.getBoundingClientRect().width||0})
    }

    componentDidUpdate(prev){
        if(!fromJS(prev).equals(fromJS(this.props))){
            this.setState({width:this.label.current.getBoundingClientRect().width})
        }
    }
}

export const BulletWrapper1=({value:{label,style:{fonts}}, onClick, checked})=>(
    <span onClick={onClick} 
        style={{cursor:"default", font:fonts,width:40,height:40,lineHeight:"40px",margin:4,border:"1px solid lightgray",textAlign:"center", background:checked ? "lightblue" : "none"}}>
        {label}
    </span>
)

export const NumberingWrapper1=({value:{format="decimal", label="%1"}, onClick, checked})=>(
    <div style={{width:50,height:50,border:"1px solid lightgray",overflow:"hidden",fontSize:9, background:checked ? "lightblue" : "none"}} 
        padding={2} onClick={onClick}>
        <Li indent={10} label={label.replace('%1',numberings[format]?.(0))} pStyle={{marginTop:0,background:"lightgray"}}/>
        <Li indent={10} label={label.replace('%1',numberings[format]?.(1))} pStyle={{background:"lightgray"}}/>
        <Li indent={10} label={label.replace('%1',numberings[format]?.(2))} pStyle={{background:"lightgray"}}/>
    </div>
)
                