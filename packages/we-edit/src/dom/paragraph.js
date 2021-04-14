import PropTypes from "prop-types"

import Component from "./component"


export default class Paragraph extends Component{
	static displayName="paragraph"
	static propTypes={
		spacing: PropTypes.shape({
			lineHeight:this.UnitShape, //"115%[,15%:top offset]"
			top:this.UnitShape,
			bottom:this.UnitShape,
		}).isRequired,

		indent: PropTypes.shape({
			left:this.UnitShape,
			right:this.UnitShape,
			firstLine:this.UnitShape,
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
}
