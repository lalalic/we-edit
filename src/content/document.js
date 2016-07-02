import React, {Component, PropTypes} from "react"
import {HasChild} from "./any"
import Group from "../composed/group"
import Cursor from "../editor/cursor"

export default class Document extends HasChild{
	constructor(){
		super(...arguments)
		Object.assign(this.state)
		this.displayName="document"
		this.currentY=this.props.pageGap
	}

    render(){
		const {composed, state:{content}, props:{width, height}}=this
        return (
			<svg {...this.props} ref="svg" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
				{super.render()}
			</svg>
		)
    }

    static childContextTypes=Object.assign({
        canvas: PropTypes.object,
    },HasChild.childContextTypes)

    getChildContext(){
        const {width, pageGap}=this.props
		return Object.assign(super.getChildContext(),{
            canvas: {width,pageGap},
			y: this.currentY
        })
    }

	appendComposed(section,page){
		if(!page){
			this.children.push(section)
			section.y=this.currentY
			return
		}

		this.currentY+=page.height+this.props.pageGap;
		const {svg}=this.refs
		if(svg){
			svg.setAttribute('height',this.currentY)
			svg.setAttribute('viewBox',`0 0 ${this.props.width} ${this.currentY}`)
		}
	}

	getCurrentY(){
		return this.currentY
	}

	componentDidMount(){
		const {svg}=this.refs
		svg.setAttribute('height',this.currentY)
		svg.setAttribute('viewBox',`0 0 ${this.props.width} ${this.currentY}`)
	}

	_reComposeFrom(){
		//never recompose from document
	}

	on1ChildComposed(){
		if(this.state.content.length==this.children.length){
			this.onAllChildrenComposed()
		}
	}

	static defaultProps={
		width: window.innerWidth,
		height: window.innerHeight,
		pageGap: 20,
		style: {
			background:"lightgray"
		}
	}
}
