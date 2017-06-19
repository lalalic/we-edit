import React, {PureComponent as Component, PropTypes} from "react"

export default class Group extends Component{
	static propTypes={
		width: PropTypes.number,
		height: PropTypes.number
	}
    render(){
		let {x,y, width, height, index, children=[], childIndex, type,...others}=this.props
		if(x||y)
			others.transform=`translate(${x||0} ${y||0})`

	 	if(Object.keys(others).length>0 || children.length>1)
			return <g {...others} children={children}/>
		else if(React.isValidElement(children)){
			return children
		}else if(children.length==1){
			return children[0]
		}else
			return null
    }
}
