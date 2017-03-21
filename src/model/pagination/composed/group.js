import React, {PureComponent as Component, PropTypes} from "react"

export default class Group extends Component{
	static propTypes={
		width: PropTypes.number,
		height: PropTypes.number
	}
    render(){
		let len=Object.keys(this.props).length
		if(len==0)
			return null
		else if(len==1 && React.Children.count(this.props.children)==1){
			return React.Children.only(React.Children.toArray(this.props.children)[0])
		}
		
		let {x,y, width, height, index, ...others}=this.props
		if(x||y)
			others.transform=`translate(${x||0} ${y||0})`
		return <g x={x} y={y} {...others}/>
    }
}
