import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"

import {getSelection, ACTION, Cursor, Selection} from "we-edit"
import offset from "mouse-event-offset"

import {Document as ComposedDocument} from "../composed"
import SelectionShape from "./selection"
import Locator from "./locator"

const CursorShape=({y=0,x=0,height=0,color})=>(
    <path d={`M${x} ${y} v${height}`} stroke={color} strokeWidth={1}/>
)

export default class Responsible extends Component{
    static displayName="composed-document-with-cursor"
    static contextTypes={
        docId: PropTypes.string,
        activeDocStore: PropTypes.any,
    }

	static childContextTypes={
        onPageHide: PropTypes.func,
		onPageShow: PropTypes.func,
	}

    scale=this.props.scale
    onKeyUp=this.onKeyUp.bind(this)
    onKeyDown=this.onKeyDown.bind(this)
    onMove=this.onMove.bind(this)
    onResize=this.onResize.bind(this)
    onRotate=this.onRotate.bind(this)

	getChildContext(){
		return {
			onPageHide:e=>this.updateCursorAndSelection(),
            onPageShow:e=>this.updateCursorAndSelection(),
		}
	}

    get locator(){
        return this.refs.locator.getWrappedInstance()
    }

    updateCursorAndSelection(){
        //this.locator.setState({})
    }

    render(){
        const {children, contentHash,docId, getComposer,...props}=this.props
        return (
            <ComposedDocument {...props}
				innerRef={a=>{this.canvas=a}}
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
				<Fragment>
                    {children}

					<Locator
                        docId={docId}
                        scale={this.props.scale}
                        ref="locator"
                        cursor={
                            <Cursor
                                onKeyUp={this.onKeyUp}
                                onKeyDown={this.onKeyDown}
                                children={<CursorShape/>}
        						/>
                        }
                        range={
                            <Selection
        						onMove={this.onMove}
        						onResize={this.onResize}
        						onRotate={this.onRotate}
        						>
        						<SelectionShape/>
        					</Selection>
                        }
                        getComposer={getComposer}/>
				</Fragment>
            </ComposedDocument>
        )
    }

    getBoundingClientRect(){
        return this.canvas.getBoundingClientRect()
    }

    documentSelection(){
        return window.getSelection()||document.getSelection()
    }

    componentDidUpdate(){
        this.locator.setState({content:this.props.contentHash, canvas:this.canvas})
        //this.emit(`emitted${this.props.isAllComposed() ? '.all' : ''}`, this.props.pages.length)
    }

    componentDidMount(){
        this.context.activeDocStore.dispatch(ACTION.Cursor.ACTIVE(this.props.docId))
        this.locator.setState({content:this.props.contentHash, canvas:this.canvas})
        //this.emit(`emitted${this.props.isAllComposed() ? '.all' : ''}`, this.props.pages.length)
    }

	componentWillMount(){
		//this.emit(`composed${this.props.isAllComposed() ? '.all' : ''}`, this.props.pages.length)
	}

	componentWillUpdate(){
		//this.emit(`composed${this.props.isAllComposed() ? '.all' : ''}`, this.props.pages.length)
	}

    active(){
        let {docId, activeDocStore}=this.context
        let {active}=getSelection(activeDocStore.getState())
        if(active!=docId)
            activeDocStore.dispatch(ACTION.Cursor.ACTIVE(docId))
    }

    onRotate(e){
        this.context.activeDocStore.dispatch(ACTION.Entity.ROTATE(e))
    }

    onResize(e){
        this.context.activeDocStore.dispatch(ACTION.Entity.RESIZE(e))
    }

    onMove(id,at){
        this.context.activeDocStore.dispatch(ACTION.Selection.MOVE(id,at))
    }

    onClick(e){
        const dispatch=this.context.activeDocStore.dispatch
        const docId=this.props.docId
        const $=this.locator
        const target=e.target

        switch(target.nodeName){
			case "image":
				dispatch(ACTION.Selection.SELECT(target.dataset.content))
			break
			default:{
				const locate=()=>{
					if(target.nodeName=="text"){
						let text=target.textContent
						let {endat, content:id}=target.dataset
						let [x]=offset(e, target)
                        return $.locate(id,parseInt(endat),x)
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
						let {end}=getSelection(this.context.activeDocStore.getState())
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
        const dispatch=this.context.activeDocStore.dispatch
        const $=this.locator
        const locate=a=>{
            let node=selection[`${a}Node`].parentNode
            if(!node.dataset.content)
                return null
            return {
                id:node.dataset.content,
                at:node.dataset.endat-node.textContent.length+selection[`${a}Offset`]
            }
        }

        let first=locate("anchor")
        if(!first)
            return

        let end=locate("focus")
        if(!end)
            return

        let {left:left0,top:top0}=$.position(first.id, first.at)
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

	onKeyUp(shiftKey){
		const {activeDocStore}=this.context
		const dispatch=activeDocStore.dispatch
		const state=activeDocStore.getState()
		const selection=getSelection(state)
		const {start,end,cursorAt}=selection
		const cursor=selection[cursorAt]
		const $=this.locator


		if(!shiftKey){
			let {id,at}=$.prevLine(cursor.id, cursor.at)
			dispatch(ACTION.Cursor.AT(id,at))

		}else{
			let {id,at}=$.prevLine(cursor.id, cursor.at,true)
			if(start.id==end.id && start.at==end.at){
				dispatch(ACTION.Selection.START_AT(id,at))
			}else{
				if(cursorAt=="start")
					dispatch(ACTION.Selection.START_AT(id,at))
				else if(cursorAt=="end"){
					let {left,top}=$.position(id,at)
					let {left:left0,top:top0}=$.position(start.id, start.at)
					if((top0==top && left<left0) //same line, new point is on the left of start
						|| (top<top0)) //above start point line
						{
						dispatch(ACTION.Selection.SELECT(id,at,start.id,start.at))
						dispatch(ACTION.Selection.START_AT(id,at))
					}else{
						dispatch(ACTION.Selection.END_AT(id,at))
					}
				}
			}
		}
	}

	onKeyDown(shiftKey){
		const {activeDocStore,query}=this.context
		const dispatch=activeDocStore.dispatch
		const state=activeDocStore.getState()
		const selection=getSelection(state)
		const {start,end,cursorAt}=selection
		const cursor=selection[cursorAt]
		const $=this.locator

		if(!shiftKey){
			let {id,at}=$.nextLine(cursor.id,cursor.at)
			dispatch(ACTION.Cursor.AT(id,at))
		}else{
			let {id,at}=$.nextLine(cursor.id,cursor.at, true)
			if(start.id==end.id && start.at==end.at){
				dispatch(ACTION.Selection.END_AT(id,at))
			}else{
				if(cursorAt=="end")
					dispatch(ACTION.Selection.END_AT(id,at))
				else if(cursorAt=="start"){
					let {left,top}=$.position(id,at)
					let {left:left1, top:top1}=$.position(end.id, end.at)
					if((top==top1 && left>left1) || (top>top1)){
						dispatch(ACTION.Selection.SELECT(end.id,end.at,id,at))
						dispatch(ACTION.Selection.END_AT(id,at))
					}else{
						dispatch(ACTION.Selection.START_AT(id,at))
					}
				}
			}
		}
	}
}
