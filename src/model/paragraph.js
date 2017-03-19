import React, {PureComponent as Component,PropTypes} from "react"
import merge from "tools/merge"

export default class Paragraph extends Component{
	static displayName="paragraph"
	static propTypes={
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

	static contextTypes={
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

	static childContextTypes={
		fonts: PropTypes.string,
		size: PropTypes.number,
		color: PropTypes.string,
		bold: PropTypes.bool,
		italic: PropTypes.bool,
		vanish: PropTypes.bool
	}

	getChildContext(){
		return merge("fonts,size,color,bold,italic,vanish".split(","),this.props,this.context)
	}

	get style(){
		return merge("spacing,indent".split(","),this.props,this.context)
	}
}
