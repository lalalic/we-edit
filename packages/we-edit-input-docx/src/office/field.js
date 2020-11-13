import React,{Component,Fragment} from "react"

import {ACTION, whenSelectionChange} from "we-edit"
import {Ribbon, Dialog, ContextMenu} from "we-edit-office"

import {compose,setDisplayName,withState, withProps, } from "recompose"

import {ToolbarGroup, FlatButton,MenuItem,Divider} from "material-ui"
import FieldIcon from "material-ui/svg-icons/places/all-inclusive"

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
)(({style, toggleFieldCode, update, open, setOpen})=>(
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
            {open && <BuildField close={()=>setOpen(false)} />}
        </ToolbarGroup>
    </ContextMenu.Support>
))

class BuildField extends Component{
    constructor(){
        super(...arguments)
        this.state={}
    }
    render(){
        const {close}=this.props
        const {current={}}=this.state
        return (
            <Dialog title="Field" modal={true} open={true}
                actions={[
                    <FlatButton
                        label="Cancel"
                        primary={true}
                        onClick={close}
                    />,
                    <FlatButton
                        label="Submit"
                        primary={true}
                        disabled={true}
                        onClick={close}
                    />,
                ]}
                >
                <div style={{display:"flex", flexDirection:"row",marginBottom:10}}>
                    <div style={{flex:1, padding:5}}>
                        <span>Categories:</span><br/>
                        <select style={{width:"100%"}}>
                            <option>(All)</option>
                        </select>
                    </div>
                    <div style={{flex:1,padding:5}}>
                        <span>Field Names:</span><br/>
                        <select style={{width:"100%"}}>
                            <option>=(Formula)</option>
                        </select>
                    </div>
                </div>
                <div>field codes: {current.code}</div>
                <div style={{padding:10, paddingLeft:0}}>
                    <input value={current.defaultValue} style={{width:"100%"}}/>
                </div>
                <div>Description:<br/>{current.desc}</div>
            </Dialog>
        )
    }
}