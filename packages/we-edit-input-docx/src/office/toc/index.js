import React,{Component,Fragment} from "react"

import {ACTION, whenSelectionChangeDiscardable, stateSafe} from "we-edit"
import {CheckIconButton, Dialog, ContextMenu} from "we-edit-office"

import {compose,setDisplayName,withState, withProps, } from "recompose"

import {ToolbarGroup, FlatButton,MenuItem,Divider} from "material-ui"
import TOCIcon from "material-ui/svg-icons/action/toc"


export default compose(
    setDisplayName("TOC"),
    whenSelectionChangeDiscardable(({selection}, state)=>{
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
    withProps(({dispatch,toc:id, instr, canvas})=>({
        build(e,instr='TOC \\o "1-3" \\h \\z \\u'){
            dispatch(ACTION.Entity.CREATE({type:"ToC",instr}))
        },
        update(type){
            if(type=="page"){
                canvas.props.document.setState({composeAll:true},()=>{
                    dispatch(ACTION.Entity.UPDATE({document:{numpages:{canvas:stateSafe(canvas)}},id:"root"}))
                })
            }else{//
                dispatch(ACTION.Entity.UPDATE({toc:{whole:{}},id}))
            }
            
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
                    <MenuItem primaryText="Update ToC Page" onClick={e=>update("page")}/>,
                    <MenuItem primaryText="Update Entire ToC" onClick={e=>update("whole")}/>,
                    <MenuItem primaryText="Remove ToC" onClick={remove}/>
                    <Divider/>
                </Fragment>
            )
        }
        >
        <ToolbarGroup>
            <CheckIconButton hint="Table of Contents"
                status={toc ? "checked" : "unchecked"}
                disabled={hasToC}
                onClick={build}
                >
                <TOCIcon/>
            </CheckIconButton>
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
