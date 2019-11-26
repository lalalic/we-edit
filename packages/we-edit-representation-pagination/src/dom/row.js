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
 * rank1	space1		slot11	slot21	
 * rank2	space2		slot12	slot22
 * ...		...	 		...	 	...
 * 
*/
export default class __$1 extends Super{
	constructor(){
		super(...arguments)
		this.computed.spaces=[]
		this.computed.slots=[]
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

	/**
	 * 
	 * @param {*} cell 
	 */
	appendComposed(cell){
		this.computed.slots.push(cell)
		if(!this.currentColumn[0]){
			this.currentColumn.push(cell)
		}else if(this.cellId(this.currentColumn[0])==this.cellId(cell)){
			this.currentColumn.push(cell)
		}else{
			this.computed.composed.push([cell])
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
			cells[this.computed.composed.length-1]=cell

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

	get currentColumn(){
		if(this.computed.composed.length==0)
			this.computed.composed.push([])
		return this.computed.composed[this.computed.composed.length-1]
	}

	get ranks(){
		return this.computed.composed.reduce((c,a)=>Math.max(c,a.length),0)
	}

	get currentSpace(){
		return this.computed.spaces[this.currentColumn.length-1]
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
	 * don't use required height, since later cell may fit in
	 * if there's no cell slot fit in, we can delete the whole rank later 
	 * 
	 * 
	 * @param {*} param0 
	 */
	nextAvailableSpace({height:minHeight=0,id:cellId}){
		/*
		const {cols}=this.props
		const colIndex=getColIndexForCell(cellId)
		const rankIndex=getRankIndexForCell(cellId)
		let rankSpace=this.rankSpaces[rankIndex]
		if(!rankSpace){
			/**request new rank space
			this.rankSpaces.push(rankSpace=super.nextAvailableSpace())

		}else if(rankSpace.height<minHeight){
			/**rankSpace can't meet required
			//use next rank
			if(!(rankSpace=this.rankSpaces[rankIndex+1])){
				this.rankSpaces.push(rankSpace=super.nextAvailableSpace())
			}
		}
		console.assert(rankSpace,"can't request rank space ????")

		return rankSpace.clone(cols[colIndex])

*/
		var height,width
		const {cols}=this.props
		if(!this.currentColumn[0]){
			const space=super.nextAvailableSpace(...arguments)
			this.computed.spaces=[space]
			height=space.height
			width=cols[0].width
		}else if(this.cellId(this.currentColumn[0])==cellId){
			if(this.ranks<this.currentColumn.length+1){
				debugger
				const rank=this.createComposed2Parent()
				if(1==this.context.parent.appendComposed(rank)){
					if(1==this.context.parent.appendComposed(rank)){
						//could it happen?
						console.error(`row[${this.props.id}] can't be appended with rollback again, ignore`)
					}
				}
				const space=super.nextAvailableSpace(...arguments)
				this.computed.spaces.push(space)
				height=space.height
			}else{
				height=this.computed.spaces[this.currentColumn.length].height
				if(height<minHeight){
					this.computed.spaces[this.currentColumn.length]=super.nextAvailableSpace(...arguments)
					height=this.computed.spaces[this.currentColumn.length].height
				}
			}
			width=cols[this.computed.composed.length-1].width
		}else{//next column
			height=this.computed.spaces[0].height
			if(height<minHeight){
				this.computed.spaces[0]=super.nextAvailableSpace(...arguments)
				height=this.computed.spaces[0].height
			}
			width=cols[this.computed.composed.length].width
		}
		if(this.props.keepLines){
			height=Number.MAX_SAFE_INTEGER
		}
		return {width, height}
	}

	injectEmptyCellIntoRank(rank,parents){
		const height=rank.attr("height")
		const cells=rank.attr("children")
		cells.splice(cells.length,0,...new Array(this.props.cols.length-cells.length).fill(null))
		cells.forEach((a,j)=>{
			cells[j]=a||React.cloneElement(this.computed.composed[j][0],{height,frame:undefined})
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
		this.computed.spaces.forEach(({frame})=>{
			const {first:rank,parents}=new ReactQuery(frame.lastLine)
				.findFirstAndParents(`[data-content="${this.props.id}"]`)
			if(!rank.length){
				throw new Error("weired table row without rank")
			}
			this.injectEmptyCellIntoRank(rank,parents,frame)
		})
		super.onAllChildrenComposed()
	}

	createComposed2Parent(bLast=false){
		const {props:{cols}, width, computed:{composed:columns}}=this
		const i=this.currentColumn.length-1
		const cells=columns.map(column=>column[i])
		const height=this.getHeight(cells)
		return (
			<Rank children={cells} cols={cols} width={width} height={height} last={bLast}/>
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
