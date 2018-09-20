import React, {Component, Children, Fragment} from "react"
import PropTypes from "prop-types"
import {shallowEqual} from "we-edit"
import memoize from "memoize-one"

export default class Group extends Component{
	static propTypes={
		width: PropTypes.number,
		height: PropTypes.number
	}
	static contextTypes={
		offset: PropTypes.shape({
			x:PropTypes.number,
			y:PropTypes.number,
		})
	}
	static childContextTypes={
		offset: PropTypes.shape({
			x:PropTypes.number,
			y:PropTypes.number,
		})
	}
	get offset(){
		return this.getXY(this.context.offset, this.props.x, this.props.y)
	}
	getXY=memoize((offset={x:0,y:0},x=0,y=0)=>({x:x+offset.x,y:y+offset.y}))

	getChildContext(){
		return {
			offset:this.offset
		}
	}
    render(){
		let offset=this.offset

		let {x,y, width, height, index, children=[],
			childIndex, type, contentWidth,rotate,
			innerRef, //for waypoint
			className,
			...others}=this.props

		if(rotate){
			return (
				<Group {...this.pros} rotate={null}>
					<g transform={`rotate(${rotate})`}>
						{children}
					</g>
				</Group>
			)
		}

		if(x||y)
			others.transform=`translate(${x||0} ${y||0})`

		children=Children.toArray(children)

			.filter(a=>a!==false && a!==null)
			.map(a=>{
				switch(a.type){
					case this.constructor:{
						return React.cloneElement(a,{x:(a.props.x||0+offset.x), y:(a.props.y||0+offset.y)})
					}
					break
					case Fragment:

					default:
						return a
				}
			})
		if(Object.keys(others).length>0 || children.length>1){
			let now=Date.now()
			children=children.map((a,i)=>{
				if(typeof(a.key)=="undefined")
					return React.cloneElement(a,{key:`${now}.${i}`})
				return a
			})
			return <g {...others} ref={innerRef} children={children}/>
		}else if(children.length==1){
			return children[0]
		}else
			return <g  ref={innerRef}/>
    }
}
