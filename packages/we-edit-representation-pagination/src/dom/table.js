import React, {Component} from "react"
import {dom} from "we-edit"

import {HasParentAndChild} from "../composable"
import {Group} from "../composed"

/**
 * table/row/cell may be splitted into blocks
 * cell is the smallest unit of composing
 * but cell may be splitted into blocks
 * space is defined by cell->row->table->parent space, so it has to require space up
 */
export default class extends HasParentAndChild(dom.Table){
	createComposed2Parent(row){
		const {width,indent}=this.props
		return (
			<Group width={width} height={row.props.height}>
				{React.cloneElement(row,{x:indent})}
			</Group>
		)
	}
}

class Table extends HasParentAndChild(dom.Table){
	get pages(){
		return this.computed.composed
	}

	get currentPage(){
		return this.pages[this.pages.length-1]
	}

	onAllChildrenComposed(){
		/**content height should be considered for dy */
		const content=this.createComposed2Parent(this.currentPage)
		const height=this.currentPage.height
		const {y}=this.currentPage.space.segments.find(a=>a.height>=height)
		this.context.parent.appendComposed(React.cloneElement(content,{y}))
		super.onAllChildrenComposed()
	}

	appendComposed(rowRankPlaceholder){
		this.currentPage.push(rowRankPlaceholder)
	}

	/**row call it to append a block of row*/
	createComposed2Parent(page){
		const {width,indent}=this.props
		const height=page.height
		const content=this.page.render()
		return (
			<Group width={width} height={height}>
				<Group x={indent}>
					{content}
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
	nextAvailableSpace(rowId){
		if(this.currentPage.has(rowId)){
			const content=this.createComposed2Parent(this.currentPage)
			this.context.parent.appendComposed(React.cloneElement(content, {dy:this.currentPage.space.blockOffset}))
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
		get space(){
			return this.props.space
		}

		get rows(){
			return this.props.rows
		}

		get height(){
			return this.rows.reduce((H,{props:{height:h=0}})=>H+h,0)
		}

		get isFull(){
			return this.space.height-this.height<=0
		}

		nextAvailableSpace(){
			const height=this.space.height-this.height
			if(height>0){
				return this.space.clone({height,blockOffset:this.space.blockOffset+this.height})
			}
			return false
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
