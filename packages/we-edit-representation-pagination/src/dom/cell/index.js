import React from "react"
import PropTypes from "prop-types"
import {dom} from "we-edit"

import Edges from "./edges"
import EditableEdges from "./editable-edges"
import Section from "../section"
import {HasParentAndChild} from "../../composable"

/**
 * Cell is fissionable
 * commit all when all composed????
 */
const Super=HasParentAndChild(dom.Cell)
const displayName=()=>{
	const parts=Section.displayName.split("-")
	parts.splice(-1,1,Super.displayName.split("-").pop())
	return parts.join("-")
}
export default class Cell extends Section{
	static displayName=displayName()
	static defaultProps={
		...Super.defaultProps,
		createLayout:Section.defaultProps.createLayout,
	}
	static contextTypes={
		...Section.contextTypes,
		editable:PropTypes.any,
	}
	
	static Layout=class LayoutCell extends Section.Layout{
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

	static Edges=EditableEdges

	/**
	 * space is defined by row->table->parent space, so it has to require space up
	 * when current cell space is full, it's called to create new cell space by require space up AFTER
	 * *** commit current composed to parent, 
	 * Or commit all when all composed???? No, blockOffset can't be determined from second segment
	 * @param {*} props 
	 * @param {*} context 
	 * @param {*} required 
	 */
	createLayout(props,context,required={}){
		const space=this.context.parent.nextAvailableSpace({...required,id:this.props.id})
		if(!space)
			return null
		const {width,height,frame}=space
		const {margin:{right=0,left=0,top=0,bottom=0}={}, vertAlign,border}=this.props
		/**
		 * a cell space border|margin|content|margin|border
		 */
		return super.createLayout({
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
				editable:!!this.context.editable,
				"data-nocontent":true,//ignore search for positioning
				}}/>
		},{frame})
	}

	onAllChildrenComposed(){
		if(this.computed.composed.length==0){
			const a=this.createLayout()
			this.computed.composed.push(a)
			this.context.parent.appendComposed(this.createComposed2Parent(a))
		}
		super.onAllChildrenComposed()
	}
}
