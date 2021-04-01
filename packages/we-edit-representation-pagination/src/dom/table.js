import React from "react"
import {dom} from "we-edit"

import {HasParentAndChild} from "../composable"
import {Group} from "../composed"

/**
 * table/row/cell may be splitted into blocks
 * cell is the smallest unit of composing
 * but cell may be splitted into blocks
 * space is defined by cell->row->table->parent space, so it has to require space up
 */
export default class Table extends HasParentAndChild(dom.Table){
	constructor(){
		super(...arguments)
		Object.defineProperties(this,{
			/** 
			 * a segment is the whole part on a page
			 * a segment is an appending unit as a line
			 * a segment is a rect space in parent layout space
			 * each space should only have a segment since table can't be split in a frame
			 */
			pages:{
				get(){
					return this.computed.composed
				}
			},

			currentPage:{
				get(){
					return this.pages[this.pages.length-1]
				}
			},

			/**
			 * table width: border(table and cell) counted
			 */
			width: {

			}
		})
	}

	onAllChildrenComposed(){
		this.context.parent.appendComposed(this.createComposed2Parent())
		super.onAllChildrenComposed()
	}

	appendComposed(row){
		this.currentPage.push(row)
		if(this.currentPage.isFull){
			this.context.parent.appendComposed(this.createComposed2Parent())
		}
	}

	/**row call it to append a block of row*/
	createComposed2Parent(){
		const {width,indent}=this.props
		return (
			<Group width={width} height={this.currentSegment.height}>
				<Group x={indent}>
					{this.currentSegment.render()}
				</Group>
			</Group>
		)
	}

	/**
	 * on current space,
	 * otherwise request up
	 * row asking for space, we need know which row is asking, maybe the row already asked, but it need adjust height
	 * each row should only request once, since max and edge already give each time, row already know how to balance
	 */
	nextAvailableSpace(){
		let space=super.nextAvailableSpace(...arguments)
		let segments=space.findBlockSegments()
		if(segments.length==0){
			space=super.nextAvailableSpace(space.height+1)
			segments=space?.findBlockSegments()||[]
			if(segments.length==0)
				return false
		}
		
		const edge=segments[segments.length-1]
		const max=segments.sort((a,b)=>b.height-a.height)[0]
		this.pages.push(new this.constructor.Page({
			space:space.clone({height:max.height,blockOffset:max.y, edge}),
			children:[],
		}))
		return this.currentPage.space
	}

	static Page=class extends Component{
		get rows(){
			return this.props.rows
		}

		get height(){
			return this.rows.reduce((H,{props:{height:h=0}})=>H+h,0)
		}

		render(){
			const {children:rows, }=this.props
			return rows.reduce((status,row,i)=>{
				status.rows.push(React.cloneElement(row,{y:status.y,key:i}))
				status.y+=row.props.height
				return status
			},{y:0,rows:[]})
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
