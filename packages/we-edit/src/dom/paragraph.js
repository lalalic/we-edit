import PropTypes from "prop-types"

import Component from "./component"


export default class Paragraph extends Component{
	static displayName="paragraph"
	static propTypes={
		spacing: PropTypes.shape({
			top:this.UnitShape,
			bottom:this.UnitShape,
			lineHeight: this.LineHeightShape,
		}).isRequired,

		indent: PropTypes.shape({
			left:this.UnitShape,
			right:this.UnitShape,
			firstLine:this.UnitShape,
		}).isRequired,

		align:this.AlignShape,
		
		numbering: this.ListShape,
		
		/**Pagination control */
		widow:PropTypes.bool,
		orphan: PropTypes.bool,
		keepLines: PropTypes.bool,
		keepWithNext: PropTypes.bool,
		
		wrap: PropTypes.bool,
		/**Paragraph End Character */
		End:PropTypes.string,
		/**[edit]default text style to be used when add text in empty paragraph*/
		defaultStyle:this.TextStyleShape,
	}

	static defaultProps={
		spacing:{
			top:0,
			bottom:0,
		},
		indent:{
			left:0,
			right:0,
			firstLine:0,
		},
		widow:true,
		orphan:true,
		wrap:true,
		End:String.fromCharCode(0xb6),
	}
}
