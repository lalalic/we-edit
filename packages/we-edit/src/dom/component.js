import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"

export default class Base extends Component{
	static displayName="unknown"
	static GradientShape=PropTypes.shape({
		type:PropTypes.string,
		direction: PropTypes.string,
		angle: PropTypes.number,
		stops:PropTypes.arrayOf(PropTypes.shape({
			color: PropTypes.string,
			position: PropTypes.number,
			transparency: PropTypes.number,
			brightness: PropTypes.number,
		})),
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

	static LineShape=PropTypes.shape({
		width: PropTypes.number.isRequired,
		color: PropTypes.string,
		
		dashArray: PropTypes.string,
		dashOffset: PropTypes.string,
		lineJoin: PropTypes.string,
		lineCap: PropTypes.string,
		miterLimit: PropTypes.string,
		
		opacity: PropTypes.number,
		
		style: PropTypes.string,
		sketched: PropTypes.string,
		compound: PropTypes.string,
		gradient: this.GradientShape
	})

	static FillShape=PropTypes.shape({
		color:PropTypes.string,
		transparency: PropTypes.number,
		gradient: this.GradientShape,
		picture: PropTypes.shape({
			src: PropTypes.string,
			transparency: PropTypes.number,
			x: PropTypes.number,
			y: PropTypes.number,
			scaleX: PropTypes.number,
			scaleY: PropTypes.number,
			align: PropTypes.string,
			mirror: PropTypes.string,
		}),
		pattern: PropTypes.shape({
			type: PropTypes.string,
			background: PropTypes.string,
			foreground: PropTypes.string,
		}),
	})

	static EffectShape=PropTypes.shape({
		
	})

	static BorderShape=PropTypes.shape({
		left:this.LineShape,
		right:this.LineShape,
		top:this.LineShape,
		bottom:this.LineShape,
	})
	
	static MarginShape=PropTypes.shape({
		left: PropTypes.number,
		right: PropTypes.number,
		top: PropTypes.number,
		bottom: PropTypes.number
	})

	static AlignShape=PropTypes.oneOf(["left","right","center","justify"])
	static VertAlignShape=PropTypes.oneOf(["top","middle","bottom"])

	static TextStyleShape=PropTypes.shape({
		fonts:this.FontsShape.isRequired,
		size:PropTypes.number.isRequired,
		bold: PropTypes.bool,
		italic: PropTypes.bool,
	})
	
	static DefaultLine={
		width:1,
		color:"black"
	}

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

	render(){
		return (<Fragment>{this.props.children||null}</Fragment>)
	}

	static getType(){
		return this.displayName.split("-").pop()
	}

	static support(...capabilities){
		const mine=this.displayName.toLowerCase().split("-")
		return !capabilities.find(a=>!mine.includes(a))
	}

	getComposeType(){
		return this.constructor.getType()
	}
}
