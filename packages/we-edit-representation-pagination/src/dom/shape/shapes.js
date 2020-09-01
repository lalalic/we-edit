import React,{Component,} from "react"

import memoize from "memoize-one"
import {ReactQuery} from "we-edit"
import {Group} from "../../composed"

import Path from "../../tool/path"
import FocusShape from "./focus-shape"

export class custom extends Component{
	get strokeWidth(){
		const {outline:{width=0}={}}=this.props
		return width||0
	}

	get contentBox(){
		const {margin:{right=0,left=0,top=0,bottom=0}}=this.props
		const {width,height}=this.getPath().size()
		const strokeWidth=this.strokeWidth
		return {width:width-strokeWidth/2-right-left,height:height-strokeWidth/2-top-bottom}
	}

	get outlineBox(){
		return this.getPath().size(this.strokeWidth)
	}

	availableSpace(){
		return this.contentBox
	}

	createComposedShape(content, {contentHeight, ...props}){
		const {
				margin:{left=0,top=0,bottom=0},
				solidFill="transparent",blipFill:{url}={},
				outline={width:0},
				fill={fill:solidFill},
				rotate:degree=0,
				id,
				hash,
				vertAlign="top",
				placeholded,
			}=this.props

		const {width,height,rotate,scale,translate,geometry}=this.transform(this.getPath().clone())

		const alignY=()=>{
			const {height}=this.getPath().size()
			const contentHeight=new ReactQuery(content).findFirst(".positionlines").attr("height")
			switch(vertAlign){
				case "bottom":
					return height-bottom-this.strokeWidth/2-contentHeight
				case "center":
				case "middle":
					return (height+top-bottom-contentHeight)/2
				default:
					return this.strokeWidth/2+top
			}
		}
		const rotatable={
			...this.getPath().center(),
			degree: Math.floor(degree*100)/100,
			center: geometry.center(),
		}
		return (
			<Group {...{width,height, geometry}}>
				<FocusShape {...{width,height, scale,rotate,translate,rotatable,id,placeholded,...props}}>
					<Group {...this.outlineBox}>
						<Group x={this.strokeWidth/2} y={this.strokeWidth/2}>
							<Group  {...{"data-nocontent":true}}>
								<path d={this.getPath().toString()} strokeWidth={this.strokeWidth} stroke={outline.solidFill} {...fill}/>
								{url && <image {...{...this.contentBox,x:left, y:top, xlinkHref: url, preserveAspectRatio:"none"}} />}
							</Group>
							<Group x={this.strokeWidth/2+left} y={alignY()} className="content">
								{content}
							</Group>
						</Group>
					</Group>
				</FocusShape>
			</Group>
		)
	}

	getPath(){
		return memoize((geometry)=>new Path(geometry))(this.props.geometry)
	}

	/**
	 * Rotation heavily depends on inline story baseline implementation
	 */
	transform(geometry){
		var {rotate, scale,transform}=this.props
		var transformed
		if(transform){
			transformed=transform(geometry,this.props)
		}else{
			const translate={}
			transformed={translate, scale, rotate}
			if(rotate){
				//rotate around shape center
				const a=geometry.bounds()
				const {x,y}=geometry.center()
				geometry.rotate(rotate,x,y)
				const b=geometry.bounds()
				transformed.rotate=`${rotate} ${x} ${y}`

				//translate rotate to origin
				translate.x=parseInt(a.left-b.left)
				translate.y=parseInt(a.top-b.top)
				geometry.translate(translate.x, translate.y)
				geometry.origin={x:translate.x,y:translate.y}
			}

			if(scale){
				geometry.scale(scale)
			}
		}

		const {width,height}=geometry.size(geometry.strokeWidth=this.strokeWidth)
		return {width,height,geometry,...transformed}
	}
}

export class rect extends custom{
	getPath(){
		const {width:w,height:h=Number.MAX_SAFE_INTEGER}=this.props
		return new Path(`M0 0h${w}v${h}h${-w}z`)
	}
}

export class ellipse extends custom{
	getPath(){
		const {width,height=Number.MAX_SAFE_INTEGER,cx=width/2,cy=height/2,rx=cx,ry=cy}=this.props
		return new Path(`M${cx-rx},${cy}a${rx},${ry} 0 1,0 ${rx*2},0a${rx},${ry} 0 1,0 -${rx*2},0`)
	}
}

export class circle extends ellipse{

}