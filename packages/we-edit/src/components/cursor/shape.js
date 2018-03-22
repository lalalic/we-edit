import React, {Component} from "react"
import PropTypes from "prop-types"

export default class Cursor extends Component{
	state={top:0,left:0,height:0,color:"black",bold:false,italic:false}
	componentDidMount(){
		this.timer=setInterval(()=>this.setState({color:this.state.color=="transparent" ? "black" : "transparent"}),500)
	}
	
	render(){
		const {children}=this.props
		return children ? React.cloneElement(React.Children.only(children),this.state) : null
	}
	
	componentWillUnmount(){
		clearInterval(this.timer)
	}
}
