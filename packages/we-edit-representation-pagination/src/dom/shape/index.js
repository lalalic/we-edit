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
			return React.cloneElement(super.createComposed2Parent(),{key,width,height,margin,"data-content":undefined, "data-type":undefined})
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
		this.context.getMyBreakOpportunities(null,true)
		return super.render()
	}

	create(props={},...others){
		const {width,height}=this.geometry.availableSpace()
		return super.create({...props,width,height:Number.MAX_SAFE_INTEGER},...others)
	}

	createComposed2Parent(content=this.current.render()){
		return this.transform(this.geometry.createComposedShape(content))
	}

	transform(shape, path=shape.props.geometry, strokeWidth=this.geometry.strokeWidth){
		var {rotate, scale}=this.props
		const translate={}
		if(rotate){
			const {x,y}=path.center()
			const a=path.bounds()
			path.rotate(rotate, x, y)
			rotate=`${rotate} ${x} ${y}`

			const b=path.bounds()
			translate.x=parseInt(a.left-b.left)
			translate.y=parseInt(a.top-b.top)
		}

		if(scale){
			path.scale(scale)
		}

		const {width,height}=path.size(strokeWidth)
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
