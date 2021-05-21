import React,{Fragment} from "react"
import {Editor,ACTION} from "we-edit"

import {Workspace, Ribbon, ContextMenu} from "we-edit-office"
import {Divider, ToolbarGroup} from "material-ui"

import Field from "./field"
import TOC from "./toc"
import TOA from "./toa"
import * as DocxTabs from "./tabs"
import {parseFile, anchor} from "./util"
import {shapes,textbox, defaultShape} from "./shape"

import Canvas from "../representation/canvas"

const KEY="docx"
const {Tab}=Ribbon
export default (
    <Workspace
        debug={true}
        accept="*.docx"
        name={KEY}
        key={KEY}
        ruler={{
            vertical:true,
            horizontal:{
                children:<DocxTabs.Indicator/>,
            }
        }}
        toolBar={
            <Ribbon.Ribbon commands={{
                insert:{
                    shape:false,
                    more:(
                    <Fragment>
                        <Field/>
                        <TOC/>
                        <Ribbon.ToolbarSeparator/>
                        <TOA/>
                        <Ribbon.Shape 
                            anchor={anchor}
                            shapes={shapes}
                            defaultShape={defaultShape}
                            >
                            {textbox}
                        </Ribbon.Shape>

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
                    basic: <Ribbon.Developer.Ribbon diff={{parseFile}}/>
                }
            }}>
                <Tab label={<input placeholder="Tell me what you want to do"/>}/>
            </Ribbon.Ribbon>
        }
        contextMenu={
            <ContextMenu desktop={true}>
                <Ribbon.Clipboard/>
                <Divider/>
                <TOC/>
                <Field/>
                <Ribbon.Text/>
                <Ribbon.Paragraph/>
                <Ribbon.Shape/>
            </ContextMenu>
        }
    >
        <Workspace.Desk
            layout={<Workspace.Layout right={<Workspace.PanelContainer name="right" style={{width:300}}/>}/>}
        >
            <Editor representation={"pagination"} canvas={<Canvas/>}/>
        </Workspace.Desk>
        <DocxTabs.Setting/>
    </Workspace>
)