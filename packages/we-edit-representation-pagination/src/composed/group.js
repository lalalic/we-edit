import React, {Component, Children, Fragment} from "react"
import PropTypes from "prop-types"

export default class Group extends Component{
	static contextTypes={
		debug: PropTypes.bool,
		offset: PropTypes.shape({
			x:PropTypes.number,
			y:PropTypes.number,
		}),
		record: PropTypes.func,
	}

	static childContextTypes={
		offset: PropTypes.shape({
			x:PropTypes.number,
			y:PropTypes.number,
		})
	}

	static propTypes={
		width: PropTypes.number,
		height: PropTypes.number,
		x:PropTypes.number,
		y:PropTypes.number,
	}

	getChildContext(){
		const {props:{x:dx=0,y:dy=0},context:{offset:{x=0,y=0}={}}}=this
		return {
			offset:{
				x:x+dx,
				y:y+dy,
			}
		}
	}

	record(){
		var {props:{className,"data-content":id,"data-endat":endat,children:text="","data-type":type,height,width},context:{record}}=this
		if((id||className&&(id=className).startsWith("page")) && record){
			const info=this.getChildContext().offset
			Object.assign(info,{id,type,width,height})
			if(endat!==undefined){
				Object.assign(info,{text,endat,startat:endat-text.length})
			}
			record(info)
		}
	}

    render(){
		this.record()
		let {
			innerRef, //for waypoint
			rotate,
			x=0,y=0,
			children,
			background,
			margin,minWidth, width, height, index, childIndex,geometry,baseline,
			contentWidth,wrap,pagination,anchor,blockOffset,named,descent,replaceable, spaceHeight,
			className,
			I,
			...others}=this.props
		const props={}

		if(innerRef){
			props.ref=innerRef
		}

		if(className && className.startsWith("page")){//type define,  such as line, <line><content.../></line>, so query can be more simplier
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
