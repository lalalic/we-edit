import React,{Component,Fragment} from "react"

import {ACTION, whenSelectionChange} from "we-edit"
import {Ribbon, Dialog, ContextMenu} from "we-edit-office"

import {compose,setDisplayName,withState, withProps, } from "recompose"

import {ToolbarGroup, FlatButton,MenuItem,Divider,Tabs,Tab} from "material-ui"
import FieldIcon from "material-ui/svg-icons/places/all-inclusive"

import {Field} from "../render/dom/field"

export default compose(
	setDisplayName("FieldStyle"),
	whenSelectionChange(({selection})=>{
        const field=selection?.isInField()
        if(field){
            const instr=field.attr('instr')
            const style=selection?.props("text",false)
            return {style:{...style,field:field.attr('id'),instr}}
        }
        return {style:undefined}
    }),
    withProps(({dispatch,style})=>({
        build(instr){
            if(style?.field && style.instr!==instr){
                dispatch(ACTION.Entity.UPDATE({field:{instr}, id:style.field}))
            }else{
                dispatch(ACTION.Entity.CREATE({type:"field",instr}))
            }
        },
        update(){
            dispatch(ACTION.Entity.UPDATE({field:{execute:style.field},id:style.field}))
        }
    })),
    withState('open','setOpen', false),
)(({style, toggleFieldCode, update, open, setOpen, build})=>(
    <ContextMenu.Support
        menus={!(style?.field) ? null : //not field
            (
                <Fragment>
                    <MenuItem primaryText="Update Field" onClick={update}/>
                    <MenuItem primaryText="Edit Field..." onClick={e=>e.dialog=<BuildField value={style.instr} apply={build}/>}/>
                    <Divider/>
                </Fragment>
            )
        }
        >
        <ToolbarGroup>
            <Ribbon.CheckIconButton label="Field"
                status={style?.field ? "checked" : "unchecked"}
                onClick={e=>setOpen(true)}
                >
                <FieldIcon/>
            </Ribbon.CheckIconButton>
            {open && <BuildField close={()=>setOpen(false)} apply={build} value={style?.instr}/>}
        </ToolbarGroup>
    </ContextMenu.Support>
))

const DialogTitleStyle={textAlign:"center",padding:5,background:"darkgray",lineHeight:"unset",fontSize:12}
class BuildField extends Component{
    constructor({value}){
        super(...arguments)
        this.state={}
        if(value){
            const {command}=Field.create(value)
            this.state.command=command
            if(value.indexOf("\* MERGEFORMAT")!=-1){
                this.state.value=value.replace("\\* MERGEFORMAT","")  
            }else{
                this.state.preserve=false
            }  
        } 
    }
    
    render(){
        const {close, apply}=this.props
        const {cate="(All)",command=Field.filter(cate)[0],value=command,setOption,preserve=true}=this.state
        const field=Field.describe(command)
        return (
            <Dialog title="Field" modal={true} open={true} titleStyle={DialogTitleStyle}
                actions={[
                    <FlatButton
                        label="Options..."
                        onClick={e=>this.setState({setOption:true})}
                        disabled={Object.keys(field.switches).length==0}
                        style={{float:"left"}}
                    />,
                    <FlatButton
                        label="Cancel"
                        onClick={close}
                    />,
                    <FlatButton
                        label="Submit"
                        primary={true}
                        onClick={e=>{
                            apply(`${value} ${preserve ? "\\* MERGEFORMAT" : ""}`)
                            close()
                        }}
                    />,
                ]}
                >
                <div style={{display:"flex", flexDirection:"row",marginBottom:10}}>
                    <div style={{flex:1, padding:5}}>
                        <span>Categories:</span><br/>
                        <select style={{width:"100%",outline:"none"}} 
                            multiple size={7} value={[cate]} 
                            onChange={e=>this.setState({cate:e.target.value,command:undefined,value:undefined})}
                            >
                            {Field.Categories.map(k=><option key={k}>{k}</option>)}
                        </select>
                    </div>
                    <div style={{flex:1,padding:5}}>
                        <span>Field Names:</span><br/>
                        <select style={{width:"100%",outline:"none"}} 
                        multiple size={7} value={[command]} 
                        onChange={e=>this.setState({command:e.target.value,value:undefined})}>
                            {Field.filter(cate).map(k=><option key={k}>{k}</option>)}
                        </select>
                    </div>
                </div>
                <div style={{minHeight:50}}>Field codes: {command} {field.formula}</div>
                <div style={{padding:10, paddingLeft:0}}>
                    <input value={value} style={{width:"100%"}} onChange={e=>this.setState({value:e.target.value})}/>
                </div>
                <hr/>
                <div>Description:</div>
                <div style={{minHeight:50,padding:10}}>{field.desc}</div>
                <div>
                    <input type="checkbox" checked={preserve} onChange={e=>{
                        this.setState({preserve:e.target.checked})
                    }}/>
                    <span>Preserve formatting during updates</span>
                </div>
                {setOption && <Options command={command} value={value} field={field} close={(e,options)=>this.setState({setOption:false,...options})}/>}
            </Dialog>
        )
    }
}

