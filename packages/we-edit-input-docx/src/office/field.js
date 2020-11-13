import React,{Component} from "react"

import {ACTION, whenSelectionChange} from "we-edit"
import {Ribbon} from "we-edit-office"

import {compose,setDisplayName,withState, withProps, shallowEqual,shouldUpdate} from "recompose"

import {ToolbarGroup, FlatButton} from "material-ui"
import FieldIcon from "material-ui/svg-icons/places/all-inclusive"

export default compose(
	setDisplayName("FieldStyle"),
	whenSelectionChange(({selection})=>{
        return {
            style:selection?.props("text",false),
            
        }
    }),
    withProps(({dispatch})=>({
        toggleFieldCode(id){
            dispatch(ACTION.Entity.UPDATE({field:{toggle:id}, id}))
        },
        build(instr){
            dispatch(ACTION.Entity.CREATE({type:"field",instr}))
        }
    })),
    withState('open','setOpen', false),
)(({style, toggleFieldCode, open, setOpen})=>(
    <ToolbarGroup>
        <Ribbon.CheckIconButton label="field"
            status={style?.field ? "checked" : "unchecked"}
            onClick={()=>{
                if(style?.field){
                    toggleFieldCode(style.field)
                }else{
                    setOpen(!open)
                }
            }}
            >
            <FieldIcon/>
        </Ribbon.CheckIconButton>
        {open && <BuildField close={()=>setOpen(false)} />}
    </ToolbarGroup>
))

class BuildField extends Component{
    constructor(){
        super(...arguments)
        this.state={}
    }
    render(){
        const {close}=this.props
        const {current={}}=this.state
        const Dialog=Ribbon.Dialog
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