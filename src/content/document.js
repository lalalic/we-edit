import React, {Component, PropTypes} from "react"
import {HasChild} from "./any"
import Group from "../compose/group"

export default class Document extends HasChild{
	state={composed:[], width:this.props.width, height:this.props.height}
    render(){
		const {composed, width, height}=this.state
		const {children, ...others}=this.props
		let y=0
        return (
			<svg {...others} width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
				{
					React.Children.map(children, (section, i)=>{
						let {height}=composed[i]||{}
						let a=(<Group key={i} y={y}>{section}</Group>)
						y+=height
						return a
					})
				}
			</svg>
		)
			
    }

    getChildContext(){
        const {width,height, pageGap}=this.props
        return Object.assign(super.getChildContext(),{
            canvas: {width,height, pageGap}
        })
    }

    static childContextTypes=Object.assign({
        canvas: PropTypes.object
    },HasChild.childContextTypes)
	
	appendComposed(size){
		let {composed, width, height}=this.state
		composed.push(size)
		
		let minWidth=composed.reduce((prev, a)=>Math.max(prev, a.width),0)
		let minHeight=composed.reduce((prev, a)=>prev+a.height,0)
		
		if(minWidth>width)
			width=minWidth
		
		if(minHeight>height)
			height=minHeight+this.props.pageGap
		
		this.setState({composed, width, height})
	}
	
	static defaultProps={
		width: 600,
		height:800,
		pageGap: 20,
		style: {
			background:"lightgray"
		}
	}
}
