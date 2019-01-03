import React,{PureComponent as Component} from "react"
import PropTypes from "prop-types"
import {models, ReactQuery} from "we-edit"

import {Group} from "./composed"
import Frame from "./frame"

import {HasParentAndChild} from "./composable"
const Super=HasParentAndChild(models.Row)

export default class extends Super{
	cellId(cell){
		if(cell){
			return new ReactQuery(cell)
				.findFirst(`[data-type="cell"]`)
				.attr("data-content")
		}
	}
	appendComposed(cell){
		if(!this.currentColumn[0] || this.cellId(this.currentColumn[0])==this.cellId(cell)){
			this.currentColumn.push(cell)
		}else{
			this.computed.composed.push([cell])
		}
		return this.context.parent.appendComposed(this.createComposed2Parent())
	}

	get currentColumn(){
		if(this.computed.composed.length==0)
			this.computed.composed.push([])
		return this.computed.composed[this.computed.composed.length-1]
	}

	nextAvailableSpace(required){
		var height
		const {cols}=this.context
		if(this.props.keepLines){
			height=Number.MAX_SAFE_INTEGER
		}else if(!this.currentColumn[0]){
			height=super.nextAvailableSpace(...arguments).height
		}else if(this.cellId(this.currentColumn[0])==required.id){
			const columnWithMorePage=this.computed.composed.find(column=>column.length>this.currentColumn.length)
			if(!columnWithMorePage){
				height=super.nextAvailableSpace(...arguments).height
			}else{
				height=new ReactQuery(columnWithMorePage[this.currentColumn.length])
					.findFirst("[spaceHeight]")
					.attr("spaceHeight")
			}
		}else{//next column
			height=new ReactQuery(this.currentColumn[0])
				.findFirst("[spaceHeight]")
				.attr("spaceHeight")
		}
		return {width:cols[this.computed.composed.length%cols.length], height}
	}

	onAllChildrenComposed(){
		var unappendedCount=this.computed
			.composed.reduce((max,column)=>Math.max(max,column.length),0)
			-this.currentColumn.length
		if(unappendedCount>0){
			new Array(unappendedCount).fill(1).forEach(()=>{
				this.currentColumn.push(null)
				this.context.parent.appendComposed(this.createComposed2Parent())
			})
			this.currentColumn.splice(-unappendedCount)
		}
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
			<Group height={height} width={width}>
			{
				unappendedCells.map((a,i)=>{
					let props={
						x:cols.slice(0,i).reduce((w,a)=>w+a,0),
						height,key:i,
					}
					if(a){
						return React.cloneElement(a,props)
					}else{
						return React.cloneElement(columns[i][0],Object.assign(props,{children:null}))	
					} 
				})
			}
			</Group>
		)
	}
}
