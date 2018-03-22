import React, {Component} from "react"
import PropTypes from "prop-types"

import {connect} from "react-redux"
import {setDisplayName,compose, getContext} from "recompose"

import Base from "../composed/document"
import {Text} from ".."
import Waypoint from "react-waypoint"
import Query from "./query"

import {getContent,getSelection, getClientRect, ACTION, Cursor, Selection} from "we-edit"
import {editify} from "we-edit"
import recomposable from "./recomposable"

import SelectionShape from "./selection"

import offset from "mouse-event-offset"

export default class extends Base{
    static displayName="composed-document-with-cursor"
    static contextTypes={
        ...Base.contextTypes,
        docId: PropTypes.string,
        store: PropTypes.any,
        getCursorInput: PropTypes.func,
        query: PropTypes.func,
    }

	static childContextTypes={
        onPageHide: PropTypes.func,
		onPageShow: PropTypes.func,
	}

    scale=this.props.scale

	getChildContext(){
		return {
			onPageHide:e=>this.updateCursorAndSelection(),
            onPageShow:e=>this.updateCursorAndSelection(),
		}
	}

    render(){
        const {isAllComposed, composeMore}=this.props
        let composeMoreTrigger=null
        if(!isAllComposed()){
            composeMoreTrigger=(<ComposeMoreTrigger onEnter={composeMore} y={this.context.query().y}/>)
        }
        let {props:{children:pages, ...others}}=super.render()
        return (
            <svg {...others}
                ref={a=>this.svg=a}
                onClick={e=>{
                    if(this.eventAlreadyDone==e.timeStamp)
                        return

                    this.onClick(e)
                }}
                onMouseUp={e=>{
                    let sel=this.documentSelection()
                    if(sel.type=="Range"){
                        this.onSelect(sel)
                        this.eventAlreadyDone=e.timeStamp
                    }
                }}>
                {pages}
                <Cursor
                    ref={a=>this.cursor=a}
                    render={({top=0,left=0,height=0,color})=>(
                        <path d={`M${left} ${top} L${left} ${top+height}`}
                                style={{stroke:color, strokeWidth:1}}/>
                    )}
                    />
                <Selection
                    ref={a=>this.selection=a}
                    onMove={this.onMove.bind(this)}
                    onResize={this.onResize.bind(this)}
                    onRotate={this.onRotate.bind(this)}
                    >
                    <SelectionShape/>
                </Selection>
                {composeMoreTrigger}
            </svg>
        )
    }

    documentSelection(){
        return window.getSelection()||document.getSelection()
    }

    getComputedScale(){
		let clientRect=this.svg.getBoundingClientRect()
        let [,,canvasWidth]=this.svg.getAttribute("viewBox").split(" ")
        this.scale=clientRect.width/parseInt(canvasWidth)
    }

    componentDidUpdate(){
        this.getComputedScale()
        this.updateCursorAndSelection()
		this.emit(`emitted${this.props.isAllComposed() ? '.all' : ''}`, this.props.pages.length)
    }

    componentDidMount(){
        this.getComputedScale()
        this.context.store.dispatch(ACTION.Cursor.ACTIVE(this.context.docId))
        this.emit(`emitted${this.props.isAllComposed() ? '.all' : ''}`, this.props.pages.length)
    }

	componentWillMount(){
		this.emit(`composed${this.props.isAllComposed() ? '.all' : ''}`, this.props.pages.length)
	}

	componentWillUpdate(){
		this.emit(`composed${this.props.isAllComposed() ? '.all' : ''}`, this.props.pages.length)
	}

    updateCursorAndSelection(){
        this.cursor && this.cursor.forceUpdate()
        this.selection && this.selection.forceUpdate()
    }

    active(){
        let {docId, store}=this.context
        let {active}=getSelection(store.getState())
        if(active!=docId)
            store.dispatch(ACTION.Cursor.ACTIVE(docId))
    }

    onRotate(e){
        this.context.store.dispatch(ACTION.Entity.ROTATE(e))
    }

    onResize(e){
        this.context.store.dispatch(ACTION.Entity.RESIZE(e))
    }

    onMove(id,at){
        this.context.store.dispatch(ACTION.Selection.MOVE(id,at))
    }

    onClick(e){
        const dispatch=this.context.store.dispatch
        const docId=this.context.docId
        const $=this.context.query()
        const target=e.target

        switch(target.nodeName){
			case "image":
				dispatch(ACTION.Selection.SELECT(target.dataset.content,-1))
			break
			default:{
				const locate=()=>{
					if(target.nodeName=="text"){
						let text=target.textContent
						let {endat, content:id}=target.dataset
						let [x]=offset(e, target)

						const measure=$.getComposer(id).measure
						let end=measure.widthString($.toCanvasCoordinate(x), text)
						let at=endat-text.length+end
						return {id,at}
					}else{
						let parent=target.parentNode
						let text=parent.querySelector('text')
						while(!text){
							parent=parent.parentNode
							if(parent)
								text=parent.querySelector('text')
							else
								break
						}
						if(text){
							let {endat, content:id}=text.dataset
							return {id,at:parseInt(endat)}
						}
					}
					return {}
				}

				let {id,at}=locate()

				if(id){
					if(!e.shiftKey){
						dispatch(ACTION.Cursor.AT(id,at))
					}else{
						let {end}=getSelection(this.context.store.getState())
						let {left,top}=$.position(id,at)
						let {left:left1,top:top1}=$.position(end.id,end.at)
						if(top<top1 || (top==top1 && left<=left1)){
							dispatch(ACTION.Selection.START_AT(id,at))
						}else{
							dispatch(ACTION.Selection.SELECT(end.id, end.at, id, at))
						}
					}
				}
				break
			}
        }

        this.active()
    }

    onSelect(selection){
        const dispatch=this.context.store.dispatch
        const $=this.context.query()
        const locate=a=>{
            let node=selection[`${a}Node`].parentNode
            return {
                id:node.dataset.content,
                at:node.dataset.endat-node.textContent.length+selection[`${a}Offset`]
            }
        }

        let first=locate("anchor")
        let {left:left0,top:top0}=$.position(first.id, first.at)
        let end=locate("focus")
        let {left:left1,top:top1}=$.position(end.id, end.at)

        const forward=a=>{
            dispatch(ACTION.Selection.SELECT(first.id,first.at,end.id,end.at))
            dispatch(ACTION.Selection.END_AT(end.id,end.at))
        }

        const backward=a=>{
            dispatch(ACTION.Selection.SELECT(end.id,end.at,first.id,first.at))
            dispatch(ACTION.Selection.START_AT(end.id,end.at))
        }

        if(top0>top1){
            backward()
        }else if(top0<top1){
            forward()
        }else if(top0==top1){
            if(first.id!=end.id){
                if(left0<left1){
                    forward()
                }else{
                    backward()
                }
            }else{
                if(first.at<end.at){
                    forward()
                }else{
                    backward()
                }
            }
        }
        this.active()
    }

	static Query=Query
}

const ComposeMoreTrigger=compose(
	setDisplayName("More"),
	getContext({debug: PropTypes.bool})
)(({onEnter,y, debug})=>(
	<Waypoint onEnter={()=>onEnter(y)} >
		<g transform={`translate(0 ${y})`}>
			{debug ? <line x1="0" y1="0" x2="10000" y2="0" strokeWidth="2" stroke="red"/> : null}
		</g>
	</Waypoint>
))
