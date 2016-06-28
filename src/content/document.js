import React, {Component, PropTypes} from "react"
import {HasChild} from "./any"
import Group from "../compose/group"
import Cursor from "../editor/cursor"

export default class Document extends HasChild{
	state={width:this.props.width, height:this.props.height}

    render(){
		const {composed}=this
		const {width, height}=this.state
	
		let y=0
        return (
			<svg {...this.props} width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
				{this.props.children}
				<Composed>
				{
					composed.map((a,i)=>{
						let section=<Group key={i} y={y}>{a}</Group>
						y+=a.props.height
						return section
					})
				}
				</Composed>
				<Cursor/>
			</svg>
		)

    }

    static childContextTypes=Object.assign({
        canvas: PropTypes.object
    },HasChild.childContextTypes)

    getChildContext(){
        const {width,height, pageGap}=this.props
        return Object.assign(super.getChildContext(),{
            canvas: {width,height, pageGap}
        })
    }

	appendComposed(section){
		const {composed}=this
		let {width, height}=this.state
		composed.push(section)

		let minWidth=composed.reduce((prev, a)=>Math.max(prev, a.props.width),0)
		let minHeight=composed.reduce((prev, a)=>prev+a.props.height,0)

		if(minWidth>width)
			width=minWidth

		if(minHeight>height)
			height=minHeight+this.props.pageGap

		this.setState({width, height})
	}

	static defaultProps={
		width: 600,
		height:100,
		pageGap: 20,
		style: {
			background:"lightgray"
		}
	}
}

class Composed extends Group{}
