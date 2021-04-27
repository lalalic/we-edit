import PropTypes from "prop-types"
import Component from "./component"

/**
 * shape has two types: static, and dynamic 
 * static: fixed size
 * dynamic: size decided by children content, so the shape is drawn with content size
 * 
 * shape itself has following 
 */
export default class Shape extends Component{
	static displayName="shape"
	
	static propTypes={
		geometry:this.GeometryShape,//svg path, priority: shape's > content's rect
		outline:this.LineShape,
		fill: this.FillShape,
		rotate: this.UnitShape,
		scale: PropTypes.number,
		clip: PropTypes.bool,
		editableSpots: PropTypes.oneOfType([
			PropTypes.func,//func(geometry)=>[{x,y,direction,style,control}]
			PropTypes.arrayOf(PropTypes.shape({
				x: PropTypes.number.isRequired,
				y: PropTypes.number.isRequired,
				direction: PropTypes.oneOf(["ns","-ns","ew","-ew","nwse","-nwse","nesw","-nesw"]).isRequired,
				style: PropTypes.object,
				control: PropTypes.string,
			}))
		]),

		autofit: PropTypes.oneOf([true,"larger"]),
		autofitHeight: this.UnitShape,
	}

	static OverlayWhenMouseDown="WhenMouseDown"
	static OverlayWhenMouseMove="WhenMouseMove"
}
