import PropTypes from "prop-types"

import Component from "./component"


export default class Paragraph extends Component{
	static displayName="paragraph"
	static propTypes={
		spacing: PropTypes.shape({
			lineHeight:PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
			top:PropTypes.number,
			bottom:PropTypes.number
		}).isRequired,

		indent: PropTypes.shape({
			left:PropTypes.number,
			right:PropTypes.number,
			firstLine:PropTypes.number
		}).isRequired,

		align:this.AlignShape,
		
		numbering: PropTypes.shape({
			style: this.TextStyleShape.isRequired,
			label: PropTypes.string,
		}),
		
		/**[edit]default text style to be used when add text in empty paragraph*/
		defaultStyle:this.TextStyleShape,

		/**Pagination control */
		widow:PropTypes.bool,
		orphan: PropTypes.bool,
		keepLines: PropTypes.bool,
		keepWithNext: PropTypes.bool,
		wrap: PropTypes.bool,
		/**Paragraph End Character */
		End:PropTypes.string,
	}

	static defaultProps={
		spacing:{},
		indent:{},
		widow:true,
		orphan:true,
		wrap:true,
		End:String.fromCharCode(0xb6),
	}

	static contextTypes={
		isAnchored: PropTypes.func,
		exclusive: PropTypes.func,
	}
}
