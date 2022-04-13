import React,{Fragment} from "react"
import {Editor,ACTION} from "we-edit"
import IconPrint from "material-ui/svg-icons/action/view-module"

import {Workspace, Ribbon, ContextMenu, PropTypesUI, Office} from "we-edit-office"
import {Divider, ToolbarSeparator, Tab} from "material-ui"

import Field from "./field"
import TOC from "./toc"
import TOA from "./toa"
import * as DocxTabs from "./tabs"
import {anchor} from "./util"
import {shapes,textbox, defaultShape} from "./shape"

import Canvas from "../representation/canvas"
import Inspector from "./inspector"
import theme from "./themes"

const KEY="docx"

const WORKSPACE={
    debug:true,
    accept:"*.docx",
    name:KEY,
    key:KEY,
    officeUITheme:PropTypesUI.getTheme(theme),
    ruler:{
        vertical:true,
        horizontal:{
            children:<DocxTabs.Indicator/>,
        }
    },
    toolBar: <Ribbon.Ribbon commands={{
            insert:{
                shape:false,
                more:(
                <Fragment>
                    <Field/>
                    <TOC/>
                    <ToolbarSeparator/>
                    <TOA/>
                    <Ribbon.Shape.Create 
                        anchor={anchor}
                        shapes={shapes}
                        defaultShape={defaultShape}
                        >
                        {textbox}
                    </Ribbon.Shape.Create>

                  {/*  
                  <ToolbarGroup>
                        <Input/>
                        <CheckBox/>
                        <ComboBox/>
                    </ToolbarGroup>
                    
                    <Links/>
                    <PageNumber/>
                    <Comment/>
                    <TextBox/>
                    <TextFile/>
                    <OLEObject/>
                    <Chart/>
                    <Icons/>
                    <Symbols/>
                    <Equation/>
                    <Movie/>
                    <Audio/>
                  */}
                </Fragment>
                )
            },
            developer:{
                information: (
                    <Ribbon.Developer>
                        <Inspector.Button/>
                    </Ribbon.Developer>
                ),
            }
        }}>
            <Tab label={<input placeholder="Tell me what you want to do"/>}/>
    </Ribbon.Ribbon>,
    
    contextMenu:
        <ContextMenu desktop={true}>
            <Ribbon.Clipboard/>
            <Divider/>
            <Ribbon.Text/>
            <Ribbon.Paragraph/>
            <Divider/>
            <TOC/>
            <Field/>
            <Ribbon.Shape/>
            <Ribbon.Table/>
            <Ribbon.Picture/>
        </ContextMenu>
}

export default React.cloneElement(
    Office.Pagination,
    WORKSPACE, 
    <Workspace.Desk channel="print" icon={<IconPrint/>} >
        <Editor representation="pagination" canvas={<Canvas/>}/>
    </Workspace.Desk>,
    Office.Pagination.props.children
)