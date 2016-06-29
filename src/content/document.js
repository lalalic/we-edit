import React, {Component, PropTypes} from "react"
import {HasChild} from "./any"
import Group from "../compose/group"
import Cursor from "../editor/cursor"

export default class Document extends HasChild{
	state={width:this.props.width, height:this.props.height, composed:[]}

    render(){
		//const {composed}=this
		const {width, height, composed}=this.state
	
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

	/**
	 *  support new, and replace by _id
	 */
	appendComposed(section){
		const {composed}=this
		let {width, height}=this.state
		
		let found=composed.findIndex(a=>a.props._id==section.props._id)
		if(found==-1){
			composed.push(section)
		}else{
			composed.splice(found,1,section)
		}
		let minWidth=composed.reduce((prev, a)=>Math.max(prev, a.props.width),0)
		let minHeight=composed.reduce((prev, a)=>prev+a.props.height,0)

		if(minWidth>width)
			width=minWidth

		if(minHeight>height)
			height=minHeight+this.props.pageGap

		this.setState({width, height, composed})
	}
	
	_removeAllFrom(section){
		//replace mode for section
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
