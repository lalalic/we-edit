import React, {PureComponent as Component} from "react"
import PropTypes from "prop-types"

import ViewerTypes from "pagination"
import EditorTypes from "pagination/edit"

import {FontMeasure, SVGMeasure} from "wordwrap/measure"

import IType from "./IType"

export class Pagination extends Component{
	static displayName="pagination"
	static propTypes={
		Measure: PropTypes.func
	}

	
	static childContextTypes={
		Measure: PropTypes.func
	}
	
	get Measure(){
		return typeof(window)=="undefined" ? FontMeasure : this.props.Measure||SVGMeasure
	}
	
	getChildContext(){
		return {
			Measure: this.Measure,
		}
	}
	
	render(){
		return <IType {...{ViewerTypes,EditorTypes,...this.props} }/>
	}
}
export default Pagination