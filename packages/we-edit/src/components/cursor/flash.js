import React, {Component} from "react"
import PropTypes from "prop-types"

export default class Flash extends Component{
	state={color:"black"}
	componentDidMount(){
		this.timer=setInterval(()=>this.setState({color:this.state.color=="transparent" ? "black" : "transparent"}),500)
	}

	render(){
		const {children,active=true}=this.props
		let props={...this.state}
		if(!active){
			props.color="lightgray"
		}
		return React.cloneElement(children,props)
	}

	componentWillUnmount(){
		clearInterval(this.timer)
	}
}
