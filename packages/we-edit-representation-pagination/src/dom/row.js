import React,{PureComponent as Component, Fragment} from "react"
import {dom, ReactQuery} from "we-edit"
import memoize from "memoize-one"

import {Group} from "../composed"

import {HasParentAndChild,editable} from "../composable"

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
			}
		})
	}

	get currentPage(){
		return this.pages[this.pages.length-1]
	}
	
	/**
	 * support get column by cellid, such as this.getColumns(this.props.cols)["cellid1"] 
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
						return pages.find(a=>!!a.cells[i]).cells[i]	
					}	
				case "width":{
						const span=col.rowSpan||1, i=cols.indexOf(col)
						return cols.slice(i,i+span).reduce((W,a)=>W+a.width,0)
					}
				}
				return col[prop]
			},
			set(col, k, v){
				if(["id","rowSpan"].includes(k)){
					col[k]=v
					return true
				}
				return false
			}
		})),{
			get(columns, key){
				if(key in columns){
					return columns[key]
				}

				if(typeof(key)=="string"){
					let i=columns.findIndex(a=>a.id==key)
					if(i!=-1)
						return columns[i]
					let found=null
					i=columns.findLastIndex(a=>!!a.id)
					if(i==-1){
						found=columns[0]
					}else{
						const {rowSpan=1}=columns[i]
						found=columns[i+rowSpan]
					}
					found.id=key
					return found
				}
			}
		})
	})

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
		while(!page){
			if(this.currentPage){
				this.context.parent.appendComposed(this.currentPage)
			}
			//request largest space in current constraint space
			const space=super.nextAvailableSpace(this.props.id)
			if(!space)//no space any more, stop immediately
				return 
			
			this.pages.push(page=new this.constructor.Page({
				host:this, space, id:this.props.id,
				children:new Array(this.getColumns(this.props.cols).length).fill(null)}
			))
		}
		return page
	}
	
	nextAvailableSpace({id:cellId, rowSpan=1, ...required}){
		const {keepLines, minHeight, height:exactHeight}=this.props
		const col=this.getColumns(this.props.cols)[cellId]
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
		const columns=this.getColumns(this.props.cols)
		const cellId=cellFrame && cellFrame.props.id
		const col=columns[cellId]
		const page=this.findOrCreatePageForColumn(col, {height:this.getHeight([cellFrame])})
		page && page.insertAt(cellFrame,columns.indexOf(col))
	}

	onAllChildrenComposed(){
		/*
		//remove empty page, can it be ignored????
		this.pages=this.pages.filter(page=>{
			if(!page.isEmpty()){
				return true
			}
			page.delayout()
		})
		*/
		this.currentPage.bLastPage=true
		this.context.parent.appendComposed(this.currentPage)
		/*
		this.pages.forEach(page=>{
			page.cells.forEach((a,i,cells)=>!a && (cells[i]=page.makeEmptyCell(i)))
		})
		*/
		super.onAllChildrenComposed()
	}

	createComposed2Parent(pageRow){
		return pageRow
	}

	getHeight(cells){//@TODO: to honor height
		const {props:{height=0, minHeight=height}}=this
		return Math.max(minHeight||0,...cells.filter(a=>!!a && !a.vMerge).map(a=>a.cellHeight))
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
			return this.props.host.props.cols
		}

		get border(){
			return this.props.host.pages[0]._border
		}

		makeEmptyCell(i){
			const columns=this.props.host.getColumns(this.cols)
			let $=new ReactQuery(columns[i].firstCell)
			const cellContent=$.findFirst(`[data-cellcontent]`)
			$=$.replace(cellContent,<Fragment/>)
			const border=$.findFirst('[data-nocontent]')
			$=$.replace(border, React.cloneElement(border.get(0),{height:this.height}))
			return $.get(0)
		}

		insertAt(cell, i){
			i==0 && (this._border=cell.props.borders.props);
			this.cells[i]=cell
		}

		get height(){
			return this.bLastPage ? this.props.host.getHeight(this.cells) : this.props.space.height
		}

		render(cellHeights){
			const {children:cells=[],host, isLastPageOfRow, isFirstRowInPage,table, row, space, x=0,y=0,id,...props}=this.props			
			const {top,left}=this.border, cols=this.cols, height=this.height
			const rowHeight=Math.max(...cellHeights.filter((h,i,_,cell=cells[i])=>cell && !cell.vMerge))||height
			const layoutedCells=cells.map((cell,i)=>{
				if(!cell || cell.vMerged)
					return null
				const h=cellHeights?.[i]||height
				return React.cloneElement(
					cell.clone({
						height:h,
						colIndex:i,table,row,isLastPageOfRow,isFirstRowInPage//editable edges need the information
					}).createComposed2Parent(),{
					...cols[i],
					height:h,
					key:i,
				})
			})
			return (
				<Group {...{
					...props,
					key:id,
					height:rowHeight, 
					x:x+left.width/2,
					y:y+top.width/2,
					children:layoutedCells,
				}}/>
			)
		}

		createComposed2ParentWithHeight(cellHeights){
			return this.props.host.createComposed2Parent(this.render(cellHeights))
		}
	}
}

export default class EditableRow extends editable(Row,{stoppable:true, continuable:true}){
	/**
	 * @continuable
	 * 1. [done]simply(suitable for most cases), row is atom of composing, so compose all content or nothing
	 * 2. big row: it can avoid composing for out of viewport space
	 * @param {*} a 
	 */
	shouldContinueCompose(){
		return true
	}
}



