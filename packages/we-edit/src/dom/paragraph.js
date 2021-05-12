import PropTypes from "prop-types"

import Component from "./component"


export default class Paragraph extends Component{
	static displayName="paragraph"
	static propTypes={
		spacing: this.normalizeChecker(PropTypes.shape({
			lineHeight: PropTypes.oneOfType([
				PropTypes.shape({
					height: this.UnitShape,
					offset: this.UnitShape,
				}),
				this.UnitShape,
			]),
			top:this.UnitShape,
			bottom:this.UnitShape,
		}),{
			normalize: value=>{
				const {top,bottom,lineHeight,...props}=value
				if(top!=undefined)
					props.top=this.UnitShape.normalize(top)
				if(bottom!=undefined)
					props.bottom=this.UnitShape.normalize(bottom)
				if(lineHeight!=undefined){
					props.lineHeight={}
					if(typeof(lineHeight)=="object"){
						const {height, offset}=lineHeight
						if(height!=undefined)
							props.lineHeight.height=this.UnitShape.normalize(height)
						if(offset!=undefined)
							props.lineHeight.offset=this.UnitShape.normalize(offset)
					}else{
						props.lineHeight.height=this.UnitShape.normalize(lineHeight)
					}
				}
				return props
			},
			denormalize: (value,normalized)=>{
				const {top,bottom,lineHeight,...props}=value
				if(top!=undefined && normalized.top)
					normalized.top=this.UnitShape.denormalize(top,normalized.top)
				if(bottom!=undefined && normalized.bottom)
					normalized.bottom=this.UnitShape.denormalize(bottom,normalized.bottom)
				if(lineHeight!=undefined && normalized.lineHeight){
					if(typeof(lineHeight)=="object"){
						if(lineHeight.height!=undefined && normalized.lineHeight.height!=undefined){
							normalized.lineHeight.height=this.UnitShape.denormalize(lineHeight.height,normalized.lineHeight.height)
						}
						if(lineHeight.offset!=undefined && normalized.lineHeight.offset!=undefined){
							normalized.lineHeight.offset=this.UnitShape.denormalize(lineHeight.offset,normalized.lineHeight.offset)
						}
					}else{
						normalized.lineHeight.height=this.UnitShape.denormalize(lineHeight.height,normalized.lineHeight.height)
						normalized.lineHeight.offset=this.UnitShape.denormalize(lineHeight.height,normalized.lineHeight.offset)
					}
				}
				return normalized
			}
		}).isRequired,

		indent: this.normalizeChecker(PropTypes.shape({
			left:this.UnitShape,
			right:this.UnitShape,
			firstLine:this.UnitShape,
		}),{
			normalize: ({left,right,firstLine,...props})=>{
				if(left!=undefined)
					props.left=this.UnitShape.normalize(left)
				if(right!=undefined)
					props.right=this.UnitShape.normalize(right)
				if(firstLine!=undefined)
					props.firstLine=this.UnitShape.normalize(firstLine)
				return props
			},
			denormalize: ({left,right,firstLine},normalized)=>{
				if(left!=undefined && normalized.left!=undefined)
					normalized.left=this.UnitShape.denormalize(left,normalized.left)
				if(right!=undefined && normalized.right!=undefined)
					normalized.right=this.UnitShape.denormalize(right,normalized.right)
				if(firstLine!=undefined && normalized.firstLine!=undefined)
					normalized.firstLine=this.UnitShape.denormalize(firstLine,normalized.firstLine)
				return normalized
			}
		}).isRequired,

		align:this.AlignShape,
		
		numbering: this.NumberingShape,
		
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
