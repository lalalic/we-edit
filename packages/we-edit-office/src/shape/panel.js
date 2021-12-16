import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import CheckIconButton from "../components/check-icon-button";
import IconFormatPanel from "material-ui/svg-icons/editor/format-shapes"
import {Tabs, Tab, RadioButton, RadioButtonGroup, Checkbox, TextField, SelectField,IconButton} from "material-ui"
import IconFillLine from "material-ui/svg-icons/editor/format-color-fill"
import IconEffect from "material-ui/svg-icons/editor/format-line-spacing"
import IconLayout from "material-ui/svg-icons/image/crop"
import IconPicture from "material-ui/svg-icons/image/photo"
import IconPlus from "material-ui/svg-icons/content/add"
import IconMinus from "material-ui/svg-icons/content/remove"
import SelectStyle from "../components/select-style"
import {MenuItem} from "../components/menu"


const Label=({children})=><span style={{fontSize:9}}>{children}</span>
export default class FormatPanel extends PureComponent {
    render() {
        return (
            <Tabs className="format-panel">
                <Tab label={<Label>Fill/Line</Label>} icon={<IconFillLine/>}>
                    <details open>
                        <summary>Fill</summary>
                        <Fill/>  
                    </details>
                    <details>
                        <summary>Line</summary>  
                        <Line/>
                    </details>
                </Tab>
                <Tab label={<Label>Effect</Label>} icon={<IconEffect/>}>
                    <details open>
                        <summary>Shadow</summary>
                        <div>hello</div>    
                    </details>
                    <details>
                        <summary>Reflect</summary> 
                        <div>hello</div>   
                    </details>
                    <details>
                        <summary>Glow</summary>  
                        <div>hello</div>  
                    </details>
                    <details>
                        <summary>Soft Edges</summary>  
                        <div>hello</div>  
                    </details>
                    <details>
                        <summary>3-D Format</summary>
                        <div>hello</div>    
                    </details>
                    <details>
                        <summary>3-D Rotation</summary>
                        <div>hello</div>    
                    </details>
                    <details>
                        <summary>Artistic Effects</summary>   
                        <div>hello</div> 
                    </details>
                </Tab>
                <Tab label={<Label>TextBox</Label>} icon={<IconLayout/>}>
                    <details open>
                        <summary>Text Box</summary>   
                        <TextBox/> 
                    </details>
                </Tab>
                <Tab label={<Label>Picture</Label>} icon={<IconPicture/>}>
                    <details open>
                        <summary>Corrections</summary>  
                        <div>hello</div>  
                    </details>
                    <details>
                        <summary>Color</summary>   
                        <div>hello</div> 
                    </details>
                    <details>
                        <summary>Transparency</summary> 
                        <div>hello</div>   
                    </details>
                    <details>
                        <summary>Crop</summary>  
                        <div>hello</div>  
                    </details>
                </Tab>
            </Tabs>
            
        )
    }

    static panel = <FormatPanel title="Shape" />
    static Button = class extends PureComponent {
        static contextTypes = {
            panelManager: PropTypes.any,
        };
        render() {
            const { title = FormatPanel.panel.props.title, whichPanel = "right", ...props } = this.props;
            return <CheckIconButton
                {...props}
                title={title}
                children={<IconFormatPanel/>}
                onClick={e => this.context.panelManager.toggle(FormatPanel.panel, whichPanel)} />;
        }
    };
}

class Fill extends PureComponent{
    state={}
    render(){
        const {state:{type="No"}, props:{}}=this
        const TypedFill=this.constructor[type]
        return (
            <div>
                <RadioButtonGroup name="fill" defaultSelected="No"
                    onChange={(e,type)=>this.setState({type})}>
                    <RadioButton
                        value="No"
                        label="No Fill"
                    />
                    <RadioButton
                        value="Solid"
                        label="Solid Fill"
                    />
                    <RadioButton
                        value="Gradient"
                        label="Gradient Fill"
                    />
                    <RadioButton
                        value="Picture"
                        label="Picture Fill"
                    />
                    <RadioButton
                        value="Pattern"
                        label="Pattern Fill"
                    />
                </RadioButtonGroup>
                {TypedFill && <hr/>}
                {TypedFill && <TypedFill/>}
            </div>
        )
    }

