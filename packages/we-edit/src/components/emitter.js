import React, {PureComponent, Fragment, Children} from "react"
import PropTypes from "prop-types"
import Viewer from "./viewer"
import {createWeDocument} from "./editor"
import Representation from "./representation"

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
const supports={}
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
		media:"file"
	}

	static support(Format){
		supports[Format.defaultProps.type]=Format
	}

	static get supports(){
		return {...supports}
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
		const SupportedFormats=Emitter.supports
		const createGroup=()=>{
			let collected=new Map()
			collected.set=function(k,v){
				if(!this.has(k)){
					switch(typeof(k)){
						case "object"://node, maybe have props <Html styless={true}/>
						//not support yet
						break
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
					let TypedFormat=SupportedFormats[type]
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

	static Format=class extends PureComponent{
		static displayName="Format"
		render(){
			if(this.constructor==Emitter.Format){
				const {type, ...props}=this.props
				if(type){
					const Type=supports[type]
					if(Type){
						return <Type {...props}/>
					}
				}else{
					return <div style={{color:"red"}}>Emitter type not specified</div>
				}
				return <div style={{color:"red"}}>Emitter[type={type}] not installed</div>
			}
			return <Fragment>{this.props.children}</Fragment>
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
