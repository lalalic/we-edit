import React, {Component} from "react"
import PropTypes from "prop-types"
import {whenSelectionChange,ACTION} from "we-edit"
import {compose, shouldUpdate} from "recompose"

import Shape from "../shape"
import Group from "../group"
import Movable from "./movable"
import Resizable from "./resizable"
import Rotatable from "./rotatable"
import Path from "../../tool/path"

const IgnoreEvents=Group.Layer.IgnoreEvents
const isSelfOrGrand=t=>!!t.selection?.getComposer(t.selection?.position.id)?.closest(p=>p.props.id==t.id)
		
export default compose(
	whenSelectionChange(),
	shouldUpdate((a,b)=>{
		const targetChanged=a.selection?.position.id!=b.selection?.position.id
		const shapeRecomposed=a.composedUUID!=b.composedUUID
		const isAGrand=isSelfOrGrand(a), isBGrand=isSelfOrGrand(b)
		const should=(shapeRecomposed || targetChanged)&&(isAGrand||isBGrand)
		console.debug(`focus shape[id=${a.id}] should update: ${should}`)
		return should
	})
)(class Focusable extends Component{
	static propTypes={
		path: PropTypes.string.isRequired,
		resizable: PropTypes.bool,
		rotatable: PropTypes.bool,
		movable: PropTypes.bool,
		id:PropTypes.string,
	}

	static contextTypes={
		editable:PropTypes.any,
		precision: PropTypes.number,
	}

	static getDerivedStateFromProps({id,selection}){
		if(!selection)
			return {status:"unactive"}
		const getComposer=a=>selection.positioning.getComposer(a)
		const cursor=selection.position.id
		const target=getComposer(id)
		if(!target){
			return {status:"unactive"}
		}
		//all grand focus shape of cursor/selection should show itself
		const focus=!!getComposer(cursor)?.closest(a=>a.props.id==id)
		
		const editing=(isParagraph=>{
				const grand=getComposer(cursor)?.closest(a=>isParagraph(a)||a.props.id==id)
				return grand && isParagraph(grand) && grand.closest(a=>a.props.id==id)
			})(a=>a.getComposeType()=="paragraph")
		return {
			type:target.getComposeType(),
			status: editing ? "editing" : (focus ? "focus" : "unactive" ),
			isAnchor:target.closest(a=>(a!=target && (a.isFrame||a.isSection))||a.getComposeType()=="anchor").getComposeType()=="anchor",
		}
	}
	constructor(){
		super(...arguments)
		this.state={}
	}

	getRotatable(transform){
		if(typeof(transform)=="string"){
			const [degree=0,x=0,y=0]=/rotate\s*\((.*?)\)/gi.exec(transform||"")?.[1].split(/[\s,]/).map(parseFloat)||[]
			return {x,y,degree}
		}
		return transform.center()
	}

	getResizable(geometry,width,height){
		return [//default for rect[width,height]
			{x:0,y:0,direction:"nwse"},
			{x:width/2,y:0,direction:"ns",},
			{x:width,y:0,direction:"nesw"},
			{x:width,y:height/2,direction:"ew"},
			{x:width,y:height,direction:"-nwse"},
			{x:width/2,y:height,direction:"-ns"},
			{x:0,y:height,direction:"-nesw"},
			{x:0,y:height/2,direction:"-ew"},
			...this.getEditableSpots(geometry).map(a=>({style:{fill:"yellow"},...a})),
		] 
	}

	render(){
		const {
			props:{
				path,children, 
				transform,dispatch,id,
				outline, fill,

				geometry=new Path(path),
				size:{width,height}=geometry.size(),
				resizable=this.getResizable(geometry,width,height),
				rotatable=this.getRotatable(transform||geometry),
				movable=true,
			},
			context:{editable,precision=1},
			state:{status, type, isAnchor},
			select=e=>{
				e.stopPropagation()
				dispatch(ACTION.Selection.SELECT(id,0,id,1))
			},
		}=this
		
		return (
			<Group transform={status!=="editing" ? transform : undefined}>
				{[
					status!=="unactive" && <path key="FocusIndicator" d={path} fill="none" stroke="lightgray"/>,
					<Shape {...{...outline, d:path, fill, id, key:"outline"}}/>,
					children,
					editable && <Group {...{"data-nocontent":true, key:"actors"}}>
						{[
							status=="unactive" && <path {...{key:"selector",d:path,fill:"transparent",...IgnoreEvents, onClick:select}}/>,
							status=="focus" && movable && <Movable isAnchor={isAnchor} key="movable"
								onMove={e=>dispatch(ACTION.Selection.MOVE({...e, id,type}))}
								
								children={<path d={path} fill="white" fillOpacity={0.01} cursor="move" onContextMenu={e=>e.focusable=id}/>}
							/>,

							status=="focus" && rotatable && <Rotatable {...rotatable} key="rotatable"
								onRotate={({degree})=>{
									dispatch(ACTION.Entity.UPDATE({id,type,rotate:degree<0 ? degree+360 : degree}))
								}}
							/>,

							status=="focus" && resizable && <Resizable spots={resizable} key="resizable"
								onResize={({x,y,control})=>{
									let size=null
									if(y===undefined){
										size={width:width/precision+x}
									}else if(x===undefined){
										size={height:height/precision+y}
									}else{
										const scale=1+Math.max(Math.abs(x*precision)/width,Math.abs(y*precision)/height)*x/Math.abs(x)
										size={width:width*scale/precision, height:height*scale/precision}
									}
									dispatch(ACTION.Entity.UPDATE({id,type,size,control}))
								}}
							/>,
						]}
					</Group>,
				]}
			</Group>
		)
	}

	getEditableSpots(geometry){
		const {editableSpots=[]}=this.props
		if(typeof(editableSpots)!=="function")
			return editableSpots
		
		return editableSpots(geometry)
	}
})