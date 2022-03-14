import React,{PureComponent as Component} from "react"
import {dom, ReactQuery} from "we-edit"
import memoize from "memoize-one"
import EventEmitter from "events"

import {Group} from "../composed"

import {HasParentAndChild,editable} from "../composable"

const RowSpanEnd=1
/**
 * terms:
 * Page: a composed line, a row may be splitted into more than one page, page apply vertAlign
 * Cell: a composed cell segment, a cell may be splitted into more than one cell
 * 
 * computed.composed is [page, page, page, ...]
 * page		space\col	col1	col2 	...
 * page1	space1		cell11		
 * page2	space2		cell12	cell21
*/
class Row extends HasParentAndChild(dom.Row){
	constructor(){
		super(...arguments)
		Object.defineProperties(this,{
			pages:{
				get(){
					return this.computed.composed
				},
				set(value){
					this.computed.composed=value
				}
			},
			cols:{
				get(){
					return this.computed.cols||(this.computed.cols=this.context.cols())
				}
			},
			allDoneEvent:{
				get(){
					return this.computed.allDoneEvent||(this.computed.allDoneEvent=new EventEmitter())
				}
			},
		})
		
	}

	get currentPage(){
		return this.pages[this.pages.length-1]
	}
	
	/**
	 * support get column by cellid, such as this.getColumns(this.cols)["cellid1"] 
	 * cell id would be set in column accoding to using/composing order(it's correct for composing)
	 * support 
	 * column.currentPage:current valid page for the column
	 * column.firstCell:first cell of this column
	 * make it dynamic to always use current cols
	 */
	getColumns=memoize(cols=>{
		const me=this
		return new Proxy(cols.map(a=>new Proxy(a,{
			get(col,prop){
				switch(prop){
				case "currentPage":{
						const pages=me.pages
						const i=cols.indexOf(col)
						return pages[pages.findLastIndex(a=>!!a.cells[i])+1]
					}
				case "firstCell":{
						const pages=me.pages
						const i=cols.indexOf(col)
						return pages.find(a=>!!a.cells[i])?.cells[i]	
					}	
				case "width":{
						const span=col.colSpan||1, i=cols.indexOf(col)
						return cols.slice(i,i+span).reduce((W,a)=>W+a.width,0)
					}
				}
				return col[prop]
			},
			set(col, k, v){
				if(["id","colSpan","rowSpan"].includes(k)){
					col[k]=v
					if(k=="rowSpan")
						col.beginRowSpan=true
					return true
				}
				return false
			}
		})),{
			get(colsProxy, key){
				if(key in colsProxy){
					return colsProxy[key]
				}

				if(typeof(key)=="string"){
					const found=colsProxy.find(a=>a.id==key) || me._nextColumn(colsProxy)
					found.id=key
					return found
				}
			}
		})
	})

	_nextColumn(cols){
		const i=cols.findLastIndex(a=>!!a.id)
		const {colSpan=1}=cols[i]||{}
		return cols[i+colSpan]
	}

	/**
	 * @param {*} col 
	 * @param {*} requiredSpace
	 */
	findOrCreatePageForColumn(col, {height:minHeight=0}={}){
		var page=col.currentPage 
		if(page){
			//find first page whose space meet required
			page=this.pages.slice(this.pages.indexOf(page)).find(page=>page.space.height>=minHeight)
		}
		if(!page){
			if(this.currentPage){
				const current=this.currentPage
				this.context.parent.appendComposed(this.currentPage)
				if(current!==this.currentPage){
					//it's trick since yielde, but anyway the pages changed, so it's worth a nested search
					return this.findOrCreatePageForColumn(...arguments)
				}
			}
			//request largest space in current constraint space
			const space=super.nextAvailableSpace(this.props.id)
			if(!space)//no space any more, stop immediately
				return 
			
			this.pages.push(page=new this.constructor.Page({
				space, 
				children:new Array(this.getColumns(this.cols).length).fill(null),
			},{parent:this}))
		}
		return page
	}

	
	