    static Solid=class extends PureComponent{
        state={}
        render(){
            const {state:{color="000000",transparency=0}}=this
            return (
                <Fragment>
                    <div style={{display:"flex",padding:5}}>
                        <span style={{flex:1}}>Color</span>
                        <input type="color" style={{width:20}} value={color}/>
                    </div>
                    <div style={{display:"flex",padding:5}}>
                        <span style={{flex:1}}>Transparency</span>
                        <input type="number" style={{width:40}} value={transparency}/>
                    </div>
                </Fragment>
            )
        }
    }

    static Gradient=class extends this.Solid{
        render(){
            const {state:{type="linear",direction="top",angle=0}}=this
            return (
                <Fragment>
                    <SelectField floatingLabelText="Type" value={type}>
                        <MenuItem value="top" primaryText="Linear"/>
                        <MenuItem value="middle" primaryText="Radial"/>
                        <MenuItem value="bottom" primaryText="Rectangular"/>
                        <MenuItem value="bottom" primaryText="Path"/>
                    </SelectField>
                    <SelectField floatingLabelText="Direction" value={direction}>
                        <MenuItem value="top" primaryText="Linear"/>
                        <MenuItem value="middle" primaryText="Radial"/>
                        <MenuItem value="bottom" primaryText="Rectangular"/>
                        <MenuItem value="bottom" primaryText="Path"/>
                    </SelectField>
                    <div style={{display:"flex",padding:5}}>
                        <span style={{flex:1}}>Angle</span>
                        <input type="number" style={{width:40}} value={angle}/>
                    </div>

                    <GradientStops/>
                </Fragment>
            )
        }
    }

    static Picture=class extends this.Solid{
        render(){
            const {
                state:{tile=false,rotate=true, align="top", mirror="none"}
            }=this
            return (
                <Fragment>
                    <div style={{display:"flex",padding:5}}>
                        <span style={{flex:1}}>Select Picture</span>
                        <input type="file" style={{width:20}}/>
                    </div>

                    <div style={{display:"flex",padding:5}}>
                        <span style={{flex:1}}>Texture</span>
                        <input type="picture" style={{width:20}}/>
                    </div>

                    <div style={{display:"flex",padding:5}}>
                        <span style={{flex:1}}>Transparency</span>
                        <input type="number" style={{width:40}}/>
                    </div>
                    <Checkbox label="Tile picture as texture" value={tile}/>
                    <Checkbox label="Rotate with shape" value={rotate}/>
                    <TextField floatingLabelText="Offset X" type="number"/>
                    <TextField floatingLabelText="Offset Y" type="number"/>
                    <TextField floatingLabelText="Scale X" type="number"/>
                    <TextField floatingLabelText="Scale Y" type="number"/>
                    <SelectField floatingLabelText="Alignment" value={align}>
                        <MenuItem value="top" primaryText="Top Left"/>
                        <MenuItem value="middle" primaryText="Top"/>
                        <MenuItem value="bottom" primaryText="Top Right"/>
                        <MenuItem value="top" primaryText="Left"/>
                        <MenuItem value="middle" primaryText="Center"/>
                        <MenuItem value="bottom" primaryText="Right"/>
                        <MenuItem value="top" primaryText="Bottom Left"/>
                        <MenuItem value="middle" primaryText="Bottom"/>
                        <MenuItem value="bottom" primaryText="Bottom Right"/>
                    </SelectField>
                    <SelectField floatingLabelText="Mirror Type" value={mirror}>
                        <MenuItem value="top" primaryText="None"/>
                        <MenuItem value="middle" primaryText="Horizontal"/>
                        <MenuItem value="bottom" primaryText="Vertical"/>
                        <MenuItem value="top" primaryText="Both"/>
                    </SelectField>
                </Fragment>
            )
        }
    }

