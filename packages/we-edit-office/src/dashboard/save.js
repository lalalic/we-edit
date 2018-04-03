import React, {PureComponent} from "react"
import {Emitter} from "we-edit"
import {TextField, RaisedButton} from "material-ui"

import ComboBox from "../components/combo-box"

export default class SaveUI extends PureComponent{
    state={format:this.props.active.type, name: this.props.active.name}
    getSupportedFormats(){
        let supports=Emitter.supports
        let formats=Object.keys(supports).filter(a=>!!a)
            .map(type=>{
                const {ext,name}=supports[type].defaultProps
                return {text:`${name} (*.${ext})`,value:type}
            })
        let active=this.props.active
        if(!supports[active.type]){
            formats.unshift({text:`${active.typeName} (*.${active.typeExt})`,value:active.type, })
        }
        return formats
    }

    render(){
        const {active, onCancel, onSave}=this.props
        return (
            <div style={{display:"flex", flexDirection:"column"}}>
                <center style={{height:100, lineHeight:"100px"}}>
                    <span>SaveAs:</span>
                    <TextField name="name"
                        value={this.state.name}
                        onChange={(e,name)=>{this.setState({name})}}/>
                </center>

                <div style={{flex:"1 100%"}}>
                    <center>
                        <span>Format:</span>
                        <ComboBox
                            value={this.state.format}
                            dataSource={this.getSupportedFormats()}
                            onChange={format=>this.setState({format})}/>
                    </center>
                </div>

                <center>
                    <RaisedButton label="Cancel" style={{marginRight:5}} onClick={onCancel}/>
                    <RaisedButton label="Save" primary={true} onClick={()=>onSave(this.state)}/>
                </center>
            </div>
        )
    }
}
