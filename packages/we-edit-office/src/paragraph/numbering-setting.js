import React, {Component, Fragment} from "react"
import {dom} from "we-edit"
import { RaisedButton, FlatButton,SvgIcon } from "material-ui"
import Dialog from "../components/dialog"
import UnitInput from "../components/unit-input"
import Field from "../components/field"
import FontSetting from "../text/setting"

const {NumberingShape, numberings:Numberings, UnitShape}=dom.Paragraph
export class BulletList extends Component{
    static getDerivedStateFromProps({style},state){
        return {...style,...state}
    }
    constructor(){
        super(...arguments)
        this.state={}
        this.refFont=React.createRef()
        this.refBullet=React.createRef()
        this.refPicture=React.createRef()
    }

    render(){
        const {state:{setFont, setBullet, setPicture,...style},props:{bullets=[]}}=this
        return (
            <Fragment>
                <div style={{display:"flex"}}>
                    <div style={{flex:1}}>
                        <h3>Bullet Character</h3>
                        <div>
                            {bullets.map(({label},i)=>{
                                NumberingShape.normalize(bullets[i])
                                return (<SvgIcon key={label}></SvgIcon>)
                            })}
                        </div>
                        <div>
                            <RaisedButton label="Font..." onClick={e=>this.setState({setFont:true})}/>
                            <RaisedButton label="Bullet..." onClick={e=>this.setState({setBullet:true})}/>
                            <RaisedButton label="Picture..." onClick={e=>this.setState({setPicture:true})}/>
                        </div>
                        <hr/>

                        <h3>Text Position</h3>
                        <div>
                            <span>indent at </span>
                            <UnitInput min={0} value={style.indent} onChange={e=>this.setState({indent:e.target.value})}/>
                        </div>

                        <h3>Bullet Position</h3>
                        <div>
                            <UnitInput min={0} max={style.indent} value={style.hanging} onChange={e=>this.setState({hanging:e.target.value})}/>
                        </div>
                    </div>
                    <ListPreview style={{width:200,border:"1px solid black",padding:10}} numbering={this.state}/>
                </div>
                {setFont && (
                    <Dialog title="Bullet Font Style"
                            actions={[
                                <FlatButton
                                    label="Cancel"
                                    onClick={e=>this.setState({setFont:undefined})}
                                    />,
                            <FlatButton
                                label="Submit"
                                primary={true}
                                onClick={e=>{
                                    this.setState({setFont:undefined,style:this.refFont.current.state})
                                }}
                                />,
                            ]}
                        >
                        <FontSetting style={style.style} ref={this.refFont}/>
                    </Dialog>
                )}
            </Fragment>
        )
    }
}


export class NumberList extends BulletList{
    static getDerivedStateFromProps({style,numberings},state){
        return {...numberings[0],...style,...state}
    }

    render(){
        const {state:{setFont, start=1,label,format,...style}, props:{numberings}}=this
        return (
            <Fragment>
                <div style={{display:"flex"}}>
                    <div style={{flex:1}}>
                        <h3>Number Format</h3>
                        <Field label="Text">
                            <input type="text" 
                                value={label.replace("%1",Numberings[format](start-1))} 
                                onChange={e=>this.setState({label:e.target.value.replace(Numberings[format](start-1),"%1")})}
                                />
                            <FlatButton label="Font..." onClick={e=>this.setState({setFont:true})}/>
                        </Field>
                        <div style={{display:"flex"}}>
                            <Field label="Number Style:">
                                <select value={style.format} onChange={e=>this.setState({format:e.target.value})}>
                                    {numberings.map(({label,format})=>
                                        <option key={format} value={format}>{[0,1,2].map(i=>label.replace("%1",Numberings[format](i))).join(",")}...</option>)
                                    }
                                </select>
                            </Field>
                            <Field label="Start at:">
                                <input type="number" min={1} value={start} onChange={e=>this.setState({start:parseInt(e.target.value)})}/>
                            </Field>
                        </div>
                        <hr/>

                        <h3>Text Position</h3>
                        <div>
                            <span>indent at </span>
                            <UnitInput min={0} value={style.indent} onChange={e=>this.setState({indent:e.target.value})}/>
                        </div>

                        <h3>Numbering Position</h3>
                        <div style={{display:"flex"}}>
                            <div style={{flex:1}}>
                                <UnitInput min={0} value={style.hanging} onChange={e=>this.setState({hanging:e.target.value})}/>
                            </div>

                            <div style={{flex:1}}>
                                <span>Align at</span>
                                <select value={style.align} onChange={e=>this.setState({align:e.target.value})}>
                                    {"Left,Right,Center".split(",").map(a=><option value={a.toLowerCase()} key={a}>{a}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                    <ListPreview style={{width:200,border:"1px solid black",padding:10}} numbering={this.state}/>
                </div>
                {setFont && (
                    <Dialog title="Numbering Font Style"
                            actions={[
                                <FlatButton
                                    label="Cancel"
                                    onClick={e=>this.setState({setFont:undefined})}
                                    />,
                            <FlatButton
                                label="Submit"
                                primary={true}
                                onClick={e=>{
                                    this.setState({setFont:undefined,style:this.refFont.current.state})
                                }}
                                />,
                            ]}
                        >
                        <FontSetting style={style.style} ref={this.refFont}/>
                    </Dialog>
                )}
            </Fragment>
        )
    }
}

export class MultiLevelList extends BulletList{
    state={}
    render(){
        const {props:{close,apply}}=this
        return (
            <Dialog 
                title="Customize Outline Numbered List" 
                open={true}
                actions={[
                    <RaisedButton label="cancel" onClick={close}/>,
                    <RaisedButton label="OK" primary={true} onClick={e=>apply(this.state)}/>
                ]}
                >
                
            </Dialog>
        )
    }
}

const ListPreview=({style,pStyle={background:"lightgray"}, liStyle={background:"black"}, numbering:{format, label, indent, hanging}})=>{
    indent=UnitShape.normalize(indent)
    hanging=UnitShape.normalize(hanging)
                    
    return (
        <div style={style}>
            <p style={pStyle}>&nbsp;</p>
            <p style={pStyle}>&nbsp;</p>
            <ul>
                {[0,1,2].map(k=>{
                    return (
                        <li key={k}>
                            <p style={{...liStyle}}>&nbsp;</p>
                        </li>
                    )
                })}
            </ul>
            <p style={pStyle}>&nbsp;</p>
            <p style={pStyle}>&nbsp;</p> 
        </div>
    )
}

