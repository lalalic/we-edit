import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"
import {fromJS, Map} from "immutable"
import units from "../tools/units"
import Geometry from "../tools/geometry"
import numberings from "../tools/numbering"

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
		this.string=string
		string.Type=<string/>
		string.isRequired.Type=<string required={true}/>

		this.bool=bool
		bool.Type=<bool/>
		bool.isRequired.Type=<bool required={true}/>
		
		this.number=number
		number.Type=<number/>
		number.isRequired.Type=<number required={true}/>


		this.oneOf=types.oneOf=(fn=>{
			return function(values,{$type,...props}={}){
				let validator=fn(values)
				validator.Type=React.createElement(asType($type,'oneOf'), {...props,values, })
				validator.isRequired.Type=React.cloneElement(validator.Type, {required:true})
				return validator
			}
		})(types.oneOf);

		this.shape=types.shape=(fn=>{
			return function(model,{$type,...props}={}){
				let validator=fn(model)
				validator.Type=React.createElement(asType($type,'shape'),{...props,schema:model,})
				validator.isRequired.Type=React.cloneElement(validator.Type, {required:true})
				validator.isRequired.normalize=validator.normalize=function(value){
					return Object.keys(value).reduce((normalized,key)=>{
						if(model[key]?.normalize){
							normalized[key]=model[key].normalize(value[key])
						}
						return normalized
					},{...value})
				}

				validator.isRequired.denormalize=validator.denormalize=function(value, normalized){
					Object.keys(value).forEach(key=>{
						if(model[key]?.denormalize){
							normalized[key]=model[key].denormalize(value[key],normalized[key])
						}
						return normalized
					})
					return normalized
				}

				validator.isRequired.equal=validator.equal=function(a,b){
					if(a && b){
						a=this.normalize(a)
						b=this.normalize(b)
						return !!!Object.keys(model).find(k=>{
							const {equal=(a,b)=>a===b}=model[k]
							return !equal.call(model[k], a[k],b[k])
						})
					}
					return false
				}

				if(Object.keys(model).find(k=>model[k].deprecision)){
					validator.isRequired.deprecision=validator.deprecision=function(props,precision){
						return Object.keys(props).reduce((deprecisioned,key)=>{
							if(props[key] && model[key]?.deprecision){
								deprecisioned[key]=model[key].deprecision(props[key],precision)
							}
							return deprecisioned
						},{...props})
					}
				}
				return validator
			}
		})(types.shape);

		/**
		 * 2 usages:
		 * * shortcut: $shape
		 * * different shapes
		 */
		this.oneOfType=types.oneOfType=(fn=>{
			return function(types,{$type,$shape,...props}={}){
				let validator=fn(types)
				validator.Type=React.createElement(asType($type,'oneOfType'),{...props,types,})
				validator.isRequired.Type=React.cloneElement(validator.Type, {required:true})
				
				const $$shape=value=>{
					let i=$shape
					if(typeof($shape)=="function"){
						i=$shape(value)
					}
					return types.find((a,k)=>i===a || i===k || a.Type?.props.type===i)
				}

				validator.isRequired.$shape=validator.$shape=$$shape()

				validator.isRequired.deprecision=validator.deprecision=(value,prec)=>{
					const type=$$shape(value)
					if(type?.deprecision)
						return type.deprecision(value,prec)
					return value
				}

				validator.isRequired.equal=validator.equal=function(a,b){
					a=this.normalize(a)
					b=this.normalize(b)
					return $$shape(a||b)?.equal?.(a,b)
				}

				validator.isRequired.normalize=validator.normalize=value=>{
					const type=$$shape(value)
					if(type?.normalize){
						return type.normalize(value)
					}
					return value
				}

				validator.isRequired.denormalize=validator.denormalize=(value,normalized)=>{
					const type=$$shape(normalized)
					if(type?.denormalize){
						return type.denormalize(value,normalized)
					}
					return normalized
				}
				return validator
			}
		})(types.oneOfType);

		this.arrayOf=types.arrayOf=(fn=>{
			return function(type,{$type,...props}={}){
				let validator=fn(type)
				validator.Type=React.createElement(asType($type,'arrayOf'), {...props,type})
				validator.isRequired.Type=React.cloneElement(validator.Type, {required:true})
				if(type.normalize){
					validator.isRequired.normalize=validator.normalize=value=>value.map(a=>type.normalize(a))
				}
				if(type.denormalize){
					validator.isRequired.denormalize=validator.denormalize=(value,normalized)=>normalized.map(a=>type.denormalize(value[0],a))
				}
				if(type.deprecision){
					validator.isRequired.deprecision=validator.deprecision=(value, precision)=>value.map(a=>type.deprecision(a, precision))
				}
				return validator
			}
		})(types.arrayOf);
		
	}

	static normalizeChecker=(checker,extend)=>{
		const {isRequired}=checker
		const $=({$type:newType, ...props},_extend)=>{
			const cloned=(...args)=>checker(...args)
			cloned.isRequired=(...args)=>isRequired(...args)

			const type=checker.Type.type
			const i=type.indexOf("(")
			const baseType=i!=-1 ? type.substring(0,i) : type
			const changedType= newType ? `${baseType}(${newType})` : baseType

			cloned.Type=React.createElement(changedType,{...checker.Type.props, ...props})
			cloned.isRequired.Type=React.cloneElement(cloned.Type,{required:true});
			//inherit
			["normalize","denormalize","$shape"/*oneOfType*/,"deprecision","equal"].forEach(a=>{
				if(a in checker){
					cloned[a]=cloned.isRequired[a]=checker[a]
				}
			})

			Object.assign(cloned,{...extend,$,..._extend})
			Object.assign(cloned.isRequired,{...extend,..._extend})
			return cloned
		}

		Object.assign(checker,{...extend,$})
		Object.assign(isRequired,extend)
		return checker
	}
	static reactCreateElementNormalized=((createElement, memorize)=>{
			React.createElement=function(Type, props, ...args){
				props=Type.normalizeProps?.({...Type.defaultProps,...props})||props
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
	static ColorShape=this.normalizeChecker(PropTypes.string.$({$type:"ColorShape"}),{
		normalize:value=>value,
		denormalize:(value,normalized)=>normalized,
		is:value=>typeof(value)=="string",
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

	static FontShape=PropTypes.string.$({$type:"FontShape",isPrimitive:true})

	static MarginShape=this.normalizeChecker(PropTypes.oneOfType([
		this.UnitShape,//all is same
		PropTypes.shape({
			left: this.UnitShape,
			right: this.UnitShape,
			top: this.UnitShape,
			bottom: this.UnitShape
		},{$type:"MarginShape"}),
	],{$shape:1}),{
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

	static GradientStopShape=this.normalizeChecker(PropTypes.shape({
		position: this.UnitShape,
		color: this.ColorShape,
		transparency: PropTypes.number,
		brightness: PropTypes.number,
	},{$type:"GradientStopShape"}))

	static GradientShape=this.normalizeChecker(PropTypes.shape({
		type:PropTypes.string,
		angle: this.UnitShape.$({},{normalize:a=>this.UnitShape.normalize(a,"deg")}),
		stops:PropTypes.arrayOf(this.GradientStopShape),
	},{$type:"GradientShape"}),{
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
		is:value=>!!value?.pattern
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

	static LineHeightShape=this.normalizeChecker(PropTypes.oneOfType([
		this.UnitShape,
		PropTypes.shape({
			height: this.UnitShape,//whole line height
			offset: this.UnitShape,//text start layout from top offset 
		}),
	],{$shape:1}),{
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
	],{$shape:2}),{
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
	],{$shape:1}),{
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

	static FillShape=this.normalizeChecker(PropTypes.oneOfType([
		this.ColorShape,
		PropTypes.shape({
			color:this.ColorShape,
			picture: this.FillPictureShape,
			gradient: this.GradientShape,
			pattern: this.PatternShape,
		},{$type:"FillShape"}),
	],{$type:"FillShapeTypes",$shape:1}),{
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
	],{$type:"GeometryShape"}),{
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

	static BorderShape=this.normalizeChecker(PropTypes.oneOfType([
		this.LineShape,//4 edges with same shape
		PropTypes.shape({
			left:this.LineShape,
			right:this.LineShape,
			top:this.LineShape,
			bottom:this.LineShape,
		},{$type:"BorderShape"}),
	],{$type:"BorderShapeTypes",$shape:1}),{
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

	static TextStyleShape=this.normalizeChecker(PropTypes.shape({
		fonts:this.FontsShape.isRequired,
		size:this.UnitShape,
		bold: PropTypes.bool,
		italic: PropTypes.bool,
	},{$type:"TextStyleShape"}))
	
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
		])
	},{$type:"BulletListShape",type:"bullet"})

	static NumberListShape=PropTypes.shape({
		...this.CommonListShape,
		format: PropTypes.string,
		start: PropTypes.number,
		align: PropTypes.oneOf(["left","center","right"]),
		label: PropTypes.string,
	},{$type:"NumberListShape", type:"numbering"})

	static OutlineListShape=PropTypes.arrayOf(this.NumberListShape,{$type:"OutlineListShape",type:"outline"})

	static ListShape=this.normalizeChecker(PropTypes.oneOfType([
		this.BulletListShape,
		this.NumberListShape,
		this.OutlineListShape,
	]),{
		equal:(current,next)=>{
			if(typeof(current.label)!==typeof(next.label))
				return false

			const TypedShape=typeof(current.label)=="object" ? this.BulletListShape : this.NumberListShape
			
			const currentNormalized=TypedShape.normalize(current)
			const nextNormalized=TypedShape.normalize(next)
			return fromJS(currentNormalized).equals(fromJS(nextNormalized))
		},
		$shape:value=>{
			if(Array.isArray(value))
				return this.OutlineListShape
			if(value.format=="bullet" || !value.format)
				return this.BulletListShape
			return this.NumberListShape
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
	},{$type:"ColumnShape"}))

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
