import React from "react"
import editable from "./editable"
import Base from "../image"
import Entity from "../composed/selection/entity"

export default class extends editable(Base){
	splittable=false

	getFocusShape(){
		const {width:right, height:bottom}=this.props.size
		const left=0, top=0
		return (
			<Entity
				path={`M${left} ${top} L${right} ${top} L${right} ${bottom} L${left} ${bottom} Z`}
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
					y:top-20
				}}
			/>
		)
	}

	distanceAt(x,){
		return 1
	}
	
	createComposed2Parent(){
		var frame=super.createComposed2Parent(...arguments)
		return React.cloneElement(frame,{
			"data-type":undefined, 
			"data-content":undefined, 
			children: React.cloneElement(frame.props.children, {
				"data-type":frame.props["data-type"], 
				"data-content":frame.props["data-content"], 
			})
		})
	}
}
