import React from "react"

import {compose,setDisplayName,mapProps} from "recompose"
import {ACTION, whenSelectionChangeDiscardable} from "we-edit"

import {MenuItem,SvgIcon,ToolbarGroup} from "material-ui"
import DropDownButton from "../components/drop-down-button"

import IconSelect from "material-ui/svg-icons/action/open-with"

import IconNotChecked from "material-ui/svg-icons/toggle/check-box-outline-blank"
import IconChecked from "material-ui/svg-icons/toggle/check-box"

import IconAbove from "material-ui/svg-icons/editor/vertical-align-top"
import IconBelow from "material-ui/svg-icons/editor/vertical-align-bottom"
import IconLeft from "material-ui/svg-icons/navigation/first-page"
import IconRight from "material-ui/svg-icons/navigation/last-page"

export default compose(
    setDisplayName("TableDesigner"),
    whenSelectionChangeDiscardable(),
    mapProps(({dispatch})=>{
        return {
            addRowAbove(){
                dispatch(ACTION.Entity.CREATE({type:"row", where:"before"}))
            },
            addRowBelow(){
                dispatch(ACTION.Entity.CREATE({type:"row", where:"after"}))
            },

            addColRight(){
                dispatch(ACTION.Entity.CREATE({type:"column", where:"after"}))
            },

            addColLeft(){
                dispatch(ACTION.Entity.CREATE({type:"column", where:"before"}))
            },
            remove(type){
                dispatch(ACTION.Selection.EXTEND(type))
                dispatch(ACTION.Selection.REMOVE({type}))
            },
            select(type){
                dispatch(ACTION.Selection.EXTEND(type))
            }   
        }
    })
)(({addRowAbove, addRowBelow, addColLeft, addColRight, remove, select})=>{
    return (
        <ToolbarGroup>
            <DropDownButton title="table conditions" icon={<IconCondition children={<X/>}/>} >
                <MenuItem primaryText="Header Row" leftIcon={<IconChecked/>}/>
                <MenuItem primaryText="Total Row" leftIcon={<IconNotChecked/>}/>
                <MenuItem primaryText="Banded Rows" leftIcon={<IconChecked/>}/>

                <MenuItem primaryText="First Column" leftIcon={<IconChecked/>}/>
                <MenuItem primaryText="Last Column" leftIcon={<IconNotChecked/>}/>
                <MenuItem primaryText="Banded Columns" leftIcon={<IconNotChecked/>}/>
            </DropDownButton>

            <DropDownButton title="select ..." icon={<IconSelect/>}>
                <MenuItem primaryText="Select Cell" leftIcon={<IconCell/>} onClick={()=>select("cell")}/>
                <MenuItem primaryText="Select Column" leftIcon={<IconColumn/>} onClick={()=>select("column")}/>
                <MenuItem primaryText="Select Row" leftIcon={<IconRow/>} onClick={()=>select("row")}/>
                <MenuItem primaryText="Select Table" leftIcon={<IconWholeTable/>} onClick={()=>select("table")}/>
            </DropDownButton>

            <DropDownButton  title="delete ..." icon={<IconTable children={<X size={12} strokeWidth={3}/>}/>}>
                <MenuItem primaryText="Delete Cell" 
                    onClick={()=>remove("cell")}
                    leftIcon={
                        <IconCell>
                            <X/>
                        </IconCell>
                    }/>
                <MenuItem primaryText="Delete Column" 
                    onClick={()=>remove("column")}
                    leftIcon={
                        <IconColumn>
                            <X/>
                        </IconColumn>
                    }/>
                <MenuItem primaryText="Delete Row" 
                    onClick={()=>remove("row")}
                    leftIcon={
                        <IconRow>
                            <X/>
                        </IconRow>
                    }/>
                <MenuItem primaryText="Delete Table" 
                    onClick={()=>remove("table")}
                    leftIcon={
                        <IconWholeTable>
                            <X/>
                        </IconWholeTable>
                    }/>
            </DropDownButton>

            <DropDownButton title="insert row/column" icon={<IconTable children={null}/>} >
                <MenuItem primaryText="Insert Row Above" leftIcon={<IconAbove/>} onClick={addRowAbove}/>
                <MenuItem primaryText="Insert Row Below" leftIcon={<IconBelow/>} onClick={addRowBelow}/>
                <MenuItem primaryText="Insert Column Left" leftIcon={<IconLeft/>} onClick={addColLeft}/>
                <MenuItem primaryText="Insert Column Right" leftIcon={<IconRight/>} onClick={addColRight}/>
            </DropDownButton>

        </ToolbarGroup>
    )
})

const IconCondition=props=>(
    <SvgIcon {...props}>
        <path d="M7 5h2V3H7v2zm0 8h2v-2H7v2zm0 8h2v-2H7v2zm4-4h2v-2h-2v2zm0 4h2v-2h-2v2zm-8 0h2v-2H3v2zm0-4h2v-2H3v2zm0-4h2v-2H3v2zm0-4h2V7H3v2zm0-4h2V3H3v2zm8 8h2v-2h-2v2zm8 4h2v-2h-2v2zm0-4h2v-2h-2v2zm0 8h2v-2h-2v2zm0-12h2V7h-2v2zm-8 0h2V7h-2v2zm8-6v2h2V3h-2zm-8 2h2V3h-2v2zm4 16h2v-2h-2v2zm0-8h2v-2h-2v2zm0-8h2V3h-2v2z"/>
        <path d="M5 8 l4 5l8 -8" stroke="blue" fill="none" strokeWidth="3"/>
    </SvgIcon>
)

const IconTable=({children, ...props})=>(
    <SvgIcon {...props}>
        <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 20H4v-4h4v4zm0-6H4v-4h4v4zm0-6H4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4z"/>
        {children}
    </SvgIcon>
)

const B=props=><rect fill="blue" width="4" height="4" {...props}/>

const IconCell=({children, ...props})=>(
    <IconTable {...props}>
        <B x="4" y="10"/>
        {children}
    </IconTable>
)

const IconColumn=({children, ...props})=>(
    <IconTable {...props}>
        <B x="10" y="4"/>
        <B x="10" y="10"/>
        <B x="10" y="16"/>
        {children}
    </IconTable>
)

const IconRow=({children, ...props})=>(
    <IconTable {...props}>
        <B x="4" y="10"/>
        <B x="10" y="10"/>
        <B x="16" y="10"/>
        {children}
    </IconTable>
)

const IconWholeTable=({children, ...props})=>(
    <IconTable {...props}>
        <B x="4" y="4"/>
        <B x="10" y="4"/>
        <B x="16" y="4"/>

        <B x="4" y="10"/>
        <B x="10" y="10"/>
        <B x="16" y="10"/>

        <B x="4" y="16"/>
        <B x="10" y="16"/>
        <B x="16" y="16"/>
        {children}
    </IconTable>
)

const X=({size:w=8,p=(24-w)/2, ...props})=><path d={`M0 0 l${w} ${w} M0 ${w} l${w} -${w}`} stroke="red" strokeWidth={2} transform={`translate(${p} ${p})`} {...props}/>


