import React, {Component, PropTypes} from "react"
import ReactDOM from "react-dom"

export default class Cursor extends Component{
	static displayName="cursor"
	state={target:null, shape: null}
	
    render(){
		return null
    }
	
	componentDidUpdate(prevProps, prevState){
		const {target, shape}=this.state
		const {target:prevTarget, shape:prevShape}=prevState
		if(target!=prevTarget && prevTarget)
			prevTarget.blur()
		
		if(shape!=prevShape && prevShape)
			prevShape.setState({show:false})
	}
	
	replaceFocusedContent(content){
		this.state.target.insert(content)
	}
}

export class Shape extends Component{
	state={show:true}
	render(){
		const {show}=this.state
		if(!show)
			return null
		
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
