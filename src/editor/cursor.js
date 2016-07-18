import React, {Component, PropTypes} from "react"
import ReactDOM from "react-dom"

export default class Cursor extends Component{
	static displayName="cursor"
	state={target:null, node: null, at: 0, width:0, height:0, descent:0, style:{}}

    render(){
		const {width, height, descent, style}=this.state
		return (
			<Shape ref="shape" width={width} height={height} style={style} descent={descent}/>
		)
    }

	componentDidUpdate(prevProps, prevState){
		const {target, node, at}=this.state
		if(target && node){
			node.appendChild(ReactDOM.findDOMNode(this.refs.shape))
			node.setAttribute('class', 'cursor')
		}
	}

	insert(content){
		const {target, at}=this.state
		this.setState({node:null, at:at+content.length})
		target.splice(at,0,content)
	}

	backspace(){
		const {target, at}=this.state
		this.setState({node:null, at:at-1})
		target.splice(at-1,1)
	}
}

export class Shape extends Component{
	render(){
		let {width, height, descent, style}=this.props
		width=Math.ceil(width)
		height=Math.ceil(height)
		descent=Math.ceil(descent)
		return <line
					x1={width}
					y1={2*descent}
					x2={width}
					y2={-height+2*descent}
					strokeWidth={1}
					stroke={style.color||"black"}
					/>
	}

	componentDidUpdate(){
		let node=ReactDOM.findDOMNode(this)
		let x=-1000, y1=node.getAttribute('y1'), y2=node.getAttribute('y2')
		this.timer=setInterval(a=>{
			node.setAttribute('y1',node.getAttribute('y1')==y1 ? y2 : y1)
		}, 700)
	}

	componentWillUnmount(){
		this.timer && clearInterval(this.timer)
	}
}
