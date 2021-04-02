import React, {Component} from "react"
import {dom, ReactQuery} from "we-edit"

import {HasParentAndChild} from "../composable"
import {Group, Marker} from "../composed"

export default class Table extends HasParentAndChild(dom.Table){
	get pages(){
		return this.computed.composed
	}

	get currentPage(){
		return this.pages[this.pages.length-1]
	}

	onAllChildrenComposed(){
		/**content height should be considered for dy */
		const height=this.currentPage.height
		const {y}=this.currentPage.space.segments.sort((a,b)=>a.y-b.y).find(a=>a.height>=height)
		const dy=y-this.currentPage.space.frame.blockOffset
		this.appendCurrentPageRowsAt(dy)
		super.onAllChildrenComposed()
	}

	appendComposed(row){
		this.currentPage.rows.push(React.cloneElement(row,{width:this.props.width}))
	}

	/**row call it to append a block of row*/
	createComposed2Parent(pageRow, needMarker){
		const {width,indent, id}=this.props
		return (
			<Group width={width} height={pageRow.props.height}>
				{needMarker && <Marker {...{type:"table",id}}/>}
				<Group x={indent}>
					{pageRow}
				</Group>
			</Group>
		)
	}

	appendCurrentPageRowsAt(dy){
		const [first,...rows]=this.currentPage.render()
		this.context.parent.appendComposed(
			React.cloneElement(
				this.createComposed2Parent(first,true),
				{dy}
			)
		)
		rows.forEach(row=>{this.context.parent.appendComposed(this.createComposed2Parent(row))})
	}

	/**
	 * on current space,
	 * otherwise request up
	 * row asking for space, we need know which row is asking, maybe the row already asked, but it need adjust height
	 * each row should only request once, since max and edge already give each time, row already know how to balance
	 */
	nextAvailableSpace(rowId){
		if(this.currentPage?.has(rowId)){
			const dy=this.currentPage.space.blockOffset-this.currentPage.space.frame.blockOffset
			this.appendCurrentPageRowsAt(dy)
			this.pages.push(null)
		}

		let space=this.currentPage?.nextAvailableSpace()
		if(space)
			return space

		space=super.nextAvailableSpace(...arguments)
		let segments=space.findBlockSegments()
		if(segments.length==0){
			space=super.nextAvailableSpace(space.height+1)
			segments=space?.findBlockSegments()||[]
			if(segments.length==0)
				return false
		}
		
		const max=segments.sort((a,b)=>b.height-a.height)[0]
		this.pages.splice(-1,1,new this.constructor.Page({
			space:space.clone({height:max.height,blockOffset:max.y, segments}),
			children:[],
		}))
		return this.currentPage.nextAvailableSpace()
	}

	static Page=class extends Component{
		static displayName="page-table"
		get space(){
			return this.props.space
		}

		get rows(){
			return this.props.children
		}

		get height(){
			return this.rows.reduce((H,{props:{height:h=0}})=>H+h,0)
		}

		has(rowId){
			const row=this.rows[this.rows.length-1]
			return row && new ReactQuery(row).findFirst(`[data-content="${rowId}"]`).length==1
		}

		nextAvailableSpace(){
			const height=this.space.height-this.height
			if(height>0){
				return this.space.clone({height,blockOffset:this.space.blockOffset+this.height})
			}
			return false
		}

		render(){
			this.render=()=>{throw new Error("table already appended, why called again?")}
			const {children:rows, }=this.props
			return rows
		}
	}
}

/**
 * what is table from perspective of layout
 * 1. space manager
 * 2. recommit trigger, since table must be commit as lines
 */

/**
 * what is row from perspective of layout
 * > 1. request fixed inline size of space
 * > 2. append row as a whole
 */

/**
 * what is cell from perspective of layout
 * > cell is a section to define layouts of cell content
 */
