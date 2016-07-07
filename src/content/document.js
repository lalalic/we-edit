import React, {Component, PropTypes} from "react"
import {HasChild} from "./any"
import Group from "../composed/group"
import Cursor from "../editor/cursor"

export default class Document extends HasChild{
	static displayName="document"
	
	currentY=this.props.pageGap

    render(){
		const {composed, state:{content}, props:{width, height}}=this
		const {documentStyles, ...others}=this.props
        return (
			<svg {...others}
				ref="svg"
				width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
				{super.render()}
				{this.more()}
			</svg>
		)
    }

    static childContextTypes=Object.assign({
        canvas: PropTypes.object,
		getDefaultStyle: PropTypes.func
    },HasChild.childContextTypes)

    getChildContext(){
		const documentStyles=this.props.documentStyles
        const {width, pageGap}=this.props
		return Object.assign(super.getChildContext(),{
            canvas: {width,pageGap},
			getDefaultStyle(type){
				return documentStyles.getDefault(type)
			}
        })
    }

	appendComposed(section,page){
		if(!page){
			this.children.push(section)
			section.y=this.currentY
			return
		}

		this.currentY+=page.size.height+this.props.pageGap;
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

	on1ChildComposed(){
		if(this.state.content.length==this.children.length){
			this.onAllChildrenComposed()
		}
	}
	
	more(){
		return null
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
