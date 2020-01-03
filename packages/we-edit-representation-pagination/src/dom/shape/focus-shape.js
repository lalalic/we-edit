import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"
import {connect,getSelectionStyle,ACTION} from "we-edit"

import Movable from "../../composed/responsible-canvas/movable"
import Resizable from "../../composed/responsible-canvas/resizable"
import Rotatable from "../../composed/responsible-canvas/rotatable"


export default connect(state=>{
	const selectionStyle=getSelectionStyle(state)
	if(!selectionStyle)
		return {}
	return {selectionStyle,cursor:selectionStyle.position.id,}
})(class FocusShape extends Component{
	static propTypes={
		path: PropTypes.string,
		geometry: PropTypes.object,
		resizeSpots: PropTypes.arrayOf(PropTypes.object),
		rotate: PropTypes.shape({
			r:PropTypes.number,
			x:PropTypes.number.isRequired,
			y:PropTypes.number.isRequired
		}),
		id:PropTypes.string,
		absolute:PropTypes.bool,
	}

	static contextTypes={
		editable:PropTypes.any
	}

	static getDerivedStateFromProps({id,selectionStyle,$1}){
		if(!selectionStyle)
			return {}
		const getComposer=a=>selectionStyle.positioning.getComposer(a)
		const cursor=selectionStyle.position.id
		const target=getComposer(id)
		return {
			show:!!getComposer(cursor).closest(a=>a.props.id==id),
			type:target.getComposeType(),
			isAnchor: target.closest(a=>(a!=target && (a.isFrame||a.isSection))||a.getComposeType()=="anchor").getComposeType()=="anchor"
		}
	}
	constructor(){
		super(...arguments)
		this.state={}
	}

	shouldComponentUpdate({selectionStyle}){
		return this.props.selectionStyle!=selectionStyle
	}

	render(){
		const {width, height, id,rotate,path,geometry,resizeSpots, dispatch, children,focusableContent=true,
			movable=true, resizable=true, rotatable=true}=this.props
		const {show,type,isAnchor}=this.state
		const {editable}=this.context

		if(!editable || !show)
			return children
		
		return (
			<Fragment>
				{movable ? (
					<Fragment>
						{!focusableContent && children}
						<Movable showMovingPlaceholder={!isAnchor} onMove={e=>dispatch(ACTION.Selection.MOVE({...e, id,type}))}>
							<path d={path} fill="white" fillOpacity={0.01} cursor="move"/>
						</Movable>
						{focusableContent && children}
					</Fragment>
				) : children}
				
				{rotatable && (
					<Rotatable {...rotate} geometry={geometry} 
						onRotate={(({degree})=>dispatch(ACTION.Entity.UPDATE({id,type,rotate:degree})))}/>
				)}
				
				
				{resizable && (
					<Resizable spots={resizeSpots} 
						onResize={({x,y})=>{
							let size=null
							if(y===undefined){
								size={width:width+x}
							}else if(x===undefined){
								size={height:height+y}
							}else{
								let scale=1+Math.max(Math.abs(x)/width,Math.abs(y)/height)*x/Math.abs(x)
								size={width:width*scale, height:height*scale}
							}
							dispatch(ACTION.Entity.UPDATE({id,type,size}))
						}}/>
				)}
			</Fragment>
		)
	}
})

