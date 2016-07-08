import React, {Component, PropTypes} from "react"
import ReactDOM from "react-dom"

export default class Cursor extends Component{
	static displayName="cursor"
	state={shape:null, target:null}
	
	componentDidMount(){
		let node=ReactDOM.findDOMNode(this)
		let x=-1000, show=false
		this.timer=setInterval(a=>{
			node.setAttribute('transform',`translate(${show ? 0 : x},0)`)
			show=!show
		}, this.props.interval)
	}
	
	componentDidUpdate(){
		const {target}=this.state
		target.blur()
	}
	
	componentWillUnmount(){
		this.timer && clearInterval(this.timer)
	}
	
    render(){
		return <g>{this.state.shape}</g>
    }
	
	static defaultProps={
		interval:700
	}
	
	replaceFocusedContent(content){
		const {target, loc}=this.state
		target.insert(loc, content)
	}
}
