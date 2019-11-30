import React, {Component} from "react"
import {createPortal} from "react-dom"
import {Group} from "../../../composed"


export default class Top extends Component{
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

	static getDerivedStateFromProps({x,y},state){
		let a={}
		typeof(x)!="undefined" && (a.x=x);
		typeof(y)!="undefined" && (a.y=y);
		return a
	}

	componentDidMount(){
		let el=this.el
		let state={svg:el.viewportElement, x:0, y:0}
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
