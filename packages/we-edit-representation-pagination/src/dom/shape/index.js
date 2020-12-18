import React,{Fragment} from "react"
import PropTypes from "prop-types"
import {dom} from "we-edit"
import memoize from "memoize-one"

import {HasParentAndChild,editable,Layout} from "../../composable"
import Frame from "../frame"
import {custom, rect, ellipse, circle} from "./shapes"


const {displayName, propTypes, defaultProps}=editable(HasParentAndChild(dom.Shape))
export default class extends Frame{
	static displayName=displayName
	static propTypes={
		...propTypes
	}
	static defaultProps={
		...defaultProps
	}
	static contextTypes={
		...super.contextTypes,
		editable: PropTypes.any,
	}

	focusable=true

	get Geometry(){
		const {geometry="rect"}=this.props
		return this.constructor[geometry]||this.constructor.custom
	}
	__getGeometry=memoize((props, context)=>{
		return new this.Geometry(props, context)
	})

	get geometry(){
		return this.__getGeometry(this.props, this.context)
	}

	__getSpace=memoize(geometry=>{
		const {width,height}=geometry.availableSpace()
		return Layout.ConstraintSpace.create({width,height})
			.clone({edges:{
				page:{left:0,right:width,top:0,bottom:height},
				[this.getComposeType()]:{left:0,right:width,top:0,bottom:height},
			}})
	})

	getSpace(){
		return this.__getSpace(this.geometry)
	}

	/**
	 * there's no call super.createComposed2Parent, so editable interface is skipped
	 *** .positionlines is used to get lineXY(line), so it should be added
	 */
	recomposable_createComposed2Parent(){
		const {x,y,z,height,margin:{top=0,bottom=0}={}}=this.props
		const geometry=height ? this.geometry : new this.Geometry({...this.props, height:this.contentHeight+this.geometry.strokeWidth+top+bottom},this.context) 
		const content=(
			<Fragment>
				{[
					React.cloneElement(this.positionLines(this.lines),{key:"content",className:"positionlines"}),
					...this.anchors.map((a,i)=>React.cloneElement(a,{key:i})),
				].filter(a=>!!a).sort(({props:{z:z1=0}},{props:{z:z2=0}},)=>z1-z2)
				}
			</Fragment>
		)

		const composed=React.cloneElement(
			geometry.createComposedShape(content,{composedUUID:this.computed.composedUUID}),
			{className:"frame", "data-frame":this.uuid,x,y,z}
		)
		return composed
	}

	static custom=custom

	static rect=rect

	static ellipse=ellipse

	static circle=circle
}