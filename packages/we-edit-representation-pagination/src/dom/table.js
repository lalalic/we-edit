import React, {Component} from "react"
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
 * 5. 
 */
export default class Table extends HasParentAndChild(dom.Table){
	get pages(){
		return this.computed.composed
	}

	get lastPage(){
		return this.pages[this.pages.length-1]
	}

	get currentPage(){
		return [...this.pages].reverse().find((me,i,pages,prev=pages[i+1])=>{
			if(me && !prev)
				return true
			if(prev.lastRow.id!==me.lastRow?.id)
				return true
			if(prev.lastRow.hasEndOfVMerge())
				return true
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
				return
			
			const relayout=page=>id=>page.alreadyLayouted && page.relayout(id)
			/**
			 * vertical span may change the end & begin of pagerow, it need be corrected
			 * such as a cell with vMerge of first row flow content to next page, 
			 * the 2nd tablePage will hold the a first rowPage when created,
			 * but when 2nd row fully layouted, the last rowPage in 1st tablePage will be changed to 2nd rowPage
			 * so the 1st rowPage in 2nd tablePage should be reshaped to 2nd rowPage
			 */
			//reshape FirstRow Of AllNextPages To Be Same WithLastRow Of ThisPage
			this.table.pages
				.slice(this.table.pages.indexOf(this)+1)//next pages
				.filter(page=>page.rows[0].id==this.lastRow.id)//page crossed from same row
				.forEach(page=>{
					const reshaped=page.rows[0]=page.rows[0].reshapeTo(row)
					reshaped.onAllChildrenComposed(relayout(page))
				})

			this.rows.push(row)
			row.onAllChildrenComposed(relayout(this))
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
			const startMergeCells=[]
			let Y=0
			rows.forEach((row, i, _, isLastRow=i==rows.length-1)=>{
				const rowHeight=row.flowableContentHeight
				const rowBeginY=Y, rowEndY=rowBeginY+rowHeight
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
					}//can't use else since a row maybe restart and end of vMerge in context of reshape
					if(a.vMerge && (!b?.vMerge || b.startVMerge)){//end
						endMergeCells[j]=a
					}else if(isLastRow && startMergeCells[j]){//force end at last row
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
					matrix[i].isStartAndEnd=matrix[i].isStartAndEnd||a===b	
					matrix[a.__temp.rowIndex][j]=maxRowEndY-a.__temp.rowBeginY
					delete a.__temp
					startMergeCells[j]=undefined//remove ended
				})
			})
			
			return Object.assign(this.matrix=matrix,{height:Y})
		}
	}
}