	nextAvailableSpace({id:cellId, colSpan=1,rowSpan=1, ...required}){
		const {keepLines, minHeight=0}=this.props
		const col=this.getColumns(this.cols)[cellId]
		colSpan>1 && (col.colSpan=colSpan);
		rowSpan>1 && (col.rowSpan=rowSpan);

		const page=this.findOrCreatePageForColumn(col,required)
		if(!page)
			return false
		const space=page.space
		//further constraint page space for column of cellid
		const {left,height}=space, {x=0,width}=col, X=left+x
		return space.clone({
			left:X,
			right:X+width,
			height:keepLines ? Number.MAX_SAFE_INTEGER : height,
		})
	}

	/**
	 * put it into correct column[i].push(cell)
	 * @param {*} cellFrame 
	 */
	appendComposed(cellFrame){
		const columns=this.getColumns(this.cols)
		const cellId=cellFrame && cellFrame.props.id
		const col=columns[cellId]
		const page=this.findOrCreatePageForColumn(col, {height:this.getFlowableContentHeight([cellFrame])})
		page && page.insertAt(cellFrame,columns.indexOf(col))
	}

	onAllChildrenComposed(){
		this.currentPage.bLastPage=true
		this.context.parent.appendComposed(this.currentPage)
		super.onAllChildrenComposed()
		this.allDoneEvent.emit("allDone",this)
	}

	createComposed2Parent(pageRow){
		return pageRow
	}

	getFlowableContentHeight(cells){//@TODO: to honor height
		const {props:{height=0, minHeight=0}}=this
		return height||Math.max(minHeight,...cells.map(a=>a?.cellHeight||0))
	}

	static Page=class extends Component{
		static displayName="page-row"
		get space(){
			return this.props.space
		}
	
		get cells(){
			return this.props.children
		}

		get cols(){
			return this.row.cols
		}

		get border(){
			return this.row.pages[0]._border
		}

		get row(){
			return this.context.parent
		}

		get id(){
			return this.row.props.id
		}

		get isFixedHeight(){
			return !!this.row.props.height
		}

		get flowableContentHeight(){
			return this.row.getFlowableContentHeight(this.cells)
		}

		onAllChildrenComposed(callback){
			this.row.allDoneEvent.on('allDone',this.allDoneListener=callback)
			this.removeAllDoneListener=()=>{
				this.row.allDoneEvent.removeListener('allDone',callback)
				delete this.allDoneListener
				return callback
			}
		}

		renderEmptyBox(i,height){
			const firstCell=this.row.getColumns(this.cols)[i].firstCell
			return firstCell && this.renderCell(firstCell.clone({id:undefined/*not belong to any cell*/},true),i,height)
		}

		renderCell(cell,i, height){
			if(!cell){
				return this.renderEmptyBox(i,height)||null
			}
			const {cols=this.cols, isLastPageOfRow, isFirstRowInPage,table, row}=this.props
			const {x,width}=cols[i]
			
			const props={
				x,
				width,
				height,
				key:i,
			}
			if(this.isFixedHeight){
				props.clipPath=`path("M0,0h${width}v${height}h${-width}z")`
			}

			const layoutedCell=React.cloneElement(
				cell.clone({
					height,
					colIndex:i,table,row,isLastPageOfRow,isFirstRowInPage//editable edges need the information
				}).createComposed2Parent(),props)
			//yield and merge when pageTable.push changed the relationship between pageCell and pageRow
			return this.row.wrapParentsUntilMe(layoutedCell,cell.cell.closest('row'))
		}

		insertAt(cell, i){
			i==0 && (this._border=cell.props.borders.props);
			this.cells[i]=cell
			/**
			 * NOTE: composed can't be inserted into frame because page-cell is inserted before content layouted
			 * so don't try to inject composed to frame
			 */
		}

		render(pageTableRowHeight, cellAppendHeights=[]){
			console.debug(`rendering row[${this.id}][page: ${this.row.pages.indexOf(this)+1}]`)
			const {children:cells=[], isLastPageOfRow, isFirstRowInPage,table, row, space, x=0,y=0,...props}=this.props			
			const {top:{width:top=0}={},left:{width:left=0}={}}=this.border||{}
			const rowHeight=Math.max(pageTableRowHeight, this.flowableContentHeight)
			const layoutedCells=cells.map((cell,i)=>{
					const h=this.isFixedHeight ? rowHeight : Math.max(rowHeight, (cell?.cellHeight||0)+(cellAppendHeights[i]||0))
					return this.renderCell(cell,i,h)
			})
			return (
				<Group {...{
					...props,
					key:this.id,
					height:rowHeight, 
					x:x+left/2,
					y:y+top/2,
					children:layoutedCells,
				}}/>
			)
		}

		createComposed2ParentWithHeight(rowHeight, cellAppendHeights ){
			return this.row.createComposed2Parent(this.render(rowHeight, cellAppendHeights))
		}
	}
}

