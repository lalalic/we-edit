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
		this.commitCurrentPageRows(true)
		super.onAllChildrenComposed()
	}

	appendComposed(row){
		this.currentPage.push(row)
	}

	/**row call it to append a block of row*/
	createComposed2Parent(pageRow, needMarker){
		const {width,indent, id}=this.props
		return (
			<Group width={width} height={pageRow.props.height}>
				{needMarker && <Marker {...{type:"table",id}}/>}
				<Group x={indent}>
					{React.cloneElement(pageRow,{width})}
				</Group>
			</Group>
		)
	}

	commitCurrentPageRows(suitable){
		const {props:{height, children:[first,...rows]}}=this.currentPage.render()
		this.context.parent.appendComposed(
			React.cloneElement(
				this.createComposed2Parent(first,true),
				{dy:this.currentPage.dy(height)}
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
			this.commitCurrentPageRows(this.currentPage.dy)
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

		get currentRow(){
			return this.rows[this.rows.length-1]
		}

		dy(height){
			const {y}=[...this.space.segments].sort((a,b)=>a.y-b.y).find(a=>a.height>=height)
			return y-this.space.frame.blockOffset
		}

		push(row){
			this.rows[this.rows.length-1]!=row && this.rows.push(row)
		}

		has(rowId){
			return this.currentRow?.props.id==rowId
		}

		nextAvailableSpace(){
			const height=this.rows.reduce((H,{height:h})=>H+h,0)
			const available=this.space.height-height
			if(available<=0)
				return false
			return this.space.clone({height:available,blockOffset:this.space.blockOffset+height})
		}

		render(){
			this.render=()=>{
				debugger
				throw new Error("table already appended, why called again?")
			}
			const {children:rows}=this.props
			const matrix=this.getCellHeightMatrix(rows)
			const height=matrix.reduce((H,[h])=>H+h,0)
			return (
				<Group height={height}>
					{rows.map((pageRow,i)=>pageRow.createComposed2ParentWithHeight(matrix[i]))}
				</Group>
			)
		}

		getCellHeightMatrix(rows){
			const matrix=new Array(rows.length)
			const startMergeCells=[]
			let Y=0
			rows.forEach((row, i)=>{
				const rowHeight=row.height, rowBeginY=Y, rowEndY=rowBeginY+rowHeight
				//init all cell with row height
				matrix[i]=new Array(row.cells.length).fill(rowHeight)
				Y+=rowHeight

				const endMergeCells=new Array(row.cells.length).fill(null)
				row.cells.forEach((a,j,_1,_2,b=rows[i+1]?.cells[j])=>{
					if(!a)
						return 
					if(b && a.startVMerge){//start
						a.__temp={rowBeginY,rowIndex:i} //temp for quick calc
						startMergeCells[j]=a
					}else if(a.vMerge && (!b?.vMerge || b.startVMerge)){//end
						endMergeCells[j]=a
					}
				})

				if(!endMergeCells.find(a=>!!a))
					return 

				const maxRowEndY=Math.max(
					rowEndY,
					...endMergeCells.map((b,j,_1,_2,a=startMergeCells[j])=>{
						if(!b)
							return 0
						return a.cellHeight+a.__temp.rowBeginY
					})
				)
				
				const higher=maxRowEndY-rowEndY
				if(higher>0){
					Y+=higher
					//reset height for all cells in current row
					matrix[i]=matrix[i].map(a=>a+higher)
				}
				//reset height for start cells of all endMergeCells to rowEndY
				endMergeCells.forEach((b,j,_1,_2,a=startMergeCells[j])=>{
					if(!b)
						return 
					matrix[a.__temp.rowIndex][j]=maxRowEndY-a.__temp.rowBeginY
					delete a.__temp
					startMergeCells[j]=undefined//remove ended
				})
			})
			return matrix
		}
	}
}
