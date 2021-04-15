import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"

export default class Base extends Component{
	static displayName="unknown"

	static UnitShape=PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	])

	//CSS valid values, keyword/hsl()/hsla()/rgb()/rgba()/#hex rgb
	static ColorShape=PropTypes.oneOfType([
		PropTypes.string,
	])

	static GradientShape=PropTypes.shape({
		type:PropTypes.string,
		angle: this.UnitShape,
		stops:PropTypes.arrayOf(PropTypes.shape({
			color: this.ColorShape,
			position: this.UnitShape,
			transparency: PropTypes.number,
			brightness: PropTypes.number,
		})),
	})

	static PatternShape=PropTypes.shape({
		pattern:PropTypes.shape({
			path: PropTypes.string,
			viewBox: PropTypes.string,
			width: this.UnitShape,
			height: this.UnitShape,	
		}),
		foreground: this.ColorShape,
		background: this.ColorShape,
	})

	static FontsShape=PropTypes.oneOfType([
		/** same as {ascii: fontName}*/
		PropTypes.string, 
		PropTypes.shape({
			ascii: PropTypes.string,
			ea: PropTypes.string,
			cs: PropTypes.string,
			hansi: PropTypes.string,
			/**fallback font*/
			fallback: PropTypes.string,
			/** value is scope, such as ea, to indicate all text should use font specified by fonts[hint] */
			hint: PropTypes.string,
			//"7F-FF,00-3F":"Arial",
		})]
	)

	static LineShape=Object.assign(PropTypes.shape({
		width: this.UnitShape.isRequired,
		color: this.ColorShape,
		
		dashArray: PropTypes.string,
		dashOffset: PropTypes.string,
		join: PropTypes.oneOf(["miter","round","bevel"]),
		cap: PropTypes.string,
		miterLimit: PropTypes.string,
		
		opacity: PropTypes.number,
		
		style: PropTypes.string,
		sketched: PropTypes.string,
		compound: PropTypes.string,
		gradient: this.GradientShape
	}),{
		default:{width:1,color:"black"}
	})

	static FillShape=PropTypes.shape({
		color:this.ColorShape,
		transparency: PropTypes.number,

		gradient: this.GradientShape,
		
		picture: PropTypes.shape({
			url: PropTypes.string,
			transparency: PropTypes.number,
			tile: PropTypes.shape({
				x: PropTypes.number,
				y: PropTypes.number,
				scaleX: PropTypes.number,
				scaleY: PropTypes.number,
				align: PropTypes.string,
				mirror: PropTypes.string,
			}),
			margin:this.MarginShape,
		}),
		
		pattern: this.PatternShape,
	})

	static EffectShape=PropTypes.shape({
		
	})

	static GeometryShape=PropTypes.oneOfType([
		PropTypes.shape({
			intersects: PropTypes.func,//({x1,x2,y2,y1})=>[{x,width},{x,width}]
			bounds: PropTypes.func,//()=>{left, right, top, bottom}
			clone: PropTypes.func,//()=>to clone this geometry
		}),
		PropTypes.string// a svg path
	])

	static BorderShape=Object.assign(PropTypes.oneOfType([
		PropTypes.shape({
			left:this.LineShape,
			right:this.LineShape,
			top:this.LineShape,
			bottom:this.LineShape,
		}),
		this.LineShape,//4 edges with same shape
	]),{
		default:{
			left:this.LineShape.default,
			right:this.LineShape.default,
			top: this.LineShape.default,
			bottom: this.LineShape.default,
		}
	})
	
	static MarginShape=Object.assign(PropTypes.shape({
		left: this.UnitShape,
		right: this.UnitShape,
		top: this.UnitShape,
		bottom: this.UnitShape
	}),{
		default:{left:0,right:0,top:0,bottom:0}
	})

	static PaddingShape=this.MarginShape

	static AutofitShape=PropTypes.oneOf(["block","font"])

	static AlignShape=PropTypes.oneOf(["left","right","center","justify"])
	static VertAlignShape=PropTypes.oneOf(["top","middle","bottom"])

	static TextStyleShape=PropTypes.shape({
		fonts:this.FontsShape.isRequired,
		size:PropTypes.number.isRequired,
		bold: PropTypes.bool,
		italic: PropTypes.bool,
	})

	static as=function (type,defaultProps={}){
		const displayName=this.displayName.split("-")
		displayName.splice(-1,1,type)
		defaultProps={
			...this.defaultProps,
			...defaultProps,
		}
        return class $1 extends this{
			static displayName=displayName.join("-")
			static defaultProps=defaultProps
        }
    }
	static getType(){
		return this.displayName.split("-").pop()
	}

	static support(...capabilities){
		const mine=this.displayName.toLowerCase().split("-")
		return !capabilities.find(a=>!mine.includes(a))
	}

	static switchTypeTo(Next){
		const parts=this.displayName.split("-")
		parts.splice(-1,1,Next.displayName.split("-").pop())
		const displayName = parts.join("-")

		const superNormalizeProps=this.normalizeProps.bind(this)
		this.normalizeProps=props=>superNormalizeProps(Next.normalizeProps(props))

		return displayName
	}

	static normalizeProps(props){
		return props
	}

	render(){
		return (<Fragment>{this.props.children||null}</Fragment>)
	}

	getComposeType(){
		return this.constructor.getType()
	}
}
