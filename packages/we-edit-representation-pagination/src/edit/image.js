import React from "react"
import editable from "./editable"
import Base from "../image"
import Entity from "../composed/selection/entity"
import {Group} from "../composed"

export default class extends editable(Base){
	splittable=false

	getFocusShape(){
		const {size:{width:right, height:bottom},rotate,dispatch}=this.props
		const left=0, top=0
		const transform=a=>{
			if(rotate){
				const {x=0,y=0}=a.props
				const rotated=this.rotate(<Group width={right} height={bottom}/>).props.children
				const {x:x0=0,y:y0=0}=rotated.props
				return React.cloneElement(a,{x:x+x0,y:y+y0,rotate})
			}
			return a
		}
		return (
			<Entity
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
					y:top-20
				}}
				transform={transform}
			/>
		)
	}
}
