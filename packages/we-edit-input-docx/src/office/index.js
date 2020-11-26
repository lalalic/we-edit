import React,{Fragment} from "react"
import {Editor,ACTION} from "we-edit"

import {Workspace, Ribbon, ContextMenu} from "we-edit-office"
import {Divider} from "material-ui"

import Field from "./field"
import Links from "./link"
import PageNumber from "./page-number"
import Tabs from "./tabs"

const KEY="docx"
const {Tab}=Ribbon
export default (
    <Workspace
        debug={true}
        accept="*.docx"
        key={KEY}
        ruler={{
            vertical:{
                onDoubleClick(e,dispatch){
                    dispatch(ACTION.UI({settingLayout:true}))
                }
            },
            horizontal:{
                onDoubleClick(e,dispatch){
                    dispatch(ACTION.UI({settingLayout:true}))
                },

                onScaleClick(e,dispatch,leftMargin){
                    e.stopPropagation()
                    const x=100
                    //dispatch(ACTION.UPDATE({paragraph:{addTab:x-leftMargin}}))
                    return false
                },

                onScaleDoubleClick(e,dispatch,leftMargin){
                    e.stopPropagation()
                    dispatch(ACTION.UI({settingTab:true}))
                    return false
                },
                children:<Tabs/>
            }
        }}
        toolBar={
            <Ribbon.Ribbon commands={{
                insert:{
                    more:(
                    <Fragment>
                        <Field/>
                      {/*  
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
        <Tabs.Setting/>
        <style children={`text[data-field]:hover{filter:url(#background)}`}/>
    </Workspace>
)