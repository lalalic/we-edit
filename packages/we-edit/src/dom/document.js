import React from "react"
import Component from "./component"
import PropTypes from "prop-types"

export default class Document extends Component{
	static displayName="document"
	static NumberingContextShape=PropTypes.shape({
		reset: PropTypes.func.isRequired,
		get: PropTypes.func.isRequired,
	})

	static propTypes={
		//target
		canvas: PropTypes.node,
		canvasProps: PropTypes.object,
		canvasId: PropTypes.string,
		
		//viewer/editor
		scale: PropTypes.number,
		screenBuffer: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
		viewport: PropTypes.shape({
			width: PropTypes.number,
			height: PropTypes.number
		}),
		
		//state
		content: PropTypes.object,//document memory content, immutable map

		numbering: this.NumberingContextShape,

		hintStyle: PropTypes.shape({//pilcrow, section information, ... any hint text in canvas
			fonts: this.FontsShape.isRequired,
			size: this.UnitShape.isRequired,
		})
	}
	
	static childContextTypes={
		numbering: this.NumberingContextShape,
	}

	getChildContext(){
		return {
			numbering:this.numbering
		}
	}

	get numbering(){
        return this.context?.numbering||this.props.numbering
    }

	//emitter call it to output returned
	getComposed(){
		return super.render()
	}

	render(){
		const {canvas}=this.props
		return canvas ? React.cloneElement(canvas,{document:this}) : this.getComposed()
	}
}
