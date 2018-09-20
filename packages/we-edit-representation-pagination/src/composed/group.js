import React, {Component, Children} from "react"
import PropTypes from "prop-types"
import {shallowEqual} from "we-edit"

export default class Group extends Component{
	static propTypes={
		width: PropTypes.number,
		height: PropTypes.number
	}
    render(){
		let {x,y, width, height, index, children=[],
			childIndex, type, contentWidth,rotate,
			innerRef, //for waypoint
			...others}=this.props

		let transforms=[]
		if(x||y)
			transforms.push(`translate(${x||0} ${y||0})`)
		if(rotate)
			transforms.push(`rotate(${rotate})`)

		if(transforms.length)
			others.transform=transforms.join(" ")

		if(Object.keys(others).length>0 || children.length>1){
			let now=Date.now()
			children=Children.toArray(children).map((a,i)=>{
				if(typeof(a.key)=="undefined")
					return React.cloneElement(a,{key:`${now}.${i}`})
				return a
			})
			return <g {...others} ref={innerRef} children={children}/>
		}else if(React.isValidElement(children)){
			return children
		}else if(children.length==1){
			return children[0]
		}else
			return <g  ref={innerRef}/>
    }
}
