import React, {Component} from "react"
import {dom, ReactQuery} from "we-edit"

import {HasParentAndChild} from "../composable"
import {Group, Marker} from "../composed"

export default class Table extends HasParentAndChild(dom.Table){
	get pages(){
		return this.computed.composed
	}

	get lastPage(){
		return this.pages[this.pages.length-1]
	}

	get currentPage(){
		return [...this.pages].reverse().find((me,i,pages,prev=pages[i+1])=>{
			return (me && !prev) || prev.lastRow.props.id!==me.lastRow?.props.id
		})
	}

	onAllChildrenComposed(){
		this.lastPage.commit(true)
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

	/**
	 * on current space,
	 * otherwise request up
	 * row asking for space, we need know which row is asking, maybe the row already asked, but it need adjust height
	 * each row should only request once, since max and edge already give each time, row already know how to balance
	 */
	nextAvailableSpace(rowId){
		if(this.lastPage){
			if(this.lastPage.lastRow.props.id==rowId){
				this.lastPage.commit()
			}else{
				const space=this.currentPage.nextAvailableSpace()
				if(space)
					return space
			}
		}

		const space=super.nextAvailableSpace(...arguments)
		let segments=space.findBlockSegments()
		if(segments.length==0){
			space=super.nextAvailableSpace(space.height+1)
			segments=space?.findBlockSegments()||[]
			if(segments.length==0)
				return false
		}
		
		const max=segments.sort((a,b)=>b.height-a.height)[0]
		this.pages.push(
			new this.constructor.Page({
				space:space.clone({height:max.height,blockOffset:max.y, segments}),
				children:[],
			},{parent:this})
		)
		return this.lastPage.nextAvailableSpace()
	}

	static Page=class extends Component{
		static displayName="page-table"
		constructor(){
			super(...arguments)
			this.getCellHeightMatrix=this.getCellHeightMatrix.bind(this)
			this.commit=this.commit.bind(this)
			this.recommit=this.recommit.bind(this)
		}
		get space(){
			return this.props.space
		}

		get rows(){
			return this.props.children
		}

		get lastRow(){
			return this.rows[this.rows.length-1]
		}

		get table(){
			return this.context.parent
		}

		commit(){
			const {props:{height, children:[first,...rows]}}=this.render()
			this.table.context.parent.appendComposed(
				React.cloneElement(
					this.table.createComposed2Parent(first,true),
					{dy:this.dy(height)}
				)
			)
			rows.forEach(row=>{this.table.context.parent.appendComposed(this.table.createComposed2Parent(row))})
		}

		//should only happen when vMerge exists
		//current make it simple to always recommit
		recommit(){
			const isBelongToThisTable=l=>{
				const $line=new ReactQuery(l)
				const $table=$line.findFirst(`[data-content="${this.table.props.id}"]`)
				return $table.length==1
			}
			const frame=this.space.frame,lines=frame.lines, len=lines.length
			const i=[...lines].reverse().findIndex(l=>!isBelongToThisTable(l))
			const removed=lines.splice(-(i==-1 ? lines.length : i+1))
			this.commit()
			console.debug(`recommit page-table[${this.table.props.id}][${this.table.pages.indexOf(this)+1}]: rollback ${removed.length} lines`)
		}

		dy(height){
			const {y}=[...this.space.segments].sort((a,b)=>a.y-b.y).find(a=>a.height>=height)
			return y-this.space.frame.blockOffset
		}

		push(row){
			if(this.lastRow!==row){
				this.rows.push(row)
				/*
				this.allDone?.reject()
				this.allDone=this.table.createPromise()
				Promise.all(this.rows.map(a=>a.allDone))
					.then(this.allDone.resolve,this.allDone.reject)
				this.allDone
					.then(this.recommit,()=>console.debug("cancel page-table all done promise since new row comes"))
					.finally(()=>delete this.allDone)
				*/
			}
		}

		nextAvailableSpace(){
			const height=this.getCellHeightMatrix().height //this.rows.reduce((H,{height:h})=>H+h,0)
			const available=this.space.height-height
			if(available<=0)
				return false
			return this.space.clone({height:available,blockOffset:this.space.blockOffset+height})
		}

		render(){
			const {children:rows}=this.props
			try{
				const matrix=this.getCellHeightMatrix()
				const height=matrix.reduce((H,[h])=>H+h,0)
				return (
					<Group height={height}>
						{rows.map((pageRow,i)=>{
							try{
								return pageRow.createComposed2ParentWithHeight(matrix[i])
							}catch(e){
								return console.error(e)
							}
						})}
					</Group>
				)
			}catch(e){
				console.error(e)
			}
		}

		getCellHeightMatrix(){
			const {children:rows}=this.props
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
						if(!b || !a)
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
					if(!b || !a)
						return 
					matrix[a.__temp.rowIndex][j]=maxRowEndY-a.__temp.rowBeginY
					delete a.__temp
					startMergeCells[j]=undefined//remove ended
				})
			})
			return Object.assign(this.matrix=matrix,{height:Y})
		}
	}
}