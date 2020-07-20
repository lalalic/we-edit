import React,{Component} from "react"
import PropTypes from "prop-types"
import {Representation, dom} from "we-edit"

import {Tabs, Tab} from "material-ui/Tabs"
import ComboBox from "../components/combo-box"

const {Document, Paragraph, Text}=dom
export default class Composer extends Component{
    render(){
        const {style={}, paragraphStyle={}}=this.props
        const labelStyle={fontSize:"smaller"}
        const textStyle={fonts:"calibri", size:12}
        const defaultStyle=textStyle
        const text=<Text {...textStyle} id="ct">hello</Text>

        return (
            <div style={{padding:10,height:500, backgroundColor:"lightgray",display:"flex", flexDirection:"row",...style}}>
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
                <div style={{flex:"none",height:200}}>
                    <Representation type="pagination" domain="viewer">
                        <WeDocument>
                            <Document id="root">
                                <Paragraph id="p" defaultStyle={defaultStyle}>
                                    {React.cloneElement(text,{id:"pt"},new Array(10).fill("Previous Paragraph").join(""))}
                                </Paragraph>
                                <Paragraph id="c" {...paragraphStyle}  defaultStyle={defaultStyle}>
                                    {text}
                                </Paragraph>
                                <Paragraph id="f"  defaultStyle={defaultStyle}>
                                    {React.cloneElement(text,{id:"ft"},new Array(10).fill("Following Paragraph").join(""))}
                                </Paragraph>
                            </Document>
                        </WeDocument>
                    </Representation>
                </div>
            </div>
        )
    }
}

class WeDocument extends Component{
    static contextTypes={
        ModelTypes: PropTypes.object
    }

    render(){
        return "hello composer"
        const document=this.modelize(this.props.children)
        return document
    }

    modelize(node){
        if(!node)
            return node
        const {ModelTypes}=this.context
        
        const {props:{children}, type:{displayName}}=node
        const type=displayName ? `${displayName.charAt(0).toUpperCase()}${displayName.substr(1)}` : displayName

        const transformedChildren=(()=>{
            if(React.isValidElement(children)){
                return this.modelize(children)
            }else if(Array.isArray(children)){
                return children.map(a=>this.modelize(a))
            }else{
                return children
            }
        })();

        return  React.createElement(ModelTypes[type], {children:transformedChildren}, node.props)
    }
}