class SpanableRow extends Row{
	getFlowableContentHeight(cells){//@TODO: to honor height
		const {props:{height=0, minHeight=0}, cols}=this
		return height || Math.max(minHeight,...cells.map((a,i)=>{
			const {rowSpan=1}=cols[i]
			return rowSpan===RowSpanEnd && a?.cellHeight || 0
		}))
	}

	_nextColumn(cols){
		const iStartSearch=cols.indexOf(super._nextColumn(cols))
		return cols.slice(iStartSearch).find(a=>a.beginRowSpan||!a.rowSpan)
	}

	static Page=class extends super.Page{
		renderEmptyBox(i,height){
			return !this.cols[i].rowSpan && super.renderEmptyBox(i,height)
		}

		/**
		 * 1. make row order in pages correct
		 * 2. remove rowspan flag when row span finished, so this.getFlowableContentHeight is correct
		 * 3. sync page-row to page-table to make page-row number match
		 * @param {*} pageRow 
		 * @param {*} spanedRows 
		 * @returns 
		 * 
		 * it's happening right after pageRow.row append pageRow to parent
		 * this is still hold by its row, but impact nothing, since page-table replace it with yielded
		 * pageRow.row add a new page that inherit the source space
		 * 
		 * @TODO: the yielded pageRow might be yielded again, 
		 * 	should the yielded be removed from yielded.row to sync???
		 * what's happening: pageRow.row -> append pageRow to parent -> yielde this pageRow(->append yielded to pageRow.row.pages)->
		 */
		yieldTo(pageRow){
			const {props:{children,space}}=this
			const cols=pageRow.cols
			const shaped=new this.constructor({
				space,
				children:children.map((cell,i)=>{
					if(cell && cols[i].rowSpan===RowSpanEnd){
						return new Proxy(cell,{
							get(cell,k,...args){
								if(k=='rowSpan'){
									return undefined
								}
								return Reflect.get(cell,k,...args)
							}
						})
					}else{
						return cell
					}
				})
			},{parent:pageRow.row})
			
			//insert to row pages, what else should do for injection?
			pageRow.row.pages.push(shaped)

			shaped.isReshaped=true
			
			//clear source
			this?.removeAllDoneListener()
			if(this.isReshaped){
				if(this.row.currentPage!==this){
					debugger
				}
				const i=this.row.pages.indexOf(this)//for safe to remove by index
				if(i!=-1){
					this.row.pages.splice(i,1)
				}
			}

			return shaped
		}
	}
}

export default class EditableRow extends editable(SpanableRow,{stoppable:true, continuable:true}){
	/**
	 * @continuable
	 * 1. [done]simply(suitable for most cases), row is atom of composing, so compose all content or nothing
	 * 2. big row: it can avoid composing for out of viewport space
	 * @param {*} a 
	 */
	shouldContinueCompose(){
		return true
	}

	_cancelAllLastComposed(){
		super._cancelAllLastComposed()
		delete this.computed.cols
		delete this.computed.allDoneEvent
	}
}



