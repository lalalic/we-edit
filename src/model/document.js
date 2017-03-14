import React, {Component, PropTypes} from "react"

export default class Document extends Component{
	static propTypes={
		spacing: PropTypes.shape({
			lineHeight:PropTypes.string,
			top:PropTypes.number, 
			bottom:PropTypes.number
		}),
		indent: PropTypes.shape({
			left:Proptypes.number,
			right:Proptypes.number,
			firstLine:Proptypes.number,
			hanging:Proptypes.number
		}),
		fonts: PropTypes.string,
		size: PropTypes.number,
		color: PropTypes.string,
		bold: PropTypes.bool,
		italic: PropTypes.bool,
		vanish: PropTypes.bool
	}
	
	static childContextTypes={
		spacing: PropTypes.shape({
			lineHeight:PropTypes.string,
			top:PropTypes.number, 
			bottom:PropTypes.number
		}),
		indent: PropTypes.shape({
			left:Proptypes.number,
			right:Proptypes.number,
			firstLine:Proptypes.number,
			hanging:Proptypes.number
		}),
		fonts: PropTypes.string,
		size: PropTypes.number,
		color: PropTypes.string,
		bold: PropTypes.bool,
		italic: PropTypes.bool,
		vanish: PropTypes.bool
	}
	
	getChildContextTypes(){
		const {spacig,indent,fonts,size,color,bold,italic,vanish}=this.props
		return {spacig,indent,fonts,size,color,bold,italic,vanish}
	}
}