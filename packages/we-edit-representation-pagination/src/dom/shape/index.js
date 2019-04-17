import React,{Component} from "react"
import PropTypes from "prop-types"
import {dom} from "we-edit"
import memoize from "memoize-one"

import {Group} from "../../composed"
import {HasParentAndChild, Fissionable} from "../../composable"

import {custom, rect, ellipse, circle} from "./shapes"

const Super=Fissionable(HasParentAndChild(dom.Shape))
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

	static contextTypes={
		...Super.contextTypes,
		getMyBreakOpportunities: PropTypes.func
	}

	get geometry(){
		return memoize(()=>{
			const {geometry="rect"}=this.props
			const Geometry=this.constructor[geometry]||this.constructor.custom
			return new Geometry(this.props, this.context)
		})()
	}

	render(){
		this.context.getMyBreakOpportunities(null)
		return super.render()
	}

	create(props={},...others){
		const {width,height}=this.geometry.availableSpace()
		return super.create({...props,width,height},...others)
	}

	createComposed2Parent(content=this.current.render()){
		var {rotate, scale}=this.props
		const translate={}
		const shape=this.geometry.createComposedShape(content)
		const path=shape.props.geometry.clone()
		if(rotate){
			const {x,y}=path.center()
			const a=path.bounds()
			path.rotate(rotate, x, y)
			rotate=`${rotate} ${x} ${y}`
			debugger
			const b=path.bounds()
			translate.x=a.left-b.left
			translate.y=a.top-b.top
		}

		if(scale){
			path.scale(scale)
		}

		const {width,height}=path.size(this.geometry.strokeWidth)
		return (
			<Group {...{width,height, geometry:path}}>
				<Group {...{scale, rotate, ...translate}}>
					{shape}
				</Group>
			</Group>
		)
	}

	onAllChildrenComposed(){
		this.context.parent.appendComposed(this.createComposed2Parent())
		super.onAllChildrenComposed()
	}

	static custom=custom

	static rect=rect

	static ellipse=ellipse

	static circle=circle
}
