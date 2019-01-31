import React from "react"
import {compose,setDisplayName,getContext,mapProps} from "recompose"
import {getSelection, ACTION, connect, getSelectionStyle} from "we-edit"

import {ToolbarGroup,ToolbarSeparator as ToolbarSeparator0,MenuItem} from "material-ui"
import CheckIconButton from "../components/check-icon-button"
import DropDownButton from "../components/drop-down-button"
import SizeIconButton from "../components/size-icon-button"

import IconAddRowAbove from "material-ui/svg-icons/editor/vertical-align-top"
import IconAddRowBelow from "material-ui/svg-icons/editor/vertical-align-bottom"

import IconRemove from "material-ui/svg-icons/navigation/close"

const ToolbarSeparator=props=><ToolbarSeparator0 style={{marginRight:2, marginLeft:2}} {...props}/>


export default compose(
    setDisplayName("TableLayout"),
    connect(state=>({selection:getSelectionStyle(state)})),
    mapProps(({dispatch,children,selection})=>({
        addRowAbove(){
            const row=selection.props("row",false)
            dispatch(ACTION.Selection.UPDATE({table:{row:{id:row.id,where:"before"}}}))
        },
        addRowBelow(){
            const row=selection.props("row",false)
            dispatch(ACTION.Selection.UPDATE({table:{row:{id:row.id, where:"after"}}}))
        },

        addColRight(){
            const cell=selection.props("cell",false)
            dispatch(ACTION.Selection.UPDATE({table:{col:{cell:cell.id,where:"after"}}}))
        },

        addColLeft(){
            const cell=selection.props("cell",false)
            dispatch(ACTION.Selection.UPDATE({table:{col:{cell:cell.id, where:"before"}}}))
        },
        remove(type){
            type=type=="column" ? "cell" : type
            const target=selection.props(type,false)
            dispatch(ACTION.Selection.UPDATE({table:{remove:{id:target.id}}}))
        }
    }))
)(({addRowAbove, addRowBelow, addColLeft, addColRight, remove})=>{
    return (
        <ToolbarGroup>
            <SizeIconButton  onClick={addRowAbove} label="Insert Row Above">
                <IconAddRowAbove/>
            </SizeIconButton>

            <SizeIconButton  onClick={addRowBelow} label="Insert Row Below">
                <IconAddRowBelow/>
            </SizeIconButton>

            <ToolbarSeparator/>

            <SizeIconButton onClick={addColRight} label="Insert Column Right">
                <IconAddRowAbove/>
            </SizeIconButton>

            <SizeIconButton onClick={addColLeft} label="Insert Column Left">
                <IconAddRowBelow/>
            </SizeIconButton>
            <ToolbarSeparator/>

            <DropDownButton label="Remove"
    			icon={<IconRemove/>}
    			>
    			{"column, row, table".split(",").map(a=>
    				<MenuItem
    					key={a}
    					onClick={e=>remove(a)}
    					primaryText={a}
    					/>
    			)}
    		</DropDownButton>
        </ToolbarGroup>
    )
})
