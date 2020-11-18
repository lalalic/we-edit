import React,{Component} from "react"
import {dom} from "we-edit"

import {Tabs, Tab} from "material-ui/Tabs"

import Previewer from "../components/previewer"
import Dialog from "../components/dialog"
import FlatButton from "material-ui/FlatButton"


const {Paragraph, Text}=dom
export default class ParagraphSetting extends Component{
    render(){
        const {style={}, paragraphStyle={}, close}=this.props
        const labelStyle={fontSize:"smaller"}
        const textStyle={fonts:"calibri", size:12}
        const defaultStyle=textStyle
        const text=<Text {...textStyle} id="ct">hello</Text>
        return (
            <Dialog open={true} modal={true} title="Paragraph Setting" titleStyle={{textAlign:"center"}}
                actions={[
                    <FlatButton
                        label="Tabs..."
                        style={{float:"left"}}
                    />,
                    <FlatButton
                        label="Set As Default"
                        style={{float:"left"}}
                    />,

                    <FlatButton
                        label="Cancel"
                        onClick={close}
                    />,
                    <FlatButton
                        label="Submit"
                        primary={true}
                        onClick={close}
                    />,
                ]}
                >
                    <Tabs style={{width:"100%"}}>
                        <Tab label={<span style={labelStyle}>Indents and Spacing</span>}>
                            <fieldset>
                                <legend>General</legend>
                                <label for="alignment">Alignment</label>
                                <select name="alignment">
                                    {"Left,Right,Center,Justified".split(",").map(a=><option value={a} key={a}>{a}</option>)}
                                </select>
                                <label for="outline">Outline Level</label>
                                <select name="outline">
                                    <option>Body Text</option>
                                    <option>Level 1</option>
                                    <option>Level 2</option>
                                    <option>Level 3</option>
                                </select>
                            </fieldset>
                            <hr/>
                            <fieldset>
                                <legend>Indentation</legend>

                            </fieldset>
                            <fieldset>
                                <legend>Spacing</legend>
                            
                            </fieldset>
                        </Tab>
                        <Tab label={<span style={labelStyle}>Line and Page Breaks</span>}>

                        </Tab>
                        <Tab label={<span style={labelStyle}>Asian Typograph</span>}>

                        </Tab>
                    </Tabs>
                    <hr/>
                    <div style={{height:200,background:"white"}}>
                        <Previewer>
                            <Paragraph id="p" defaultStyle={defaultStyle}>
                                {React.cloneElement(text,{id:"pt"},new Array(10).fill("Previous Paragraph").join(""))}
                            </Paragraph>
                            <Paragraph id="c" {...paragraphStyle}  defaultStyle={defaultStyle}>
                                {text}
                            </Paragraph>
                            <Paragraph id="f"  defaultStyle={defaultStyle}>
                                {React.cloneElement(text,{id:"ft"},new Array(10).fill("Following Paragraph").join(""))}
                            </Paragraph>
                        </Previewer>
                    </div>
            </Dialog>
        )
    }
}
