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

	static LineShape=PropTypes.shape({
		width: PropTypes.number.isRequired,
		style: PropTypes.string,
		color: PropTypes.string,
		
		sketched: PropTypes.string,
		compound: PropTypes.string,
		dash: PropTypes.string,
		join: PropTypes.string,
		cap: PropTypes.string,
		
		transparency: PropTypes.number,
		
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

	getComposeType(){
		return this.constructor.getType()
	}
}
