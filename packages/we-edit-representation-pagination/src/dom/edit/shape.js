import React from "react"
import PropTypes from "prop-types"
import {ReactQuery} from "we-edit"

import Base from "../shape"

import editable from "./editable"
import {Cacheable} from "../../composable"
import Entity from "../../composed/selection/entity"
import {Group} from "../../composed"
import Path from "../../tool/path"

const Super=editable(Base)

export default class Shape extends Super{
	static contextTypes={
		...Super.contextTypes,
		shouldRemoveComposed:PropTypes.func
	}

	composeFrames(){
        return [...super.composeFrames(...arguments),this.props.id]
    }

	getFocusShape(){
		const shape=this.geometry.getFocusShape()
		const path=shape.props.path
		return React.cloneElement(shape,{transform:el=>this.transform(el,new Path(path),1)})
	}

	positionFromPoint(x,y){
		return {id:this.props.id}
	}

    static rect=class extends Super.rect{
		getFocusShape(){
			const x=this.strokeWidth/2, y=x
			const {width:right, height:bottom,rotate}=this.props
			const left=0, top=0
			return (<Entity
				id={this.props.id}
				x={x}
				y={y}
				path={`M${left} ${top} h${right-left} v${bottom-top} h${left-right} Z`}
				resizeSpots={[
						{x:left,y:top,resize:"nwse"},
						{x:(left+right)/2,y:top,resize:"ns",},
						{x:right,y:top,resize:"nesw"},
						{x:right,y:(top+bottom)/2,resize:"ew"},
						{x:right,y:bottom,resize:"-nwse"},
						{x:(left+right)/2,y:bottom,resize:"-ns"},
						{x:left,y:bottom,resize:"-nesw"},
						{x:left,y:(top+bottom)/2,resize:"-ew"},
				]}
				rotate={{
					r:12,
					x:(left+right)/2,
					y:top-20,
					degree: rotate,
				}}
			/>)
		}
	}
}
