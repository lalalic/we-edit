import React, {Component} from "react"
import PropTypes from "prop-types"

export default class Flash extends Component{
	state={color:"black"}
	componentDidMount(){
		this.timer=setInterval(()=>this.setState({color:this.state.color=="transparent" ? this.props.color : "transparent"}),500)
	}

	render(){
		const {children, toProps=color=>({stroke:color})}=this.props
		const {color}=this.state
		let props=toProps(color)
		return React.cloneElement(children,props)
	}

	componentWillUnmount(){
		clearInterval(this.timer)
	}
}
