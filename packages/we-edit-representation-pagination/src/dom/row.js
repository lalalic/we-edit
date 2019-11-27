import React,{PureComponent as Component} from "react"
import {dom, ReactQuery} from "we-edit"

import {Group} from "../composed"

import {HasParentAndChild} from "../composable"
const Super=HasParentAndChild(dom.Row)

/**
 * terms:
 * Rank: a composed line, a row may have more than one rank, rank apply vertAlign
 * Slot: a composed cell segment, 
 * create rank only when cell request next availableSpace
 * when add rank to parent layout?
 * 2. all children composed, then blockOffset can't be determined, so it's not possible
 * 1. first cell segment
 * ***
 * >rank's height is not always correct, how to fix it??? 
 * ***every time new cell segment appended, the height can be fixed
 * >why rank's height must be fixed? 
 * ***border
 * 
 * 
 * Row defines each cell height and width
 * 
 * computed.composed is 2-d matrix, [col][slot,slot,...]
 * compued.spaces is [rank space,...]
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
*/
export default class __$1 extends Super{
	constructor(){
		super(...arguments)
		this.computed.spaces=[]
		this.slots=this.computed.slots=[]
		Object.defineProperties(this,{
			columns:{
				enumerable:true,
				configurable:true,
				get(){
					return this.computed.composed
				},
				set(value){
					this.computed.composed=value
				}
			},
			spaces:{
				enumerable:true,
				configurable:true,
				get(){
					return this.computed.spaces
				},
				set(value){
					this.computed.spaces=value
				}
			}
		})
	}
	get currentColumn(){
		if(this.columns.length==0)
			this.columns.push([])
		return this.columns[this.columns.length-1]
	}

	get ranks(){
		return this.columns.reduce((c,a)=>Math.max(c,a.length),0)
	}

	get currentSpace(){
		return this.spaces[this.currentColumn.length-1]
	}
	
	get width(){//used by calc row range
		return this.closest("table").props.width
	}

	cellId(cell){
		if(cell){
			return new ReactQuery(cell)
				.findFirst(`[data-type="cell"]`)
				.attr("data-content")
		}
	}

	getColIndexForCell(id){

	}

	getRankIndexForCell(id){

	}

	/**
	 * rank space must already be ready
	 * put it into correct column[i].push(cell)
	 * 
	 * @param {*} cell 
	 */
	appendComposed(cell){
		/*
		this.computed.slots.push(cell)
		const colIndex=this.getColIndexForCell(cellId)
		const rankIndex=this.getRankIndexForCell(cellId)
		this.columns[colIndex].push(cell)
		this.rankSpaces[rankIndex].frame.lastLine.rank.children[colIndex]=cell
		
		this.computed.slots.push(cell)
		*/
		if(!this.currentColumn[0]){
			this.currentColumn.push(cell)
		}else if(this.cellId(this.currentColumn[0])==this.cellId(cell)){
			this.currentColumn.push(cell)
		}else{
			this.columns.push([cell])
		}
		if(!this.currentSpace)
			return

		this.injectCellIntoRank(cell)
	}

