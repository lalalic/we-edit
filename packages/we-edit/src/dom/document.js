import React from "react"
import Component from "./component"
import PropTypes from "prop-types"

export default class Document extends Component{
	static displayName="document"
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
	}

	static childContextTypes={
		numbering: PropTypes.shape({
			reset: PropTypes.func.isRequired,
			get: PropTypes.func.isRequired,
		})
	}

	getChildContext(){
		return {
			numbering:{
				reset(){

				},
				get(){
					
				}
			}
		}
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
