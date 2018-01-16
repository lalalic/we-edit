import React, {Component} from "react"
import PropTypes from "prop-types"

export default class Cursor extends Component{
	state={top:0,left:0,height:0,strokeWidth:0,color:"black",bold:false,italic:false}
	componentDidMount(){
		this.timer=setInterval(()=>this.setState({strokeWidth:(this.state.strokeWidth+1)%2}),500)
	}
	
	render(){
		const {top=0,left=0,height=0.1,strokeWidth,color}=this.state
		return <path d={`M${left} ${top} L${left} ${top+height}`} style={{stroke:color, strokeWidth}}/>
	}
	
	componentWillUnmount(){
		clearInterval(this.timer)
	}
}
