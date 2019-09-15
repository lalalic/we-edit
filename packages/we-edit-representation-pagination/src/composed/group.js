import React, {Component, Children, Fragment} from "react"
import PropTypes from "prop-types"

export default class Group extends Component{
	static contextTypes={
		debug: PropTypes.bool
	}

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
			background,
			margin,minWidth, width, height, index, childIndex,geometry,
			contentWidth,wrap,pagination,anchor,currentY,named,descent,replaceable, spaceHeight,composedAt,
			className,
			...others}=this.props
		const props={}

		if(innerRef){
			props.ref=innerRef
		}

		if(className=="page"){//type define,  such as line, <line><content.../></line>, so query can be more simplier
			props.className=className
		}

		let transform=""

		if(x||y){
			transform=`translate(${parseInt(x||0)} ${parseInt(y||0)})`
		}

		if(rotate){
			transform=`${transform} rotate(${rotate})`
		}

		if(transform.length>0){
			props.transform=transform
		}

		const content=(
			<Fragment>
				{background&&background!="transparent"&& (<rect width={width} height={height} fill={background} key="background"/>)}
				{Children.toArray(children).map((a,i)=>{
					return React.cloneElement(a,{key:i})
				})}
			</Fragment>
		)

		if(this.context.debug){
			return (
				<g {...others} {...props}>
					{content}
				</g>
			)
		}

		if(Object.keys(props).length){
			return (
				<g {...props}>
					{content}
				</g>
			)
		}

		return content
    }
}
