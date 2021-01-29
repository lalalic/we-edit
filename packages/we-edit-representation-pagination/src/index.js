import React,{Component} from "react"
import PropTypes from "prop-types"

import isNode from "is-node"
import {Representation} from "we-edit"

import Viewers from "./dom"
import Editors from "./dom/edit"
import {editable} from "./composable"

import FontManager from "./fonts"
import * as Composed from "./composed"
import * as Measure from "./measure"
import Output from "./output"
import SVG from "./output/svg"

import Resizable from "./composed/responsible-canvas/resizable"
import Movable from "./composed/responsible-canvas/movable"
import Rotatable from "./composed/responsible-canvas/rotatable"
import Overlay from "./composed/responsible-canvas/overlay"
import * as composable from "./composable"
import TestEmulator from "./composed/responsible-canvas/test"

const Responsible=Editors.Document.defaultProps.canvas.type
const Canvas=Responsible.Canvas
const Positioning=Responsible.Positioning
const SelectionStyle=Responsible.SelectionStyle

const {FontMeasure, SVGMeasure}=Measure

export default class Pagination extends Representation.Base{
	static displayName="pagination"
	static propTypes={
		type: PropTypes.string.isRequired,
		measure: PropTypes.func,
		fonts: PropTypes.oneOfType([PropTypes.string,PropTypes.func]),
		defaultFont: PropTypes.string,
	}

	static defaultProps={
		type:"pagination",
		defaultFont:"Arial"
	}

	static childContextTypes={
		Measure: PropTypes.func,
	}

	static contextTypes={
		doc: PropTypes.object,
		media: PropTypes.string,
	}

	static Output=Output

	constructor(){
		super(...arguments)
		const {defaultFont,measure,fonts:service}=this.props
		this.Measure=measure||(isNode ? FontMeasure : SVGMeasure)
		if(defaultFont){
			this.Measure=this.Measure.defaultFontMeasure(defaultFont)
		}
		this.state={fontsLoaded:false}
		this.fontReady=e=>{
			this.setState({fontsLoaded:true})
		}
	}
	
	getChildContext(){
		return {
			Measure: this.Measure,
		}
	}

	render(){
		const {state:{fontsLoaded}, props:{fonts:service}, context:{media, doc}}=this
		const {defaultFont,measure,fonts, type, ViewerTypes=Viewers, EditorTypes=Editors, ...props}=this.props

		return [
			<FontLoader {...{
				key:"fontloader", service, Measure:this.Measure,media,
				onFinished:this.fontReady,
				fonts:Array.from(new Set([...doc.getFontList(),defaultFont])).filter(a=>!!a)
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
		const {state:{loaded}}=this
		if(loaded)
			return null
		return <div>loading fonts ... </div>
	}

	componentDidMount(){
		const {props:{service, fonts,Measure, onFinished}}=this
		Measure.requireFonts(service,fonts)
			.then(({unloaded, errors})=>{
				this.setState({errors, unloaded, loaded:true},onFinished)
			})	
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
	Resizable, Movable, Rotatable,Overlay,
	Responsible,Canvas,Positioning,SelectionStyle,
	TestEmulator,
}
