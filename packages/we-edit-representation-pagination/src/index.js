import React, {Component} from "react"
import PropTypes from "prop-types"

import isNode from "is-node"
import {Representation} from "we-edit"

import ViewerTypes from "./all"
import EditorTypes from "./edit"
import Fonts from "./fonts"
import {FontMeasure, SVGMeasure} from "./measure"

const createFontMeasureWithDefault=defaultFont=>{
	return class extends FontMeasure{
		getFont(){
			let font=super.getFont()
			if(!font && this.fontFamily!=defaultFont){
				this.fontFamily=defaultFont
				font=super.getFont()
			}
			return font
		}
	}
}

export {default as Output} from "./output"

export class Pagination extends Component{
	static displayName="pagination"
	static propTypes={
		type: PropTypes.string.isRequired,
		measure: PropTypes.func,
		fonts: PropTypes.string,
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

	state={fontsLoaded:false}
	componentWillMount(){
		const {defaultFont,measure,fonts}=this.props
		this.Measure=measure||(isNode ? FontMeasure : SVGMeasure)
		switch(this.Measure){
			case FontMeasure:{
				this.Measure=createFontMeasureWithDefault(defaultFont)
				const requiredFonts=this.context.doc.getFontList()
				const fontsLoaded=errors=>{
					let fonts=Fonts.names
					if(!fonts.find(a=>a.toLowerCase()==defaultFont.toLowerCase())){
						console.warn(`default font[${defaultFont}] can't be loaded, set ${fonts[0]} as default`)
						this.Measure=createFontMeasureWithDefault(fonts[0])
					}

					this.setState({fontsLoaded:true})
					this.emit("fonts.loaded",fonts)
					if(errors.length){
						console.warn("the following fonts with loading erorr: "+errors.join(","))
					}
				}
				FontMeasure
					.requireFonts([defaultFont,...requiredFonts],fonts)
					.then(fontsLoaded,fontsLoaded)
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

		const {defaultFont,measure,fonts, ...props}=this.props

		return <Representation {...{ViewerTypes,EditorTypes,...props} }/>
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

Representation.support(Pagination)