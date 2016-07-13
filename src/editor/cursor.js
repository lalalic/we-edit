import React, {Component, PropTypes} from "react"
import ReactDOM from "react-dom"

export default class Cursor extends Component{
	static displayName="cursor"
	state={target:null, textpiece: null}
	
    render(){
		return null
    }
	
	shouldComponentUpdate(nextProps, nextState){
		const {textpiece}=this.state
		const {textpiece:nextTextpiece}=nextState
		if(textpiece!=nextTextpiece && textpiece)
			this.state.target.blur(textpiece)
		
		return false
	}
	
	replaceFocusedContent(content){
		this.state.target.insert(content)
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
		let x=-1000, show=false
		this.timer=setInterval(a=>{
			node.setAttribute('transform',`translate(${show ? 0 : x},0)`)
			show=!show
		}, 700)
	}
	
	componentWillUnmount(){
		this.timer && clearInterval(this.timer)
	}
}
