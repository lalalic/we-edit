import React,{Component,Fragment} from "react"

import {ACTION, whenSelectionChange} from "we-edit"
import {Ribbon, Dialog, ContextMenu} from "we-edit-office"

import {compose,setDisplayName,withState, withProps, } from "recompose"

import {ToolbarGroup, FlatButton,MenuItem,Divider,Tabs,Tab} from "material-ui"
import FieldIcon from "material-ui/svg-icons/places/all-inclusive"

import Fields from "../render/dom/field/categories"

export default compose(
	setDisplayName("FieldStyle"),
	whenSelectionChange(({selection})=>{
        return {
            style:selection?.props("text",false),     
        }
    }),
    withProps(({dispatch,style})=>({
        toggleFieldCode(){
            dispatch(ACTION.Entity.UPDATE({field:{toggle:style.field}, id:style.field}))
        },
        build(instr){
            dispatch(ACTION.Entity.CREATE({type:"field",instr}))
        },
        update(){
            dispatch(ACTION.Entity.UPDATE({field:{update:style.field},id:style.field}))
        }
    })),
    withState('open','setOpen', false),
)(({style, toggleFieldCode, update, open, setOpen, build})=>(
    <ContextMenu.Support
        menus={!(style?.field) ? null : //not field
            (
                <Fragment>
                    <MenuItem primaryText="Update Field" onClick={update}/>
                    <MenuItem primaryText="Toggle Field Code" onClick={toggleFieldCode}/>
                    <Divider/>
                </Fragment>
            )
        }
        >
        <ToolbarGroup>
            <Ribbon.CheckIconButton label="Field"
                status={style?.field ? "checked" : "unchecked"}
                onClick={e=>style?.field ? toggleFieldCode() : setOpen(!open)}
                >
                <FieldIcon/>
            </Ribbon.CheckIconButton>
            {open && <BuildField close={()=>setOpen(false)} create={build}/>}
        </ToolbarGroup>
    </ContextMenu.Support>
))

const DialogTitleStyle={textAlign:"center",padding:5,background:"darkgray",lineHeight:"unset",fontSize:12}
class BuildField extends Component{
    constructor(){
        super(...arguments)
        this.state={}
    }
    render(){
        const {close, create}=this.props
        const {cate="(All)",command=Fields.filter(cate)[0],value=command,setOption,preserve=true}=this.state
        const field=Fields.describe(command)
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
                        onClick={e=>create(`${value} ${preserve ? "\\* MERGEFORMAT" : ""}`)}
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
                            {Fields.Categories.map(k=><option key={k}>{k}</option>)}
                        </select>
                    </div>
                    <div style={{flex:1,padding:5}}>
                        <span>Field Names:</span><br/>
                        <select style={{width:"100%",outline:"none"}} 
                        multiple size={7} value={[command]} 
                        onChange={e=>this.setState({command:e.target.value,value:undefined})}>
                            {Fields.filter(cate).map(k=><option key={k}>{k}</option>)}
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
                    <input type="checkbox" checked={preserve} onClick={e=>this.setState({preserve:!preserve})}/>
                    <span>Preserve formatting during updates</span>
                </div>
                {setOption && <Options command={command} value={value} field={field} close={(e,options)=>this.setState({setOption:false,...options})}/>}
            </Dialog>
        )
    }
}

class Options extends Component{
    static getDerivedStateFromProps({value},state){
        return {value,...state}
    }
    constructor(){
        super(...arguments)
        this.state={}
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
                                    {Fields.Format.Date.map(k=><option key={k}>{k}</option>)}
                                </select>}
                                {numeric && <select multiple size={5} style={{flex:1,outline:"none"}} 
                                    value={[state.numeric]} 
                                    onChange={e=>this.setState({numeric:e.target.value})}
                                    onDoubleClick={e=>{this.setState({numeric:e.target.value, value:`${value} \\# "${e.target.value}"`})}}
                                    >
                                    {Fields.Format.Numeric.map(k=><option key={k}>{k}</option>)}
                                </select>}
                                {text && <select multiple size={5} style={{flex:1,outline:"none"}} 
                                    value={[state.text]} 
                                    onChange={e=>this.setState({text:e.target.value})}
                                    onDoubleClick={e=>{this.setState({text:e.target.value, value:`${value} \\* "${e.target.value}"`})}}
                                    >
                                    {Fields.Format.Text.map(k=><option key={k}>{k}</option>)}
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
                            (option=="general" ? date||numberic||text : option)
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