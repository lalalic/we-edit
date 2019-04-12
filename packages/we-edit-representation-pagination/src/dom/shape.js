import React,{Component} from "react"
import PropTypes from "prop-types"


import {Group} from "../composed"

import {HasParentAndChild} from "../composable"
import {dom} from "we-edit"
const {Shape:Base}=dom
const Super=HasParentAndChild(Base)

class custom extends Component{
	availableSpace(){
		const {width,height,margin}=this.props
		return {
			width: width-margin.left-margin.right,
			height: height-margin.top-margin.bottom
		}
	}

	createComposedShape(content){
		const {
				width,height,margin,solidFill="transparent",blipFill:{url}={},
				outline={strokeWidth:0,stroke:"black"},
				fill={fill:solidFill}
			}=this.props

		return [
			<path key="shape"
				d={this.getPath()}
				style={{...outline, ...fill}} />,
			url&&(<image key="image"
				{...{width,height,xlinkHref: url, preserveAspectRatio:"none"}} />),
			<Group key="content"
				x={margin.left}
				y={margin.top}
				children={content}/>
		]
	}

	getPath(){
		return this.props.geometry
	}
}

class rect extends custom{
	getPath(){
		const {width:w,height:h}=this.props
		return `M0 0h${w}v${h}h${-w}z`
	}
}

class ellipse extends custom{
	createComposedShape(content){
		const {
				width,height,margin,solidFill="none",
				outline={strokeWidth:1,stroke:"black"},
				fill={fill:solidFill}
			}=this.props
		const composed=super.createComposedShape(...argument)
		composed.splice(0,1,
			<ellipse key="shape"
			cx={width/2} cy={height/2}
			rx={width/2} ry={height/2}
			style={{...outline, ...fill}} />)
		return composed
	}
}

class circle extends ellipse{

}

export default class Shape extends Super{
	constructor(){
		super(...arguments)
		const {geometry="rect"}=this.props
		if(this.constructor[geometry]){
			this.geometry=new this.constructor[geometry](...arguments)
		}else{

		}
	}

	nextAvailableSpace(){
		return this.geometry.availableSpace()
	}

	appendComposed(content){
		return this.computed.composed.push(content)
	}

	onAllChildrenComposed(){
		let composed=this.createComposed2Parent()
		this.context.parent.appendComposed(composed)

		super.onAllChildrenComposed()
	}

	children(){
		const children=React.Children.toArray(this.props.children)
		if(children.length){
			return React.cloneElement(children[0],this.nextAvailableSpace())
		}
		return null
	}

	createComposed2Parent(){
		const {width,height,margin,x,y}=this.props
		this.context.parent.nextAvailableSpace({width,height})
		let Y=0
		const content=this.computed.composed.map((a,i)=>{
			if(Y+a.props.height>height)
				return null
			let r=<Group y={Y} key={i} children={a}/>
			Y+=a.props.height
			return r
		})

		return (
			<Group {...{width,height,x,y}}>
				{this.transform(this.geometry.createComposedShape(content))}
			</Group>
		)
	}

	transform(element){
		const {rotate,scale}=this.props
		if(scale){

		}

		if(rotate){
			element=this.rotate(element)
		}

		return element
	}

	rotate(element){
		const {rotate}=this.props
		const {width,height}=element.props
		const radians=rotate*Math.PI/180
		const rotatedHeight=height * Math.abs(Math.cos(radians)) + width * Math.abs(Math.sin(radians))
		return (
			<Group {...{
				width:width * Math.abs(Math.cos(radians)) + height * Math.abs(Math.sin(radians)),
				height:rotatedHeight,
			}}>
				<Group {...{x:height*Math.abs(Math.sin(radians)),rotate}}>
					{element}
				</Group>
			</Group>
		)
	}

	static custom=custom

	static rect=rect

	static ellipse=ellipse

	static circle=circle
}
