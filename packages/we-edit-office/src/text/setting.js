import React,{Component, Fragment} from "react"
import SvgIcon from "material-ui/SvgIcon"
import Fonts from "./fonts"
import ColorButton from "../components/color-button"
import ComboBox from "../components/combo-box"


export default class TextSettings extends Component{
    static getDerivedStateFromProps({style={}},state){
        return {...style,...state}
    }

    constructor(){
        super(...arguments)
        this.state={}
    }

    get fontStyle(){
        const {style}=this.props
        let fontStyle=[]
        style?.bold && fontStyle.push("Bold")
        style?.italic && fontStyle.push("Italic")
        !fontStyle.length && fontStyle.push("Regular")
        return fontStyle.join(" ")
    }
    
    render(){
        const {state:style, props}=this
        return (
            <Fragment>
                <div style={{display:"flex"}}>
                    <Field label="Text Font">
                        <Fonts value={style?.fonts||""} changeFont={fonts=>this.setState({fonts})}/>
                    </Field>
                    <Field label="Font Style">
                        <ComboBox value={this.fontStyle} autoFilter={false}
                            dataSource={["Regular","Bold","Italic","Bold Italic"]}
                            onChange={value=>{
                                const state={bold:false,italic:false}
                                value.indexOf("Bold")!=-1 && (state.bold=true);
                                value.indexOf("Italic")!=-1 && (state.italic=true);
                                this.setState(state)
                            }}
                            />
                    </Field>
                    <Field label="Font Size">
                        <ComboBox value={style?.size||""} autoFilter={false}
                            dataSource={new Array(10).fill(0).map((a,i)=>2*(i+1))}
                            onChange={value=>this.setState({size: value.trim() ? parseFloat(value) :""})}
                            />
                    </Field>
                </div>
                <div style={{display:"flex"}}>
                    <Field label="Text Color">
                        <ColorButton value={style?.color} onChange={color=>this.setState({color})}>
                            <SvgIcon>
                                <rect {...{width:40,height:20,fill:style?.color}}/>
                            </SvgIcon>
                        </ColorButton>
                    </Field>
                    <Field label="Highlight Color">
                        <ColorButton value={style?.highlight} onChange={highlight=>this.setState({highlight})}>
                            <SvgIcon>
                                <rect {...{width:40,height:20,fill:style?.highlight}}/>
                            </SvgIcon>
                        </ColorButton>
                    </Field>
                </div>
                <div>
                    <input type="checkbox" checked={!!style?.strike} onChange={e=>this.setState({strike:e.target.checked})}/><span>Strikethrough</span><br/>
                    <input type="checkbox" checked={!!style?.underline} onChange={e=>this.setState({underline:e.target.checked})}/><span>Underline</span><br/>
                    <input type="checkbox" checked={style?.vertAlign=="superscript"} onChange={e=>this.setState({vertAlign:e.target.checked ? "superscript" : undefined})}/><span>Superscript</span><br/>
                    <input type="checkbox" checked={style?.vertAlign=="subscript"} onChange={e=>this.setState({vertAlign:e.target.checked ? "subscript" : undefined})}/><span>Subscript</span><br/>
                    <input type="checkbox" checked={!!style?.vanish} onChange={e=>this.setState({vanish:e.target.checked})}/><span>Hidden</span><br/>
                    <input type="checkbox" checked={!!style?.border} onChange={e=>this.setState({border:e.target.checked})}/><span>Border</span><br/>
                </div>
            </Fragment>
        )
    }
}

const Field=({style,label,children})=><div style={{flex:1, ...style}}><span>{label}</span><br/>{children}</div>