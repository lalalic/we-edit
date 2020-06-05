import React,{PureComponent as Component} from "react"
import {dom, ReactQuery} from "we-edit"
import memoize from "memoize-one"

import {Group} from "../composed"

import {HasParentAndChild,editable} from "../composable"
const Super=HasParentAndChild(dom.Row)

/**
 * terms:
 * Rank: a composed line, a row may be splitted into more than one rank, rank apply vertAlign
 * Slot: a composed cell segment, a cell may be splitted into more than one slot
 * 
 * 
 * ***Every time a row request space up, a rank would be created to keep the space in the layout engine
 * ***
 * >why rank's height must be fixed? 
 * *** border
 * >rank's height is not always correct, how to fix it??? 
 * *** all children composed, each rank's height could be fixed
 * *** rank's height=Max(row height if defined, ... slot's height)
 * 
 * computed.composed is [rank, rank, rank, ...]
 * rank		space\col	col1	col2 	...
 * rank1	space1		slot11		
 * rank2	space2		slot12	slot21
 * ...		...	 		...	 	...
 * when append Rank to space, #1 is simple and chosen
 * 1> request rank space, then add empty Rank placeholder, then adjust rank every time a slot committed
 * 2> before requesting rank space, commit last Rank placeholder, do what #1 would do
 * 3> all children composed : affect blockOffset, so it's NOT possible
*/
class Row extends Super{
	constructor(){
		super(...arguments)
		Object.defineProperties(this,{
			ranks:{
				get(){
					return this.computed.composed
				},
				set(value){
					this.computed.composed=value
				}
			}
		})
	}

	get width(){//used by calc row range
		return this.closest("table").props.width
	}
	
