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

		this.injectIntoRank(cell)
	}

	injectIntoRank(cell){
		const {first:rank,parents}=new ReactQuery(this.currentSpace.frame.lastLine)
			.findFirstAndParents(a=>a.props["data-content"]==this.props.id || undefined)
			
		const cells=rank.attr("children")
		if(cells){
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

	nextAvailableSpace(required){
		var height,width
		const {cols}=this.context
		if(!this.currentColumn[0]){
			const space=super.nextAvailableSpace(...arguments)
			this.computed.spaces.push(space)
			height=space.height
			width=cols[0]
		}else if(this.cellId(this.currentColumn[0])==required.id){
			if(this.ranks<this.currentColumn.length+1){
				this.context.parent.appendComposed(this.createComposed2Parent())
				const space=super.nextAvailableSpace(...arguments)
				this.computed.spaces.push(space)
				height=space.height
			}else{
				height=this.computed.spaces[this.currentColumn.length].height
			}
			width=cols[this.computed.composed.length-1]
		}else{//next column
			height=this.computed.spaces[0].height
			width=cols[this.computed.composed.length]
		}
		if(this.props.keepLines){
			height=Number.MAX_SAFE_INTEGER
		}
		return {width, height}
	}

	onAllChildrenComposed(){
		//append the last rank
		const unappendedCount=this.ranks-this.currentColumn.length
		for(let i=unappendedCount;i>0;i--){
			this.currentColumn.push(null)
		}
		this.context.parent.appendComposed(this.createComposed2Parent())
		if(unappendedCount>0){
			this.currentColumn.splice(-unappendedCount)
		}

		//fill empty cell for each rank
		const len=this.context.cols.length
		this.computed.spaces.forEach(({frame},i)=>{
			const {first:rank,parents}=new ReactQuery(frame.lastLine).findFirstAndParents(a=>a.props["data-content"]==this.props.id || undefined)
			const cells=rank.attr("children")||[]

			cells.splice(cells.length,0,...new Array(len-cells.length).fill(null))
			cells.forEach((a,j)=>{
				if(!cells[j]){
					if(this.computed.composed[j][0]){
						cells[j]=React.cloneElement(this.computed.composed[j][0],{height:0,frame:undefined})
					}else{
						debugger
					}
				}
			})

			const height=rank.attr("height")
			//rander cell to composed from positioning
			cells.forEach((a,j)=>{
				const {first:cell,parents}=new ReactQuery(a).findFirstAndParents(n=>n.props["data-type"]=="cell"||undefined)
				cells[j]=parents.reduceRight(
					(child,parent)=>React.cloneElement(parent,{height},child),
					(({type,props})=>new type({...props,height}).render())(cell.get(0))
				)
			})

			//render rank to composed for positioning
			const renderedRank=parents.reduceRight(
				(child,parent)=>React.cloneElement(parent,{},child),
				(({type,props})=>new type(props).render())(rank.get(0))
			)
			frame.currentColumn.children.splice(-1,1,renderedRank)
		})
		//render
		super.onAllChildrenComposed()
	}

	createComposed2Parent(){
		const {context:{cols}, computed:{composed:columns}}=this
		const i=this.currentColumn.length-1
		const cells=columns.map(column=>column[i])
		const height=this.getHeight(cells)
		const width=cols.reduce((w,a)=>w+a,0)
		return (
			<Rank children={cells} cols={cols} width={width} height={height}/>
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
		const {children:cells=[],cols,height, ...props}=this.props

		return (
				<Group height={height} {...props} >
				{
					cells.map((a,i)=>{
						let props={
							x:cols.slice(0,i).reduce((w,a)=>w+a,0),
							height,
							key:i,
						}
						return  React.cloneElement(a,props)
					})
				}
				</Group>
			)
	}
}
