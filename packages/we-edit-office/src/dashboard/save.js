import React, {PureComponent} from "react"
import {Emitter, Stream} from "we-edit"
import {TextField, RaisedButton} from "material-ui"

import ComboBox from "../components/combo-box"

export default class SaveUI extends PureComponent{
    state={
		format:this.props.active.type, 
		name: this.props.active.name,
		stream: "browser"
	}
    getSupportedFormats(){
        let supports=Emitter.supports
        let formats=Object.keys(supports).filter(a=>!!a)
            .map(type=>{
                const {ext,name}=supports[type].defaultProps
                return {text:`${name} (*.${ext})`,value:type}
            })
        let active=this.props.active
        if(!supports[active.type]){
            formats.unshift({
				text:`${active.typeName} (*.${active.typeExt})`,
				value:active.type, 
			})
        }
        return formats
    }
	
	getSupportedStreams(){
		let supports=Stream.supports
		return Object.keys(supports).filter(a=>!!a)
	}

    fixName(format,name){
        let Format=Emitter.supports[format]
        let ext=Format ? Format.defaultProps.ext : this.props.active.typeExt
        if(name.indexOf(".")==-1)
            return name+'.'+ext
        return name.replace(/\.\w+$/g, "."+ext)
    }

    render(){
        const {active, onCancel, onSave}=this.props
		const {format, stream}=this.state
        return (
            <div style={{display:"flex", flexDirection:"column"}}>
				<center style={{height:100, lineHeight:"100px"}}>
                    <span>SaveTo:</span>
                    <ComboBox
                            value={this.state.stream}
                            dataSource={this.getSupportedStreams()}
                            onChange={stream=>this.setState({stream})}/>
                </center>
				<div>
				{
					((type)=>{
						let Type=Stream.supports[type]
						if(Type && Type.SettingUI){
							return <Type.SettingUI ref="stream" 
							name={this.fixName(format,active.name)}/>
						}
					})(stream)
				}
				</div>

                <div style={{flex:"1 100%"}}>
                    <center>
                        <span>Format:</span>
                        <ComboBox
                            value={format}
                            dataSource={this.getSupportedFormats()}
                            onChange={format=>{
                                this.setState({format},()=>{
									if(this.refs.stream){
										const {name}=this.refs.stream.state
										this.refs.stream.setState({
											name:this.fixName(format,name)
										})
									}
								})
                            }}/>
                    </center>
                </div>

                <center>
                    <RaisedButton label="Cancel" style={{marginRight:5}} onClick={onCancel}/>
                    <RaisedButton label="Save" primary={true} onClick={this.save.bind(this)}/>
                </center>
            </div>
        )
    }
	
	save(){
		const {format, stream}=this.state
		this.props.onSave({
			format, 
			stream:{
				...(this.refs.stream ? this.refs.stream.state :{}),
				type:stream
			}
		})
	}
}
