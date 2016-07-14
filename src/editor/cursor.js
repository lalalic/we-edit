import React, {Component, PropTypes} from "react"
import ReactDOM from "react-dom"

export default class Cursor extends Component{
	static displayName="cursor"
	state={target:null, node: null, at: 0, width:0, height:0, style:{}}

    render(){
		const {width, height, style}=this.state
		return (
			<Shape ref="shape" width={width} height={height} style={style}/>
		)
    }

	componentDidUpdate(prevProps, prevState){
		const {target, node, at}=this.state
		if(target && node){
			node.appendChild(ReactDOM.findDOMNode(this.refs.shape))
			node.setAttribute('class', 'cursor')
		}
	}

	replaceFocusedContent(content){
		const {target, at}=this.state
		this.setState({node:null, at:at+content.length})
		target.splice(at,0,content)
	}
}

export class Shape extends Component{
	render(){
		const {width, height, style}=this.props
		return <line
					x1={width}
					y1={0}
					x2={width}
					y2={-height}
					strokeWidth={1}
					stroke={style.color||"black"}
					/>
	}

	componentDidMount(){
		let node=ReactDOM.findDOMNode(this)
		let x=-1000, next=0
		this.timer=setInterval(a=>{
			node.setAttribute('y1',next)
			next=next ? 0: node.getAttribute('y2')
		}, 700)
	}

	componentWillUnmount(){
		this.timer && clearInterval(this.timer)
	}
}
