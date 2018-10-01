import React, {Component} from "react"
import PropTypes from "prop-types"

import isNode from "is-node"
import {Representation} from "we-edit"

import Viewers from "./all"
import Editors from "./edit"
import Fonts from "./fonts"
import * as Composed from "./composed"
import * as Measure from "./measure"
import Output from "./output"

import * as composable from "./composable"
import editable from "./edit/editable"

const {FontMeasure, SVGMeasure}=Measure

const createFontMeasureWithDefault=defaultFont=>{
	return class extends FontMeasure{
		getFont(){
			let font=null
			try{
				font=super.getFont()
			}catch(e){

			}
			if(!font && this.fontFamily!=defaultFont){
				this.fontFamily=defaultFont
				font=super.getFont()
			}
			return font
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
		events: PropTypes.object
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
				const fontsLoaded=errors=>{
					let loaded=Fonts.names
					if(loaded && loaded.length){
						if(!loaded.find(a=>a.toLowerCase()==defaultFont.toLowerCase())){
							console.warn(`default font[${defaultFont}] can't be loaded, set ${loaded[0]} as default`)
							this.Measure=createFontMeasureWithDefault(loaded[0])
						}
					}

					if(errors.length){
						console.warn("the following fonts with loading erorr: "+errors.join(","))
					}

					this.setState({fontsLoaded:true})
					this.emit("fonts.loaded",loaded)
				}
				FontMeasure
					.requireFonts([defaultFont,...requiredFonts],fonts)
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

		return (
			<div style={{textAlign:"center"}}>
				<Representation {...{ViewerTypes,EditorTypes,...props,type:undefined} }/>
			</div>
		)
	}

	componentWillUnmount(){
		if(FontMeasure.isPrototypeOf(this.Measure)){
			this.emit("fonts.unloaded")
		}
	}

	emit(){
		let events=this.context.events
		if(events){
			try{
				events.emit(...arguments)
			}catch(e){
				console.error(e)
			}
		}
	}
}

Pagination.install()

export {Viewers, Editors, Fonts, Measure, Composed, composable, editable}
