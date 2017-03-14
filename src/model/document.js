import React, {Component, PropTypes} from "react"

export default class Document extends Component{
	static displayName="document"
	static propTypes={
		spacing: PropTypes.shape({
			lineHeight:PropTypes.string,
			top:PropTypes.number,
			bottom:PropTypes.number
		}).isRequired,
		indent: PropTypes.shape({
			left:PropTypes.number,
			right:PropTypes.number,
			firstLine:PropTypes.number,
			hanging:PropTypes.number
		}).isRequired,
		fonts: PropTypes.string.isRequired,
		size: PropTypes.number.isRequired,
		color: PropTypes.string,
		bold: PropTypes.bool,
		italic: PropTypes.bool,
		vanish: PropTypes.bool
	}

	static defaultProps={
		spacing:{},
		indent:{},
		fonts:"Arial",
		size:11
	}

	static childContextTypes={
		spacing: PropTypes.shape({
			lineHeight:PropTypes.string,
			top:PropTypes.number,
			bottom:PropTypes.number
		}),
		indent: PropTypes.shape({
			left:PropTypes.number,
			right:PropTypes.number,
			firstLine:PropTypes.number,
			hanging:PropTypes.number
		}),
		fonts: PropTypes.string,
		size: PropTypes.number,
		color: PropTypes.string,
		bold: PropTypes.bool,
		italic: PropTypes.bool,
		vanish: PropTypes.bool
	}

	getChildContext(){
		const {spacing,indent,fonts,size,color,bold,italic,vanish}=this.props
		return {spacing,indent,fonts,size,color,bold,italic,vanish}
	}
}
