import React,{PureComponent as Component} from "react"
import {dom} from "we-edit"

import {Group} from "../composed"
import {HasParentAndChild, Fissionable} from "../composable"

const fissureLike=Frame=>{
	return class CellFrame extends Frame{
		nextAvailableSpace({height:requiredBlockSize=0}={}){
			const space=super.nextAvailableSpace(...arguments)
			/**cell is allowed to be empty, but normal frame is not allowed */
			if(space && this.isEmpty() && requiredBlockSize>this.availableBlockSize){
				return false
			}
			return space
		}

		/**
		 * a cell space border|margin|content|margin|border
		 */
		createComposed2Parent(){
			const {border:{top,bottom,left,right},width,height}=this.props
			const content=super.createComposed2Parent(...arguments)
			return (
				<Group {...{width,height}}>
					{content}
					<Group {...{className:"border", "data-nocontent":true}}>
						<Edge {...top}  d={`M0 0 h${width}`}/>,
						<Edge {...bottom} d={`M0 ${height} h${width}`}/>,
						<Edge {...right} d={`M${width} 0 v${height}`}/>,
						<Edge {...left} d={`M0 0 v${height}`}/>,
					</Group>
				</Group>
			)
		}
	}
}

/**
 * Cell is fissionable
 * commit all when all composed????
 */
export default class Cell extends Fissionable(HasParentAndChild(dom.Cell)){
	static fissureLike=fissureLike

	get nonContentHeight(){
		const {margin={right:0,left:0,top:0,bottom:0}, border}=this.props
		return 	border.top.sz
				+border.bottom.sz
				+margin.top
				+margin.bottom
	}

	/**
	 * space is defined by row->table->parent space, so it has to require space up
	 * when current cell space is full, it's called to create new cell space by require space up AFTER
	 * *** commit current composed to parent, 
	 * Or commit all when all composed???? No, blockOffset can't be determined from second segment
	 * @param {*} props 
	 * @param {*} context 
	 * @param {*} required 
	 */
	create(props,context,required={}){
		if(this.computed.composed.length>0){
			if(this.current.isEmpty()){
				/**???? */
				this.computed.composed.pop()
			}else{
				this.context.parent.appendComposed(this.createComposed2Parent())
			}
		}
		const {width,height,frame}=this.context.parent.nextAvailableSpace({...required,id:this.props.id})
		const {margin:{right=0,left=0,top=0,bottom=0}={}, vertAlign,border}=this.props
		/**
		 * a cell space border|margin|content|margin|border
		 */
		return super.create({
			border,
			margin:{
				left:left+border.left.sz,
				right:right+border.left.sz,
				top:top+border.top.sz,
				bottom:bottom+border.bottom.sz
			},
			width,
			height,
			vertAlign,
		},{frame})
	}

	onAllChildrenComposed(){
		this.context.parent.appendComposed(this.createComposed2Parent())
		super.onAllChildrenComposed()
	}

	createComposed2Parent(){
		return this.current
		const {border, margin, background,vertAlign}=this.props
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


const Margin=Group

Cell.ComposedCell=class __$1 extends Component{
	static displayName="cell"
	render(){
		var {border, margin, vertAlign,width,frame,
			height,
			nonContentHeight,
			...others}=this.props
		return (
			<Group {...others} height={height} width={width}>
				{new Border({//must render to composed for positioning later
							border,width,height,
							children:(
								<Margin x={margin.left} y={margin.top}>
									{frame ? frame.clone({height}).createComposed2Parent() : null}
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
				<Group className="border" {...{"data-nocontent":true}}
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
		const {sz:size,color,d}=this.props
		return <path strokeWidth={size} stroke={color} d={d}/>
	}
}
