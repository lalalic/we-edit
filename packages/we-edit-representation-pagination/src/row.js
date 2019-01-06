import React,{PureComponent as Component} from "react"
import PropTypes from "prop-types"
import {models, ReactQuery} from "we-edit"

import {Group} from "./composed"
import Frame from "./frame"

import {HasParentAndChild} from "./composable"
const Super=HasParentAndChild(models.Row)

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
		const lastRanks=this.ranks
		if(!this.currentColumn[0]){
			this.currentColumn.push(cell)
		}else if(this.cellId(this.currentColumn[0])==this.cellId(cell)){
			this.currentColumn.push(cell)
		}else{
			this.computed.composed.push([cell])
		}
		
		const lastLine=this.currentSpace.frame.lastLine
		const cells=new ReactQuery(lastLine).findFirst(`[data-content=${this.props.id}]`).attr("cells")
		if(cells){
			cells[this.computed.composed.length-1]=cell
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
		var height
		const {cols}=this.context
		if(this.props.keepLines){
			height=Number.MAX_SAFE_INTEGER
		}else if(!this.currentColumn[0]){
			const space=super.nextAvailableSpace(...arguments)
			this.computed.spaces.push(space)
			height=space.height
		}else if(this.cellId(this.currentColumn[0])==required.id){
			if(this.ranks<this.currentColumn.length+1){
				this.context.parent.appendComposed(this.createComposed2Parent())
				const space=super.nextAvailableSpace(...arguments)
				this.computed.spaces.push(space)
				height=space.height
			}else{
				height=this.computed.spaces[this.currentColumn.length]
			}
		}else{//next column
			height=this.computed.spaces[0]
		}
		return {width:cols[this.computed.composed.length%cols.length], height}
	}

	onAllChildrenComposed(){
		const unappendedCount=this.ranks-this.currentColumn.length

		if(unappendedCount>0 || this.ranks==1){
			for(let i=unappendedCount;i>0;i--){
				this.currentColumn.push(null)
			}
			this.context.parent.appendComposed(this.createComposed2Parent())
			this.currentColumn.splice(-unappendedCount)
		}
		
		const len=this.context.cols.length
		
		this.computed.spaces.forEach(({frame},i)=>{
			const lastLine=frame.lastLine
			const cells=new ReactQuery(lastLine).findFirst(`[data-content=${this.props.id}]`).attr("cells")
			if(cells){
				cells.splice(cells.length,0,...new Array(len-cells.length).fill(null))
				cells.forEach((a,j)=>{
					if(!cells[j]){
						cells[j]=React.cloneElement(this.computed.composed[j][0],{height:0,frame:undefined})
					}
				})
			}
		})
		super.onAllChildrenComposed()
	}
	createComposed2Parent(){
		const {context:{cols}, computed:{composed:columns}}=this
		const i=this.currentColumn.length-1
		const unappendedCells=columns.map(column=>column[i])

		const height=this.props.height!=undefined ?
				this.props.height :
				Math.max(...unappendedCells.filter(a=>!!a).map(a=>a.props.height))
		const width=cols.reduce((w,a)=>w+a,0)
		return (
			<Rank cells={unappendedCells} cols={cols} width={width} height={this.currentSpace.height} space={this.currentSpace}/>
		)
	}
}

class Rank extends Component{
	render(){
		const {space,width, cells=[],cols}=this.props
		const height=Math.max(...cells
				.map(a=>{
					const cell=new ReactQuery(a).findFirst('[data-type="cell"]')
					const frame=cell.attr("frame")
					return a.props.nonContentHeight+ (frame ? frame.currentY : 0)
				})
			)
		
		return (
				<Group height={height} width={width}>
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