    static Pattern=class extends this.Solid{
        render(){
            const {state:{foreground="FFFFFF",background="000000"}}=this
            return (
                <Fragment>
                    <div>Pattern</div>
                    <div>
                        {[].map((a,i)=><SvgIcon key={i}>{a}</SvgIcon>)}
                    </div>
                    <div style={{display:"flex",padding:5}}>
                        <span style={{flex:1}}>Foreground</span>
                        <input type="color" style={{width:20}} value={foreground}/>
                    </div>
                    <div style={{display:"flex",padding:5}}>
                        <span style={{flex:1}}>Background</span>
                        <input type="color" style={{width:20}} value={background}/>
                    </div>
                </Fragment>
            )
        }
    }
}

class Line extends PureComponent{
    state={}
    render(){
        const {state:{type="No"}, props:{}}=this
        const TypedFill=this.constructor[type]
        return (
            <div>
                <RadioButtonGroup name="fill" defaultSelected="No" 
                    onChange={(e,type)=>this.setState({type})}>
                    <RadioButton
                        value="No"
                        label="No Line"
                    />
                    <RadioButton
                        value="Solid"
                        label="Solid Line"
                    />
                    <RadioButton
                        value="Gradient"
                        label="Gradient Line"
                    />
                </RadioButtonGroup>
                {TypedFill && <hr/>}
                {TypedFill && <TypedFill/>}
            </div>
        )
    }

    static Common=class extends PureComponent{
        state={}
        render(){
            const {
                state:{width,sketched,compound,join,cap,dash,beginArrowType,beginArrowSize,endArrowType,endArrowSize}
            }=this
            return(
                <Fragment>
                    <div style={{display:"flex",padding:5}}>
                        <span style={{flex:1}}>Width</span>
                        <input type="number" style={{width:40}} value={width}/>
                    </div>
                    <SelectField floatingLabelText="Sketched Style" value={sketched}>
                        <MenuItem value="top" primaryText="Top"/>
                        <MenuItem value="middle" primaryText="Middle"/>
                        <MenuItem value="bottom" primaryText="Bottom"/>
                    </SelectField>
                    <SelectField floatingLabelText="Compound Type" value={compound}>
                        <MenuItem value="top" primaryText="Top"/>
                        <MenuItem value="middle" primaryText="Middle"/>
                        <MenuItem value="bottom" primaryText="Bottom"/>
                    </SelectField>
                    <SelectField floatingLabelText="Dash Type" value={dash}>
                        <MenuItem value="top" primaryText="Top"/>
                        <MenuItem value="middle" primaryText="Middle"/>
                        <MenuItem value="bottom" primaryText="Bottom"/>
                    </SelectField>
                    <SelectField floatingLabelText="Cap Type" value={cap}>
                        <MenuItem value="top" primaryText="Top"/>
                        <MenuItem value="middle" primaryText="Middle"/>
                        <MenuItem value="bottom" primaryText="Bottom"/>
                    </SelectField>
                    <SelectField floatingLabelText="Join Type" value={join}>
                        <MenuItem value="top" primaryText="Top"/>
                        <MenuItem value="middle" primaryText="Middle"/>
                        <MenuItem value="bottom" primaryText="Bottom"/>
                    </SelectField>

                    <SelectField floatingLabelText="Begin Arrow Type" value={beginArrowType}>
                        <MenuItem value="top" primaryText="Top"/>
                        <MenuItem value="middle" primaryText="Middle"/>
                        <MenuItem value="bottom" primaryText="Bottom"/>
                    </SelectField>
                    <SelectField floatingLabelText="Begin Arrow size" value={beginArrowSize}>
                        <MenuItem value="top" primaryText="Top"/>
                        <MenuItem value="middle" primaryText="Middle"/>
                        <MenuItem value="bottom" primaryText="Bottom"/>
                    </SelectField>
                    <SelectField floatingLabelText="End Arrow Type" value={endArrowType}>
                        <MenuItem value="top" primaryText="Top"/>
                        <MenuItem value="middle" primaryText="Middle"/>
                        <MenuItem value="bottom" primaryText="Bottom"/>
                    </SelectField>
                    <SelectField floatingLabelText="End Arrow Size" value={endArrowSize}>
                        <MenuItem value="top" primaryText="Top"/>
                        <MenuItem value="middle" primaryText="Middle"/>
                        <MenuItem value="bottom" primaryText="Bottom"/>
                    </SelectField>
                </Fragment>
            )
        }
    }

