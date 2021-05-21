import React, {Fragment, PureComponent} from "react"
import PropTypes from "prop-types";
import {Tabs, Tab, Checkbox, TextField, SelectField, MenuItem, SvgIcon} from "material-ui"
import CheckIconButton from "../components/check-icon-button"
import IconLayout from "material-ui/svg-icons/device/wallpaper"
import IconPosition from "material-ui/svg-icons/action/picture-in-picture"
import IconSize from "material-ui/svg-icons/image/transform"

const Label=({children})=><span style={{fontSize:9}}>{children}</span>
export default class Layout extends PureComponent{
    state={}
    render(){
        const marginProps={type:"number", min:0, max:10,step:0.5}
        
        return (
            <Tabs>
                <Tab label={<Label>Position</Label>} icon={<IconPosition/>}>
                    <details open>
                        <summary>Horizontal</summary>
                        <div>
                            <SelectField floatingLabelText="Relative To" fullWidth={true}>
                                <MenuItem value="both" primaryText="Page"/>
                                <MenuItem value="left" primaryText="Left Margin"/>
                                <MenuItem value="right" primaryText="Right Margin"/>
                                <MenuItem value="largest" primaryText="Column"/>
                                <MenuItem value="largest" primaryText="Character"/>
                            </SelectField>
                            <TextField floatingLabelText="horizontal Offset" type="number" fullWidth={true}/>
                        </div>
                    </details>
                    <details open>
                        <summary>Vertical</summary>
                        <SelectField floatingLabelText="Relative To" fullWidth={true}>
                            <MenuItem value="both" primaryText="Page"/>
                            <MenuItem value="left" primaryText="Top Margin"/>
                            <MenuItem value="right" primaryText="Bottom Margin"/>
                            <MenuItem value="largest" primaryText="Paragraph"/>
                            <MenuItem value="largest" primaryText="Line"/>
                        </SelectField>
                        <TextField floatingLabelText="vertical Offset" type="number" fullWidth={true}/>
                    </details>
                    
                    <details open>
                        <summary>Options</summary>
                        <div>
                            <Checkbox label="Lock anchor"/>
                            <Checkbox label="Move with text"/>
                            <Checkbox label="Allow overlap"/>
                        </div>
                    </details>
                </Tab>
                <Tab label={<Label>Text Wrapping</Label>} icon={<IconWrap/>}>
                    <details open>
                        <summary>Wrapping Style</summary>
                        <div>
                            <Wraps/>
                            <SelectField floatingLabelText="Wrap Text" fullWidth={true}>
                                <MenuItem value="both" primaryText="Both sides"/>
                                <MenuItem value="left" primaryText="Left only"/>
                                <MenuItem value="right" primaryText="Right only"/>
                                <MenuItem value="largest" primaryText="Largest only"/>
                            </SelectField>
                        </div>
                    </details>
                    
                    <details open>
                        <summary>Distance from text</summary>
                        <div>
                            {"Left,Right,Top,Bottom".split(",").map(a=>{
                                return <TextField {...marginProps} floatingLabelText={a} key={a} name={a} fullWidth={true}/>
                            })}
                        </div>
                    </details>
                </Tab>
                <Tab label={<Label>Size</Label>} icon={<IconSize/>}>
                    <TextField floatingLabelText="Width" type="number" fullWidth={true}/>
                    <TextField floatingLabelText="Height" type="number" fullWidth={true}/>
                    <TextField floatingLabelText="Rotate" type="number" fullWidth={true}/>
                    <details open style={{marginTop:15}}>
                        <summary>Scale</summary>
                        <div>
                            <div style={{display:"flex"}}>
                                <TextField floatingLabelText="width" type="number" style={{flex:1}}/>
                                <TextField floatingLabelText="height" type="number" style={{flex:1}}/>
                            </div>
                            <Checkbox label="Lock aspect ratio"/>
                            <Checkbox label="Relative to original size"/>
                        </div>
                    </details>
                </Tab>
            </Tabs>
        )
    }
    static panel = <Layout title="Layout" />
    static Button = class extends PureComponent {
        static contextTypes = {
            panelManager: PropTypes.any,
        };
        render() {
            const { title = Layout.panel.props.title, whichPanel = "right", ...props } = this.props;
            return <CheckIconButton
                {...props}
                title={title}
                children={<IconLayout/>}
                onClick={e => this.context.panelManager.toggle(Layout.panel, whichPanel)} />;
        }
    }
}

class Wraps extends PureComponent{
    render(){
        return (
            <Fragment>
                <IconWrapSquare/>
                <IconWrapTight/>
                <IconWrapThrough/>
                <IconWrapClear/>
                <IconWrapBehind/>
                <IconWrapFront/>
                <IconWrapInline/>
            </Fragment>
        )
    }
}
const lines=<path d={new Array(21/3).fill(0).map((a,i)=>`M0 ${i*3}h44`).join("")} stroke="lightgray" strokeWidth={2}/>
const dog=<path d="M20.5 6c-2.61.7-5.67 1-8.5 1s-5.89-.3-8.5-1L3 8c1.86.5 4 .83 6 1v13h4v-6h4v6h4V9c2-.17 4.14-.5 6-1l-.5-2zM12 6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
const IconWrap=props=>(<SvgIcon {...props}> {lines} {dog} </SvgIcon>)

class IconWrapSquare extends PureComponent{
    label="Square"
    render(){
        return (
            <div style={{display:"inline-block",width:75,height:75,padding:20,fontSize:10,textAlign:"center"}}>
                <SvgIcon style={{width:50,height:50}}>
                    {lines}
                    {dog}
                </SvgIcon>
                <div>{this.label}</div>
            </div>
        )
    }
}
class IconWrapTight extends IconWrapSquare{
    label="Tight"
}
class IconWrapThrough extends IconWrapSquare{
    label="Through"
}
class IconWrapClear extends IconWrapSquare{
    label="Top and bottom"
}
class IconWrapBehind extends IconWrapSquare{
    label="Behind text"
}
class IconWrapFront extends IconWrapSquare{
    label="In front of Text"
}
class IconWrapInline extends IconWrapSquare{
    label="Inline with text"
}