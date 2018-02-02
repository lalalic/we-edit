import React, {Component} from "react"
import PropTypes from "prop-types"

import {FontMeasure, SVGMeasure} from "wordwrap/measure"

import ViewerTypes from "pagination"
import EditorTypes from "pagination/edit"
import IType from "./IType"
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
		if(this.Measure==FontMeasure){
			this.Measure=createFontMeasureWithDefault(defaultFont)
			const requiredFonts=this.context.doc.getFontList()
			const fontsLoaded=errors=>{
				this.setState({fontsLoaded:true})
				console.warn("the following fonts with loading erorr: "+errors.join(","))
			}
			this.Measure.requireFonts([defaultFont,...requiredFonts],fonts)
				.then(fontsLoaded,fontsLoaded)
		}else{
			this.setState({fontsLoaded:true})
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
			return null

		return <IType {...{ViewerTypes,EditorTypes,...this.props} }/>
	}
}
export default Pagination