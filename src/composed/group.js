import React, {Component, PropTypes} from "react"

export default class Group extends Component{
	state={composedTime:new Date().toString()}
    render(){
		let len=Object.keys(this.props).length
		if(len==0)
			return null
		else if(len==1 && React.Children.count(this.props.children)==1){
			return React.Children.only(React.Children.toArray(this.props.children)[0])
		}
		
		let {x,y, width, height, ...others}=this.props
		if(x||y)
			others.transform=`translate(${x||0} ${y||0})`
		return <g  x={x} y={y} {...others}/>
    }
}
