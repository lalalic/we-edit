import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"
import { compose, setDisplayName } from "recompose"
import {connect, getSelection, getContent, whenSelectionChangeDiscardable} from "we-edit"
import {Ribbon, Dialog, ContextMenu} from "we-edit-office"
import { IconButton } from "material-ui"
import InspectorIcon from "material-ui/svg-icons/places/all-inclusive"

/*
export default compose(
    setDisplayName("Inspector"),
)(({open})=>(
    <ContextMenu.Support>
        <ToolbarGroup>
            <Ribbon.CheckIconButton label="Inspector"
                status={style?.field ? "checked" : "unchecked"}
                onClick={e=>panelManager.toggle("inspector")}
                >
                <InspectorIcon/>
            </Ribbon.CheckIconButton>
            {open && <BuildField close={()=>setOpen(false)} apply={build} value={style?.instr}/>}
        </ToolbarGroup>
    </ContextMenu.Support>
))
*/
export default class Inspector extends Component{
    constructor(){
        super(...arguments)
        this.state={}
    }

    render(){
        const {}=this.props
        return (
            <Fragment>
                <Content style={{minHeight:200}}/>
                <hr/>
                <Composed/>
            </Fragment>
        )
    }

    static panel=<Inspector title="Inspector"/>
    static Button=class extends Component{
        static contextTypes={
            panelManager:PropTypes.any
        }

        render(){
            const {title=Inspector.panel.props.title, whichPanel="left", ...props}=this.props
            return (
                <Ribbon.CheckIconButton 
                    {...props}
                    hint={title}
                    onClick={()=>this.context.panelManager.toggle(Inspector.panel,whichPanel)}>
                    <InspectorIcon/>
                </Ribbon.CheckIconButton>
            )
        }
    }
}

const Content=compose(
    setDisplayName("Content Properties"),
    connect(state=>{
        const focus=getSelection(state).end?.id
        if(focus){
            const {type, id, props}=getContent(state, focus).toJS()
            return {type,id,props}
        }
    }),
)(class extends Component{
    render(){
        const {type,id, style, props}=this.props
        if(!id){
            return <div style={style}></div>
        }
        return (
            <div style={style}>
                <div style={TitleStyle}>{type}[{id}]</div>
            </div>
        )
    }
});
const TitleStyle={margin:20,marginBottom:10,paddingBottom:10,borderBottom:"1px solid gray"}
const Composed=compose(
    setDisplayName("Composed Properties"),
    whenSelectionChangeDiscardable(({selection})=>{
        const {pages=[]}=selection?.positioning
        return {pages}
    }),
)(
    class extends Component{
        render(){
            const {pages,style}=this.props
            return (
                <div style={style}>
                    <div style={TitleStyle}>Composed</div>
                    
                </div>
            )
        }
    }
)





