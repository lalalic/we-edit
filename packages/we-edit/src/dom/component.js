import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"

export default class Base extends Component{
	static displayName="unknown"
	static LineShape={
		sz: PropTypes.number.isRequired,
		color: PropTypes.string
	}
	static DefaultLine={
		sz:1,
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
