import React from "react"
import PropTypes from "prop-types"

import Base from "../shape"

import editable from "./editable"
import Entity from "../../composed/selection/entity"
import {Group} from "../../composed"

const Super=editable(Base)

export default class Shape extends Super{
	static contextTypes={
		...Super.contextTypes,
		shouldRemoveComposed:PropTypes.func
	}

	componentWillReceiveProps({width,height,changed,children}){
		if(this.context.shouldRemoveComposed(this)){
			if(changed){
				if(width==this.props.width && height==this.props.height){
					//@TODO: optimize to clear changed only
					this.clearComposed()
				}else{
					this.clearComposed()
				}
			}else{
				this.onAllChildrenComposed()
			}
		}
	}

	getFocusShape(){
		return this.geometry.getFocusShape()
	}

	static rect=class extends Super.rect{
		getFocusShape(){
			const {width:right, height:bottom,rotate,dispatch}=this.props
			const left=0, top=0
			return (
				<Entity
					id={this.props.id}
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
				/>
			)
		}
	}
}
