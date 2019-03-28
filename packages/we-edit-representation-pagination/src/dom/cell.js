import React,{PureComponent as Component} from "react"
import PropTypes from "prop-types"
import {dom} from "we-edit"

import {Group} from "../composed"
import {HasParentAndChild, Fissionable} from "../composable"

export default class Cell extends Fissionable(HasParentAndChild(dom.Cell)){
	static fissureLike=Frame=>class extends Frame{
		resetHeight(height){
			this.props.height=height
			this.columns[0].height=height
		}

		appendLine({props:{height:contentHeight}}){
			if(contentHeight-this.currentColumn.availableHeight>1){//can't hold
				if(this.currentColumn.children.length==0){
					return false
				}
			}
			return super.appendLine(...arguments)
		}

		render(){
			return this.createComposed2Parent()
		}
	}

	get nonContentHeight(){
		const {margin={right:0,left:0,top:0,bottom:0}, border}=this.props
		return 	border.top.sz
				+border.bottom.sz
				+margin.top
				+margin.bottom
	}

	create(props,context,required={}){
		if(this.computed.composed.length>0){
			if(this.current.isEmpty()){
				this.computed.composed.pop()
			}else{
				this.context.parent.appendComposed(this.createComposed2Parent())
			}
		}
		const {height,width}=this.context.parent.nextAvailableSpace({...required,id:this.props.id})
		const {margin={right:0,left:0,top:0,bottom:0}}=this.props
		return super.create({
			width:width-margin.right-margin.left,
			height: height-this.nonContentHeight
		})
	}

	onAllChildrenComposed(){
		this.context.parent.appendComposed(this.createComposed2Parent())
		super.onAllChildrenComposed()
	}

	createComposed2Parent(){
		const {border, margin, background,vertAlign}=this.props
		const contentHeight=this.current.currentY
		const height=contentHeight+this.nonContentHeight
		const width=this.current.props.width+margin.left+margin.right
		return (
			<this.constructor.ComposedCell {...{
				border, margin, background,vertAlign,width,
				nonContentHeight:this.nonContentHeight,
				frame:this.current
			}}/>
		)
	}
}


const Spacing=Group
const Margin=Group

Cell.ComposedCell=class extends Component{
	static displayName="cell"
	render(){
		var {border, margin, vertAlign,width,frame,
			height,
			nonContentHeight,
			...others}=this.props
		if(frame)
			frame.resetHeight(height)

		const contentHeight=frame ? frame.contentHeight : 0

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
			<Group {...others} height={height} width={width}>
				{new Border({//must render to composed for positioning later
							border,width,height,
							children:(
								<Margin x={margin.left} y={margin.top}>
									<Group y={alignY}>
										<Group className="frame">
											{frame ? frame.render().props.children : null}
										</Group>
									</Group>
								</Margin>
							)
						}).render()
					}
			</Group>
		)
	}
}

class Border extends Component{
	render(){
		var {width,height,border:{left,right,bottom,top}, children, ...others}=this.props
		return (
			<Group {...others}>
				<Group className="border"
					children={[
						<Edge key="top" type="top" size={top.sz} color={top.color} d={`M0 0 h${width}`}/>,
						<Edge key="bottom" type="bottom" size={bottom.sz} color={top.color} d={`M0 ${height} h${width}`}/>,
						<Edge key="right" type="right" size={right.sz} color={top.color} d={`M${width} 0 v${height}`}/>,
						<Edge key="left" type="left" size={left.sz} color={top.color} d={`M0 0 v${height}`}/>,
					]}
				/>
				<Group x={left.sz/2} y={top.sz/2}>
					{children}
				</Group>
			</Group>
		)

	}
}

class Edge extends Component{
	render(){
		const {size,color,d}=this.props
		return <path strokeWidth={size} stroke={color} d={d}/>
	}
}
