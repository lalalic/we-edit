import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"
import {whenSelectionChange,ACTION, ReactQuery} from "we-edit"
import {compose, shouldUpdate} from "recompose"

import Group from "../../composed/group"
import Movable from "../../composed/responsible-canvas/movable"
import Resizable from "../../composed/responsible-canvas/resizable"
import Rotatable from "../../composed/responsible-canvas/rotatable"


export default compose(
	whenSelectionChange(),
	shouldUpdate((a,b)=>{
		const targetChanged=a.selection?.position.id!=b.selection?.position.id
		const isSelfOrGrand=t=>!!t.selection?.getComposer(t.selection?.position.id)?.closest(p=>p.props.id==t.id)
		const shapeRecomposed=a.composedUUID!=b.composedUUID
		const isAGrand=isSelfOrGrand(a)
		const isBGrand=isSelfOrGrand(b)
		return (shapeRecomposed || targetChanged)&&(isAGrand||isBGrand)
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
			return {}
		const getComposer=a=>selection.positioning.getComposer(a)
		const cursor=selection.position.id
		const target=getComposer(id)
		return {
			type:target.getComposeType(),
			
			//all grand focus shape of cursor/selection should show itself
			showFocus:!!getComposer(cursor)?.closest(a=>a.props.id==id),
			
			//
			isAnchor:target.closest(a=>(a!=target && (a.isFrame||a.isSection))||a.getComposeType()=="anchor").getComposeType()=="anchor",
			
			//should not transform if cursor/selection is in editable cursor, such as any inline content
			isEditableCursor: (isParagraph=>{
					const grand=getComposer(cursor)?.closest(a=>isParagraph(a)||a.props.id==id)
					return grand && isParagraph(grand)
				})(a=>a.getComposeType()=="paragraph"),
		}
	}
	constructor(){
		super(...arguments)
		this.state={}
	}

	render(){
		const {props:{selection, children:outline, rotate, scale, translate,dispatch,id, placeholded},context:{editable,precision=1},state:{showFocus}}=this
		const {width,height}=this.props

		const selectShape=e=>{
			e.stopPropagation()
			dispatch(ACTION.Selection.SELECT(id,0,id,1))
		}
		if(!selection || !editable || !showFocus){
			return (
				<Group {...{rotate, scale, ...translate}}>
					{outline}
					{editable && <rect {...{width,height,fill:"transparent",onClick:selectShape}}/>}
				</Group>
			)
		}

		const $outline=new ReactQuery(outline)
		const content=$outline.findFirst(".content").get(0)

		const {
			positioning=selection.positioning,
			path=`M0 0h${width}v${height}h${-width}z`,
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
			rotatable:{
				center,
				...rotatable
			},
			focusableContent=true,movable=true}=this.props
		const {type,isAnchor,isEditableCursor}=this.state
		const editableContent=(
			<Fragment>
				<Group {...{"data-nocontent":true,"data-width":width,"data-height":height}}>
					<path d={path} fill="none" stroke="lightgray"/>
				</Group>
				{movable ? (
					<Fragment>
						{!focusableContent && !placeholded && content}
						<Group {...{"data-nocontent":true}}>
							<Movable isAnchor={isAnchor}
								onMove={e=>dispatch(ACTION.Selection.MOVE({...e, id,type}))}>
								<path d={path} fill="white" fillOpacity={0.01} cursor="move"/>
							</Movable>
						</Group>
						{focusableContent && !placeholded && content}
					</Fragment>
				) : !placeholded && content}

				{(rotatable || resizable) &&<Group {...{"data-nocontent":true}}>
					{rotatable && (<Rotatable {...rotatable}
							onRotatorMouseDown={selectShape}
							onRotate={({clientX:left,clientY:top})=>{
								const xy=positioning.asCanvasPoint({left,top})
								const pos=positioning.position({id,at:0})
								const degree=Math.floor(Math.atan2(xy.x-center.x-pos.x,-(xy.y-center.y-pos.y))*180*100/Math.PI)/100
								dispatch(ACTION.Entity.UPDATE({id,type,rotate:degree<0 ? degree+360 : degree}))
							}
						}/>
					)}
					
					
					{resizable && (<Resizable spots={resizable}
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
							}}/>
					)}
				</Group>}
			</Fragment>
		)

		const outlinedEditableContent=$outline.replace(content, editableContent).get(0)

		if(isEditableCursor){
			return outlinedEditableContent
		}

		return (
			<Group {...{scale, rotate, ...translate}}>
				{outlinedEditableContent}
			</Group>
		)
	}
})

