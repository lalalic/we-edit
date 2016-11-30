import React, {Component, PropTypes} from "react"
import Group from "./group"

export const Line=({children})=>{
	const height=children.reduce((h,{props:{height}})=>Math.max(h,height),0)
	const descent=children.reduce((h,{props:{descent=0}})=>Math.max(h,descent),0)
	
	return (
		<Group y={height-descent} className="line">
		{
			children.reduce((state,piece,i)=>{
				const {pieces,x}=state
				const {width,height}=piece.props
				pieces.push(
					<Group x={x} key={i}>
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