class Options extends Component{
    constructor({value}){
        super(...arguments)
        this.state={value}
    }
    render(){
        const {close,command,field:{switches:{"@":date, "#":numeric, "*":text, ...specific}={},...field}}=this.props
        const general=date||numeric||text
        const specifics=Object.keys(specific)
        const {value,option=general ? "general" : specifics.length ? "specific" : undefined,...state}=this.state
        return (
            <Dialog title="Field Options" titleStyle={DialogTitleStyle} modal={true} open={true}
                actions={[
                    <FlatButton
                        label="Cancel"
                        onClick={close}
                    />,
                    <FlatButton
                        label="Submit"
                        primary={true}
                        onClick={e=>close(e,{value})}
                    />,
                ]}
                >
                    <Tabs value={option} onChange={e=>this.setState({option:e})} 
                        contentContainerStyle={{paddingTop:10}}>
                        {general && <Tab label="General Switches" value="general">
                            <div style={{display:"flex",flexDirection:"column"}}>
                                {date && <select multiple size={5} style={{flex:1,outline:"none"}} 
                                    value={[state.date]} 
                                    onChange={e=>this.setState({date:e.target.value})}
                                    onDoubleClick={e=>{this.setState({date:e.target.value, value:`${value} \\@ "${e.target.value}"`})}}
                                    >
                                    {Field.Format.Date.map(k=><option key={k}>{k}</option>)}
                                </select>}
                                {numeric && <select multiple size={5} style={{flex:1,outline:"none"}} 
                                    value={[state.numeric]} 
                                    onChange={e=>this.setState({numeric:e.target.value})}
                                    onDoubleClick={e=>{this.setState({numeric:e.target.value, value:`${value} \\# "${e.target.value}"`})}}
                                    >
                                    {Field.Format.Numeric.map(k=><option key={k}>{k}</option>)}
                                </select>}
                                {text && <select multiple size={5} style={{flex:1,outline:"none"}} 
                                    value={[state.text]} 
                                    onChange={e=>this.setState({text:e.target.value})}
                                    onDoubleClick={e=>{this.setState({text:e.target.value, value:`${value} \\* "${e.target.value}"`})}}
                                    >
                                    {Field.Format.Text.map(k=><option key={k}>{k}</option>)}
                                </select>}
                            </div>
                        </Tab>}
                        {specifics.length>0 && <Tab label="Field Specific Switches" value="specific">
                            <select multiple size={5} style={{width:"100%",outline:"none"}} 
                                value={[state.specific||specifics[0]]} 
                                onChange={e=>this.setState({specific:e.target.value})}
                                onDoubleClick={e=>{this.setState({specific:e.target.value, value:`${value} \\${e.target.value}`})}}
                                >
                                {specifics.map(k=><option key={k} value={k}>\{k}</option>)}
                            </select>
                        </Tab>}
                        {this[name] && this[name]()}
                    </Tabs>

                    <div style={{minHeight:50,paddingTop:10}}>Field codes: {command} {field.formula}</div>
                    <div style={{padding:10, paddingLeft:0}}>
                        <input value={value} style={{width:"100%"}} onChange={e=>this.setState({value:e.target.value})}/>
                    </div>
                    <div>Description:</div>
                    <div style={{minHeight:50,padding:10}}>
                        {
                            option=="specific" ? specific[state.specific||specifics[0]] : 
                            (option=="general" ? date||numeric||text : option)
                        }
                    </div>
            </Dialog>
        )
    }

    LISTNUM(){
        return (
            <Tab label="List Names">
                <select multiple size={5} style={{width:"100%"}}>

                </select>
            </Tab>
        )
    }
}