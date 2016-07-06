import React, {Component, PropTypes} from "react"
import Container from "./container"
import Group from "../composed/group"

export default class Table extends Container{
	nextAvailableSpace(required){
		let availableSpace=this.context.parent.nextAvailableSpace(required)
		return {width: this.props.width, height: availableSpace.height}
	}
	appendComposed(colGroups){
		const {width, cols}=this.props
		
		let groupsWithY=colGroups.map(lines=>{
				let y=0
				let grouped=lines.map(line=>{
						let a=<Group y={y}>{line}</Group>
						y+=line.props.height
						return a
					})
				return (<Group height={y}>{grouped}</Group>)
			})
		
		let height=groupsWithY.reduce((prev, group)=>Math.max(prev, group.props.height),0)
		let x=0
		
		let groupsWithX=groupsWithY.map((group,i)=>{
			let a=<Group x={x}>{group}</Group>
			x+=cols[i]
			return a
		})
		
		let line=<Group width={width} height={height}>{groupsWithX}</Group>
		
		this.context.parent.appendComposed(line)
	}
}
