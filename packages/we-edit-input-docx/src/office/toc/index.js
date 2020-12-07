import React,{Component,Fragment} from "react"

import {ACTION, whenSelectionChange} from "we-edit"
import {Ribbon, Dialog, ContextMenu} from "we-edit-office"

import {compose,setDisplayName,withState, withProps, } from "recompose"

import {ToolbarGroup, FlatButton,MenuItem,Divider} from "material-ui"
import TOCIcon from "material-ui/svg-icons/action/toc"
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';


export default compose(
    setDisplayName("TOC"),
    whenSelectionChange(({selection}, state)=>{
        const toc=selection?.isInTOC()
        const canvas=selection?.positioning.responsible
        if(toc){
            return {
                toc:toc.attr('id'),
                instr:toc.findFirst('fieldBegin[command="TOC"]').attr("instr"),
                hasToC:true,
                canvas,
            }
        }else{
            return {
                hasToC: !!state.get('content').find((v,k)=>v.get('type')=="ToC"),
                canvas,
            }
        }
    }),
    withProps(({dispatch,toc:id, instr})=>({
        build(e,instr='TOC \\o "1-3" \\h \\z \\u'){
            dispatch(ACTION.Entity.CREATE({type:"ToC",instr}))
        },
        update(type){
            dispatch(ACTION.Entity.UPDATE({toc:{type,instr},id}))
        },
        remove(){
            dispatch(ACTION.Selection.REMOVE({type:"ToC"}))
        }
    })),
    withState('open','setOpen', false),
)(({toc, hasToC, update, instr, open, setOpen, build, remove})=>(
    <ContextMenu.Support
        menus={!toc ? null : //not field
            (
                <Fragment>
                    <MenuItem primaryText="Update ToC" rightIcon={<ArrowDropRight/>} open={true} menuItems={[
                        <MenuItem primaryText="Page Only" onClick={e=>update("page")}/>,
                        <MenuItem primaryText="Whole ToC" onClick={e=>update("toc")}/>,
                    ]}/>
                    <MenuItem primaryText="Edit ToC..." onClick={e=>e.dialog=<BuildTOC id={toc} apply={build}/>}/>
                    <MenuItem primaryText="Remove ToC" onClick={remove}/>
                    <Divider/>
                </Fragment>
            )
        }
        >
        <ToolbarGroup>
            <Ribbon.CheckIconButton title="Table of Contents"
                status={toc ? "checked" : "unchecked"}
                disabled={hasToC}
                onClick={build}
                >
                <TOCIcon/>
            </Ribbon.CheckIconButton>
            {open && <BuildTOC close={()=>setOpen(false)} apply={build}/>}
        </ToolbarGroup>
    </ContextMenu.Support>
))

const DialogTitleStyle={textAlign:"center",padding:5,background:"darkgray",lineHeight:"unset",fontSize:12}
class BuildTOC extends Component{
    render(){
        const {close, }=this.props
        return (
            <Dialog title="Table of Contents" modal={true} open={true} titleStyle={DialogTitleStyle}
            actions={[
                <FlatButton
                    label="Options..."
                    onClick={e=>this.setState({setOption:true})}
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
                        close()
                    }}
                />,
            ]}>

            </Dialog>
        )
    }
}
