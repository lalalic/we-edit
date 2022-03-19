import React, {Component} from "react"
import PropTypes from "prop-types"
import {dom, ReactQuery} from "we-edit"

import {editable, HasParentAndChild} from "../composable"
import {Group, Marker} from "../composed"
const RowSpanEnd=1

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

	get headers(){
		return this.pages[0]?.rows.filter(a=>a.row.header)
	}

	get footers(){
		return this.pages[0]?.rows.filter(a=>a.row.header)
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
		this.pages.findLast(page=>page.space.frame==row.space.frame).push(row)
	}

	/**row call it to append a block of row*/
	createComposed2Parent(pageRow, needMarker){
		const {width,indent, id}=this.props
		const height=pageRow.props.height
		pageRow=this.wrapParentsUntilMe(pageRow)
		return (
			<Group width={width} height={height}>
				{needMarker && <Marker type="table" id={id}/>}
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
	nextAvailableSpace({row:rowId, ...required}){
		if(this.lastPage){//a row only happen once in a page
			if(this.lastPage.lastRow?.id==rowId){
				//to ensure #2a: when calculating cell height matrix, use space height
				this.lastPage.commit(false)
			}else{
				const space=this.currentPage.nextAvailableSpace(required)
				if(space){
					return space
				}else if(this.currentPage==this.lastPage){
					this.lastPage.commit(false)
				}else{
					//this.currentPage.relayout()
				}
			}
		}

		const space=super.nextAvailableSpace(required)
		let segments=space.findBlockSegments()
		if(segments.length==0){
			space=super.nextAvailableSpace({...required,height:space.height+1})
			segments=space?.findBlockSegments()||[]
			if(segments.length==0)
				return false
		}
		
		const max=segments.sort((a,b)=>b.height-a.height)[0]
		this.pages.push(
			new this.constructor.Page({
				space:space.clone({
					height:max.height,
					blockOffset:max.y,
					segments
				}),
				children:[],
			},{parent:this})
		)
		return this.lastPage.nextAvailableSpace(required)
	}

	static Page=class extends Component{
		static displayName="page-table"
		constructor(){
			super(...arguments)
			this.relayout=this.relayout.bind(this)
			this.relayout.factory=page=>allDoneRow=>{
				//the scope should make it as small as possible
				if(page.alreadyLayouted && allDoneRow.pages.length>1){
					//only rowSpan>0 affect already layouted
					/**
					 * spaning row can affect last already layouted pageRow, and rowSpan cell
					 * other kind row just need be appended
					 * but pageTable controls its flow, why relayout on row finished, instead of table finished?
					 * > because table may not finished if it's partial compose
					 */
					page.relayout(allDoneRow)
				}
			}
			this.table.headers?.forEach(a=>this.rows.push(a))
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

		get firstRow(){
			return this.rows.find(a=>!a.row.header)
		}

		get table(){
			return this.context.parent
		}

		get flowableContentHeight(){
			return this.rows.reduce((H,{flowableContentHeight:h})=>H+h,0)
		}
		/**
		 * call only once, mainly for page flow
		 * firstRow should locate dy
		 * lastRow should take all space for flow, except last page table
		 * @param {*} bLastPageTable 
		 */
		commit(bLastPageTable){
			if(this.alreadyLayouted){
				throw new Error("page table already commit")
			}
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

			rows.forEach((row,i)=>{
				if(i==0){
					row=this.table.createComposed2Parent(row,true)
					if(dy){
						row=React.cloneElement(row,{dy})
					}
				}else{
					row=this.table.createComposed2Parent(row)
				}
				this.table.context.parent.appendComposed(row)
			})
			this.alreadyLayouted=true
		}

		/**
		 * 
		 * @param {*} row 
		 */
		relayout(row){
			console.debug(`Row[${row.props.id}] triggered relayout`)
			const isBelongToThisTable=l=>{
				const $line=new ReactQuery(l)
				const $table=$line.findFirst(`[data-content="${this.table.props.id}"]`)
				return $table.length==1
			}
		
			const frame=this.space.frame,lines=frame.lines
			const i=[...lines].reverse().findIndex(l=>!isBelongToThisTable(l))
			const removed=lines.splice(-(i==-1 ? lines.length : i+1))
			const {props:{children:rows}}=this.render()
			rows.forEach((row,i)=>{
				lines.push(this._replaceLayoutedTableRow(removed[i],row, i))
			})
			if(this.lastRow.isEmpty){
				lines.pop()
			}
			console.debug(`relayout ${removed.length} lines page-table[${this.table.props.id}][${this.table.pages.indexOf(this)}]`)
		}

		_replaceLayoutedTableRow(layoutedRowPage,updatedRowPage, nthRowOfPage){
			if(!layoutedRowPage){
				return this.table.createComposed2Parent(updatedRowPage)
			}
			const {first,parents,layoutedTableRow=first.get(0)}=new ReactQuery(layoutedRowPage)
				.findFirstAndParents(`[data-content="${updatedRowPage.props['data-content']}"]`)

			const increasedHeight=updatedRowPage.props.height-layoutedTableRow.props.height
			return parents.reduceRight((revisedChild, parent,i,_, child=parents[i+1]) => {
				const { props: { height, children, ...props} } = parent
				props.children=revisedChild
				height!=undefined && (props.height=height+increasedHeight);
				if(Array.isArray(children)){
					const revisable=[...children], i=children.indexOf(child)
					revisable.splice(i,1,revisedChild)
					props.children=revisable
				}
				return React.cloneElement(parent, props)
			}, updatedRowPage)
		}

		dy(height){
			const {y}=[...this.space.segments].sort((a,b)=>a.y-b.y).find(a=>a.height>=height)||{y:this.space.blockOffset}
			return y-this.space.frame.blockOffset
		}

		push(row){
			if(this.rows.includes(row))
				return false
			this.rows.push(row)
			row.setAllDoneListener(this.relayout.factory(this))
			return true
		}

		nextAvailableSpace({height:requiredHeight=0}={}){
			const height=this.flowableContentHeight
			const available=this.space.height-height
			if(available<=requiredHeight)
				return false
			return this.space.clone({height:available,blockOffset:this.space.blockOffset+height})
		}

		render(){
			const {children:rows}=this.props
			try{
				const tableRowHeights=this.getTableRowHeights()
				return (
					<Group height={tableRowHeights.reduce((H,h)=>H+h,0)}>
						{rows.map((pageRow,i)=>{
							try{
								return pageRow.createComposed2ParentWithHeight(tableRowHeights[i],tableRowHeights.matrix?.[i])
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

		getTableRowHeights(){
			return this.rows.map(a=>a.flowableContentHeight)
		}

		clone(props){
			return new this.constructor({
				...this.props,
				...props
			},this.context)
		}
	}
}

/**
 * support colSpan and rowSpan
 */
class SpanableTable extends Table{
	constructor(){
		super(...arguments)
		Object.defineProperties(this,{
			currentPage:{
				get(){
					/**
					 * since rowSpan might cross page, so current page is not always last page
					 * the logic is not to mess up row order
					 * 
					 * */
					return [...this.pages].reverse().find((me,i,pages,prev=pages[i+1])=>{
						if(me && !prev)//only 1 page, then first page is current page
							return true
						
						if(prev.lastRow.id!==me.lastRow?.id)//means prev.lastRow already fully layouted, me must be current page
							return true
						//prev page left space is too small to hold my first row
						const prevLeftSpace=prev.nextAvailableSpace()
						if(!prevLeftSpace || prevLeftSpace.height<me.firstRow.flowableContentHeight)
							return true
						
						//any col of my first row is to end row span
						return !!me.firstRow.cols.find(a=>a.rowSpan===RowSpanEnd)
					})
				}
			}
		})
	}

	getChildContext(){
		return {
			...super.getChildContext(),
			cols:()=>{
				const cols=this.props.cols.map(a=>({...a}))
				//it's based on last row.cols, row is responsible to correct itself
				const lastRow=this.lastPage?.lastRow?.row
				lastRow?.cols.forEach((a,i)=>{
					if(a.rowSpan>1){
						cols[i].rowSpan=a.rowSpan-1
					}
				})
				return cols
			}
		}
	}

	static Page=class extends super.Page{
		push(rowPage){
			const lastRow=this.lastRow
			//may merge cells if rowSpan row natually end at last page
			if(this.rows.length==1 && 
				lastRow.id!=rowPage.id && //already checked on request space, but leave here for self explain
				!lastRow.cols.find(a=>a.rowSpan===RowSpanEnd)// edge never merge
			){
				if(lastRow.cols.find(a=>a.beginRowSpan) && 
					lastRow.row.pages.indexOf(lastRow)!=0// last pageRow of last page from same row
				){
					lastRow.cells.forEach((cell,i)=>cell && (rowPage.cells[i]= rowPage.cells[i] || cell))
					this.rows.pop()
				}
			}

			if(!super.push(rowPage))
				return false
			//@NOTE:yield cross page spanCell to current row to make row order already correct
			
			//yield on next pages
			this.table.pages
				.slice(this.table.pages.indexOf(this)+1)//next pages
				.filter(page=>page.firstRow.id==lastRow.id)//page crossed from same row
				.forEach(page=>{
					const yielded=page.rows[0]=page.rows[0].yieldTo(rowPage)
					yielded.setAllDoneListener(this.relayout.factory(page))
				})
			return true
		}

		getTableRowHeights(){
			const cellExtraHeightMatrix=[]
			const {yRows}=this.rows.reduce((state, row,i,rows,isLastRow=i==rows.length-1)=>{
				cellExtraHeightMatrix[i]=new Array(row.cols.length).fill(0)
				const rowHeight=row.flowableContentHeight
				const Y=state.yRows[i-1]||0
				const yCells=row.cols.map((col,j)=>{
					if(row.cells[j]?.rowSpan>RowSpanEnd){
						state.yRowSpanCells[j].y=Y+row.cells[j].cellHeight
						state.yRowSpanCells[j].row=i
					}
					if(col.rowSpan===RowSpanEnd || isLastRow){
						return state.yRowSpanCells[j].y
					}
					return 0
				})
				state.yRows[i]=Math.max(Y+rowHeight, ...yCells)
				yCells.forEach((a,j)=>{
					if(a){ 
						if(a<state.yRows[i]){
							cellExtraHeightMatrix[state.yRowSpanCells[j].row][j]=state.yRows[i]-a
						}
						state.yRowSpanCells[j].y=0
					}
				})
				return state
			},{yRows:[],yRowSpanCells:new Array(this.table.props.cols.length).fill(0).map(a=>({y:0}))})

			const hRows=yRows.map((y,i,ys,y0=ys[i-1]||0)=>y-y0)
			hRows.matrix=cellExtraHeightMatrix
			return hRows
		}
	}
}

//export default SpanableTable

export default class extends editable(SpanableTable,{stoppable:true}){
	static Page=class extends super.Page{
		/**
		 * need sync computed.lastComposed
		 */
		_replaceLayoutedTableRow(layouted, updated, nthRow){
			const composed=super._replaceLayoutedTableRow(layouted,updated,nthRow)
			const i=this.table.pages.slice(0,this.table.pages.indexOf(this))
				.reduce((s,page)=>s+page.rows.length,0)
			if(layouted){
				this.table.computed.lastComposed.splice(i+nthRow,1,composed)
			}else{
				this.table.computed.lastComposed.splice(i+nthRow-1,0,composed)
			}
			
			return composed
		}
	}

	cancelUnusableLastComposed(next){
		const selfChanged=next.$hash!==this.props.$hash
		if(selfChanged){
			super._cancelAllLastComposed(...arguments)
			return 
		}

		const lastUnChangedChild=(({children:next},{children:current})=>{
			const isChanged=i=>next[i]?.props?.hash!==current[i]?.props?.hash 
			return next.find((a,i)=>!isChanged(i) && isChanged(i+1))
		})(next, this.props);

		if(!lastUnChangedChild){
			super._cancelAllLastComposed(...arguments)
			return 
		}

		const lastUnChangedChildId=lastUnChangedChild.props.id
		//cancel this.computed.composed
		const iLastUnchangedPage=this.pages.findLastIndex(page=>{
			const iLastUnchangedRow=page.rows.findLastIndex(rowPage=>rowPage.id==lastUnChangedChildId)
			if(iLastUnchangedRow!=-1){
				page.rows.splice(iLastUnchangedRow+1)
				return true
			}
		})
		if(iLastUnchangedPage!=-1){
			this.pages.splice(iLastUnchangedPage+1)
		}
		//cancel this.computed.lastComposed
		const iLastUnchangedComposed=this.computed.lastComposed.findLastIndex(composedRowPage=>{
			const lastUnChangedComposed=new ReactQuery(composedRowPage).findFirst(`[data-content="${lastUnChangedChildId}"]`)
			return lastUnChangedComposed.length>0
		})

		if(iLastUnchangedComposed!=-1){
			this.computed.lastComposed.splice(iLastUnchangedComposed+1)
		}

		if(this.computed.lastComposed.length==0){
			super._cancelAllLastComposed(...arguments)
		}

		delete this.computed.allComposed
	}

	appendLastComposed(){
		const {composed:pages, lastComposed}=this.computed
		this.computed.composed=[]
		this.computed.lastComposed=[]

		const appendedPages=[], appendedLastComposed=[]
		const spaceChangedPage=pages.find((page,i,self,isLastPage=i==self.length-1)=>{
			const space=this.nextAvailableSpace({height:lastComposed[0].props.height})
			this.pages.splice(0)//empty pages to always make new page
			if(!isLastPage && page.space.equals(space)){
				appendedPages.push(page.clone({space}))
				lastComposed.splice(0,page.rows.length)
					.forEach(composedRowPage=>{
						page.table.context.parent.appendComposed(composedRowPage)
						appendedLastComposed.push(composedRowPage)
					})
				
			}else if (isLastPage 
				&& !page.space.isInlineSizeDifferent(space) 
				&& space.height>=page.flowableContentHeight){
				appendedPages.push(page.clone({space}))
			}else{
				return true
			}
		})

		this.computed.composed=appendedPages
		this.computed.lastComposed=appendedLastComposed

		if(spaceChangedPage){
			//@TODO: cancel until last whole row
		}

		if(appendedPages.length==0){
			super._cancelAllLastComposed()
			return false
		}

		return this.props.children.findIndex(a=>a.props.id==this.lastPage.lastRow.id) 
	}
}