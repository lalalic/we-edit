import React,{Component} from "react"

import Field from "../components/field"
import UnitShapeInput from "../components/unit-shape-input"

export default class ParagraphSetting extends Component{
    static getDerivedStateFromProps({style},state){
        return {...style, ...state}
    }
    constructor(){
        super(...arguments)
        this.state={}
    }

    render(){
        const {state:style}=this
        return (
            <div>
                <FieldSet title="Alignment">
                    <select name="alignment" value={style.align} onChange={e=>this.setState({align:e.target.value})}>
                        {"Left,Right,Center,Justified".split(",").map(a=><option value={a.toLowerCase()} key={a}>{a}</option>)}
                    </select>
                </FieldSet>
                <FieldSet title="Indentation">
                    <div style={{display:"flex"}}>
                        <Field label="Left">
                            <UnitShapeInput value={style.indent?.left} onChange={left=>this.setState({indent:{...style.indent,left}})}/>
                        </Field>
                        <Field label="Right">
                            <UnitShapeInput value={style.indent?.right} onChange={right=>this.setState({indent:{...style.indent,right}})}/>
                        </Field>
                        <Field label="First Line">
                            <UnitShapeInput value={style.indent?.firstLine} onChange={firstLine=>this.setState({indent:{...style.indent,firstLine}})}/>
                        </Field>
                    </div>
                </FieldSet>
                <FieldSet title="Spacing">
                    <div style={{display:"flex"}}>
                        <Field label="Before">
                            <UnitShapeInput value={style.spacing?.top} onChange={top=>this.setState({spacing:{...style.spacing,top}})}/>
                        </Field>
                        <Field label="After">
                            <UnitShapeInput value={style.spacing?.bottom} onChange={bottom=>this.setState({spacing:{...style.spacing,bottom}})}/>
                        </Field>
                        <Field label="Line Height">
                            <UnitShapeInput value={style.spacing?.lineHeight} onChange={lineHeight=>this.setState({spacing:{...style.spacing,lineHeight}})}/>
                        </Field>
                    </div>
                </FieldSet>
                <FieldSet title="Pagination">
                    <div style={{display:"flex"}}>
                        <Field>
                            <input type="checkbox" checked={style.widow} onChange={({target:{checked:widow}})=>this.setState({widow})}/>
                            <span>Widow control</span>
                        </Field>
                        <Field>
                            <input type="checkbox" checked={style.orphan} onChange={({target:{checked:orphan}})=>this.setState({orphan})}/>
                            <span>Orphan control</span>
                        </Field>
                    </div>
                    <div style={{display:"flex"}}>
                        <Field>
                            <input type="checkbox" checked={style.keepWithNext} onChange={({target:{checked:keepWithNext}})=>this.setState({keepWithNext})}/>
                            <span>Keep with next</span>
                        </Field>
                        <Field>
                            <input type="checkbox" checked={style.keepLines} onChange={({target:{checked:keepLines}})=>this.setState({keepLines})}/>
                            <span>Keep lines together</span>
                        </Field>
                    </div>
                </FieldSet>
                <hr/>
            </div>
        )
    }
}

const FieldSet=({title,children})=>(
    <div>
        <h3>{title}</h3>
        {children}
    </div>
)
