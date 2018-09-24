import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"

import {getSelection, ACTION, Cursor, Selection} from "we-edit"
import {setDisplayName,compose, getContext} from "recompose"
import Waypoint from "react-waypoint"
import offset from "mouse-event-offset"

import {Document as ComposedDocument,  Group} from "../composed"
import Query from "./query"
import SelectionShape from "./selection"


export default class Responsible extends Component{
    static displayName="composed-document-with-cursor"
    static contextTypes={
        docId: PropTypes.string,
        activeDocStore: PropTypes.any,
        getCursorInput: PropTypes.func,
        query: PropTypes.func,
		events: PropTypes.shape({emit:PropTypes.func.isRequired}),
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
        const {isAllComposed, composeMore, children, innerRef=a=>a, ...props}=this.props
        return (
            <ComposedDocument {...props}
				ref={a=>{innerRef(a);this.clientDocument=a}}
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
					<Cursor
						ref={a=>this.cursor=a}
						render={({y=0,x=0,height=0,color})=>(
							<path d={`M${x} ${y} L${x} ${y+height}`}
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

					{!isAllComposed()&&(
                        <ComposeMoreTrigger
                            y={ComposedDocument.composedY(this.props.pages, this.props.pgGap)}
                            onEnter={composeMore}
                            />)
                    }
				</Fragment>
            </ComposedDocument>
        )
    }

    documentSelection(){
        return window.getSelection()||document.getSelection()
    }

    componentDidUpdate(){
        this.updateCursorAndSelection()
		this.emit(`emitted${this.props.isAllComposed() ? '.all' : ''}`, this.props.pages.length)
    }

    componentDidMount(){
        this.context.activeDocStore.dispatch(ACTION.Cursor.ACTIVE(this.context.docId))
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
        const docId=this.context.docId
        const $=this.context.query()
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
        const $=this.context.query()
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

	emit(){
		try{
			if(this.context.events)
				this.context.events.emit(...arguments)
		}catch(e){
			console.error(e)
		}
	}
}

const ComposeMoreTrigger=compose(
	setDisplayName("More"),
	getContext({debug: PropTypes.bool})
)(({onEnter,y, debug})=>(
	<Waypoint onEnter={()=>onEnter(y)} >
		<Group y={y}>
			{debug ? <line x1="0" y1="0" x2="10000" y2="0" strokeWidth="2" stroke="red"/> : null}
		</Group>
	</Waypoint>
))
