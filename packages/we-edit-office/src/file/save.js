import React, {PureComponent} from "react"
import PropTypes from "prop-types"
import {Provider} from "react-redux"

import {Emitter, Stream, getActive, ACTION as weACTION, render} from "we-edit"
import RaisedButton from "material-ui/RaisedButton"

import ComboBox from "../components/combo-box"
import ACTION from "../state/action"

export default class Saver extends PureComponent{
    static contextTypes={
        store:PropTypes.object
    }

    static getEmitterStream(state, doc){
        let {
			format={type:doc.type},
			stream={type:"browser",name:doc.name},
			loader
		}=state.get("office")

        if(format.type!=doc.type){
            if(loader && Emitter.supports[loader.type]){
                stream={...loader}
            }else{
                stream={type:"browser", name:doc.name}
            }

			format={type:doc.type}
        }
        if(!stream.type)
            stream={type:"browser", name:doc.name}
        return {format,stream}
    }

    constructor(){
        super(...arguments)
        const {store}=this.context
        const {doc, state}=getActive(store.getState())
        this.doc=doc
        this.state=Saver.getEmitterStream(state, doc)
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
		if(!name)
			return name
        let Format=Emitter.get(format)
        let ext=Format ? Format.defaultProps.ext : this.doc.typeExt
        if(name.indexOf(".")==-1)
            return name+'.'+ext
        return name.replace(/\.\w+$/g, "."+ext)
    }

    render(){
        const {onCancel, onSave}=this.props
		let {format, stream}=this.state
		let supportedStreams=this.getSupportedStreams()
		let supportedFormats=this.getSupportedFormats()

        let noTypedStream=false
        let typedStreamUI=(({type, ...streamProps})=>{
			let Type=Stream.get(type)
			if(Type){
				return <Type
						ref="stream"
						{...streamProps}
						format={format.type}
						fixName={name=>this.fixName(format.type,name)}
						/>
			}else{
				noTypedStream=true
				return (
					<center style={{color:"red"}}>
					no stream[type={type}] implemenation
					</center>
				)
			}
		})(stream);

		let typedFormatUI=(({type, ...formatProps})=>{
			let Type=Emitter.get(type)
			if(Type){
				return <Type.Setting ref="format"	{...formatProps} />
			}else{
				return null
			}
		})(format);



        return (
            <div style={{display:"flex", flexDirection:"column"}}>
				<div>
					{supportedStreams.length>1 &&
						(<center style={{height:100, lineHeight:"100px"}}>
							<span>Save to:</span>
							<ComboBox
									value={stream.type}
									dataSource={supportedStreams}
									onChange={type=>this.setState({stream:{...stream,type}})}/>
						</center>)
					}
				</div>

				<div>
					{typedStreamUI}
				</div>


				<div style={{flex:"1 100%"}}>
					 {supportedFormats.length>0 && (
						<center>
							<span>Save as type:</span>
							<ComboBox
								value={format.type}
								dataSource={supportedFormats}
								onChange={type=>{
									this.setState({format:{...format,type}})
								}}/>
						</center>
					 )}
				</div>

				<div>
					{typedFormatUI}
				</div>

                <center>
                    <RaisedButton
						label="Cancel"
                        style={{marginRight:5}}
                        onClick={onCancel}
						/>

                    <RaisedButton
						label="Save"
                        disabled={noTypedStream}
                        primary={true}
                        onClick={this.save.bind(this)}
						/>
                </center>
            </div>
        )
    }

	save(){
        const {store}=this.context
        const {onSave}=this.props
		var {format,stream}=this.state
        stream={...stream, ...(this.refs.stream && this.refs.stream.state || {})}
		format={...format, ...(this.refs.format && this.refs.format.state || {})}
        Saver.save(store)({format,stream})
            .then(()=>{
                store.dispatch(ACTION.stream(stream))
                store.dispatch(ACTION.format(format))
            })
            .catch(e=>store.dispatch(weACTION.MESSAGE({type:"error", message:e.message})))
            .then(onSave)
	}

    static save=store=>({format, stream})=>{
        const {state,doc}=getActive(store.getState())

        if(!stream){
            stream=Saver.getEmitterStream(state,doc).stream
        }

    	if(!format)
            format={type:doc.type}

    	let Format=doc.type==format.type ? Emitter.Format.OutputInput : Emitter.get(format.type)

    	return render(
            <Provider store={store}>
        		<doc.Store readonly={true} release={false}>
        			<Emitter>
        				<Stream {...stream}>
        					<Format {...format}/>
        				</Stream>
        			</Emitter>
        		</doc.Store>
            </Provider>
        )
    }
}
