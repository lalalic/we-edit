import React, {Component, PropTypes} from "react"
import merge from "../tools"

export default class Paragraph extends Component{
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
	
	static contextTypes={
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
		fonts: PropTypes.string,
		size: PropTypes.number,
		color: PropTypes.string,
		bold: PropTypes.bool,
		italic: PropTypes.bool,
		vanish: PropTypes.bool
	}
	
	getChildContextTypes(){
		return merge("fonts,size,color,bold,italic,vanish".split(","),this.props,this.context)
	}
}