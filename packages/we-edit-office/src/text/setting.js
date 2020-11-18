import React,{Component} from "react"
import PropTypes from "prop-types"

import {Tabs, Tab,TextField,FlatButton} from "material-ui"

import Dialog from "../components/dialog"
import Fonts from "./fonts"


export default class TextSettings extends Component{
    render(){
        const {close, style}=this.props
        return (
            <Dialog open={true} modal={true} titleStyle={{textAlign:"center"}}
                actions={[
                    <FlatButton
                        label="Default..."
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
                <Tabs>
                   <Tab label="Font">
                        <div style={{display:"flex"}}>
                            <Fonts floatingLabelText="Fonts" value={style?.fonts.split(",")}/>
                            <TextField floatingLabelText="Font Style" value={style?.bold ? "Bold" : (style?.italic ? "Italic" : "Regular")}/>
                            <TextField floatingLabelText="Size" value={style?.size}/>
                        </div>
                        <div style={{display:"flex"}}>
                            <TextField floatingLabelText="Color" value={style?.color}/>
                            <TextField floatingLabelText="Underline Style" />
                            <TextField floatingLabelText="Color"/>
                        </div>
                        <div>
                            <label><input type="checkbox"/><span>Strikethrough</span></label>
                            <label><input type="checkbox"/><span>Small caps</span></label>
                        </div>
                        <div>
                            <label><input type="checkbox"/><span>Doulbe Strikethrough</span></label>
                            <label><input type="checkbox"/><span>All caps</span></label>
                        </div>
                        <div>
                            <label><input type="checkbox"/><span>Superscript</span></label>
                            <label><input type="checkbox"/><span>Hidden</span></label>
                        </div>
                        <div>
                            <label><input type="checkbox"/><span>Subscript</span></label>
                        </div>
                   </Tab>
                   <Tab label="Advanced">

                   </Tab>
                   
                </Tabs>
                <hr/>
                <div>
                    <div><b>Preview</b></div>
                    <Previewer/>
                </div>
            </Dialog>
        )
    }
}

const Previewer=()=>(<div>Previewer here</div>)