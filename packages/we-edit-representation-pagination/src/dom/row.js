import React,{PureComponent as Component} from "react"
import {dom, ReactQuery} from "we-edit"

import {Group} from "../composed"

import {HasParentAndChild} from "../composable"
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
 * *** rank's height=Max(row height if defined, ... slot's content height)
 * 
 * computed.composed is [rank, rank, rank, ...]
 * rank		space\col	col1	col2 	...
 * rank1	space1		slot11		
 * rank2	space2		slot12	slot21
 * ...		...	 		...	 	...
 * 
 * 
 * when append Rank to space, #1 is simple and chosen
 * 1> request rank space, then add empty Rank placeholder, then adjust rank every time a slot committed
 * 2> before requesting rank space, commit last Rank placeholder, do what #1 would do
 * 3> all children composed : affect blockOffset, so it's NOT possible
 * 
 * *** rank in computed.composed share the slots ARRAY with layouted Rank, so
 * *** IN-Place replacement should be used to replace slot in a rank
*/
export default class __$1 extends Super{
	constructor(){
		super(...arguments)
		const {props:{cols}}=this
		const me=this
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
		/**
		 * support get column by cellid, such as this.columns["cellid1"] 
		 * cell id would be set in column accoding to using/composing order(it's correct for composing)
		 * support 
		 * column.currentRank:current valid rank for the column
		 * column.firstSlot:first slot of this column
		 */
		this.columns=new Proxy(cols.map(a=>new Proxy(a,{
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
	}

	get width(){//used by calc row range
		return this.closest("table").props.width
	}

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
			this.ranks.push(rank=new this.constructor.Rank({space, children:new Array(this.columns.length).fill(null)}))
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
		const col=this.columns[cellId]
		const {space}=this.findOrCreateRankForColumn(col,required)
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
	 * @param {*} slot 
	 */
	appendComposed(slot){
		const cellId=getCellId(slot)
		const col=this.columns[cellId]
		const rank=this.findOrCreateRankForColumn(col, {height:this.getHeight([slot])})
		rank.insertAt(slot,this.columns.indexOf(col))
	}

	onAllChildrenComposed(){
		//remove empty rank, can it be ignored????
		this.ranks=this.ranks.filter(rank=>{
			if(!rank.isEmpty()){
				return true
			}
			rank.delayout()
		})
		const {props:{id}, columns}=this
		this.ranks.forEach((rank,i,ranks)=>{
			const height=this.getHeight(rank.slots)
			//replace  empty slot with empty column.firstSlot shape
			rank.slots.forEach((a,i,slots)=>{
				if(!a){
					slots[i]=React.cloneElement(columns[i].firstSlot,{height,frame:undefined,children:null})
				}
			})
			rank.resetHeight(height,ranks.length-1==i,this)
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
		const {props:{cols},width}=this
		return <this.constructor.Rank {...{height,width, children, cols}}/>
	}

	getHeight(slots){
		return Math.max(this.props.height||0,...slots.filter(a=>!!a).map(a=>a.props.nonContentHeight+a.props.frame.blockOffset))
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
			return this.space.frame.lastLine
		}
	
		delayout(){
			this.layouted.detach()
		}
	
		isEmpty(){
			const {children:slots}=this.props
			return !slots.find(a=>!!a)
		}

		resetHeight(height, lastRank){
			//at first reset each slot's height
			this.slots.forEach((a,i,slots)=>{
				const {first,parents}=new ReactQuery(a).findFirstAndParents(`[data-type="cell"]`)
				slots[i]=changeHeightUp(height, first.get(0), parents)
			})
	
			const {first,parents}=new ReactQuery(this.layouted).findFirstAndParents(`[data-type="row"]`)
			var changed=changeHeightUp(height,first.get(0),parents)
			if(lastRank){
				changed=React.cloneElement(changed,{last:true})
			}
			/** set height changes from rank to block line*/
			this.layouted.replaceWith(changed)
		}
	
		insertAt(slot, i){
			this.slots[i]=slot
		}
	
		render(){
			const {children:slots=[],cols,height,last, space, ...props}=this.props
	
			return (
					<Group height={height} {...props} >
					{
						slots.map((a,i)=>React.cloneElement(a,{
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

function changeHeightUp(height, rank, parents, ) {
	const delta=height-(rank.props.height||0)
	if(delta==0)
		return parents[0]||rank
	return parents.reduceRight((child, parent) => {
		const { props: { height, children } } = parent;
			if (React.Children.count(children) == 1) {
			if (typeof (height) == "number") {
				return React.cloneElement(parent, { height: height + delta }, child);
			}
		}
		else {
			throw new Error("row's offspring should only has one child");
		}
		return parent;
	}, React.cloneElement(rank, { height }));
}

const getCellId=slot=>slot && new ReactQuery(slot).findFirst(`[data-type="cell"]`).attr("data-content")

