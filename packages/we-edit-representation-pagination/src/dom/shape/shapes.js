import React,{Component,} from "react"

import memoize from "memoize-one"
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

	createComposedShape(content, focusableContent){
		const {
				margin:{left=0,top=0},
				solidFill="transparent",blipFill:{url}={},
				outline={width:0},
				fill={fill:solidFill},
			}=this.props
		
		return (
			<Group {...this.outlineBox} geometry={this.getPath().clone()}>
				<Group x={this.strokeWidth/2} y={this.strokeWidth/2}>
					<Group  {...{"data-nocontent":true}}>
						{<path d={this.getPath().toString()} strokeWidth={this.strokeWidth} stroke={outline.solidFill} {...fill}/>}
						{url && <image {...{...this.contentBox,x:left, y:top, xlinkHref: url, preserveAspectRatio:"none"}} />}
					</Group>
					{this.createFocusShape(content && 
						<Group x={this.strokeWidth/2+left} y={this.strokeWidth/2+top}>
							{content}
						</Group>,
						focusableContent
					)}
				</Group>
			</Group>
		)
	}

	getPath(){
		return memoize((geometry)=>new Path(geometry))(this.props.geometry)
	}

	createFocusShape(children, focusableContent){
		const {outlineBox:{width, height},props:{rotate=0,id}}=this
		return (<FocusShape {...{width, height,rotate,id,focusableContent,children}}/>)
	}
}

export class rect extends custom{
	getPath(){
		const {width:w,height:h}=this.props
		return new Path(`M0 0h${w}v${h}h${-w}z`)
	}
}

export class ellipse extends custom{
	getPath(){
		const {width,height,cx=width/2,cy=height/2,rx=cx,ry=cy}=this.props
		return new Path(`M${cx-rx},${cy}a${rx},${ry} 0 1,0 ${rx*2},0a${rx},${ry} 0 1,0 -${rx*2},0`)
	}
}

export class circle extends ellipse{

}