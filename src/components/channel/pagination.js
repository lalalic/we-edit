import React, {Component} from "react"
import PropTypes from "prop-types"

import {FontMeasure, SVGMeasure} from "wordwrap/measure"

import ViewerTypes from "pagination"
import EditorTypes from "pagination/edit"
import Channel from "./base"
import isNode from "is-node"

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

export class Pagination extends Component{
	static displayName="pagination"
	static propTypes={
		measure: PropTypes.func,
		fonts: PropTypes.string,
		defaultFont: PropTypes.string,
	}

	static defaultProps={
		defaultFont:"arial"
	}

	static childContextTypes={
		Measure: PropTypes.func
	}

	static contextTypes={
		doc: PropTypes.object
	}

	state={fontsLoaded:false}
	componentWillMount(){
		const {defaultFont,measure,fonts}=this.props
		this.Measure=isNode ? FontMeasure : measure||SVGMeasure
		switch(this.Measure){
			case FontMeasure:{
				this.Measure=createFontMeasureWithDefault(defaultFont)
				const requiredFonts=this.context.doc.getFontList()
				const fontsLoaded=errors=>{
					this.setState({fontsLoaded:true})
					console.warn("the following fonts with loading erorr: "+errors.join(","))
				}
				FontMeasure.requireFonts([defaultFont,...requiredFonts],fonts)
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

		return <Channel {...{ViewerTypes,EditorTypes,...props} }/>
	}
}
export default Pagination