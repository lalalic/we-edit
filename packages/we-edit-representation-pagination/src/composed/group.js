import React, {Component, Children, Fragment} from "react"
import PropTypes from "prop-types"
import {shallowEqual} from "we-edit"
import memoize from "memoize-one"

export default class Group extends Component{
	static propTypes={
		width: PropTypes.number,
		height: PropTypes.number,
		x:PropTypes.number,
		y:PropTypes.number,
	}
    render(){
		let {
			innerRef, //for waypoint
			rotate,
			x=0,y=0,
			children,
			margin,minWidth, width, height, index, childIndex, contentWidth,wrap,
			className,
			...others}=this.props


		if(innerRef){
			others.ref=innerRef
		}

		if(className){//type define,  such as line, <line><content.../></line>, so query can be more simplier
			others.className=className
		}

		let transform=""

		if(x||y){
			transform=`translate(${parseInt(x||0)} ${parseInt(y||0)})`
		}

		if(rotate){
			transform=`${transform} rotate(${rotate})`
		}

		if(transform.length>0){
			others.transform=transform
		}

		return (
			<g {...others}>
				{Children.toArray(children).map((a,i)=>{
					return React.cloneElement(a,{key:i})
				})}
			</g>
		)
    }
}
