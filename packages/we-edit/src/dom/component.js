import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"
import units from "../tools/units"
import Geometry from "../tools/geometry"
import numberings from "../tools/numbering"

const isPrimitiveChecker=checker=>{
	return "array,bool,string,func,number,object,symbol".split(",").map(a=>PropTypes[a]).includes(checker)
}

const asType=($type,base)=>{
	if(typeof($type)=="string")
		return `${base}(${$type})`
	if(!!$type)
		return $type
	return base
}
export default class Base extends Component{
	static displayName="unknown"
	static units=units
	static numberings=numberings
	static Geometry=Geometry

	static memorize=types=>{
		const {string,bool,number}=types;
		[string,bool,number].forEach(checker=>{
			checker.$=props=>{
				const isRequired=checker.isRequired
				const clonedChecker=(...args)=>checker(...args)
				clonedChecker.$=checker.$
				clonedChecker.isRequired=(...args)=>isRequired(...args)
				if(props && React.isValidElement(isRequired.Type)){
					const {$type, ...props0}=props
					if($type){
						const type=`${isRequired.Type.type}(${$type})`
						clonedChecker.Type=React.createElement(type,{...isRequired.Type.props,...props0,required:undefined})
					}else{
						clonedChecker.Type=React.cloneElement(isRequired.Type,{...props,required:undefined})
					}
					clonedChecker.isRequired.Type=React.cloneElement(clonedChecker.Type,{required:true})
				}

				return clonedChecker
			}
		})
		string.Type=<string/>
		string.isRequired.Type=<string required={true}/>
		bool.Type=<bool/>
		bool.isRequired.Type=<bool required={true}/>
		number.Type=<number/>
		number.isRequired.Type=<number required={true}/>

		types.oneOf=(fn=>{
			return function(values,{$type,...props}={}){
				let validator=fn(values)
				validator.Type=React.createElement(asType($type,'oneOf'), {...props,values, })
				validator.isRequired.Type=React.cloneElement(validator.Type, {required:true})
				return validator
			}
		})(types.oneOf);

		types.shape=(fn=>{
			return function(model,{$type,...props}={}){
				let validator=fn(model)
				validator.Type=React.createElement(asType($type,'shape'),{...props,schema:model,})
				validator.isRequired.Type=React.cloneElement(validator.Type, {required:true})
				return validator
			}
		})(types.shape);

		types.oneOfType=(fn=>{
			return function(types,{$type,...props}={}){
				let validator=fn(types)
				validator.Type=React.createElement(asType($type,'oneOfType'),{...props,types,})
				validator.isRequired.Type=React.cloneElement(validator.Type, {required:true})
				return validator
			}
		})(types.oneOfType);

		types.arrayOf=(fn=>{
			return function(type,{$type,...props}={}){
				let validator=fn(type)
				validator.Type=React.createElement(asType($type,'arrayOf'), {...props,type})
				validator.isRequired.Type=React.cloneElement(validator.Type, {required:true})
				return validator
			}
		})(types.arrayOf);
		
	}

	static normalizeChecker=(checker,extend)=>{
		const isRequired=checker.isRequired
		const $=({$type:newType, ...props})=>{
			const cloned=(...args)=>checker(...args)
			cloned.isRequired=(...args)=>isRequired(...args)
			const type=checker.Type.type,i=type.indexOf("(")
			const changedType= i!=-1 ? `${type.substring(0,i)}(${newType})` : `${type}(${newType})`
			cloned.Type=React.createElement(changedType,{...checker.Type.props, ...props})
			cloned.isRequired.Type=React.cloneElement(cloned.Type,{required:true})
			Object.assign(cloned,{...extend,$})
			Object.assign(cloned.isRequired,extend)
			return cloned
		}

		Object.assign(checker,{...extend,$})
		Object.assign(isRequired,extend)
		return checker
	}
	static reactCreateElementNormalized=((createElement, memorize)=>{
			React.createElement=function(Type, props, ...args){
				props=Type.normalizePropShape?.({...Type.defaultProps,...props})||props
				return createElement(Type, props, ...args)
			}

			memorize(PropTypes)
			return true
		}
	)(React.createElement, this.memorize)
	
