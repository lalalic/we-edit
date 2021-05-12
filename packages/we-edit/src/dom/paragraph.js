import PropTypes from "prop-types"

import Component from "./component"


export default class Paragraph extends Component{
	static displayName="paragraph"
	static NumberingShape=this.normalizeChecker(PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		level: PropTypes.number,
		indent: this.UnitShape,
		hanging: this.UnitShape,
		align: this.AlignShape,

		format: PropTypes.string,
		start: PropTypes.number,

		style: this.TextStyleShape,
		label: PropTypes.string,
	}),{
		normalize:({indent, hanging,style,...values})=>{
			if(indent!=undefined)
				values.indent=this.UnitShape.normalize(indent)
			if(hanging!=undefined)
				values.hanging=this.UnitShape.normalize(hanging)
			if(style!=null)
				values.style=this.TextStyleShape.normalize(style)
			return values
		},
		denormalize:(value, normalized)=>{
			if(indent!=undefined && normalized.indent!=undefined)
				normalized.indent=this.UnitShape.denormalize(indent, normalized.indent)
			if(hanging!=undefined && normalized.hanging!=undefined)
				normalized.hanging=this.UnitShape.denormalize(hanging, normalized.hanging)
			if(style!=null && normalized.style!=undefined)
				values.style=this.TextStyleShape.denormalize(style,normalized.style)
			return normalized
		},
		meet:(current,next)=>{
			const currentNormalized=this.NumberingShape.normalize(current)
			const nextNormalized=this.NumberingShape.normalize(next)
			return (next.indent===undefined || nextNormalized.indent==currentNormalized.indent)
				&& (next.hanging===undefined || nextNormalized.hanging==currentNormalized.hanging)
				&& (next.format===undefined || nextNormalized.format==currentNormalized.format)
				&& (next.start===undefined || nextNormalized.start==currentNormalized.start)
				&& (next.label===undefined || nextNormalized.label==currentNormalized.label)
				&& (next.style===undefined || (
					nextNormalized.style?.fonts==currentNormalized.style?.fonts 
					&& nextNormalized.style?.size==currentNormalized.style?.size ))
		}
	})

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
		
		numbering: PropTypes.shape({
			style: this.TextStyleShape,
			label: PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.func,//dynamic type must use func to support editing
				PropTypes.shape({
					url: PropTypes.string.isRequired
				})
			]).isRequired,//a char, or image url
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
