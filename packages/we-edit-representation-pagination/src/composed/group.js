import React, {Component, PureComponent, Children, Fragment} from "react"
import PropTypes from "prop-types"
import Text from "./text"
import Layer from "./layer"

export default class Group extends PureComponent{
	static propTypes={
		width: PropTypes.number,
		height: PropTypes.number,
		x:PropTypes.number,
		y:PropTypes.number,
		z:PropTypes.number,
	}

	static contextTypes={
		debug: PropTypes.bool,
		media: PropTypes.string,
	}

	static Layer=Layer
	static Layers=Layer.Container

    render(){
		let {
			innerRef, //for waypoint
			x=0,y=0,
			children,
			background,
			style,
			transform="",
			margin,minWidth, width, height, index, childIndex,geometry,baseline,lineDescent,isLastRankOfRow,isFirstRowInPage,atom,pgNumType,hasPage,hasNumpages,
			contentWidth,wrap,pagination,anchor,blockOffset,named,descent,tokenizeOpportunity, mergeOpportunity, spaceHeight,editable,dispatch,tabWidth,
			"data-nocontent":noContent,"data-numberingTab":_1,
			//className,id,
			_inspector,
			I,
			...others}=this.props
		if(this.context.media=="file" && noContent){
			return null
		}
			
		const props=Object.keys(others).reduce((o,k)=>{
			if(k.startsWith("on")){
				o[k]=others[k]
			}
			return o
		},{style})

		if(innerRef){
			props.ref=innerRef
		}

		if(x||y){
			transform=`${transform} translate(${parseInt(x||0)} ${parseInt(y||0)})`
		}

		if(transform.length>0){
			props.transform=transform
		}

		const content=[
			background&&background!="transparent"&& (<rect width={width} height={height} fill={background} key="background"/>),
			...Children.toArray(typeof(children)=="function" ? children() : children)
		].filter(a=>a)

		if(this.context.debug){
			return (
				<g {...others} {...props}>
					{content}
				</g>
			)
		}

		const keys=Object.keys(props)
		if(keys.length==0){
			return <Fragment>{content}</Fragment>
		}else if(content.length==1 && keys.length==1 && keys[0]=="transform" && !rotate){
			const {props:{x:x1=0,y:y1=0},type}=content[0]	
			switch(type){
				case Text:
				case this.constructor:
					return React.cloneElement(content[0],{x:x1+x,y:y1+y})
			}
		}

		return (
			<g {...props}>
				{content}
			</g>
		)
    }
}
