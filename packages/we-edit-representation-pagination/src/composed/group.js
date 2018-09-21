import React, {Component, Children, Fragment} from "react"
import PropTypes from "prop-types"
import {shallowEqual} from "we-edit"
import memoize from "memoize-one"

export default class Group extends Component{
	static propTypes={
		width: PropTypes.number,
		height: PropTypes.number
	}
	
    render(){
		let {
			innerRef, //for waypoint
			rotate,
			x=0,y=0, 
			children,
			width, height, index, childIndex, contentWidth, className,
			...others}=this.props
		
		let firstLevelProps={}
		
		if(innerRef){
			firstLevelProps.ref=innerRef
		}
		
		if(rotate){
			firstLevelProps.transform=`rotate(${rotate})`
		}
		
		if(x||y){
			firstLevelProps.transform=`${firstLevelProps.transform||""} translate(${parseInt(x||0)} ${parseInt(y||0)})`
		}
		
		const hasFirstLevelProps=!!Object.keys(firstLevelProps).length
		
		children=this.flat(children)
		
		if(children.length==0){
			if(firstLevelProps.ref){
				return <g ref={innerRef}/>
			}
			return null
		}
		
		if(others["data-content"]!==undefined){
			if(width!==undefined){
				others["data-width"]=width
			}
			if(height!==undefined){
				others["data-height"]=height
			}
		}
		
		const withoutProps=a=>Object.keys(a).length==0
		if(withoutProps(others) && !hasFirstLevelProps){
			return (
				<Fragment>
					{children}
				</Fragment>
			)
		}
			
		return (
			<g {...others} {...firstLevelProps}>
				{children}
			</g>
		)
    }
	
	flat=memoize((children)=>{
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
	})
	
	deepSimplify(){
		/*
		let offset=null
		if((offset=this.singleChildAndOnlyXY(children))){
			x+=offset.x
			y+=offset.y
			if(rotate){
				firstLevelProps.transform=`rotate(${rotate})`
			}
			
			if(x||y){
				firstLevelProps.transform=`${firstLevelProps.transform||""} translate(${parseInt(x||0)} ${parseInt(y||0)})`
			}
			
			children=offset.children
		}	
		*/		
	}
	
	singleChildAndOnlyXY(children,x=0,y=0){
		if(children.length!==1)
			return 
		let child=children[0]
		if(child.type!=this.constructor)
			return 
		
		const {x:x0=0,y:y0=0}=child.props
		let keys=Object.keys(child.props)
		const onlyXY=!"innerRef,rotate,data-content,data-type".split(",").find(k=>keys.includes(k)) && (x0||y0)
			
		if(onlyXY){
			children=this.flat(child.props.children)
			x+=x0
			y+=y0
			
			let deeper=this.singleChildAndOnlyXY(children, x, y)
			return deeper || {children, x, y}
		}
	}
}
