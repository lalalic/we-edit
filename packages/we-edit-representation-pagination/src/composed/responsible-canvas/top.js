import React, {Component} from "react"
import {createPortal} from "react-dom"
import Group from "../group"


export default class Top extends Component{
	static getDerivedStateFromProps({x,y}){
		const a={}
		typeof(x)!="undefined" && (a.x=x);
		typeof(y)!="undefined" && (a.y=y);
		return a
	}

	state={}
    render(){
		const {x=0, y=0, svg}=this.state
		const content=(
			<Group innerRef={a=>this.el=a} x={x} y={y}>
                {this.props.children}
            </Group>
		)

		return svg ? createPortal(content,  svg) : content
    }

	componentDidMount(){
		const el=this.el
		const state={svg:el.viewportElement, x:0, y:0}
		if(this.props.x!==0 || this.props.y!==0){
			let o=el.viewportElement.createSVGPoint()
			o.x=0
			o.y=0
			o=o.matrixTransform(el.getCTM())
			state.x=o.x
			state.y=o.y
		}
		this.setState(state)
	}
}
