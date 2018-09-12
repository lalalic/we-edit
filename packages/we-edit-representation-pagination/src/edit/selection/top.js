import React, {Component} from "react"
import {createPortal} from "react-dom"
import PropTypes from "prop-types"


export default class Top extends Component{
	state={}
    render(){
		const {x=0, y=0, svg}=this.state
		const content=(
			<g ref="el" transform={`translate(${x} ${y})`}>
                {this.props.children}
            </g>
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
		let el=this.refs.el
		let o=el.viewportElement.createSVGPoint()
		o.x=0
		o.y=0
		o=o.matrixTransform(el.getCTM())
		this.setState({svg:el.viewportElement, x:o.x, y:o.y})
	}
}