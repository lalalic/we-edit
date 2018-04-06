import React, {PureComponent} from "react"
import PropTypes from "prop-types"
import {Emitter, Stream, getActive} from "we-edit"
import {TextField, RaisedButton} from "material-ui"

import ComboBox from "../components/combo-box"
import ACTION from "../state/action"

export default class SaveUI extends PureComponent{
    static contextTypes={
        store:PropTypes.object
    }

    state={
		format:this.props.active.type,
		name: this.props.active.name,
		stream: this.getLastStream().type
	}

    getLastStream(){
        const {state}=getActive(this.context.store.getState())
        let {stream={},loader}=state.get("office")
        if(!stream.type){
            if(loader && Emitter.supports[loader.type]){
                stream={...loader}
            }else{
                stream={type:"browser"}
            }
        }
        return stream
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
							name={this.fixName(format,active.name)}
                            />
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
        const {onSave, dispatch}=this.props
		let {format,stream}=this.state
        stream={...(this.refs.stream ? this.refs.stream.state :{}), type:stream}
		onSave({format,stream})
        dispatch(ACTION.stream(stream))
        dispatch(ACTION.format({type:format}))
	}
}
