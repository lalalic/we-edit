import React, {Component, Fragment, Children} from "react"
import ReactDOMServer from "react-dom/server.node"
import PropTypes from "prop-types"
import memoize from "memoize-one"
import Viewer from "./viewer"
import {WeDocumentStub} from "./editor"
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

<doc>
	<emiter>
		<PDF stream>
			<representation>
				<memoryDoc>
					<outputDoc>
			</representation>
		</PDF>
		<PCL stream/>
	</emiter>
</doc>
*/
var emitterID=0
export default class Emitter extends Viewer{
	static displayName="emitter"

	static propTypes={
		...super.propTypes,
		input: PropTypes.object,
		persist: PropTypes.func,
		representation: PropTypes.node,
	}

	static defaultProps={
		...super.defaultProps,
		editable:false,
		media:"file",
		domain:"view",
	}

	static contextTypes={
		...super.contextTypes,
		activeDocStore: PropTypes.object,
	}

	initViewport(){

	}

	render(){
		if(!this.props.representation){
			return <Fragment>{this.groupStreamFormat(this.props.children)}</Fragment>
		}else{
			return super.render()
		}
	}

	groupStreamFormat=memoize(streams=>{
		const content=this.context.activeDocStore.getState().get("content")
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
		Children.toArray(streams).reduce((represents, stream)=>{
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
			if(type){
				const {style, children, ...props}=this.props
				represents.push(
					<Representation type={type} key={type}>
						<WeDocumentStub {...{canvasProps:{
							canvas:(
								<CanvasWrapper>
									{Children.toArray(streams).map(a=>React.cloneElement(a,props))}
								</CanvasWrapper>
							),
							...props
						},scale:1,content}}/>
					</Representation>
				)
			}else{
				represents.push(streams)
			}
		})

		return represents
	})

	/**
	 * Format should deligate to typed format.
	 */
	static Format=class Format extends Component{
		static displayName="Format"
		/**
		 * 
		 * Base 
		 */
		static Base=class __$1 extends Component{
			static install(conf){
				Emitter.install(this,conf)
			}

			static uninstall(){
				Emitter.uninstall(this)
			}
			static propTypes={
				type: PropTypes.string.isRequired,
				name: PropTypes.string.isRequired,
				ext: PropTypes.string.isRequired,
				representation: PropTypes.string.isRequired,
				stream: PropTypes.node,
				document: PropTypes.object,//injected by representation
			}

			/**
			 * it must have contextTypes(empty is also ok), 
			 * otherwise __reactInternalMemoizedUnmaskedChildContext is missing in instance
			 */
			static contextTypes={

			}

			static Setting=class __$1 extends Component{
				render(){
					return null
				}
			}

			constructor(...args){
				super(...args)
				this.state={stream:null}
				Object.defineProperties(this,{
					ContextProvider:{
						get(){
							return this.getAllContext(this.__reactInternalMemoizedUnmaskedChildContext)
						}
					}
				})
			}

			get stream(){
				return this.state.stream
			}

			render(){
				const {stream}=this.state
				if(!stream){
					return React.cloneElement(this.props.stream,{
						onReady:stream=>{
							this.setState({stream})
						}
					})
				}

				const emitted=this.emit()
				if(emitted && React.isValidElement(emitted)){
					return emitted
				}

				return null
			}

			/**it's to hack to inherit all context, so ReactDOMServer can  inherit the whole context*/
			getAllContext=memoize((context)=>{
				if(!("__reactInternalMemoizedUnmaskedChildContext" in this)){
					throw new Error("Format.Base implementation has problem because of no global context")
				}
				
				const childContextTypes=Object.keys(context).reduce((ctx,k)=>{
					ctx[k]=PropTypes.any
					return ctx
				},{})

				return class AllContext extends Component{
					static childContextTypes=childContextTypes
					getChildContext(){
						return context
					}
					render(){
						return <Fragment>{this.props.children}</Fragment>
					}
				}
			})

			emit(){
				const {document}=this.props
				const contentStream=ReactDOMServer.renderToStaticNodeStream(
					<this.ContextProvider>{document.getComposed()}</this.ContextProvider>
				)
				this.output(contentStream)
			}

			output(content){
				throw new Error("Please implement output(content/*a node stream with converted content*/){content.pipe(this.stream)}")
			}
		}

		render(){
			const {type,children}=this.props
			if(type){
				const Type=Emitter.get(type,true)
				if(Type){
					return <Type {...this.props}/>
				}
			}
			return (<Fragment>{children}</Fragment>)
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
		Promise.resolve(this.context.doc.stream())
			.then(docStream=>{
				docStream.pipe(this.stream)
				docStream.push(null)
			})
	}
}
//document will be injected by representation Document
const CanvasWrapper=({children, document})=>React.Children.toArray(children).map(a=>React.cloneElement(a,{document}))

extendible(Emitter, "output format")

Emitter.install(Emitter.Format.OutputInput=OutputInput)
