import React, {Component, PropTypes} from "react"
import {HasChild} from "./any"
import Group from "../composed/group"
import Cursor from "../editor/cursor"

export default class Document extends HasChild{
	state={width:this.props.width, height:this.props.height}
	displayName="document"
    render(){
		const {composed}=this
		const {width, height}=this.state

		let y=0
        return (
			<svg {...this.props} width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
				{this.props.children}
				<Composed ref="composed">
				{
					composed.map((a,i)=>{
						let section=<Group ref={a.props._id} key={a.props._id} y={y}>{a}</Group>
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
		const {_id}=section.props

		let found=composed.findIndex(a=>a.props._id==_id)
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

		console.log(`${width}, ${height}`)
		this.setState({width, height})

		if(this.refs[section._id])
			this.refs[section._id].setState({composedTime:new Date().toString()})
	}

	_reComposeFrom(){
		//never recompose from document
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
