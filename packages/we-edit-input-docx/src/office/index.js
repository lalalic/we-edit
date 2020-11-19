import React,{Fragment} from "react"
import {Editor} from "we-edit"

import {Workspace, Ribbon, ContextMenu} from "we-edit-office"
import {Divider, MenuItem} from "material-ui"

import Field from "./field"

const KEY="docx"
const {Tab}=Ribbon
export default (
    <Workspace
        debug={true}
        accept="*.docx"
        key={KEY}
        ruler={true}
        toolBar={
            <Ribbon.Ribbon commands={{
                insert:{
                    more:(<Fragment><Field/></Fragment>)
                }
            }}>
                 {"Draw,Design,References,Review,View,Developer".split(",").map(label=><Tab label={label} key={label}/>)}
                <Tab label="xPression">
                    <input type="checkbox"/>
                </Tab>
                <Tab label={<input placeholder="Tell me what you want to do"/>}/>
            </Ribbon.Ribbon>
        }
        contextMenu={
            <ContextMenu desktop={true}>
                <Ribbon.Clipboard/>
                <Divider/>
                <Field/>
                <Ribbon.Text/>
                <Ribbon.Paragraph/>
            </ContextMenu>
        }
    >
        <Workspace.Desk
            layout={<Workspace.Layout right={<Workspace.PanelContainer name="right" style={{width:300}}/>}/>}
        >
            <Editor representation="pagination"/>
        </Workspace.Desk>
        <style children={`text[data-field]:hover{filter:url(#background)}`}/>
    </Workspace>
)