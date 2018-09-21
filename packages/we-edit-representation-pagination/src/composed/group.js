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
		let {
			innerRef, //for waypoint
			rotate,
			x,y, 
			children=[],
			width, height, index, childIndex, contentWidth, className,
			//["data-content"]:id,
			//["data-type"]:type,
			...others}=this.props
		
		if(innerRef){
			return (
				<g ref={innerRef}>
					<Group {...this.props} innerRef={undefined}/>
				</g>
			)	
		}
		
		if(rotate){
			return (
				<g transform={`rotate(${rotate})`}>
					<Group {...this.props} rotate={undefined}/>
				</g>
			)
		}
		
		if(x||y){
			return (
				<g transform={`translate(${parseInt(x||0)} ${parseInt(y||0)})`}>
					<Group {...this.props} x={undefined} y={undefined}/>
				</g>
			)
		}
		
		children=this.flat(children)
		
		if(children.length==0)
			return null
		
		if(others["data-content"]!==undefined){
			if(width!==undefined){
				others["data-width"]=width
			}
			if(height!==undefined){
				others["data-height"]=height
			}
		}
		
		const withoutProps=a=>Object.keys(a).length==0
		if(withoutProps(others)){
			return (
				<Fragment>
					{children}
				</Fragment>
			)
		}
			
		return (
			<g {...others}>
				{children}
			</g>
		)
    }
	
	flat(children){
		return Children.toArray(children)
			.filter(a=>a!==false && a!==null)
			.reduce((all,a)=>{
				if(a.type==Fragment){
					all.splice(all.length,0,...Children.toArray(a.props.children))
				}else{
					all.push(a)
				}
				return all
			},[])
			.filter(a=>a!==false && a!==null)
	}
}
