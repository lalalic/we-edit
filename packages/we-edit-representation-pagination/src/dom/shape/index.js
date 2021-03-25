import React,{} from "react"
import {dom} from "we-edit"
import Path from "../../tool/path"
import {Group,Line} from "../../composed"
import FocusShape from "./focus"

import {HasParentAndChild,editable} from "../../composable"
export default class Shape extends editable(HasParentAndChild(dom.Shape)){
	static Path=Path
	get geometry(){
		return new Path(this.props.geometry)
	}

	get boundHeight(){
		const {top=0,bottom=0}=this.geometry.bounds()
		return bottom-top
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
		const { outline, fill, autofit, autofitHeight=this.boundHeight, id, hash}=this.props
		var geometry=this.geometry
		if(autofit && content){
			geometry.verticalExtend(content.props.height-autofitHeight)
		}
		const path=geometry.toString()
		const {width,height,x, y, transform}=this.transform(geometry)
		return (
			<Group {...{width,height,geometry}}>
				<Group 	x={x} y={y}>{/*go back to original position for editing*/}
					<FocusShape {...{path,id, composedUUID:hash,transform}}>
						<Group {...{"data-nocontent":true}}>
							<Line {...{...outline, d:path, fill, id}}/>
						</Group>
						{content}
					</FocusShape>
				</Group>
			</Group>
		)		
	}

	transform(geometry){
		const {rotate, scale, transforms=[], outline={}}=this.props
		var x=0, y=0
		if(rotate){
			//rotate around shape center
			const center=geometry.center(), a=center

			geometry.rotate(rotate,center.x,center.y)
			transforms.push(`rotate(${rotate} ${center.x} ${center.y})`)

			//translate rotate to origin
			const b=geometry.center()
			geometry.translate(x=parseInt(a.x-b.x), y=parseInt(a.y-b.y))
			//geometry.origin={x:translate.x,y:translate.y}
		}

		if(scale){
			geometry.scale(scale)
			transforms.push(`scale(${scale})`)
		}

		const {width,height}=geometry.size(outline.width)
		return {width,height,geometry,x, y,transform:transforms.join(" ")}
	}
}