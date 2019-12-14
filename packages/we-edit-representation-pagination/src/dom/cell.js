import React,{PureComponent as Component} from "react"
import {dom} from "we-edit"

import {Group} from "../composed"
import {HasParentAndChild, Fissionable} from "../composable"

const fissureLike=Frame=>{
	return class CellFrame extends Frame{
		static displayName="frame-cell"
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
			const {borders,width,height}=this.props
			const {table,row,id:cell,colIndex:i,isFirstRowInPage,isLastRankOfRow}=this.props
        
			const content=super.createComposed2Parent(...arguments)
			return React.cloneElement(
				content,
				{width,height},
				content.props.children,
				React.cloneElement(borders,{height,width,
					table,row,cell,i,isFirstRowInPage,isLastRankOfRow//editable edges
				})
			)
		}
		/**
		 * create empty cell slot
		 */
		cloneAsEmpty(){
			return Object.assign(this.clone(...arguments),{computed:{composed:[],anchors:[],lastComposed:[]}})
		}

		/**used to caculate rank height */
		get slotHeight(){
			const {margin:{bottom=0}}=this.props
			return this.blockOffset+bottom
		}
	}
}

/**
 * Cell is fissionable
 * commit all when all composed????
 */
const Edge=({sz:size,color,d})=><path strokeWidth={size} stroke={color} d={d}/>
export default class Cell extends Fissionable(HasParentAndChild(dom.Cell)){
	static fissureLike=fissureLike
	static Edges=({top,left,right,bottom, width,height, ...props})=>(
		<Group {...props}>
			<Edge {...top}  d={`M0 0 h${width}`}/>
			<Edge {...bottom} d={`M0 ${height} h${width}`}/>
			<Edge {...right} d={`M${width} 0 v${height}`}/>
			<Edge {...left} d={`M0 0 v${height}`}/>
		</Group>
	)

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
		const {width,height,frame}=this.context.parent.nextAvailableSpace({...required,id:this.props.id})
		const {margin:{right=0,left=0,top=0,bottom=0}={}, vertAlign,border}=this.props
		/**
		 * a cell space border|margin|content|margin|border
		 */
		return super.create({
			margin:{
				left:left+border.left.sz,
				right:right+border.left.sz,
				top:top+border.top.sz,
				bottom:bottom+border.bottom.sz
			},
			width,
			height,
			vertAlign,
			borders:<this.constructor.Edges {...{
				...border,width,height,
				className:"border",
				"data-nocontent":true,
				}}/>
		},{frame})
	}

	onAllChildrenComposed(){
		if(this.computed.composed.length==0){
			this.create()
		}
		super.onAllChildrenComposed()
	}

	createComposed2Parent(slot=this.current){
		return slot
	}
}