	static UnitShape=this.normalizeChecker(PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	],{$type:"UnitShape"}),{
		normalize:(value,toUnit="px",missUnit=toUnit)=>{
			switch(typeof(value)){
				case "number":
					return value
				case "string":{
					if(value.indexOf('%')!=-1)
						return value
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
		}
	})

	//CSS valid values, keyword/hsl()/hsla()/rgb()/rgba()/#hex rgb
	static ColorShape=this.normalizeChecker(PropTypes.string.$({$type:"ColorShape"}),{
		normalize:value=>value,
		denormalize:(value,normalized)=>normalized,
		is:value=>true,
	})

	static URLShape=this.normalizeChecker(PropTypes.string.$({$type:"URLShape"}),{
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

	static BlobShape=this.normalizeChecker(PropTypes.string.$({$type:"BlobShape",type:"file"}),{
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

	static FontShape=PropTypes.string.$({$type:"FontShape"})

	static GradientStopShape=this.normalizeChecker(PropTypes.shape({
		position: this.UnitShape,
		color: this.ColorShape,
		transparency: PropTypes.number,
		brightness: PropTypes.number,
	},{$type:"GradientStopShape"}),{
		normalize:({color,position, ...stop	})=>{
			if(color!=undefined)
				stop.color=this.ColorShape.normalize(color)
			if(position!=undefined)
				stop.position=this.UnitShape.normalize(position)
			return stop
		},
		denormalize:(value, normalized)=>{
			const {color,offset}=value
			if(color!=undefined)
				normalized.color=this.ColorShape.denormalize(normalized.color)
			if(offset!=undefined)
				normalized.offset=this.UnitShape.denormalize(normalized.offset)
			return normalized
		}
	})

	static GradientShape=this.normalizeChecker(PropTypes.shape({
		type:PropTypes.string,
		angle: this.UnitShape,
		stops:PropTypes.arrayOf(this.GradientStopShape),
	},{$type:"GradientShape"}),{
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
		},
		is:value=>value?.stops?.length>0
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
	},{$type:"PatternShape"}),{
		is:value=>!!value?.pattern,
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
		/** same as {ascii: fontName, hint:"ascii"}*/
		this.FontShape, 
		PropTypes.shape({
			ascii: this.FontShape,
			ea: this.FontShape,
			//cs: PropTypes.string,
			//hansi: PropTypes.string,
			/**fallback font*/
			fallback: this.FontShape,
			/** value is scope, such as ea, to indicate all text should use font specified by fonts[hint] */
			hint: PropTypes.string,
			//"7F-FF,00-3F":"Arial",
		}),
	],{$type:"FontsShape"}),{
		normalize:value=>{
			switch(typeof(value)){
				case "string":
					return {ascii:value, hint:"ascii"}
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

	static LineShape=this.normalizeChecker(PropTypes.oneOfType([
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
		denormalize:(value, normalized)=>{
			if(typeof(value)=="object"){
				const {gradient, color, width, ...line}=value
				if(gradient!=undefined)
					normalized.gradient=this.GradientShape.denormalize(gradient, normalized.gradient)
				if(color!=undefined)
					normalized.color=this.ColorShape.denormalize(color,normalized.color)
				if(width!=undefined)
					normalized.width=this.UnitShape.denormalize(width, normalized.width)
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

	static FillPictureShape=this.normalizeChecker(PropTypes.oneOfType([
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
	]),{
		normalize:(value)=>{
			if(typeof(value)=="string"){
				return {url:value}
			}else{
				const {margin, tile, ...normalized}=value
				if(margin!=undefined)
					normalized.margin=this.MarginShape.normalize(margin)
				if(tile!=undefined){
					const {x,y,...nomalizedTile}=tile
					if(x!=undefined)
						nomalizedTile.x=this.UnitShape.normalize(x)
					if(y!=undefined)
						normalizedTile.y=this.UnitShape.normalize(y)
					normalized.tile=normalizedTile
				}
				return normalized
			}
		},
		denormalize:(value, normalized)=>{
			if(typeof(value)=="object"){
				const {margin, tile, ...denormalized}=normalized
				if(margin!=undefined && value.margin!=undefined)
					denormalized.margin=this.MarginShape.denormalize(value.margin, margin)
				if(tile!=undefined && value.tile!=undefined){
					const {x,y}=tile
					if(x!=undefined && value.tile.x!=undefined)
						denormalized.tile.x=this.UnitShape.denormalize(value.tile.x,x)
					if(y!=undefined && value.tile.y!=undefined)
						denormalized.tile.y=this.UnitShape.denormalize(value.tile.y,y)
				}
				return denormalized
			}else if(this.canShorten(normalized)){
				return normalized.url
			}
			return normalized
		},
		canShorten:({url,...values})=>{
			return !Object.keys(values).find(k=>values[k]!=null && values[k]!=undefined)
		}
	})

	static FillShape=this.normalizeChecker(PropTypes.oneOfType([
		this.ColorShape,
		PropTypes.shape({
			color:this.ColorShape,
			picture: this.FillPictureShape,
			gradient: this.GradientShape,
			pattern: this.PatternShape,
		},{$type:"FillShape"}),
	]),{
		normalize:(value)=>{
			if(typeof(value)=="object"){
				const {color, pattern, picture,gradient, ...normalized}=value
				if(color!=undefined){
					normalized.color=this.ColorShape.normalize(color)
				}
				if(pattern!=undefined){
					normalized.pattern=this.PatternShape.normalize(pattern)
				}
				if(picture!=undefined){
					normalized.picture=this.FillPictureShape.normalize(picture)
				}
				if(gradient!=undefined){
					normalized.gradient=this.GradientShape.normalize(gradient)
				}
				
				return normalized
			}
			return {color:this.ColorShape.normalize(value)}
		},
		denormalize:(value, normalized)=>{
			if(typeof(value)=="object"){
				const {color, pattern, picture, gradient}=normalized
				const denormalized={...normalized}
				if(pattern!=undefined && value.pattern!=undefined){
					denormalized.pattern=this.PatternShape.denormalize(value.pattern,pattern)
				}
				if(picture!=undefined && value.picture!=undefined){
					denormalized.picture=this.FillPictureShape.denormalize(value.picture, picture)
				}
				if(color!=undefined && value.color!=undefined){
					denormalized.color=this.ColorShape.denormalize(value.color,color)
				}
				if(gradient!=undefined && value.gradient!=undefined){
					denormalized.gradient=this.GradientShape.denormalize(value.gradient,gradient)
				}
				return denormalized
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

	static GeometryShape=this.normalizeChecker(PropTypes.oneOfType([
		PropTypes.shape({
			type: PropTypes.string,//rect
			width:this.UnitShape.isRequired,
			height:this.UnitShape.isRequired,
			x: this.UnitShape,
			y: this.UnitShape,
			rx: this.UnitShape,
			ry: this.UnitShape,
		},{$type:"RectGeometryShape",type:"rect"}),

		PropTypes.shape({
			intersects: PropTypes.func,//({x1,x2,y2,y1})=>[{x,width},{x,width}]
			bounds: PropTypes.func,//()=>{left, right, top, bottom}
			clone: PropTypes.func,//()=>to clone this geometry
			width: PropTypes.number,
			height: PropTypes.number,
		},{$type:"AnyGeometryShape"}),
		
		PropTypes.string.$({$type:"PathGeometryPath",type:"path"}),// a svg path

		PropTypes.shape({
			type: PropTypes.string,//ellipse
			rx: this.UnitShape.isRequired,
			ry: this.UnitShape,
			cx: this.UnitShape,
			cy: this.UnitShape,
		},{$type:"EllipseGeometryShape",type:"ellipse"}),

		PropTypes.shape({
			type: PropTypes.string,//circle
			r: this.UnitShape.isRequired,
			cx: this.UnitShape,
			cy: this.UnitShape,
		},{$type:"CircleGeometryShape",type:"circle"})
	],{$type:"GeometryShape"}),{
		normalize:value=>Geometry.create(value),
		denormalize:(value,normalized)=>{
			if(normalized.type=="path"){
				return normalized.toString()
			}

			const props={...normalized.props}
			'width,height,r,rx,ry,cx,cy,x,y'.split(",").forEach(a=>{
				if(props[a]!=undefined && value[a]!=undefined)
					props[a]=this.UnitShape.denormalize(value[a],props[a])
			})
			return {type:normalized.type, ...props}
		}
	})

	static BorderShape=this.normalizeChecker(PropTypes.oneOfType([
		this.LineShape,//4 edges with same shape
		PropTypes.shape({
			left:this.LineShape,
			right:this.LineShape,
			top:this.LineShape,
			bottom:this.LineShape,
		},{$type:"BorderShape"}),
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
		denormalize:(value,normalized)=>{
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
		},{$type:"MarginShape"}),
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

	static PaddingShape=this.MarginShape.$({$type:"PaddingShape"})

	static AutofitShape=PropTypes.oneOf(["block","font"],{$type:"AutofitShape"})

	static AlignShape=PropTypes.oneOf(["left","right","center","justify"],{$type:"AlignShape",defaultValue:"left"})
	static VertAlignShape=PropTypes.oneOf(["top","middle","bottom"],{$type:"VertAlignShape",defaultValue:"top"})

	static TextStyleShape=this.normalizeChecker(PropTypes.shape({
		fonts:this.FontsShape.isRequired,
		size:this.UnitShape,
		bold: PropTypes.bool,
		italic: PropTypes.bool,
	},{$type:"TextStyleShape"}),{
		normalize:({size,...style})=>{
			if(size!=undefined)
				style.size=this.UnitShape.normalize(size)
			return style
		},
		denormalize:(value,normalized)=>{
			if(value.size!=undefined && normalized.size)
				normalized.size=this.UnitShape.denormalize(value.size, normalized.size)
			return normalized
		}
	})
	
	static CommonListShape={
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		level: PropTypes.number,
		indent: this.UnitShape,
		hanging: this.UnitShape,
		align: PropTypes.oneOf(["left","center","right"]),
		style: this.TextStyleShape,
	}

	static BulletListShape=PropTypes.shape({
		...this.CommonListShape,
		label: PropTypes.oneOfType([
			PropTypes.string.$({$type:"BulletShape"}),
			PropTypes.shape({
				url: this.BlobShape,
			})
		])
	},{$type:"BulletListShape",type:"bullet"})

	static NumberListShape=PropTypes.shape({
		...this.CommonListShape,
		format: PropTypes.string,
		start: PropTypes.number,
		label: PropTypes.string,
	},{$type:"NumberListShape", type:"numbering"})

	static OutlineListShape=PropTypes.arrayOf(this.NumberListShape,{$type:"OutlineListShape",type:"outline"})

	static ListShape=this.normalizeChecker(PropTypes.oneOfType([
		this.BulletListShape,
		this.NumberListShape,
		this.OutlineListShape,
	]))

	static NumberingShape=this.normalizeChecker(PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		level: PropTypes.number,
		indent: this.UnitShape,
		
		format: PropTypes.string,
		start: PropTypes.number,

		hanging: this.UnitShape,
		align: this.AlignShape,
		
		style: this.TextStyleShape,
		label: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.shape({
				url: this.BlobShape,
			})
		])
	},{$type:"NumberingShape"}),{
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

	static WrapModeShape=PropTypes.oneOf(["square", "tight", "clear","no"],{$type:"WrapModeShape"})
    static WrapSideShape=PropTypes.oneOf(["both","left","right","largest"],{$type:"WrapSideShape"})
    static AnchorBaseShape=PropTypes.oneOf(["character","line","paragraph","page","frame","margin", "closest"],{$type:"AnchorBaseShape"})
	static ColumnShape=this.normalizeChecker(PropTypes.shape({
		x:this.UnitShape,
		y:this.UnitShape,
		width:this.UnitShape.isRequired,
		height:this.UnitShape,
	},{$type:"ColumnShape"}),{
		normalize:value=>{
			return Object.keys(value).reduce((normalized,key)=>{
				normalized[key]=this.UnitShape.normalize(value[key])
				return normalized
			},{...value})
		},
		unnormalize:(value,normalized)=>{
			return Object.keys(normalized).reduce((unnormalize,key)=>{
				unnormalize[key]=this.UnitShape.unnormalize(value[key], normalized[key])
				return unnormalize
			},{...normalized})
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

	/**
	 * normalize props
	 * __unnormalize could be used to keep original format of props when setting from UI, such as resize,move,rotate by dragging mouse
	 */
	static normalizePropShape(props){
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

	render(){
		return (<Fragment>{this.props.children||null}</Fragment>)
	}

	getComposeType(){
		return this.constructor.getType()
	}
}
