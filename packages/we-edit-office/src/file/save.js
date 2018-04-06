import React, {PureComponent} from "react"
import PropTypes from "prop-types"
import {Emitter, Stream, getActive, ACTION as weACTION, render} from "we-edit"
import {TextField, RaisedButton} from "material-ui"

import ComboBox from "../components/combo-box"
import ACTION from "../state/action"
import OutputInput from "we-edit-output-input"

export default class Saver extends PureComponent{
    static contextTypes={
        store:PropTypes.object
    }

    static save=(state, doc)=>({format, stream})=>{
        if(!stream){
            stream=Saver.getStream(state,doc)
        }

    	if(!format)
            format=doc.type

        const supports=Emitter.supports
    	let Format=!format||doc.type==format ? OutputInput : supports[format]
    	return render(
    		<doc.Store readonly={true} release={false}>
    			<Emitter>
    				<Stream {...stream}>
    					<Format/>
    				</Stream>
    			</Emitter>
    		</doc.Store>
        )
    }

    static getStream(state, doc){
        let {format={type:doc.type}, stream={type:"browser",name:doc.name},loader}=state.get("office")
        if(format.type!=doc.type){
            if(loader && Emitter.supports[loader.type]){
                stream={...loader}
            }else{
                stream={type:"browser", name:doc.name}
            }
        }
        if(!stream.type)
            stream={type:"browser", name:doc.name}
        return stream
    }

    constructor(){
        super(...arguments)
        const {store}=this.context
        const {doc, state}=getActive(store.getState())
        this.doc=doc
        this.state={
            format: doc.type,
            stream: Saver.getStream(state, doc),
        }
    }

    getSupportedFormats(){
        let supports=Emitter.supports
        let formats=Object.keys(supports).filter(a=>!!a)
            .map(type=>{
                const {ext,name}=supports[type].defaultProps
                return {text:`${name} (*.${ext})`,value:type}
            })
        if(!supports[this.doc.type]){
            formats.unshift({
				text:`${this.doc.typeName} (*.${this.doc.typeExt})`,
				value:this.doc.type,
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
        let ext=Format ? Format.defaultProps.ext : this.doc.typeExt
        if(name.indexOf(".")==-1)
            return name+'.'+ext
        return name.replace(/\.\w+$/g, "."+ext)
    }

    render(){
        const {onCancel, onSave}=this.props
		let {format, stream}=this.state
        let noTypedStream=false
        let typedStreamUI=(({type, ...streamProps})=>{
                let Type=Stream.supports[type]
                if(Type && Type.SettingUI){
                    return <Type.SettingUI
                            ref="stream"
                            {...streamProps}
                                />
                }else{
                    noTypedStream=true
                    return <center style={{color:"red"}}>no stream[type={type}] implemenation</center>
                }
            })(stream);

        let actions=(
                <center>
                    <RaisedButton label="Cancel"
                        style={{marginRight:5}}
                        onClick={onCancel}/>

                    <RaisedButton label="Save"
                        disabled={noTypedStream}
                        primary={true}
                        onClick={this.save.bind(this)}/>
                </center>
            )
        return (
            <div style={{display:"flex", flexDirection:"column"}}>
				<center style={{height:100, lineHeight:"100px"}}>
                    <span>SaveTo:</span>
                    <ComboBox
                            value={stream.type}
                            dataSource={this.getSupportedStreams()}
                            onChange={type=>this.setState({stream:{...stream,type}})}/>
                </center>
				<div>
				{typedStreamUI}
				</div>

                <div style={{flex:"1 100%"}}>
                    <center>
                        <span>Format:</span>
                        <ComboBox
                            value={format}
                            dataSource={this.getSupportedFormats()}
                            onChange={format=>{
                                if(stream.name){
                                    stream={...stream, name:this.fixName(format, stream.name)}
                                }
                                this.setState({format, stream})
                            }}/>
                    </center>
                </div>

                {actions}
            </div>
        )
    }

	save(){
        const {store}=this.context
        const {onSave}=this.props
        const {doc,state}=getActive(store.getState())
		let {format,stream}=this.state
        stream={...stream, ...(this.refs.stream ? this.refs.stream.state :{})}
        onSave()
        Saver.save(state,doc)({format,stream})
            .then(()=>{
                store.dispatch(ACTION.stream(stream))
                store.dispatch(ACTION.format({type:format}))
            }).catch(e=>store.dispatch(weACTION.MESSAGE({type:"error", message:e.message})))
	}
}
