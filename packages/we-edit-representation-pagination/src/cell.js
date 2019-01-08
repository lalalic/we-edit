import React,{PureComponent as Component} from "react"
import PropTypes from "prop-types"
import {Group} from "./composed"

import {HasParentAndChild} from "./composable"
import {models} from "we-edit"
const {Cell:Base}=models
const Super=HasParentAndChild(Base)

export default class extends Super{
	static contextTypes={
		...Super.contextTypes,
		ModelTypes: PropTypes.object,
	}
	constructor(props,{ModelTypes:{Frame}}){
		super(...arguments)
		if(!this.constructor.CellFrame){
			this.constructor.CellFrame=class extends Frame{
				render(){
					return this.createComposed2Parent()
				}
			}
		}
	}
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
            this.create(...arguments)
            return this.nextAvailableSpace(...arguments)
        }
        return space
    }

	create(required={}){
		if(this.computed.composed.length>0){
			if(this.current.isEmpty()){
				this.computed.composed.pop()
			}else{
				this.context.parent.appendComposed(this.createComposed2Parent())
			}
		}
		const {height,width}=this.context.parent.nextAvailableSpace({...required,id:this.props.id})
		const {margin={right:0,left:0,top:0,bottom:0}}=this.props
		const frame=new this.constructor.CellFrame({
			width:width-margin.right-margin.left,
			height: height-this.nonContentHeight
		},{parent:this,getComposer:id=>this.context.getComposer(id)})
		this.computed.composed.push(frame)
		return frame
	}

	appendComposed(line){
		const appended=this.current.appendComposed(...arguments)
		if(appended===false){
			this.create({height:line.props.height})
			return 1
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
		const height=contentHeight+this.nonContentHeight
		const width=this.current.props.width+margin.left+margin.right
		return (
			<Cell {...{
				border, margin, spacing, background,vertAlign,width,
				nonContentHeight:this.nonContentHeight,
				frame:this.current
			}}/>
		)
	}
}


const Spacing=Group
const Margin=Group

class Cell extends Component{
	render(){
		var {border, margin, spacing,vertAlign,width,frame,
			height,
			nonContentHeight,
			...others}=this.props

		const contentHeight=frame ? frame.contentHeight : 0
		if(height==undefined || (frame && height>contentHeight+nonContentHeight))
			height=contentHeight+nonContentHeight

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
				<Spacing x={spacing/2} y={spacing/2}>
					<Border border={border} spacing={spacing} width={width} height={height}>
						<Margin x={margin.left} y={margin.top}>
							<Group y={alignY}>
								{frame ? frame.render() : null}
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
				{top.sz && ((_5)=><path strokeWidth={top.sz} stroke={top.color} d={`M${_5} ${_5} L${width-_5} ${_5}`}/>)(top.sz/2)}
				{bottom.sz && ((_5)=><path strokeWidth={bottom.sz} stroke={bottom.color} d={`M${_5} ${height-_5} L${width-_5} ${height-_5}`}/>)(bottom.sz/2)}
				{right.sz && ((_5)=><path strokeWidth={right.sz} stroke={right.color} d={`M${width-_5} ${_5} L${width-_5} ${height-_5}`}/>)(right.sz/2)}
				{left.sz && ((_5)=><path strokeWidth={left.sz} stroke={left.color} d={`M${_5} ${_5} L${_5} ${height-_5}`}/>)(left.sz/2)}
				<Group x={left.sz} y={top.sz}>
					{children}
				</Group>
			</Group>
		)

	}
}
