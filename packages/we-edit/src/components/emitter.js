import React, {Component,PureComponent, Fragment, Children} from "react"
import PropTypes from "prop-types"
import Viewer from "./viewer"
import {createWeDocument} from "./editor"
import Representation from "./representation"
import extendible from "../tools/extendible"

/**
<emiter representation={<Pagination/>}>
	<Stream>
		<PDF/>
		<PCL/>
		<APF/>
	</Stream>
</emiter>
<emiter representation={<Html/>}>
	<Stream>
		<HTML/>
		<StylessHtml/>
		<APF/>
	</Stream>
</emiter>
<emiter representation={<Text/>}>
	<Stream>
		<PlainText/>
	</Stream>
</emiter>
<emiter>//it will auto group format by representation
	<Stream>
		<HTML/>
		<PDF/>
		<PCL/>
		<APF/>
		<PlainText/>
	</Stream>
</emiter>
*/
export default class Emitter extends Viewer{
	static displayName="emitter"

	static propTypes={
		...Viewer.propTypes,
		input: PropTypes.object,
		persist: PropTypes.func,
		representation: PropTypes.node,
	}

	static defaultProps={
		...Viewer.defaultProps,
		media:"file",
		domain:"view",
	}

	shouldComponentUpdate(){
		return false
	}

	render(){
		if(!this.props.representation){
			return <Fragment>{this.groupStreamFormat()}</Fragment>
		}else{
			return super.render()
		}
	}

	createDocument({canvasProps}){
		return <WeDocumentStub {...canvasProps}/>
	}

	groupStreamFormat(){
		const createGroup=()=>{
			let collected=new Map()
			collected.set=function(k,v){
				if(!this.has(k)){
					switch(typeof(k)){
						case "object"://node, maybe have props <Html styless={true}/>
						//not support yet
						break
						case "undefined"://OutputInput
						case "string":
							Map.prototype.set.call(this,k,[])
						break
					}
				}
				return this.get(k)
			}
			return collected
		}

		const represents=[]
		Children.toArray(this.props.children).reduce((represents, stream)=>{
			const formats=Children.toArray(stream.props.children)
			//group format by representation
			formats.reduce((groups, format)=>{
				let {props:{type, representation}, type:ClassType}=format
				if(ClassType==Emitter.Format){
					let TypedFormat=Emitter.get(type)
					groups.set(TypedFormat.defaultProps.representation).push(format)
				}else {
					groups.set(representation).push(format)
				}
				return groups
			},createGroup())
			.forEach((formats, representation)=>{
				represents.set(representation).push(React.cloneElement(stream, {children:formats}))
			})
			return represents
		}, createGroup()).forEach((streams,type)=>{
			let TypedRepresentation=Representation.get(type)
			if(TypedRepresentation){
				const {media, style, children, ...props}=this.props
				represents.push(
					<TypedRepresentation key={type}>
						{this.createDocument({canvasProps:{canvas:<Wrapper children={streams}/>, ...props}})}
					</TypedRepresentation>
				)
			}else{
				represents.push(streams)
			}
		})

		return represents
	}

	static Format=class Format extends PureComponent{
		static displayName="Format"
		static childContextTypes={
			media:PropTypes.string
		}
		
		static Base=class extends Component{
			static install(){
				Emitter.install(this)
			}
			
			static uninstall(){
				Emitter.uninstall(this)
			}		
			static propTypes={
				type: PropTypes.string.isRequired,
				name: PropTypes.string.isRequired,
				ext: PropTypes.string.isRequired,
				representation: PropTypes.string.isRequired,
				stream: PropTypes.node
			}
			
			static defaultProps={
				
			}
			
			static Setting=class extends Component{
				state={}
				render(){
					return null
				}
			}
			
			render(){
				return React.cloneElement(this.props.stream,{
					onReady:stream=>{
						this.stream=stream
						this.emit()
					}
				})
			}
			
			emit(){
				
			}
		}

		getChildContext(){
			return {
				media:Emitter.defaultProps.media
			}
		}

		render(){
			const {type}=this.props
			const Type=Emitter.get(type,true)
			if(Type){
				return <Type {...this.props}/>
			}
			return null
		}
	}
}

const Wrapper=({children, ...props})=>(
	<Fragment>
		{Children.toArray(children).map(a=>React.cloneElement(a,props))}
	</Fragment>
)

class WeDocumentStub extends PureComponent{
	static contextTypes={
		store: PropTypes.object,
		ModelTypes: PropTypes.object
	}
	render(){
		const {store, ModelTypes}=this.context
		const content=store.getState().get("content")
		if(content){
			return createWeDocument("root",content,ModelTypes,{scale:1,...this.props})
		}else{
			return null
		}
	}
}

class OutputInput extends Emitter.Format.Base{
	static displayName="[Origin]"
	static propTypes={
		
	}
	static defaultProps={
		type:""
	}

	static contextTypes={
		doc: PropTypes.object
	}

	emit(){
		let docStream=this.context.doc.stream()
		docStream.pipe(this.stream)
		docStream.push(null)
	}
}

extendible(Emitter, "output format")

Emitter.install(Emitter.Format.OutputInput=OutputInput)
