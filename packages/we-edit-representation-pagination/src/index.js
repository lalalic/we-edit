import React, {Component} from "react"
import PropTypes from "prop-types"

import isNode from "is-node"
import {Representation} from "we-edit"

import Viewers from "./dom"
import Editors from "./dom/edit"
import editable from "./dom/edit/editable"

import FontManager from "./fonts"
import * as Composed from "./composed"
import * as Measure from "./measure"
import Output from "./output"
import SVG from "./output/svg"

import * as composable from "./composable"

const {FontMeasure, SVGMeasure}=Measure

const createFontMeasureWithDefault=defaultFont=>{
	return class __$1 extends FontMeasure{
		getFont(){
			return super.getFont()||FontManager.get(defaultFont)
		}
	}
}

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
		Measure: PropTypes.func
	}

	static contextTypes={
		doc: PropTypes.object,
	}

	static Output=Output

	state={fontsLoaded:false}
	componentDidMount(){
		const {defaultFont,measure,fonts}=this.props
		this.Measure=measure||(fonts||isNode ? FontMeasure : SVGMeasure)
		switch(this.Measure){
			case FontMeasure:{
				this.Measure=createFontMeasureWithDefault(defaultFont)
				const requiredFonts=this.context.doc.getFontList()
				const fontsLoaded=error=>{
					let loaded=FontManager.names
					if(loaded && loaded.length){
						if(!FontManager.get(defaultFont)){
							console.warn(`default font[${defaultFont}] can't be loaded, set ${loaded[0]} as default`)
							this.Measure=createFontMeasureWithDefault(loaded[0])
						}
					}

					if(error){
						console.error(error.message)
					}

					this.setState({fontsLoaded:true})
				}
				FontMeasure
					.requireFonts(fonts,[defaultFont,...requiredFonts])
					.then(fontsLoaded, fontsLoaded)
				break
			}
			default:{
				this.setState({fontsLoaded:true})
				break
			}
		}
	}

	getChildContext(){
		return {
			Measure: this.Measure,
		}
	}

	render(){
		const {fontsLoaded}=this.state
		if(!fontsLoaded)
			return <div>loading fonts...</div>

		const {defaultFont,measure,fonts, type, ViewerTypes=Viewers, EditorTypes=Editors, ...props}=this.props

		return (<Representation {...{ViewerTypes,EditorTypes,...props,type:undefined} }/>)
	}
}


(function(A){
	let install=A.install.bind(A)
	A.install=function(){
		install(...arguments)
		SVG.install()
	}

	let uninstall=A.uninstall.bind(A)
	A.uninstall=function(){
		uninstall(...arguments)
		SVG.uninstall()
	}
})(Pagination);

Pagination.install()

export {Viewers, Editors, FontManager, Measure, Composed, composable, editable}