	/**
	 * support get column by cellid, such as this.getColumns(this.props.cols)["cellid1"] 
	 * cell id would be set in column accoding to using/composing order(it's correct for composing)
	 * support 
	 * column.currentRank:current valid rank for the column
	 * column.firstSlot:first slot of this column
	 * make it dynamic to always use current cols
	 */
	getColumns=memoize(cols=>{
		const me=this
		return new Proxy(cols.map(a=>new Proxy(a,{
			get(col,prop){
				switch(prop){
				case "currentRank":{
						const ranks=me.ranks
						const i=cols.indexOf(col)
						return ranks[ranks.findLastIndex(a=>!!a.slots[i])+1]
					}
				case "firstSlot":{
						const ranks=me.ranks
						const i=cols.indexOf(col)
						return ranks.find(a=>!!a.slots[i]).slots[i]	
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
	 * it would find a rank's space meeting required, if there isn't 
	 * it would request space up, and use an empty rank placeholder to take up the block in layout engine
	 * 
	 * ***Don't use required height to request space, since later other cells' slot may fit in
	 * if there's no slot fit in a rank, it can be delete after all children composed
	 * @TODO: there may be dead loop
	 * @param {*} col 
	 * @param {*} requiredSpace
	 */
	findOrCreateRankForColumn(col, {height:minHeight=0}={}){
		var rank=col.currentRank 
		if(rank){
			//find first rank whose space meet required
			rank=this.ranks.slice(this.ranks.indexOf(rank)).find(rank=>rank.space.height>=minHeight)
		}
		while(!rank){
			//request largest space in current constraint space
			const space=super.nextAvailableSpace()
			if(!space)//no space any more, stop immediately
				return 
			this.ranks.push(rank=new this.constructor.Rank({space, children:new Array(this.getColumns(this.props.cols).length).fill(null)}))
			//each requested space should be taken up by appending rank placeholder, so next request can take effect
			this.context.parent.appendComposed(this.createComposed2Parent(rank))
		}
		return rank
	}
	/**
	 * request a rank space from up, and then
	 * create space for each cell
	 * when a cell request space, we need at first determin which rank, then we can determin 
	 * 1. request rank space from up
	 * 2. or calc cell space from rank space
	 * How to determin which rank when cell request space???
	 * ** use cellId to query rank
	 * 
	 * 
	 * **every time requesting space, a rank placeholder height=0 would be appended to take the space
	 * **then height will be corrected every time a slot appended
	 * @param {*} requiredSpace {cellId, height:requiredBlockSize} 
	 */
	nextAvailableSpace({id:cellId, ...required}){
		const {keepLines}=this.props
		const col=this.getColumns(this.props.cols)[cellId]
		const rank=this.findOrCreateRankForColumn(col,required)
		if(!rank)
			return false
		const space=rank.space
		//further constraint rank space for column of cellid
		const {left,height}=space, {x=0,width}=col, X=left+x
		return space.clone({
			left:X,
			right:X+width,
			height:keepLines ? Number.MAX_SAFE_INTEGER : height,
		})
	}

	/**
	 * put it into correct column[i].push(cell)
	 * @param {*} slotFrame 
	 */
	appendComposed(slotFrame){
		const columns=this.getColumns(this.props.cols)
		const cellId=slotFrame && slotFrame.props.id
		const col=columns[cellId]
		const rank=this.findOrCreateRankForColumn(col, {height:this.getHeight([slotFrame])})
		rank && rank.insertAt(slotFrame,columns.indexOf(col))
	}

	onAllChildrenComposed(){
		//remove empty rank, can it be ignored????
		this.ranks=this.ranks.filter(rank=>{
			if(!rank.isEmpty()){
				return true
			}
			rank.delayout()
		})
		const columns=this.getColumns(this.props.cols)
		this.ranks.forEach((rank,i,ranks)=>{
			const height=this.getHeight(rank.slots)
			//replace  empty slot with empty column.firstSlot shape
			rank.slots.forEach((a,i,slots)=>!a && (slots[i]=columns[i].firstSlot.cloneAsEmpty()))
			//then 
			rank.relayout(height,ranks.length-1==i)
		})
		super.onAllChildrenComposed()
	}

	/**
	 * it create a rank placeholder, and then immediately append to block as placeholder
	 * it first take up the whole left space with space.height, then
	 * after all children composed, the rank height and slots height would be fixed
	 * @param {*} rank 
	 * @param {*} last 
	 */
	createComposed2Parent({props:{space:{height}, children}}){
		const {props:{cols,id:row},width}=this
		return <this.constructor.Rank {...{height,width, row, children, cols}}/>
	}

	getHeight(slots){
		return Math.max(this.props.height||0,...slots.filter(a=>!!a).map(a=>a.slotHeight))
	}

	static Rank=class extends Component{
		static displayName="rank"
		get space(){
			return this.props.space
		}
	
		get slots(){
			return this.props.children
		}

		/**the layouted rank in the space */
		get layouted(){
			const frame=this.space.frame
			return new Proxy(frame.lastLine, {
				get(line, prop) {
					if (prop == "replaceWith") {
						return replacement => frame.lines.splice(-1, 1, replacement);
					}
					else if (prop == "detach") {
						return () => frame.lines.splice(-1, 1);
					}else if(prop == "isFirstRowInPage"){
						const prevLine=frame.lines[frame.lines.length-2]
						const table=a=>new ReactQuery(a).findFirst(`[data-type=table]`).attr("data-content")
						return !prevLine || table(line)!=table(prevLine)
							
					}
					return line[prop];
				}
			});
		}

		delayout(){
			this.layouted.detach()
		}
	
		isEmpty(){
			const {children:slots}=this.props
			return !slots.find(a=>a && !a.isEmpty())
		}

		relayout(height, isLastRankOfRow){
			const Rank=this.constructor
			function changeHeightUp(height, rank, parents) {
				const delta=height-(rank.props.height||0)
				return parents.reduceRight((child, parent) => {
					const { props: { height, children } } = parent
					if (React.Children.count(children) == 1) {
						if (typeof (height) == "number") {
							return React.cloneElement(parent, { height: height + delta }, child);
						}
					} else {
						console.warn("row's offspring should only has one child");
					}
					return parent
				}, new Rank({...rank.props,height}).render())
			}
			const {first,parents,rank=first.get(0)}=new ReactQuery(this.layouted).findFirstAndParents(`rank`)
			try{
			const changed=changeHeightUp(
				height,
				React.cloneElement(rank,{
					isLastRankOfRow,
					isFirstRowInPage:this.layouted.isFirstRowInPage,
					table:parents.findLast(a=>a.props["data-type"]=="table").props["data-content"],
				}),
				parents
			)
			/** set height changes from rank to block line*/
			this.layouted.replaceWith(changed)
			}catch(e){
				debugger
			}
		}
	
		insertAt(slot, i){
			this.slots[i]=slot
		}
	
		render(){
			const {children:slots=[],cols,height,isLastRankOfRow, isFirstRowInPage,table, row, space, ...props}=this.props
	
			return (
					<Group height={height} {...props} >
					{
						slots.map((a,i)=>React.cloneElement(
							a.clone({height,
								colIndex:i,table,row,isLastRankOfRow,isFirstRowInPage//editable edges need the information
							}).createComposed2Parent(),{
							...cols[i],
							height,
							key:i,
						}))
					}
					</Group>
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



