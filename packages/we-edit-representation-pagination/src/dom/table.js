import React, {Component} from "react"
import PropTypes from "prop-types"
import {dom, ReactQuery} from "we-edit"

import {HasParentAndChild} from "../composable"
import {Group, Marker} from "../composed"

/**
 * 1. Always give row max availabe space in frame
 * 2. every commit, except last page-table commit, should create a new page, 
 * 		a. which means last row in page-table should take all left available space in order to flow following content to next page 
 * 		b. last page-table commit should already use content height of row [?:]
 * 3. each row should make height correct after it all children layouted
 * 		a. last page-table doesn't need relayout
 * 4. each page-table relayout should use content height of row to layout
 * 
 * NOTE: pageCell is appended to pageRow before layout content, so relayout when a row all done is a must
 * currentPage is the page which should hold next ROW content 
 */
class Table extends HasParentAndChild(dom.Table){
	constructor(){
		super(...arguments)
		Object.defineProperties(this,{
			currentPage:{
				enumerable: true,
				configurable: true,
				get(){
					return this.lastPage
				}
			}
		})
	}
	get pages(){
		return this.computed.composed
	}

	get lastPage(){
		return this.pages[this.pages.length-1]
	}

	getChildContext(){
		return {
			...super.getChildContext(),
			cols:()=>this.props.cols.map(a=>({...a})),
		}
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
			if(this.lastPage.lastRow.id==rowId){
				//to ensure #2a: when calculating cell height matrix, use space height
				this.lastPage.commit(false)
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
			this.relayout=this.relayout.bind(this)
			this.relayout.factory=page=>allDoneRow=>{
				if(page.alreadyLayouted && allDoneRow.pages.length>1){
					page.relayout(allDoneRow)
				}
			}
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

		/**
		 * call only once, mainly for page flow
		 * firstRow should locate dy
		 * lastRow should take all space for flow, except last page table
		 * @param {*} bLastPageTable 
		 */
		commit(bLastPageTable){
			const {props:{height, children, rows=[...children]}}=this.render()
			let last=rows[rows.length-1],dy=0
			if(!bLastPageTable){
				//@NOTE: to make sure page flow, but not affect nextAvailableSpace
				last=React.cloneElement(last,{height:last.props.height+(this.space.height-height)})
				rows.splice(-1,1,last)
				dy=this.dy(this.space.height)
			}else{
				dy=this.dy(height)
			}

			let first=this.table.createComposed2Parent(rows[0],true)
			dy && (first=React.cloneElement(first,{dy}))
			this.table.context.parent.appendComposed(first)
			rows.splice(0,1)

			rows.forEach(row=>{this.table.context.parent.appendComposed(this.table.createComposed2Parent(row))})
			this.alreadyLayouted=true
			this.commit=()=>{
				console.error("page table already commit")
			}
		}

		relayout(id){
			const isBelongToThisTable=l=>{
				const $line=new ReactQuery(l)
				const $table=$line.findFirst(`[data-content="${this.table.props.id}"]`)
				return $table.length==1
			}
			const replaceLayoutedTableRow=(layoutedTableRowWithParents,current)=>{
				const {first,parents,layoutedTableRow=first.get(0)}=new ReactQuery(layoutedTableRowWithParents)
					.findFirstAndParents(`[data-content="${current.props['data-content']}"]`)
				if(!layoutedTableRow){
					debugger
					throw new Error("why can't find row")
				}

				const increased=current.props.height-layoutedTableRow.props.height
				return parents.reduceRight((revisedChild, parent,i,_, child=parents[i+1]) => {
					const { props: { height, children, ...props} } = parent
					props.children=revisedChild
					height!=undefined && (props.height=height+increased);
					if(Array.isArray(children)){
						const revisable=[...children], i=children.indexOf(child)
						revisable.splice(i,1,revisedChild)
						props.children=revisable
					}
					return React.cloneElement(parent, props)
				}, current)
			}
			const frame=this.space.frame,lines=frame.lines
			const i=[...lines].reverse().findIndex(l=>!isBelongToThisTable(l))
			const removed=lines.splice(-(i==-1 ? lines.length : i+1))
			const {props:{children:rows}}=this.render()
			rows.forEach((row,i)=>{
				const last=removed[i]
				if(!last){
					//@TODO: not safe
					lines.push(this.table.createComposed2Parent(row))
				}else{
					lines.push(replaceLayoutedTableRow(last,row))
				}
			})
			console.debug(`relayout ${removed.length} lines page-table[${this.table.props.id}][${this.table.pages.indexOf(this)+1}]`)
		}

		dy(height){
			const {y}=[...this.space.segments].sort((a,b)=>a.y-b.y).find(a=>a.height>=height)
			return y-this.space.frame.blockOffset
		}

		push(row){
			if(this.lastRow===row)
				return false
			console.debug(`append row[${row.id}] to page[${this.table.pages.indexOf(this)}]`)
			this.rows.push(row)
			row.onAllChildrenComposed(this.relayout.factory(this))
		}

		nextAvailableSpace(){
			const height=this.getCellHeightMatrix().height
			const available=this.space.height-height
			if(available<=0)
				return false
			return this.space.clone({height:available,blockOffset:this.space.blockOffset+height})
		}

		render(){
			const {children:rows}=this.props
			try{
				const matrix=this.getCellHeightMatrix()
				return (
					<Group height={matrix.height}>
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

		/**
		 * for render: always use content height
		 * 
		 * for nextAvailableSpace: to provide available space for next row
		 * 
		 * @returns 
		 */
		getCellHeightMatrix(){
			const {children:rows}=this.props
			const matrix=new Array(rows.length)
			let Y=0
			rows.forEach((row, i)=>{
				const rowHeight=row.flowableContentHeight
				matrix[i]=new Array(row.cells.length).fill(rowHeight)
				Y+=rowHeight
			})
			return Object.assign(matrix,{height:Y})
		}
	}
}

class SpanableTable extends Table{
	constructor(){
		super(...arguments)
		Object.defineProperties(this,{
			currentPage:{
				get(){
					/**the logic is not to mess up row order */
					return [...this.pages].reverse().find((me,i,pages,prev=pages[i+1])=>{
						if(me && !prev)
							return true
						if(prev.lastRow.id!==me.rows[0]?.id)
							return true
						//same row, but me.firstRow may be reshaped to different row, so it need check further
						//if it's rowspan edge, such as end/begin of rowspan
						return prev.lastRowIsRowSpanEdge()
					})
				}
			}
		})
	}

	getChildContext(){
		return {
			...super.getChildContext(),
			cols:()=>{
				const cols=[...this.props.cols]
				this.currentPage?.lastRow?.cells.forEach((a,i)=>{
					if(a?.rowSpan){
						const {props:{colSpan=1}}=a
						cols.splice(i,colSpan,...new Array(colSpan).fill(null))
					}
				})
				return cols
			}
		}
	}

	static Page=class extends super.Page{
		lastRowIsRowSpanEdge(){
			if(this.lastRow.cells.find(a=>a?.rowSpan))
				return true
		}
	
		cellAlreadySpanRows(pageCell){
			const rowId=pageCell.cell.closest('row').props.id
			const rows=this.table.pages.slice(0,this.table.pages.indexOf(this)+1)
				.map(a=>a.rows.map(b=>b.id)).flat()
			return Array.from(new Set(rows)).reverse().indexOf(rowId)+1
		}

		push(row){
			const lastRow=this.lastRow
			if(!super.push(row))
				return false
			//@NOTE:reshape cross page spanCell to current row to make row order already correct
			this.table.pages
				.slice(this.table.pages.indexOf(this)+1)//next pages
				.filter(page=>page.rows[0].id==lastRow.id)//page crossed from same row
				.forEach((page,i, pages)=>{
					const firstRow=page.rows[0]
					if(i===0){
						const rowSpaneds=firstRow.cells.map(a=>{
							if(!a?.rowSpan)
								return -1
							return this.cellAlreadySpanRows(a)
						})
						pages.rowSpaneds=rowSpaneds
					}
					const reshaped=page.rows[0]=firstRow.reshapeTo(row, pages.rowSpaneds)
					reshaped.onAllChildrenComposed(this.relayout.factory(page))
				})
		}

		/**
		 * for render: always use content height
		 * 
		 * for nextAvailableSpace: to provide available space for next row
		 * 
		 * @returns 
		 */
		 getCellHeightMatrix(){
			const {children:rows}=this.props
			const matrix=new Array(rows.length)
			const startRowSpanCells=[]
			let Y=0
			rows.forEach((row, i, _, isLastRow=i==rows.length-1)=>{
				const rowHeight=row.flowableContentHeight
				const rowBeginY=Y, rowEndY=rowBeginY+rowHeight
				//init all cell with row height
				matrix[i]=new Array(row.cells.length).fill(rowHeight)
				Y+=rowHeight
				
				const endRowSpanCells=new Array(row.cells.length).fill(null)
				row.cells.forEach((a,j,_1,_2,b=rows[i+1]?.cells[j])=>{
					if(!a)
						return 
					if(b && a.rowSpan){//start
						a.__temp={rowBeginY,rowIndex:i} //temp for quick calc
						startRowSpanCells[j]=a
					}//can't use else since a row maybe restart and end of vMerge in context of reshape
					if(a.isEndRowSpan){//end
						endRowSpanCells[j]=a
					}
					if(isLastRow && startRowSpanCells[j]){//force end at last row
						endRowSpanCells[j]=a
					}
				})

				if(!endRowSpanCells.find(a=>!!a))
					return 

				const maxRowEndY=Math.max(
					rowEndY,
					...endRowSpanCells.map((b,j,_1,_2,a=startRowSpanCells[j])=>{
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
				endRowSpanCells.forEach((b,j,_1,_2,a=startRowSpanCells[j])=>{
					if(!b || !a)
						return 
					matrix[i].isStartAndEnd=matrix[i].isStartAndEnd||a===b	
					matrix[a.__temp.rowIndex][j]=maxRowEndY-a.__temp.rowBeginY
					delete a.__temp
					startRowSpanCells[j]=undefined//remove ended
				})
			})
			
			return Object.assign(this.matrix=matrix,{height:Y})
		}
	}
}

export default Table