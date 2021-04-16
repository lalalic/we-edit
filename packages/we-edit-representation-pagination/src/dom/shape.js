import React,{} from "react"
import {dom} from "we-edit"
import Path from "../tool/path"
import {Group,Shape} from "../composed"
import Focusable from "../composed/responsible-canvas/focusable"

import {HasParentAndChild,editable} from "../composable"

/**
 * Shape default layouted as inline mode, in which left&top will keep unchanged after transformation
 * anchor mode is different, so anchor should adjust shape according to geometry
 */
export default class extends editable(HasParentAndChild(dom.Shape)){
	static Path=Path
	focusable=true
	getGeometry(content){
		const {geometry}=this.props
		if(geometry){
			return new Path(geometry)
		}
		return Path.fromRect(content.props)
	}

	onAllChildrenComposed(){
        if(React.Children.toArray(this.props.children).length==0){
            this.context.parent.appendComposed(this.createComposed2Parent())
        }
        super.onAllChildrenComposed()
    }

	/**
	 * shape need pass up transformed geometry for wrap, and size({width,height}) for flow
	 * we can't use a Transformer component since it has to be layouted for positioning
	 * @param {*} content 
	 * @returns 
	 */
	createComposed2Parent(content){
		const geometry=this.getGeometry(content)
		const { outline, fill, autofit, autofitHeight=geometry.bounds().height, id, hash,editableSpots}=this.props
		if(autofit && content){
			geometry.verticalExtend(content.props.height-autofitHeight)
		}
		const path=geometry.toString()
		const {width,height,x,y,transform}=this.transform(geometry)
		return (
			<Group {...{width,height,geometry}}>
				<Group {...{x,y,'data-anchorable':true}}>
					<Focusable {...{path,id, outline,fill, composedUUID:hash,transform,editableSpots}}>
						{content}
					</Focusable>
				</Group>
				{/*not transformed: this.context.debug && <Shape {...{d:path, width:1, color:"red"}}/>*/}
			</Group>
		)		
	}

	transform(geometry){
		const {rotate, scale, transforms=[], outline={}}=this.props
		const a=geometry.bounds()
		if(rotate){
			//rotate around shape center
			const center=geometry.center()
			geometry.rotate(rotate,center.x,center.y)
			transforms.push(`rotate(${rotate} ${center.x} ${center.y})`)
		}

		if(scale){
			geometry.scale(scale)
			transforms.push(`scale(${scale})`)
		}
		const b=geometry.bounds()

		const {width,height}=geometry.size(outline.width)
		return {width,height,geometry,transform:transforms.join(" "), x:a.left-b.left, y:a.top-b.top}
	}
}