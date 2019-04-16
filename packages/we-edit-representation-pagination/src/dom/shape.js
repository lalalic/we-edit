import React,{Component} from "react"
import PropTypes from "prop-types"
import {dom} from "we-edit"
import memoize from "memoize-one"

import {Group} from "../composed"
import {HasParentAndChild, Fissionable} from "../composable"

const Super=Fissionable(HasParentAndChild(dom.Shape))

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
		const children=[<path key="outline" d={this.getPath()} style={{...outline, ...fill}} />]
		if(url)
			children.push(<image key="background" {...{width,height,xlinkHref: url, preserveAspectRatio:"none"}} />)
		if(content)
			children.push(<Group key="content" x={margin.left} y={margin.top} children={content}/>)

		return (
			<Group {...{width,height}}>
				{children}
			</Group>
		)
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
	static fissureLike=Frame=>class extends Frame{
		static dispatchName="ShapeFrame"
		render(){
			if(this.isEmpty())
				return null
			const {props:{I:key,width,height,margin}}=this
			return React.cloneElement(super.createComposed2Parent(),{key,width,height,margin})
		}
	}

	get geometry(){
		return memoize(()=>{
			const {geometry="rect"}=this.props
			const Geometry=this.constructor[geometry]||this.constructor.custom
			return new Geometry(this.props, this.context)
		})()
	}

	create(props={},...others){
		const {width,height}=this.geometry.availableSpace()
		return super.create({...props,width,height},...others)
	}

	createComposed2Parent(content=this.current.render()){
		const {width,height,margin,x,y}=this.props
		return (
			<Group {...{width,height}}>
				<Group {...{x,y}}>
					{this.transform(this.geometry.createComposedShape(content))}
				</Group>
			</Group>
		)
	}

	onAllChildrenComposed(){
		this.context.parent.appendComposed(this.createComposed2Parent())
		super.onAllChildrenComposed()
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
