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
			width, height, index, childIndex, contentWidth,
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

		return (
			<g {...others}>
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
			.reduce((state,a)=>{
				let current=a.props["data-content"]
				if(current){
					if(current==state.last){
						state.group[state.group.length-1].push(a)
					}else{
						state.last=current
						state.group.push([a])
					}
				}else{
					state.last=null
					state.group.push(a)
				}
				return state
			},{last:null,group:[]})
			.group
			.reduce((group,a)=>{
				if(Array.isArray(a)){
					if(a.length==1){
						group.push(a[0])
					}else{
						const {"data-content":id, "data-type":type}=a[0].props
						group.push(
							<Group {...{"data-content":id, "data-type":type}} >
								{a.map((b,i)=>React.cloneElement(b,{"data-content":undefined, "data-type":undefined,key:i}))}
							</Group>
						)
					}
				}else{
					group.push(a)
				}
				return group
			},[])
	})
}
