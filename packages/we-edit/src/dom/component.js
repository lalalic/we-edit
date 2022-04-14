import React, {Component,Fragment} from "react"
import {fromJS} from "immutable"
import units from "../tools/units"
import Geometry from "../tools/geometry"
import numberings from "../tools/numbering"
import PropTypes from "../tools/prop-types"

export default class Base extends Component{
	static displayName="unknown"
	static units=units
	static numberings=numberings
	static Geometry=Geometry

	static reactCreateElementNormalized=((createElement)=>{
			React.createElement=function(Type, props, ...args){
				props=Type.normalizeProps?.({...Type.defaultProps,...props})||props
				return createElement(Type, props, ...args)
			}
			return true
		}
	)(React.createElement)
	
	static UnitShape=PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	],{
		$type:"UnitShape",
		normalize:(value,toUnit="px",missUnit)=>{
			switch(typeof(value)){
				case "number":{
					if(!missUnit)
						return value
					else
						value=value+missUnit
				}
				case "string":{
					if(value.indexOf('%')!=-1)
						return value
					const val=parseFloat(value), unit=value.replace(/[\s\d\.\+-]/g,"")||missUnit||'px'
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
			if(typeof(normalized)=="string" && normalized.indexOf("%")!=-1)
				return normalized
					
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
		},
		deprecision(value,precision=1){
			if(typeof(value)=="string")
				return value
			return value/precision
		},
		is:value=>!isNaN(parseFloat(value)),
		equal(a,b){
			return parseInt(this.normalize(a)*1000)===parseInt(this.normalize(b)*1000)
		}
	})

	//CSS valid values, keyword/hsl()/hsla()/rgb()/rgba()/#hex rgb
	static ColorShape=PropTypes.string.$({
		$type:"ColorShape",
		normalize:value=>value,
		denormalize:(value,normalized)=>normalized,
		is:value=>typeof(value)=="string",
	})

	static URLShape=PropTypes.string.$({
		$type:"URLShape",
		normalize:value=>value,
		denormalize:(value,normalized)=>normalized,
		is:value=>{
			try{
				return !!(new URL(value).protocol)
			}catch(e){
				return false
			}
		},
	})

	static BlobShape=PropTypes.string.$({
		$type:"BlobShape",
		type:"file",
		normalize:value=>value,
		denormalize:(value,normalized)=>normalized,
		is:value=>{
			try{
				return new URL(value).protocol=="blob:"
			}catch(e){
				return false
			}
		},
	})

	static FontShape=PropTypes.string.$({$type:"FontShape",isPrimitive:true})

	static MarginShape=PropTypes.oneOfType([
		this.UnitShape,//all is same
		PropTypes.shape({
			left: this.UnitShape,
			right: this.UnitShape,
			top: this.UnitShape,
			bottom: this.UnitShape
		},{$type:"MarginShape"}),
	],{
		default:{left:0,right:0,top:0,bottom:0},
		normalize:(value)=>{
			if(this.UnitShape.is(value)){
				value=this.UnitShape.normalize(value)
				return {left:value, right:value, top:value, bottom:value}
			}
			if(typeof(value)=="object"){
				return this.MarginShape.$shape.normalize(value)
			}

			return value
		},
		denormalize:(value,normalized)=>{
			if(typeof(value)=="object"){
				return this.MarginShape.$shape.denormalize(value, normalized)
			}else if(this.MarginShape.canShorten(normalized)){
				return this.UnitShape.denormalize(value, normalized.left)
			}
			return normalized
		},
		canShorten:({left,right,top,bottom})=>{
			return new Set([left,right,top,bottom]).size==1
		}
	})

	static GradientStopShape=PropTypes.shape({
		position: this.UnitShape,
		color: this.ColorShape,
		transparency: PropTypes.number,
		brightness: PropTypes.number,
	},{$type:"GradientStopShape"})

	static GradientShape=PropTypes.shape({
		type:PropTypes.string,
		angle: this.UnitShape.$({normalize:a=>this.UnitShape.normalize(a,"deg")}),
		stops:PropTypes.arrayOf(this.GradientStopShape),
	},{
		$type:"GradientShape",
		is:value=>value?.stops?.length>0
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
	},{
		$type:"PatternShape",
		is:value=>!!value?.pattern
	})

	/**
	 * Font selection Priority: fonts.segmented>fonts[fonts.hint]>fonts.fallback>systemFallbacks[fonts.hint]>systemFallbacks.segmented>systemFallbacks.fallback
	 * segmentName: fontName,
	 * segment: fontName,
	 * segments: fontName,
	 */
	static FontsShape=PropTypes.oneOfType([
		/** same as {fallback: fontName}*/
		this.FontShape, 
		PropTypes.shape({
			ascii: this.FontShape,
			ea: this.FontShape,
			hansi: this.FontShape,
			/**fallback font*/
			fallback: this.FontShape,
			//"7F-FF,00-3F":"Arial",
			$: PropTypes.func,
		}),
	],{
		$type:"FontsShape",
		normalize:value=>{
			switch(typeof(value)){
				case "string":
					return {fallback:value}
				default:
					return value
			}
		},
		denormalize:(value,normalized)=>{
			if(typeof(value)=="string" && 
				typeof(normalized)=="object" && 
				Object.keys(normalized).length==2 && normalized[normalized.hint]==normalized.ascii){
				return normalized.ascii
			}
			return normalized
		}
	})

	static LineHeightShape=PropTypes.oneOfType([
		this.UnitShape,
		PropTypes.shape({
			height: this.UnitShape,//whole line height
			offset: this.UnitShape,//text start layout from top offset 
		}),
	],{
		normalize:value=>{
			if(typeof(value)=="object")
				return this.LineHeightShape.$shape.normalize(value)
			return {height:this.UnitShape.normalize(value)}
		},
		denormalize:(value,normalized)=>{
			if(this.UnitShape.is(value) && !('offset' in normalized))
				return this.UnitShape.denormalize(value,normalized.height)
			return normalized
		}
	})

	static LineShape=PropTypes.oneOfType([
		PropTypes.oneOf(["single","double"]),
		this.UnitShape,//width
		
		PropTypes.shape({
			color: this.ColorShape,
			gradient: this.GradientShape,

			width: this.UnitShape.isRequired,
			
			dashArray: PropTypes.string.$({$type:"LineDashShape"}),
			dashOffset: PropTypes.string,
			join: PropTypes.oneOf(["miter","round","bevel"]),
			cap: PropTypes.string,
			miterLimit: PropTypes.string,
			
			opacity: PropTypes.number,
			
			style: PropTypes.string,
			sketched: PropTypes.string.$({$type:"LineSketchedShape"}),
			compound: PropTypes.string,
		},{$type:"LineShape"}),
	],{
		default:{width:1,color:"black"},
		normalize:(value)=>{
			if(this.UnitShape.is(value)){
				return {width:this.UnitShape.normalize(value)}
			}else if(typeof(value)=="string"){
				return value
			}
			return this.LineShape.$shape.normalize(value)
		},
		denormalize:(value, normalized)=>{
			if(typeof(value)=="object"){
				return this.LineShape.$shape.denormalize(value,normalized)
			}else if(this.LineShape.canShorten(normalized)){
				return this.UnitShape.denormalize(value,normalized.width)
			}
			return normalized
		},
		canShorten:({width,...values})=>{
			return !Object.keys(values).find(k=>values[k]!=null && values[k]!=undefined)
		}
	})

	static PictureSourceShape=PropTypes.oneOfType([
		this.BlobShape,
		PropTypes.string.$({$type:"OnlinePictureSourceShape"}),
		PropTypes.shape({
			url: PropTypes.string,
			texture:PropTypes.bool,
		},{$type:"TexturePictureSourceShape"}),
		PropTypes.shape({
			font: this.BlobShape,
		},{$type:"IconPictureSourceShape"}),
	])

	static FillPictureShape=PropTypes.oneOfType([
		this.BlobShape,
		PropTypes.shape({
			url: this.BlobShape,
			texture: PropTypes.bool,
			transparency: PropTypes.number,
			tile: PropTypes.shape({
				x: this.UnitShape,
				y: this.UnitShape,
				scaleX: PropTypes.number,
				scaleY: PropTypes.number,
				align: this.AlignShape,
				mirror: PropTypes.string,
			}),
			margin:this.MarginShape,
		},{$type:"FillPictureShape"})
	],{
		normalize:(value)=>{
			if(this.BlobShape.is(value)){
				return {url:value}
			}
			return this.FillPictureShape.$shape.normalize(value)
		},
		denormalize:(value, normalized)=>{
			if(typeof(value)=="object"){
				return this.FillPictureShape.$shape.denormalize(value, normalized)
			}else if(this.canShorten(normalized)){
				return normalized.url
			}
			return normalized
		},
		canShorten:({url,...values})=>{
			return !Object.keys(values).find(k=>values[k]!=null && values[k]!=undefined)
		}
	})

	static FillShape=PropTypes.oneOfType([
		this.ColorShape,
		PropTypes.shape({
			color:this.ColorShape,
			picture: this.FillPictureShape,
			gradient: this.GradientShape,
			pattern: this.PatternShape,
		},{$type:"FillShape"}),
	],{
		$type:"FillShapeTypes",
		$shape:1,
		normalize:value=>{
			if(this.ColorShape.is(value)){
				return {color:this.ColorShape.normalize(value)}
			}

			if(typeof(value)=="object"){
				return this.FillShape.$shape.normalize(value)	
			}

			return value
		},
		denormalize:(value, normalized)=>{
			if(typeof(value)=="object"){
				return this.FillShape.$shape.denormalize(value, normalized)
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
		
	},{$type:"EffectShape"})

	static GeometryShape=PropTypes.oneOfType([
		PropTypes.shape({
			type: PropTypes.string,//rect
			width:this.UnitShape.isRequired,
			height:this.UnitShape.isRequired,
			x: this.UnitShape,
			y: this.UnitShape,
			rx: this.UnitShape,
			ry: this.UnitShape,
		},{$type:"RectGeometryShape",choice:"rect"}),

		PropTypes.shape({
			intersects: PropTypes.func,//({x1,x2,y2,y1})=>[{x,width},{x,width}]
			bounds: PropTypes.func,//()=>{left, right, top, bottom}
			clone: PropTypes.func,//()=>to clone this geometry
			width: PropTypes.number,
			height: PropTypes.number,
		},{$type:"AnyGeometryShape"}),
		
		PropTypes.string.$({$type:"PathGeometryPath",choice:"path"}),// a svg path

		PropTypes.shape({
			type: PropTypes.string,//ellipse
			rx: this.UnitShape.isRequired,
			ry: this.UnitShape,
			cx: this.UnitShape,
			cy: this.UnitShape,
		},{$type:"EllipseGeometryShape",choice:"ellipse"}),
	],{
		$type:"GeometryShape",
		normalize:value=>Geometry.create(value),
		denormalize:(value,normalized)=>{
			if(normalized.type=="path"){
				return normalized.toString()
			}

			const props={...normalized.props}
			'width,height,rx,ry,cx,cy,x,y'.split(",").forEach(a=>{
				if(props[a]!=undefined && value[a]!=undefined)
					props[a]=this.UnitShape.denormalize(value[a],props[a])
			})
			return {type:normalized.type, ...props}
		}
	})

	static BorderShape=PropTypes.oneOfType([
		this.LineShape,//4 edges with same shape
		PropTypes.shape({
			left:this.LineShape,
			right:this.LineShape,
			top:this.LineShape,
			bottom:this.LineShape,
		},{$type:"BorderShape"}),
	],{
		$type:"BorderShapeTypes",
		default:{
			left:this.LineShape.default,
			right:this.LineShape.default,
			top: this.LineShape.default,
			bottom: this.LineShape.default,
		},
		normalize:value=>{
			if(value?.left||value?.right||value?.top||value?.bottom){
				return this.BorderShape.$shape.normalize(value)
			}
			value=this.LineShape.normalize(value)
			return {left:value, right:value, top:value, bottom:value}
		},
		denormalize:(value,normalized)=>{
			if(value?.left||value?.right||value?.top||value?.bottom){
				return this.BorderShape.$shape.denormalize(value,normalized)
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

	static PaddingShape=this.MarginShape.$({$type:"PaddingShape"})

	static AutofitShape=PropTypes.oneOf(["block","font"],{$type:"AutofitShape"})

	static AlignShape=PropTypes.oneOf(["left","right","center","justify"],{$type:"AlignShape",defaultValue:"left"})
	static VertAlignShape=PropTypes.oneOf(["top","middle","bottom"],{$type:"VertAlignShape",defaultValue:"top"})

	static TextStyleShape=PropTypes.shape({
		fonts: this.FontsShape.isRequired,
		size: this.UnitShape.isRequired,
		
		bold: PropTypes.bool,
		italic: PropTypes.bool,
		vanish: PropTypes.bool,

		border: PropTypes.oneOfType([
			PropTypes.bool,
			this.BorderShape,
		]),
		underline: PropTypes.oneOfType([
			PropTypes.bool,
			this.LineShape,
		]),
		strike: PropTypes.oneOfType([
			PropTypes.bool,
			this.LineShape,
		]),
		vertAlign: PropTypes.oneOf(["subscript","superscript"],{label:"vertical alignment"}),
		highlight: this.ColorShape,
		color: this.ColorShape,

		formatText: PropTypes.func,//caps, dynamic, ...

		scale:PropTypes.shape({
			horizontal: this.UnitShape,
			vertical: this.UnitShape,
		}),
		spacing: this.UnitShape,
		position: this.UnitShape,
		kerning: PropTypes.oneOfType([
			PropTypes.bool,
			this.UnitShape,
		]),
		emphasizeMark: PropTypes.string,
	},{$type:"TextStyleShape"})
	
	static CommonListShape={
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		level: PropTypes.number,
		indent: this.UnitShape,
		/**
		 * relative to indent, 0 at indent, >0 means bullet go left of indent, <0 means bullet go right of indent
		 * contrary to firstLine concept of paragraph indent
		 */
		hanging: this.UnitShape,
		style: this.TextStyleShape,
	}

	static BulletListShape=PropTypes.shape({
		...this.CommonListShape,
		label: PropTypes.oneOfType([
			PropTypes.string.$({$type:"BulletShape"}),
			PropTypes.shape({
				url: this.BlobShape,
			})
		],{
			$shape(value){
				switch(typeof(value)){
					case "string":
						return 0
					case "object":
						return 1
				}
			},
		})
	},{
		$type:"BulletListShape",
		choice:"bullet",
		is:value=>value.format=="bullet" || !value.format
	})

	static NumberListShape=PropTypes.shape({
		...this.CommonListShape,
		format: PropTypes.string,
		start: PropTypes.number,
		align: PropTypes.oneOf(["left","center","right"]),
		label: PropTypes.string,
	},{
		$type:"NumberListShape", 
		choice:"numbering",
		is:value=>value.format!="bullet"
	})

	static OutlineListShape=PropTypes.shape({
		levels:PropTypes.arrayOf(this.NumberListShape),
	},{$type:"OutlineListShape"})

	static ListShape=PropTypes.oneOfType([
		this.BulletListShape,
		this.NumberListShape,
		this.OutlineListShape,
	],{
		$shape:value=>{
			if(!value)
				return 
			if(Array.isArray(value.levels))
				return this.OutlineListShape
			if(value.format=="bullet" || !value.format)
				return this.BulletListShape
			return this.NumberListShape
		},
		equal:(current,next)=>{
			if(typeof(current.label)!==typeof(next.label))
				return false

			const TypedShape=typeof(current.label)=="object" ? this.BulletListShape : this.NumberListShape
			
			const currentNormalized=TypedShape.normalize(current)
			const nextNormalized=TypedShape.normalize(next)
			return fromJS(currentNormalized).equals(fromJS(nextNormalized))
		}
	})

	static WrapModeShape=PropTypes.oneOf(["square", "tight", "clear","no"],{$type:"WrapModeShape"})
    static WrapSideShape=PropTypes.oneOf(["both","left","right","largest"],{$type:"WrapSideShape"})
    static AnchorBaseShape=PropTypes.oneOf(["character","line","paragraph","page","frame","margin","column","closest"],{$type:"AnchorBaseShape"})
	
	static ColumnShape=PropTypes.shape({
		x:this.UnitShape,
		y:this.UnitShape,
		width:this.UnitShape.isRequired,
		height:this.UnitShape,
	},{$type:"ColumnShape"})

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

		const superNormalizePropShape=this.normalizeProps?.bind(this)||(props=>props)
		this.normalizeProps=props=>superNormalizePropShape(Next.normalizeProps?.(props)||props)

		return displayName
	}

	/**
	 * normalize props
	 * __unnormalize could be used to keep original format of props when setting from UI, such as resize,move,rotate by dragging mouse
	 */
	static normalizeProps(props){
		if(!props){
			return props
		}
		const checks=this.propTypes
		const __unnormalized={}
		delete __unnormalized.children
		return Object.keys(props).reduce((normalized,key)=>{
			if(props[key]!=null && checks[key]?.normalize){
				normalized[key]=checks[key].normalize(__unnormalized[key]=props[key])
			}else{
				normalized[key]=props[key]
			}
			return normalized
		},{...props, __unnormalized})
	}

	static deprecision(props, precision=1, checks=this.propTypes){
		if(!props)
			return props
		return Object.keys(props).reduce((deprecisioned,key)=>{
			if(props[key] && checks[key]?.deprecision){
				deprecisioned[key]=checks[key].deprecision(props[key],precision)
			}
			return deprecisioned
		},{...props})
	}

	render(){
		return (<Fragment>{this.props.children||null}</Fragment>)
	}

	getComposeType(){
		return this.constructor.getType()
	}
}
