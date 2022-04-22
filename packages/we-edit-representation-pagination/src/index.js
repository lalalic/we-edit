import React,{Component} from "react"
import PropTypes from "prop-types"

import isNode from "is-node"
import {Representation, dom} from "we-edit"

import Viewers from "./dom"
import Editors from "./dom/edit"
import {editable} from "./composable"

import FontManager from "./fonts"
import * as Composed from "./composed"
import * as Measure from "./measure"
import Output from "./output"
import SVG from "./output/svg"

import Focusable from "./composed/responsible-canvas/focusable"
import Resizable from "./composed/responsible-canvas/resizable"
import Movable from "./composed/responsible-canvas/movable"
import Rotatable from "./composed/responsible-canvas/rotatable"
import Overlay from "./composed/responsible-canvas/overlay"
import * as composable from "./composable"
import TestEmulator from "./composed/responsible-canvas/test"

const Geometry=dom.Shape.Geometry
const Responsible=Editors.Document.defaultProps.canvas.type
const Canvas=Responsible.Canvas
const Positioning=Responsible.Positioning
const SelectionStyle=Responsible.SelectionStyle

const {FontMeasure,  HybridMeasure}=Measure

export default class Pagination extends Representation.Base{
	static displayName="pagination"
	static propTypes={
		type: PropTypes.string.isRequired,
		measure: PropTypes.func,
		fonts: PropTypes.oneOfType([PropTypes.string,PropTypes.func]),
		fallbackFonts: PropTypes.any,
	}

	static defaultProps={
		type:"pagination"
	}

	static childContextTypes={
		Measure: PropTypes.func,
	}

	static contextTypes={
		doc: PropTypes.object,
		activeDocStore: PropTypes.object,
		media: PropTypes.string,
	}

	static Output=Output

	constructor(props,{doc}){
		super(...arguments)
		const {fallbackFonts,measure=isNode ? FontMeasure : HybridMeasure}=this.props
		this.Measure=measure
		if(fallbackFonts){
			this.Measure=this.Measure.createMeasureClassWithFallbackFonts(fallbackFonts)
		}
		this.state={fontsLoaded:false}
		this.fontReady=({unloaded})=>{
			if(unloaded?.length){
				console.warn(`Required fonts[${unloaded.join(",")}] missing`)
			}
			this.setState({fontsLoaded:true})
		}
	}
	
	getChildContext(){
		return {
			Measure: this.Measure,
		}
	}

	get requiredFonts(){
		const {context:{doc,activeDocStore}, Measure:{fallbackFonts=""}}=this
		return Array.from(new Set([
			...doc.requiredFonts(activeDocStore.getState().get("content")), 
			...(typeof(fallbackFonts)=="string" ? [fallbackFonts] : Object.values(fallbackFonts))
		])).filter(a=>!!a)
	}

	render(){
		const {state:{fontsLoaded}, props:{fonts:service}, context:{doc}}=this
		const {fallbackFonts,measure,fonts, type, ViewerTypes=Viewers, EditorTypes=Editors, ...props}=this.props

		return [
			<FontLoader {...{
				key:"fontloader", 
				service,
				Measure:this.Measure,
				onFinished:this.fontReady,
				fonts:this.requiredFonts,
				embedFonts: doc.embedFonts,
			}}/>,
			fontsLoaded && <Representation {...{key:"representation",ViewerTypes,EditorTypes,...props,type:undefined} }/>
		]
	}
}

class FontLoader extends Component{
	constructor(){
		super(...arguments)
		this.state={loaded:false}
	}
	render(){
		const {state:{loaded, loading="prepare to load fonts..."}}=this
		if(loaded)
			return null
		return <div>{loading} </div>
	}

	componentDidMount(){
		const {props:{service, fonts, Measure, onFinished, embedFonts}}=this
		this.setState({loading:`checking if document has embedded fonts`})
		Promise.resolve(embedFonts)
			.then(embedFonts=>{
				if(embedFonts && Array.isArray(embedFonts)){
					this.setState({loading:`document has ${embedFonts.length} embedded fonts ...`})
					return Promise.all(embedFonts.map(a=>Promise.resolve(a).then(Measure.applyFont)))
				}
			})
			.then((loadedEmbededFonts=[])=>{
				if(loadedEmbededFonts.length>0){
					console.log(`Font: load embeded fonts: ${Array.from(new Set(loadedEmbededFonts.map(a=>a.familyName))).join(",")}`)
					this.setState({loading:`loaded ${loadedEmbededFonts.length} embeded fonts`, embeded:loadedEmbededFonts})
				}
				this.setState({loading:`loading fonts from ${typeof(service)=="string" ? service : "customized interface"}`})
				Measure.requireFonts(service,fonts)
					.then(({unloaded})=>{
						this.setState({unloaded, loaded:true, loading:undefined},()=>onFinished({unloaded}))
					})
			})	
	}

	componentWillUnmount(){
		//release doc level fonts
		const {state:{embeded=[]}, props:{Measure}}=this
		Measure.releaseFonts(embeded)
	}
}


(function(A){
	const install=A.install.bind(A)
	A.install=function(){
		install(...arguments)
		SVG.install()
	}

	const uninstall=A.uninstall.bind(A)
	A.uninstall=function(){
		uninstall(...arguments)
		SVG.uninstall()
	}
})(Pagination);

Pagination.install()

export {
	Viewers, Editors, FontManager, Measure, Composed, composable, editable, 
	Resizable, Movable, Rotatable,Overlay, Focusable,
	Responsible,Canvas,Positioning,SelectionStyle,
	TestEmulator,Geometry
}
