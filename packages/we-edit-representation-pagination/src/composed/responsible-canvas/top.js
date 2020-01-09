import React, {Component} from "react"
import {createPortal} from "react-dom"
import Group from "../group"

/**
 * display children to most top
 * > when x, y specified, top is at absolute position, otherwise it need get position as following
 * 1. get itself position when mounting
 * 2. create portal at the postioin
 * 
 * @TODO: what if props.x/y changed
 */
export default class Top extends Component{
	static getDerivedStateFromProps({x,y},state){
		return {x,y,...state}
	}

	constructor(){
		super(...arguments)
		this.state={}
	}

    render(){
		const {state:{x=0, y=0, svg}, props:{}}=this
		const ignoreEvent=e=>e.stopPropagation()
		const content=(
			<Group innerRef={a=>this.el=a} x={x} y={y} 
				onMouseDown={ignoreEvent}
				onMouseMove={ignoreEvent}
				onMouseUp={ignoreEvent}
				>
                {this.props.children}
            </Group>
		)

		return svg ? createPortal(content,  svg) : content
    }

	componentDidMount(){
		const {state:{x,y, useRelativePosition=x==undefined && y==undefined},el}=this
		const svg=el.viewportElement
		if(!useRelativePosition)
			return this.setState({svg})
		
		let o=el.viewportElement.createSVGPoint()
		o.x=0,o.y=0
		o=o.matrixTransform(el.getCTM())
		this.setState({svg, x:o.x, y:o.y})
	}
}