    static Solid=class extends Fill.Solid{
        render(){
            return (
                <Fragment>
                    {super.render()}
                    <Line.Common/>
                </Fragment>
            )
        }
    }

    static Gradient=class extends Fill.Gradient{
        render(){
            return (
                <Fragment>
                    {super.render()}
                    <Line.Common/>
                </Fragment>
            )
            
        }
    }
}

class TextBox extends PureComponent{
    state={}
    render() {
        const marginProps={type:"number", min:0, max:10,step:0.5}
        const {
            state:{
                vertAlign="top", direction=0, autofit=true, overflow=false, wrap=true, 
                margin={left:0,right:0,top:0,bottom:0},
            },
            props:{}
        }=this
        return (
            <div>
                <SelectField floatingLabelText="Vertical Alignment" value={vertAlign}>
                    <MenuItem value="top" primaryText="Top"/>
                    <MenuItem value="middle" primaryText="Middle"/>
                    <MenuItem value="bottom" primaryText="Bottom"/>
                </SelectField>
                <SelectField floatingLabelText="Text Direction" value={direction}>
                    <MenuItem value={0} primaryText="Horizontal"/>
                    <MenuItem value={90} primaryText="90"/>
                    <MenuItem value={270} primaryText="270"/>
                </SelectField>
                <Checkbox label="Resize shape to fit text" value={autofit}/>
                <Checkbox label="Allow text to overflow" value={overflow}/>
                <Checkbox label="Wrap text in shape" value={wrap}/>
                {"Left,Right,Top,Bottom".split(",").map(a=>{
                    return <TextField {...marginProps} floatingLabelText={`${a} Margin`} key={a} name={a} value={margin[a]}/>
                })}
            </div>
        )
    }
}

class GradientStops extends PureComponent{
    state={}
    render(){
        const {state:{stops=[],color="000000",position=0,transparency=0,brightness=0}}=this
        return(
            <Fragment>
                <div style={{display:"flex",padding:5, lineHeight:"24px"}}>
                    <span style={{flex:1}}>Gradient Stops</span>
                    <div><IconPlus/><IconMinus/></div>
                </div>
                <Stops stops={stops}/>
                <div style={{display:"flex",padding:5}}>
                    <span style={{flex:1}}>Color</span>
                    <input type="color" style={{width:20}} value={color}/>
                </div>
                <div style={{display:"flex",padding:5}}>
                    <span style={{flex:1}}>Position</span>
                    <input type="number" style={{width:40}} value={position}/>
                </div>
                <div style={{display:"flex",padding:5}}>
                    <span style={{flex:1}}>Transparency</span>
                    <input type="number" style={{width:40}} value={transparency}/>
                </div>
                <div style={{display:"flex",padding:5}}>
                    <span style={{flex:1}}>Brightness</span>
                    <input type="number" style={{width:40}} value={brightness}/>
                </div>
            </Fragment>
        )
    }
}

const Stops=({stops=[]})=>(
    <svg style={{}}>
        <rect/>
        {stops.map(({offset,color,transparency,brightness})=><g/>)}
    </svg>
)
