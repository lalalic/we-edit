import React from "react"
import PropTypes from "prop-types"


import Group from "./composed/group"

import {HasParentAndChild} from "./composable"
import Base from "we-edit/model/shape"
const Super=HasParentAndChild(Base)

class Area{
	constructor(props){
		this.props=props
	}
	availableSpace(){}
	createComposedShape(){}
}

export default class Shape extends Super{
	constructor(){
		super(...arguments)
		const {shape="custom"}=this.props
		this.shape=new this.constructor[shape](...arguments)
	}

	nextAvailableSpace(){
		return this.shape.availableSpace()
	}

	appendComposed(content){
		return this.computed.composed.push(content)
	}

	onAllChildrenComposed(){
		let composed=this.createComposed2Parent()
		this.context.parent.appendComposed(composed)

		super.onAllChildrenComposed()
	}

	createComposed2Parent(){
		let {width,height,margin,position}=this.props
		this.context.parent.nextAvailableSpace({width,height})
		let y=0
		let content=this.computed.composed.map((a,i)=>{
			if(y+a.props.height>height)
				return null
			let r=<Group y={y} key={i} children={a}/>
			y+=a.props.height
			return r
		})
		return (
			<Group {...{width,height}}>
				<Group x={0} y={-height}>
					<Group {...position}>
						{this.shape.createComposedShape(content)}
					</Group>
				</Group>
			</Group>
		)
	}

	static rect=class extends Area{
		availableSpace(){
			const {width,height,margin}=this.props
			return {
				width: width-margin.left-margin.right,
				height: height-margin.top-margin.bottom
			}
		}

		createComposedShape(content){
			let {
					width,height,margin,
					outline={strokeWidth:1,stroke:"black"},
					fill={fill:"none"}
				}=this.props

			return [
				<rect key="shape" x="0" y="0"
							width={width} height={height}
							style={{...outline, ...fill}}/>,

				<Group key="content" x={margin.left} y={margin.top} children={content}/>
			]
		}
	}

	static ellipse=class extends Area{
		availableSpace(){
			const {width,height,margin}=this.props
			return {
				width: Math.sqrt(2)*width/2-margin.left-margin.right,
				height: Math.sqrt(2)*height/2-margin.top-margin.bottom
			}
		}

		createComposedShape(content){
			let {
					width,height,margin,
					outline={strokeWidth:1,stroke:"black"},
					fill={fill:"none"}
				}=this.props

			let size=this.availableSpace()
			return [
				<ellipse key="shape"
					cx={width/2} cy={height/2}
					rx={width/2} ry={height/2}
					style={{...outline, ...fill}} />,

				<Group key="content"
					x={width/2-size.width/2}
					y={height/2-size.height/2}
					children={content}/>
			]
		}
	}

	static circle=Shape.ellipse

	static custom=class extends Area{
		availableSpace(){
			const {width,height,margin}=this.props
			return {
				width: width-margin.left-margin.right,
				height: height-margin.top-margin.bottom
			}
		}

		createComposedShape(content){
			let {
					width,height,margin,
					path,
					outline={strokeWidth:1,stroke:"black"},
					fill={fill:"none"}
				}=this.props

			return [
				<path key="shape"
					d={path}
					style={{...outline, ...fill}} />,

				<Group key="content"
					x={margin.left}
					y={margin.top}
					children={content}/>
			]
		}
	}
}
