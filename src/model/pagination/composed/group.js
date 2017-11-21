import React, {PureComponent as Component, Children} from "react"
import PropTypes from "prop-types"


export default class Group extends Component{
	static propTypes={
		width: PropTypes.number,
		height: PropTypes.number
	}
    render(){
		let {x,y, width, height, index, children=[], childIndex, type, contentWidth, ...others}=this.props
		if(x||y)
			others.transform=`translate(${x||0} ${y||0})`

	 	if(Object.keys(others).length>0 || children.length>1){
			children=Children.toArray(children).map((a,i)=>{
				if(typeof(a.key)=="undefined")
					return React.cloneElement(a,{key:i})
				return a
			})
			return <g {...others} children={children}/>
		}else if(React.isValidElement(children)){
			return children
		}else if(children.length==1){
			return children[0]
		}else
			return null
    }
}
