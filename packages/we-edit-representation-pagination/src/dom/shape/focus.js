import React, {Component} from "react"
import PropTypes from "prop-types"
import {whenSelectionChange,ACTION} from "we-edit"
import {compose, shouldUpdate} from "recompose"

import Group from "../../composed/group"
import Movable from "../../composed/responsible-canvas/movable"
import Resizable from "../../composed/responsible-canvas/resizable"
import Rotatable from "../../composed/responsible-canvas/rotatable"
import Path from "../../tool/path"


export default compose(
	whenSelectionChange(),
	shouldUpdate((a,b)=>{
		const targetChanged=a.selection?.position.id!=b.selection?.position.id
		const isSelfOrGrand=t=>!!t.selection?.getComposer(t.selection?.position.id)?.closest(p=>p.props.id==t.id)
		const shapeRecomposed=a.composedUUID!=b.composedUUID
		const isAGrand=isSelfOrGrand(a)
		const isBGrand=isSelfOrGrand(b)
		const should=(shapeRecomposed || targetChanged)&&(isAGrand||isBGrand)
		console.debug(`focus shape[id=${a.id}] should update: ${should}`)
		return should
	})
)(class FocusShape extends Component{
	static propTypes={
		width: PropTypes.number,
		height: PropTypes.number,
		resizable: PropTypes.arrayOf(PropTypes.object),
		rotatable: PropTypes.shape({
			x:PropTypes.number.isRequired,
			y:PropTypes.number.isRequired,
			degree: PropTypes.number,
			center:PropTypes.shape({
				x:PropTypes.number.isRequired,
				y:PropTypes.number.isRequired,
			}),
		}),
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

	render(){
		const {
			props:{
				path, selection, children:content, 
				transform,dispatch,id, placeholded,

				positioning=selection.positioning,
				geometry=new Path(path),
				center=geometry.center(),
				size:{width,height}=geometry.size(),
				resizable=[//default for rect[width,height]
					{x:0,y:0,direction:"nwse"},
					{x:width/2,y:0,direction:"ns",},
					{x:width,y:0,direction:"nesw"},
					{x:width,y:height/2,direction:"ew"},
					{x:width,y:height,direction:"-nwse"},
					{x:width/2,y:height,direction:"-ns"},
					{x:0,y:height,direction:"-nesw"},
					{x:0,y:height/2,direction:"-ew"},
				],
				rotatable={...center,center,degree:parseInt(/rotate\((\d+)/gi.exec(transform||"")?.[1])||0},
				movable=true,
				focusableContent=true,
			},
			context:{editable,precision=1},
			state:{status, type, isAnchor},
			selectShape=e=>{
				e.stopPropagation()
				dispatch(ACTION.Selection.SELECT(id,0,id,1))
			},
		}=this
		
		return (
			<Group transform={status!=="editing" ? transform : undefined}>
				{content}
				{editable && <Group {...{"data-nocontent":true}}>
					{status!=="unactive" && <path d={path} fill="none" stroke="lightgray"/>}
					{status=="unactive" && <path {...{d:path,fill:"transparent",...ignoreEvents, onClick:selectShape}}/>}
					
					{status=="focus" && movable && <Movable isAnchor={isAnchor}
						onMove={e=>dispatch(ACTION.Selection.MOVE({...e, id,type}))}
						children={<path d={path} fill="white" fillOpacity={0.01} cursor="move"/>}
					/>}

					{status=="focus" && rotatable && <Rotatable {...rotatable}
						onRotate={({clientX:left,clientY:top})=>{
							const center=rotatable.center
							const xy=positioning.asCanvasPoint({left,top})
							const pos=positioning.position({id,at:0})
							const degree=Math.floor(Math.atan2(xy.x-center.x-pos.x,-(xy.y-center.y-pos.y))*180*100/Math.PI)/100
							dispatch(ACTION.Entity.UPDATE({id,type,rotate:degree<0 ? degree+360 : degree}))
						}}
					/>}

					{status=="focus" && resizable && <Resizable spots={resizable}
						onResize={({x,y})=>{
							let size=null
							if(y===undefined){
								size={width:width/precision+x}
							}else if(x===undefined){
								size={height:height/precision+y}
							}else{
								const scale=1+Math.max(Math.abs(x*precision)/width,Math.abs(y*precision)/height)*x/Math.abs(x)
								size={width:width*scale/precision, height:height*scale/precision}
							}
							dispatch(ACTION.Entity.UPDATE({id,type,size}))
						}}
					/>}
				</Group>}
			</Group>
		)
	}
})

const Ignore=e=>{
	e.stopPropagation()
	e.preventDefault()
	return false
}
const ignoreEvents="onClick,onMouseDown,onMouseMove,onMouseUp,onContextMenu".split(",").reduce((o,k)=>(o[k]=Ignore,o),{})


