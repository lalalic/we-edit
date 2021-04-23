import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"
import units from "../tools/units"


export default class Base extends Component{
	static displayName="unknown"
	static units=units
	static normalizeChecker=(checker,extend)=>{
		const isRequired=checker.isRequired
		Object.assign(checker,extend)
		Object.assign(isRequired,extend)
		return checker
	}
	static reactCreateElementNormalized=(
		createElement=>{
			React.createElement=function(Type, props, ...args){
				props=Type.normalizePropShape?.({...Type.defaultProps,...props})||props
				return createElement(Type, props, ...args)
			}
			return true
		}
	)(React.createElement)
	
	static UnitShape=this.normalizeChecker(PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]),{
		normalize:(value,toUnit="px",missUnit=toUnit)=>{
			switch(typeof(value)){
				case "number":
					return value
				case "string":{
					const val=parseFloat(value), unit=value.replace(/[\s\d\.]/g,"")||missUnit
					if(toUnit==unit)
						return val
					return this.units[`${unit}2${toUnit}`](val)
				}
			}
		},
		normalizeAll: value=>{
			return Object.keys(value).reduce((normalized,key)=>{
				normalized[key]=this.UnitShape.normalize(value[key])
				return normalized
			},{...value})
		}
	})

	//CSS valid values, keyword/hsl()/hsla()/rgb()/rgba()/#hex rgb
	static ColorShape=this.normalizeChecker(PropTypes.oneOfType([
		PropTypes.string,
	]),{
		normalize(value){
			return value
		}
	})

	static GradientStopShape=this.normalizeChecker(PropTypes.shape({
		color: this.ColorShape,
		position: this.UnitShape,
		transparency: PropTypes.number,
		brightness: PropTypes.number,
	}),{
		normalize:({color,position, ...stop	})=>{
			if(color!=undefined)
				stop.color=this.ColorShape.normalize(color)
			if(position!=undefined)
				stop.position=this.UnitShape.normalize(position)
			return stop
		}
	})

	static GradientShape=this.normalizeChecker(PropTypes.shape({
		type:PropTypes.string,
		angle: this.UnitShape,
		stops:PropTypes.arrayOf(this.GradientStopShape),
	}),{
		normalize:({angle,stops,...gradient})=>{
			if(angle!=undefined)
				gradient.angle=this.UnitShape.normalize(angle,"deg")
			if(stops!=undefined)
				gradient.stops=stops.map(a=>this.GradientStopShape.normalize(a))
			return gradient
		}
	})

	static PatternShape=this.normalizeChecker(PropTypes.shape({
		pattern:PropTypes.shape({
			path: PropTypes.string,
			viewBox: PropTypes.string,
			width: this.UnitShape,
			height: this.UnitShape,	
		}),
		foreground: this.ColorShape,
		background: this.ColorShape,
	}),{
		normalize:({pattern,...props})=>{
			if(pattern!=undefined){
				pattern={...pattern}
				if(pattern.width!=undefined)
					pattern.width=this.UnitShape.normalize(pattern.width)
				if(pattern.height!=undefined)
					pattern.height=this.UnitShape.normalize(pattern.height)
				props.pattern=pattern
			}
			return props
		}
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

	static LineShape=this.normalizeChecker(PropTypes.oneOfType([
		PropTypes.shape({
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
		}),
		this.UnitShape,//width
	]),{
		default:{width:1,color:"black"},
		normalize:(value)=>{
			switch(typeof(value)){
				case "object":{
					const {gradient, color, width, ...line}=value
					if(gradient!=undefined)
						line.gradient=this.GradientShape.normalize(gradient)
					if(color!=undefined)
						line.color=this.ColorShape.normalize(color)
					if(width!=undefined)
						line.width=this.UnitShape.normalize(width)
					return line
				}
				default:
					return {width:this.UnitShape.normalize(value)}
			}
			
		}
	})

	static FillShape=this.normalizeChecker(PropTypes.oneOfType([
		PropTypes.shape({
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
		}),
		this.ColorShape,
	]),{
		normalize:(value)=>{
			if(typeof(value)=="object"){
				const {color, pattern, picture, ...fill}=value
				if(color!=undefined)
					fill.color=this.ColorShape.normalize(color)
				if(pattern!=undefined)
					fill.pattern=this.PatternShape.normalize(pattern)
				if(picture!=undefined && picture.margin!=undefined)
					fill.picture={...picture,margin:this.MarginShape.normalize(picture.margin)}
				return fill
			}
			return {color:this.ColorShape.normalize(value)}
		}
	})

	static EffectShape=PropTypes.shape({
		
	})

	static GeometryShape=this.normalizeChecker(PropTypes.oneOfType([
		PropTypes.shape({
			intersects: PropTypes.func,//({x1,x2,y2,y1})=>[{x,width},{x,width}]
			bounds: PropTypes.func,//()=>{left, right, top, bottom}
			clone: PropTypes.func,//()=>to clone this geometry
		}),
		PropTypes.string// a svg path
	]),{
		normalize:props=>{
			return props
		}
	})

	static BorderShape=this.normalizeChecker(PropTypes.oneOfType([
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
		},
		normalize:value=>{
			if(typeof(value)=="object"){
				return Object.keys(value).reduce((normalized,key)=>{
					normalized[key]=this.LineShape.normalize(value[key])
					return normalized
				},{...value})
			}else{
				value=this.LineShape.normalize(value)
				return {left:value, right:value, top:value, bottom:value}
			}
		}
	})
	
	static MarginShape=this.normalizeChecker(PropTypes.oneOfType([
		PropTypes.shape({
			left: this.UnitShape,
			right: this.UnitShape,
			top: this.UnitShape,
			bottom: this.UnitShape
		}),
		this.UnitShape//all is same
	]),{
		default:{left:0,right:0,top:0,bottom:0},
		normalize:(value)=>{
			switch(typeof(value)){
				case "object":
					return this.UnitShape.normalizeAll(value)
				default:{
					value=this.UnitShape.normalize(value)
					return {left:value, right:value, top:value, bottom:value}
				}

			}
		}
	})

	static PaddingShape=this.MarginShape

	static AutofitShape=PropTypes.oneOf(["block","font"])

	static AlignShape=PropTypes.oneOf(["left","right","center","justify"])
	static VertAlignShape=PropTypes.oneOf(["top","middle","bottom"])

	static TextStyleShape=this.normalizeChecker(PropTypes.shape({
		fonts:this.FontsShape.isRequired,
		size:this.UnitShape.isRequired,
		bold: PropTypes.bool,
		italic: PropTypes.bool,
	}),{
		normalize:({size,...style})=>{
			if(size!=undefined)
				style.size=this.UnitShape.normalize(size)
			return style
		}
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

		const superNormalizePropShape=this.normalizePropShape?.bind(this)||(props=>props)
		this.normalizePropShape=props=>superNormalizePropShape(Next.normalizePropShape?.(props)||props)

		return displayName
	}

	static normalizePropShape(props){
		const checks=this.propTypes
		return Object.keys(props).reduce((normalized,key)=>{
			if(props[key]!=null){
				normalized[key]=checks[key]?.normalize?.(props[key])||props[key]
			}else{
				normalized[key]=props[key]
			}
			return normalized
		},{...props})
	}

	render(){
		return (<Fragment>{this.props.children||null}</Fragment>)
	}

	getComposeType(){
		return this.constructor.getType()
	}
}
