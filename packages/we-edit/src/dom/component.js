import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"
import units from "../tools/units"
import Path from "../tools/path"



export default class Base extends Component{
	static displayName="unknown"
	static units=units
	static Path=Path
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
					const val=parseFloat(value), unit=value.replace(/[\s\d\.\+-]/g,"")||missUnit
					if(toUnit==unit)
						return val
					const fn=`${unit}2${toUnit}`
					return fn in this.units ? this.units[fn](val) : val
				}
			}
		},
		normalizeAll: value=>{
			return Object.keys(value).reduce((normalized,key)=>{
				normalized[key]=this.UnitShape.normalize(value[key])
				return normalized
			},{...value})
		},
		denormalize: (value, normalized)=>{
			switch(typeof(value)){
				case "number":
					return normalized
				case "string":{
					const unit=value.replace(/[\s\d\.\+-]/g,"").trim()||'px'
					const fn=`px2${unit}`
					return fn in this.units ? `${this.units[fn](normalized)} ${unit}` : value
				}
			}
			return normalized
		}
	})

	//CSS valid values, keyword/hsl()/hsla()/rgb()/rgba()/#hex rgb
	static ColorShape=this.normalizeChecker(PropTypes.oneOfType([
		PropTypes.string,
	]),{
		normalize:value=>value,
		denormalize:(value,normalized)=>normalized
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
		},
		denormalize:(value, normalized)=>{
			const {color,position}=value
			if(color!=undefined)
				normalized.color=this.ColorShape.denormalize(normalized.color)
			if(position!=undefined)
				normalized.position=this.UnitShape.denormalize(normalized.position)
			return normalized
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
		},
		denormalize:(value, normalized)=>{
			const {angle}=value
			if(angle!=undefined)
				normalized.angle=this.UnitShape.denormalize(angle,normalized.angle)
			return normalized
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
		},
		denormalize:(value,normalized)=>{
			const {pattern}=value
			if(pattern!=undefined){
				if(pattern.width!=undefined && normalized.pattern.width!=undefined)
					normalized.pattern.width=this.UnitShape.denormalize(pattern.width, normalized.pattern.width)
				if(pattern.height!=undefined && normalized.pattern.height!=undefined)
					normalized.pattern.height=this.UnitShape.denormalize(pattern.height, normalized.pattern.height)
			}
			return normalized
		}
	})

	/**
	 * Font selection Priority: fonts.segmented>fonts[fonts.hint]>fonts.fallback>systemFallbacks[fonts.hint]>systemFallbacks.segmented>systemFallbacks.fallback
	 */
	static FontsShape=this.normalizeChecker(PropTypes.oneOfType([
		PropTypes.shape({
			ascii: PropTypes.string,
			ea: PropTypes.string,
			//cs: PropTypes.string,
			//hansi: PropTypes.string,
			/**fallback font*/
			fallback: PropTypes.string,
			/** value is scope, such as ea, to indicate all text should use font specified by fonts[hint] */
			hint: PropTypes.string,
			//"7F-FF,00-3F":"Arial",
		}),
		/** same as {ascii: fontName}*/
		PropTypes.string, 
	]),{
		normalize:value=>{
			switch(typeof(value)){
				case "string":
					return {ascii:value}
				default:
					return value
			}
		},
		denormalize:(value,normalized)=>{
			if(typeof(normalized)=="object" && Object.keys(normalized).length==1 && 'ascii' in normalized && typeof(value)=="string"){
				return normalized.ascii
			}
			return normalized
		}
	})

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
		PropTypes.oneOf(["signle","double"])
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
			
		},
		denormalize:(value, normalized)=>{debugger
			if(typeof(value)=="object"){
					const {gradient, color, width, ...line}=value
					if(gradient!=undefined)
						normalized.gradient=this.GradientShape.denormalize(gradient, normalized.gradient)
					if(color!=undefined)
						normalized.color=this.ColorShape.denormalize(color,normalized.color)
					if(width!=undefined)
						normalized.width=this.UnitShape.denormalize(width, normalized.width)
					return line
			}else if(this.LineShape.canShorten(normalized)){
				return this.UnitShape.denormalize(value,normalized.width)
			}
			return normalized
		},
		canShorten:({width,...values})=>{
			return !Object.keys(values).find(k=>values[k]!=null && values[k]!=undefined)
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
					x: this.UnitShape,
					y: this.UnitShape,
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
				const {color, pattern, picture,tile, ...fill}=value
				if(color!=undefined)
					fill.color=this.ColorShape.normalize(color)
				if(pattern!=undefined)
					fill.pattern=this.PatternShape.normalize(pattern)
				if(picture!=undefined){
					const {margin, tile, ...nomalizedPicture}=picture
					if(margin!=undefined)
						nomalizedPicture.margin=this.MarginShape.normalize(picture.margin)
					if(tile!=undefined){
						const {x,y,...nomalizedTile}=tile
						if(x!=undefined)
							nomalizedTile.x=this.UnitShape.normalize(x)
						if(y!=undefined)
							normalizedTile.y=this.UnitShape.normalize(y)
						nomalizedPicture.tile=normalizedTile
					}
					fill.picture=nomalizedPicture
				}
				
				return fill
			}
			return {color:this.ColorShape.normalize(value)}
		},
		denormalize:(value, normalized)=>{debugger
			if(typeof(value)=="object"){
				const {color, pattern, picture, ...fill}=value
				if(pattern!=undefined)
					normalized.pattern=this.PatternShape.denormalize(pattern,normalized)
				if(picture!=undefined && normalized.picture){
					const {margin, tile}=picture
					if(margin!=undefined && normalized.picture.margin)
						normalized.picture.margin=this.MarginShape.denormalize(margin, normalized.picture.margin)
					if(tile!=undefined && normalized.picture.tile){
						const {x,y}=tile
						if(x!=undefined && normalized.picture.tile.x)
							normalized.picture.tile.x=this.UnitShape.normalize(x)
						if(y!=undefined && normalized.picture.tile.y)
							normalized.picture.tile.y=this.UnitShape.normalize(y)
					}
				}
				return normalized
			}else if(this.FillShape.canShorten(normalized)){
				return this.ColorShape.denormalize(value, normalized.color)
			}
			return normalized
		},
		canShorten:({color,...values})=>{
			return !Object.keys(values).find(k=>values[k]!=null && values[k]!=undefined)
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
		PropTypes.string,// a svg path
		PropTypes.shape({
			width:this.UnitShape.isRequired,
			height:this.UnitShape.isRequired,
		}),
		PropTypes.element,
	]),{
		normalize:value=>{
			if(typeof(value)=="string"){
				return new Path(value)
			}else if(React.isValidElement(value)){
				return Path.fromElement(value)
			}else if(typeof(value)=="object"){
				if(value.width && value.height){
					return Path.fromRect(value)
				}
			}
			return value
		},
		denormalize:(value,normalized)=>{
			return normalized
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
		},
		denormalize:(value,normalized)=>{debugger
			if(typeof(value)=="object"){
				return Object.keys(value).reduce((normalized,key)=>{
					normalized[key]=this.LineShape.denormalize(value[key],normalized[key])
					return normalized
				},normalized)
			}else if(this.BorderShape.canShorten(normalized)){
				return this.LineShape.denormalize(value, normalized.left)
			}
			return normalized
		},
		canShorten:({left,right,top,bottom})=>{
			return ![left,right,top,bottom].find(a=>!this.LineShape.canShorten(a))
				&& new Set([left,right,top,bottom].map(a=>a.width)).size==1
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
		},
		denormalize:(value,normalized)=>{
			if(typeof(value)=="object"){
				return Object.keys(value).reduce((normalized,key)=>{
					normalized[key]=this.UnitShape.denormalize(value[key],normalized[key])
					return normalized
				},normalized)
			}else if(this.MarginShape.canShorten(normalized)){
				return this.UnitShape.denormalize(value, normalized.left)
			}
			return normalized
		},
		canShorten:({left,right,top,bottom})=>{
			return new Set([left,right,top,bottom]).size==1
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
		},
		denormalize:(value,normalized)=>{
			if(value.size!=undefined)
				normalized.size=this.UnitShape.denormalize(value.size, normalized.size)
			return normalized
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
