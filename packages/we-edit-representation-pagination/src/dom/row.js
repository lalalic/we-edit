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
				}
				return col[prop]
			}
		})),{
			get(columns, prop){
				if(prop in columns){
					return columns[prop]
				}

				if(typeof(prop)=="string"){
					return columns.find(a=>a.id ? a.id==prop : a.id=prop)
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
				this.context.parent.appendComposed(this.createComposed2Parent(false))
			}
			//request largest space in current constraint space
			const space=super.nextAvailableSpace(this.props.id)
			if(!space)//no space any more, stop immediately
				return 
			
			this.pages.push(page=new this.constructor.Page({host:this, space,  children:new Array(this.getColumns(this.props.cols).length).fill(null)}))
		}
		return page
	}
	
	nextAvailableSpace({id:cellId, ...required}){
		const {keepLines, minHeight, height:exactHeight}=this.props
		const col=this.getColumns(this.props.cols)[cellId]
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
		if(this.currentPage && !this.currentPage.appended){
			this.context.parent.appendComposed(this.createComposed2Parent(true))
		}
		this.pages.forEach(page=>{
			page.cells.forEach((a,i,cells)=>!a && (cells[i]=page.makeEmptyCell(i)))
		})
		
		super.onAllChildrenComposed()
	}

	createComposed2Parent(bLastPage){
		return this.currentPage.render(bLastPage)
	}

	getHeight(cells){//@TODO: to honor height
		const {props:{height=0, minHeight=height}}=this
		return Math.max(minHeight||0,...cells.filter(a=>!!a).map(a=>a.cellHeight))
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

		get appended(){
			return !!this.height
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
			this.cells[i]=this.height ? this.renderCell(cell,i) : cell
		}

		renderCell(cell, i){
			const {isLastPageOfRow, isFirstRowInPage,table, row}=this.props
			return React.cloneElement(
				cell.clone({
					height:this.height,
					colIndex:i,table,row,isLastPageOfRow,isFirstRowInPage//editable edges need the information
				}).createComposed2Parent(),{
				...this.cols[i],
				height:this.height,
				key:i,
			})	
		}
	
		render(bLastPage){
			this.render=()=>{throw new Error("row already appended, why called again?")}
			const {children:cells=[],host, isLastPageOfRow, isFirstRowInPage,table, row, space, x=0,y=0,...props}=this.props			
			this.height=bLastPage ? host.getHeight(cells) : space.height
			cells.forEach((a,i)=>cells[i]=a?.render ? this.renderCell(a,i) : a)
			const {top,left}=this.border
			return (
				<Group {...{
					...props,
					height:this.height, 
					x:x+left.width/2,
					y:y+top.width/2,
					children:cells,
				}}/>
			)
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



