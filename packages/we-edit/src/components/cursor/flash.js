import React, {Component} from "react"

export default class Flash extends Component{
	state={}
	componentDidMount(){
		this.timer=setInterval(()=>{
			if(document.activeElement!==this.props.input.current)
				this.setState({visibility:"unset"})
			else
				this.setState({visibility:this.state.visibility ? undefined : "hidden"})
		},500)
	}

	render(){
		const {props:{children}, state:{visibility}}=this
		return React.cloneElement(children,{style:{...(children.props.style||{}),visibility}})
	}

	componentWillUnmount(){
		clearInterval(this.timer)
	}
}
