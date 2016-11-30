import React, {Component, PropTypes} from "react"
import Group from "./group"

/*
export default class Line extends Group{
	render(){
		const {height, descent}=this.props
		return <Group y={height-descent} {...this.props}/>
	}
}
*/

export const Line=({children})=>{
	const width=children.reduce((w,{props:{width}})=>w+width,0)
	const height=children.reduce((h,{props:{height}})=>Math.max(h,height),0)
	const descent=children.reduce((h,{props:{descent=0}})=>Math.max(h,descent),0)
	
	return (
		<Group y={height-descent}>
		{
			children.reduce((state,piece,i)=>{
				const {pieces,x}=state
				const {width,height}=piece.props
				pieces.push(
					<Group x={x}>
						{piece}
					</Group>
				);
				state.x=x+width
				return state
			},{pieces:[],x:0}).pieces
		}
		</Group>
	)
}

export default Line
