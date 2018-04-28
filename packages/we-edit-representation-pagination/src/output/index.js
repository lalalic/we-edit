import React, {PureComponent, Children} from "react"
import PropTypes from "prop-types"
import {Emitter} from "we-edit"
import ReactDOMServer from "react-dom/server.node"
import Parser from "htmlparser2"
import Page from "../composed/page"

const RE_TRANSLATE=/translate\((\d+)\s+(\d+)\)/
export default class Output extends Emitter.Format{
	static contextTypes={
		...Emitter.Format.contextTypes,
	}
	static propTypes={
		type: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		ext: PropTypes.string.isRequired,
		representation: PropTypes.string.isRequired,
	}		
	
	render(){
		const {pages}=this.props
		let svgStream=ReactDOMServer.renderToStaticNodeStream(
			<svg style={{width:"100%",height:"100%"}}>
			{
				pages.map((page,i)=><Page key={i} {...page}/>)
			}
			</svg>
		)

		this.output(svgStream)
		return null
	}

	output(stream){
		stream.pipe(new Parser.WritableStream(this,{xmlMode:true}))
	}

	onopentag(name,attrs){
		switch(name){
			case 'svg':
				this.onreset()
				this.onDocument(attrs)
			break
			case 'g':
				if(attrs.class=="page")
					this.onPage(attrs)
				else
					this.onGroup(attrs)
			break
			case 'text':
				this._currentText=attrs
			break
			default:{
				let onContent=`on${name[0].toUpperCase()}${name.substr(1)}`
				if(this[onContent]){
					this[onContent](attrs)
				}
			}
		}
	}
	onclosetag(name){
		switch(name){
			case 'g':
				this.onGroupEnd()
			break
			case 'text':
				this.onText(this._currentText)
			break
		}
	}

	onattribute(name, value){

	}

	ontext(text){
		this._currentText.text=text
	}

	onprocessinginstruction(name, data){

	}
	oncomment(data){

	}
	oncommentend(){

	}

	oncdatastart(){

	}
	oncdataend(){

	}

	onerror(error){

	}

	onreset(){
		this._offsets=[{x:0,y:0}]
		this._currentText=null
		this._asyncJobs=[]
	}

	onend(){
		Promise.all(this._asyncJobs)
			.then(()=>{
				this.onDocumentEnd()
			})
			.catch(e=>{
				this.onDocumentEnd(e)
			})
	}

	addAsyncJob(a){
		this._asyncJobs.push(a.catch(e=>{
			console.warn(e.message)
			return e
		}))
	}

	onDocument(){
		
	}

	onDocumentEnd(){
		
	}

	onPage(attrs){
		this.onGroup(attrs)
	}

	onImage(){

	}

	onText({text}){

	}

	onGroup({transform="translate(0 0)"}){
		let [,x=0,y=0]=transform.match(RE_TRANSLATE)
		this._offsets.push({x:parseInt(x),y:parseInt(y)})
	}

	onGroupEnd(){
		this._offsets.pop()
	}

	get offset(){
		return this._offsets.reduce((state,{x,y})=>{
			state.x+=x
			state.y+=y
			return state
		},{x:0,y:0})
	}
}