	injectCellIntoRank(cell){
		const lastLine=this.currentSpace.frame.lastLine
		if(lastLine){
			const $lastLine=new ReactQuery(lastLine)
			const {first:rank,parents}=$lastLine.findFirstAndParents(`[data-content="${this.props.id}"]`)
			if(!rank.length)
				return

			const cells=rank.attr("children")
			cells[this.columns.length-1]=cell

			//fix rank's height
			const height=this.getHeight(cells)
			if(height>rank.attr("height")){
				const fixedLastLine=parents.reduceRight(
					(child,parent)=>React.cloneElement(parent,{height},child),
					React.cloneElement(rank.get(0),{height})
				)
				this.currentSpace.frame.lines.splice(-1,1,fixedLastLine)
			}
		}
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
	 * don't use required height to request space, since later cell slot may fit in
	 * but use row height to request block size space if height defined
	 * if there's no cell slot fit in, we can delete the whole rank later 
	 * 
	 * **every time requesting space, a rank placeholder height=0 would be appended to take the space
	 * **then height will be corrected every time a slot appended
	 * @param {*} param0 
	 */
	nextAvailableSpace({height:minHeight=0,id:cellId}){
		/*
		const {cols,height}=this.props
		const colIndex=this.getColIndexForCell(cellId)
		const rankIndex=this.getRankIndexForCell(cellId)
		let rankSpace=this.rankSpaces[rankIndex]
		if(!rankSpace){
			//**request new rank space
			this.rankSpaces.push(rankSpace=super.nextAvailableSpace({height}))
			this.context.parent.appendComposed(this.createComposed2Parent())
			//append a rank placeholder
		}else if(rankSpace.height<minHeight){
			//**rankSpace can't meet required
			//use next rank
			if(!(rankSpace=this.rankSpaces[rankIndex+1])){
				this.rankSpaces.push(rankSpace=super.nextAvailableSpace({height}))
				this.context.parent.appendComposed(this.createComposed2Parent())
			}
		}
		return rankSpace.clone(cols[colIndex])
		*/

		var space=this.currentSpace, col
		const {cols,keepLines}=this.props
		if(!this.currentColumn[0]){
			this.spaces=[space=super.nextAvailableSpace(...arguments)]
			col=cols[0]
		}else if(this.cellId(this.currentColumn[0])==cellId){
			if(this.ranks<this.currentColumn.length+1){
				const rank=this.createComposed2Parent()
				if(1==this.context.parent.appendComposed(rank)){
					if(1==this.context.parent.appendComposed(rank)){
						//could it happen?
						console.error(`row[${this.props.id}] can't be appended with rollback again, ignore`)
					}
				}
				this.spaces.push(space=super.nextAvailableSpace(...arguments))
			}else{
				if(this.currentColumn.height<minHeight){
					space=this.spaces[this.currentColumn.length]=super.nextAvailableSpace(...arguments)
				}
			}
			col=cols[this.columns.length-1]
		}else{//next column
			if(this.spaces[0].height<minHeight){
				space=this.spaces[0]=super.nextAvailableSpace(...arguments)
			}
			col=cols[this.columns.length]
		}
		
		const {left}=space
		const {x=0,width}=col
		return space.clone({
			left:left+x,
			right:left+x+width,
			height:keepLines ? Number.MAX_SAFE_INTEGER : space.height,
		})
	}

	injectEmptyCellIntoRank(rank,parents){
		const height=rank.attr("height")
		const cells=rank.attr("children")
		cells.splice(cells.length,0,...new Array(this.props.cols.length-cells.length).fill(null))
		cells.forEach((a,j)=>{
			cells[j]=a||React.cloneElement(this.columns[j][0],{height,frame:undefined})
		})

		//fix height of each cell
		cells.forEach((a,j)=>{
			const {first:cell,parents}=new ReactQuery(a).findFirstAndParents(`[data-type="cell"]`)
			cells[j]=parents.reduceRight(
				(child,parent)=>React.cloneElement(parent,{height},child),
				React.cloneElement(cell.get(0),{height})
			)
		})
	}

	onAllChildrenComposed(){
		(()=>{//append the last rank
			const unappendedCount=this.ranks-this.currentColumn.length
			for(let i=unappendedCount;i>0;i--)
				this.currentColumn.push(null)

			const lastRank=this.createComposed2Parent(true)
			if(1==this.context.parent.appendComposed(lastRank)){
				if(1==this.context.parent.appendComposed(lastRank)){
					//could it happen?
					console.error(`row[${this.props.id}] can't be appended with rollback again, ignore`)
				}
			}
			if(unappendedCount>0){
				this.currentColumn.splice(-unappendedCount)
			}
		})();

		//fill empty cell for each rank, and
		this.spaces.forEach(({frame})=>{
			const {first:rank,parents}=new ReactQuery(frame.lastLine)
				.findFirstAndParents(`[data-content="${this.props.id}"]`)
			if(!rank.length){
				throw new Error("weired table row without rank")
			}
			this.injectEmptyCellIntoRank(rank,parents,frame)
		})
		super.onAllChildrenComposed()
	}

	createComposed2Parent(last=false){
		const {props:{cols}, width, computed:{composed:columns, spaces}}=this
		//const {height}=spaces[spaces.length-1]
		//return <Rank {...{children:[],cols,width,height,last}}/>
		const i=this.currentColumn.length-1
		const cells=columns.map(column=>column[i])
		const height=this.getHeight(cells)
		return (
			<Rank children={cells} cols={cols} width={width} height={height} last={last}/>
		)
	}

	getHeight(cells){
		return Math.max(this.props.height||0,...cells.filter(a=>!!a).map(a=>a.props.nonContentHeight+a.props.frame.blockOffset))
	}
}

class Rank extends Component{
	static displayName="rank"
	render(){
		const {children:cells=[],cols,height,last, ...props}=this.props

		return (
				<Group height={height} {...props} >
				{
					cells.map((a,i)=>React.cloneElement(a,{
						...cols[i],
						height,
						key:i,
					}))
				}
				</Group>
			)
	}
}
