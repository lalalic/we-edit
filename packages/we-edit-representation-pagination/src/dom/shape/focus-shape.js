import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"
import {whenSelectionChange,ACTION} from "we-edit"

import Group from "../../composed/group"
import Movable from "../../composed/responsible-canvas/movable"
import Resizable from "../../composed/responsible-canvas/resizable"
import Rotatable from "../../composed/responsible-canvas/rotatable"


export default whenSelectionChange()(class FocusShape extends Component{
	static propTypes={
		width: PropTypes.number,
		height: PropTypes.number,
		path: PropTypes.string,
		resizable: PropTypes.arrayOf(PropTypes.object),
		rotatable: PropTypes.shape({
			x:PropTypes.number.isRequired,
			y:PropTypes.number.isRequired,
			r:PropTypes.number,
			degree: PropTypes.number,
		}),
		movable: PropTypes.bool,
		id:PropTypes.string,
		absolute:PropTypes.bool,
	}

	static contextTypes={
		editable:PropTypes.any
	}

	static getDerivedStateFromProps({id,selection}){
		if(!selection)
			return {}
		const getComposer=a=>selection.positioning.getComposer(a)
		const cursor=selection.position.id
		const target=getComposer(id)
		const isCursorGrand=!!getComposer(cursor).closest(a=>a.props.id==id)
		const isAnchor=target.closest(a=>(a!=target && (a.isFrame||a.isSection))||a.getComposeType()=="anchor").getComposeType()=="anchor"
		return {show:isCursorGrand,type:target.getComposeType(),isAnchor}
	}
	constructor(){
		super(...arguments)
		this.state={}

	}

	shouldComponentUpdate({selection}){
		return this.props.selection!=selection
	}

	render(){
		if(!this.props.selection)
			return this.props.children

		const {width, height, id, rotate, dispatch, children,selection,positioning=selection.positioning,
			path=`M0 0 h${width} v${height} h${-width} Z`,
			resizable=[//default for rect[width,height]
				{x:0,y:0,resize:"nwse"},
				{x:width/2,y:0,resize:"ns",},
				{x:width,y:0,resize:"nesw"},
				{x:width,y:height/2,resize:"ew"},
				{x:width,y:height,resize:"-nwse"},
				{x:width/2,y:height,resize:"-ns"},
				{x:0,y:height,resize:"-nesw"},
				{x:0,y:height/2,resize:"-ew"},
			],
			rotatable={//default for rect, and {x,y} is center
				x:width/2,
				y:height/2,
				degree: parseInt(rotate),
			},
			focusableContent=true,movable=true,}=this.props
		const {show,type,isAnchor}=this.state
		const {editable}=this.context

		if(!editable || !show)
			return children
		
		return (
			<Fragment>
				{movable ? (
					<Fragment>
						{!focusableContent && children}
						<Group {...{"data-nocontent":true}}>
							<Movable showMovingPlaceholder={!isAnchor} onMove={e=>dispatch(ACTION.Selection.MOVE({...e, id,type}))}>
								<path d={path} fill="white" fillOpacity={0.01} cursor="move"/>
							</Movable>
						</Group>
						{focusableContent && children}
					</Fragment>
				) : children}

				<Group {...{"data-nocontent":true}}>
					{rotatable && (<Rotatable {...rotatable}
							onRotate={({clientX:left,clientY:top})=>{
								const xy=positioning.asCanvasPoint({left,top})
								const pos=positioning.position(id,0)
								const center={x:rotatable.x+pos.x,y:rotatable.y+pos.y}
								const degree=parseInt(Math.atan2(xy.x-center.x,-xy.y+center.y)*180/Math.PI)

								dispatch(ACTION.Entity.UPDATE({id,type,rotate:degree<0 ? degree+360 : degree}))
							}
						}/>
					)}
					
					
					{resizable && (<Resizable spots={resizable}
							onResize={({x,y})=>{
								let size=null
								if(y===undefined){
									size={width:width+x}
								}else if(x===undefined){
									size={height:height+y}
								}else{
									const scale=1+Math.max(Math.abs(x)/width,Math.abs(y)/height)*x/Math.abs(x)
									size={width:width*scale, height:height*scale}
								}
								dispatch(ACTION.Entity.UPDATE({id,type,size}))
							}}/>
					)}
				</Group>
			</Fragment>
		)
	}
})

