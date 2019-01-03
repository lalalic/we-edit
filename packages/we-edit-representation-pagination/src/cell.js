import React,{PureComponent as Component} from "react"
import PropTypes from "prop-types"
import {Group} from "./composed"
import Frame from "./frame"

import {HasParentAndChild} from "./composable"
import {models} from "we-edit"
const {Cell:Base}=models
const Super=HasParentAndChild(Base)

class CellFrame extends Frame{
	render(){
		return this.createComposed2Parent()
	}
}

export default class extends Super{
	get current(){
		if(this.computed.composed.length==0){
			return this.create()
		}
		return this.computed.composed[this.computed.composed.length-1]
	}

	get nonContentHeight(){
		const {margin={right:0,left:0,top:0,bottom:0}, border, spacing}=this.props
		return spacing
				+border.top.sz
				+border.bottom.sz
				+margin.top
				+margin.bottom
	}

	nextAvailableSpace(){
        let space=this.current.nextAvailableSpace(...arguments)
        if(!space){
            this.create()
            return this.nextAvailableSpace(...arguments)
        }
        return space
    }

	create(required={}){
		const {height,width}=this.context.parent.nextAvailableSpace({...required,id:this.props.id})
		const {margin={right:0,left:0,top:0,bottom:0}}=this.props
		const frame=new CellFrame({
			width:width-margin.right-margin.left,
			height: height-this.nonContentHeight
		},{parent:this,getComposer:id=>this.context.getComposer(id)})
		this.computed.composed.push(frame)
		return frame
	}

	appendComposed(line){
		const appended=this.current.appendComposed(...arguments)
		if(appended===false){
			this.context.parent.appendComposed(this.createComposed2Parent())
			this.create({height:line.props.height})
			return this.appendComposed(...arguments)
		}else if(Number.isInteger(appended)){
			return appended
		}
	}

	onAllChildrenComposed(){
		this.context.parent.appendComposed(this.createComposed2Parent())
		super.onAllChildrenComposed()
	}

	createComposed2Parent(){
		const {border, margin, spacing, background,vertAlign}=this.props
		const contentHeight=this.current.currentY
		const spaceHeight=this.current.props.height+this.nonContentHeight
		const height=contentHeight+this.nonContentHeight
		const width=this.current.props.width+margin.left+margin.right
		return (
			<Cell {...{border, margin, spacing, background,vertAlign,contentHeight,height,width,spaceHeight}}>
				{React.cloneElement(this.current.render(),{height:contentHeight})}
			</Cell>
		)
	}
}


const Spacing=Group
const Margin=Group

class Cell extends Component{
	render(){
		const {border, margin, spacing, background,vertAlign,width,height, contentHeight, children, ...others}=this.props
		const alignY=(()=>{
			switch(vertAlign){
				case "bottom":
					return height-contentHeight
				case "center":
				case "middle":
					return (height-contentHeight)/2
				default:
					return 0
			}
		})();
		return (
			<Group {...others}>
				{background&&background!="transparent" ? (<rect width={width} height={height} fill={background}/>)  : null}
				<Spacing x={spacing/2} y={spacing/2}>
					<Border border={border} spacing={spacing} width={width} height={height}>
						<Margin x={margin.left} y={margin.top}>
							<Group y={alignY} className="frame">
								{children}
							</Group>
						</Margin>
					</Border>
				</Spacing>
			</Group>
		)
	}

}



class Border extends Component{
	render(){
		var {width,height,spacing,border:{left,right,bottom,top}, children, ...others}=this.props
		width-=spacing
		height-=spacing
		return (
			<Group {...others}>
				{top.sz && <path strokeWidth={top.sz} stroke={top.color} d={`M0 0 L${width} 0`}/> || null}
				{bottom.sz && <path strokeWidth={bottom.sz} stroke={bottom.color} d={`M0 ${height} L${width} ${height}`}/>  || null}
				{right.sz && <path strokeWidth={right.sz} stroke={right.color} d={`M${width} 0 L${width} ${height}`}/>  || null}
				{left.sz && <path strokeWidth={left.sz} stroke={left.color} d={`M0 0 L0 ${height}`}/>  || null}
				<Group x={left.sz} y={top.sz}>
					{children}
				</Group>
			</Group>
		)

	}
}
