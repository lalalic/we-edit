import React,{PureComponent as Component} from "react"
import PropTypes from "prop-types"
import {models, ReactQuery} from "we-edit"

import {Group} from "./composed"
import Frame from "./frame"

import {HasParentAndChild} from "./composable"
const Super=HasParentAndChild(models.Row)

/**
create rank only when cell request next availableSpace
rank's height is not always correct, how to fix it??? when add new cell, the height should be fixed
*/
export default class extends Super{
	constructor(){
		super(...arguments)
		this.computed.spaces=[]
	}

	cellId(cell){
		if(cell){
			return new ReactQuery(cell)
				.findFirst(`[data-type="cell"]`)
				.attr("data-content")
		}
	}

	appendComposed(cell){
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
		const {first:rank,parents}=new ReactQuery(this.currentSpace.frame.lastLine)
			.findFirstAndParents(a=>a.props["data-content"]==this.props.id || undefined)
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
			this.currentSpace.frame.currentColumn.children.splice(-1,1,fixedLastLine)
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

	nextAvailableSpace({height:minHeight=0,id:requiredId}){
		var height,width
		const {cols}=this.props
		if(!this.currentColumn[0]){
			const space=super.nextAvailableSpace(...arguments)
			this.computed.spaces=[space]
			height=space.height
			width=cols[0].width
		}else if(this.cellId(this.currentColumn[0])==requiredId){
			if(this.ranks<this.currentColumn.length+1){
				if(1==this.context.parent.appendComposed(this.createComposed2Parent())){
					//could it happen?
					console.error(`row[${this.props.id}] can't be appended with rollback again, ignore`)
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
			const {first:cell,parents}=new ReactQuery(a).findFirstAndParents(n=>n.props["data-type"]=="cell"||undefined)
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

			if(1==this.context.parent.appendComposed(this.createComposed2Parent(true))){
				//could it happen?
				console.error(`row[${this.props.id}] can't be appended with rollback again, ignore`)
			}
			if(unappendedCount>0){
				this.currentColumn.splice(-unappendedCount)
			}
		})();

		//fill empty cell for each rank, and
		this.computed.spaces.forEach(({frame})=>{
			const {first:rank,parents}=new ReactQuery(frame.lastLine)
				.findFirstAndParents(a=>a.props["data-content"]==this.props.id || undefined)
			if(!rank.length){
				throw new Error("weired")
			}
			this.injectEmptyCellIntoRank(rank,parents,frame)
		})
		super.onAllChildrenComposed()
	}

	createComposed2Parent(bLast=false){
		const {props:{cols,width}, computed:{composed:columns}}=this
		const i=this.currentColumn.length-1
		const cells=columns.map(column=>column[i])
		const height=this.getHeight(cells)
		return (
			<Rank children={cells} cols={cols} width={width} height={height} last={bLast}/>
		)
	}

	getHeight(cells){
		return this.props.height!=undefined ?
				this.props.height :
				Math.max(...cells.filter(a=>!!a).map(a=>a.props.nonContentHeight+a.props.frame.currentY))
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
