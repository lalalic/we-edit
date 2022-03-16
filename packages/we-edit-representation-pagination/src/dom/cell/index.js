import React, {Component} from "react"
import {dom} from "we-edit"

import EditableEdges from "./editable-edges"
import Section from "../section"
import {HasParentAndChild} from "../../composable"

/**
 * Cell is fissionable
 * commit all when all composed????
 */
const Cell=HasParentAndChild(dom.Cell)

export default class TableCell extends Section{
	static displayName=super.switchTypeTo(Cell)

	static propTypes={
		...Cell.propTypes
	}
	static defaultProps={
		...Cell.defaultProps,
		createLayout:Section.defaultProps.createLayout,
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
		 recomposable_createComposed2Parent(){
			const {borders,fill,width,height}=this.props
			const {table,row,id:cell,colIndex:i,isFirstRowInPage,isLastRankOfRow}=this.props
        
			const content=super.recomposable_createComposed2Parent(...arguments)
			return React.cloneElement(
				content,
				{width,height, clipPath:`path("M0,0h${width}v${height}h${-width}z")`,background:fill?.color},
				content.props.children,
				React.cloneElement(borders,{height,width,
					table,row,cell,i,isFirstRowInPage,isLastRankOfRow//editable edges
				})
			)
		}

		/**used to caculate rank height */
		get cellHeight(){
			const {margin:{bottom=0, top=0}}=this.props
			return this.contentHeight+bottom+top
		}

		get cell(){
			return this.context.parent
		}

		get rowSpan(){
			return this.cell.props.rowSpan
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
		const {margin:{right=0,left=0,top=0,bottom=0}={}, vertAlign,border, id, colSpan,rowSpan, fill}=this.props
		const space=this.context.parent.nextAvailableSpace({...required,id, colSpan, rowSpan})
		if(!space)
			return null
		const {width,height,frame}=space
		/**
		 * a cell space border|margin|content|margin|border
		 */
		return super.createLayout({
			margin:{
				left:left+border.left.width,
				right:right+border.right.width,
				top:top+border.top.width,
				bottom:bottom+border.bottom.width
			},
			width,
			height,
			vertAlign,
			fill,
			borders:<this.constructor.Edges {...{
				...border,width,height,
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
