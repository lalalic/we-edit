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

	static childContextTypes={
        onPageHide: PropTypes.func,
		onPageShow: PropTypes.func,
	}

    scale=this.props.scale
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
	
	get dispatch(){
		return this.locator.props.dispatch
	}
	
	get selection(){
		return this.locator.props.selection.toJS()
	}
	
	get cursor(){
		const {cursorAt, ...a}=this.selection
        return a[cursorAt]
	}
	
	getComposer(id){
		return this.props.getComposer(id)
	}
	
	getContent(id){
		return this.locator.getContent(id)
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
								keys={{
									37:e=>this.onKeyArrowLeft(e),//move left
									38:e=>this.onKeyArrowUp(e),//move up
									39:e=>this.onKeyArrowRight(e),//move right
									40:e=>this.onKeyArrowDown(e),//move down
								}}
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
        this.dispatch(ACTION.Cursor.ACTIVE(this.props.docId))
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
		this.dispatch(ACTION.Cursor.ACTIVE(this.props.docId))            
    }

    onRotate(e){
        this.dispatch(ACTION.Entity.ROTATE(e))
    }

    onResize(e){
        this.dispatch(ACTION.Entity.RESIZE(e))
    }

    onMove(id,at){
        this.dispatch(ACTION.Selection.MOVE(id,at))
    }

    onClick(e){
        const target=e.target

        switch(target.nodeName){
			case "image":
				this.dispatch(ACTION.Selection.SELECT(target.dataset.content))
			break
			default:{
				const locate=()=>{
					if(target.nodeName=="text"){
						let text=target.textContent
						let {endat, content:id}=target.dataset
						let [x]=offset(e, target)
                        return this.locator.locate(id,parseInt(endat),x)
						const measure=this.locator.getComposer(id).measure
						let end=measure.widthString(this.locator.toCanvasCoordinate(x), text)
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
						this.dispatch(ACTION.Cursor.AT(id,at))
					}else{
						let {end}=this.selection
						let {left,top}=this.locator.position(id,at)
						let {left:left1,top:top1}=this.locator.position(end.id,end.at)
						if(top<top1 || (top==top1 && left<=left1)){
							this.dispatch(ACTION.Selection.START_AT(id,at))
						}else{
							this.dispatch(ACTION.Selection.SELECT(end.id, end.at, id, at))
						}
					}
				}
				break
			}
        }

        this.active()
    }

    onSelect(selection){
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

        let {left:left0,top:top0}=this.locator.position(first.id, first.at)
        let {left:left1,top:top1}=this.locator.position(end.id, end.at)

        const forward=a=>{
            this.dispatch(ACTION.Selection.SELECT(first.id,first.at,end.id,end.at))
            this.dispatch(ACTION.Selection.END_AT(end.id,end.at))
        }

        const backward=a=>{
            this.dispatch(ACTION.Selection.SELECT(end.id,end.at,first.id,first.at))
            this.dispatch(ACTION.Selection.START_AT(end.id,end.at))
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
	
	locate(nextOrprev, CursorableOrSelectable, id, at){
		if(id==undefined){
			({id,at}=this.cursor)
		}
        const next=(id,at)=>{
            let composer=this.getComposer(id)
            if(composer){
                return composer[`${nextOrprev}${CursorableOrSelectable}`](at)
            }
            return false
        }


        if((at=next(id,at))===false){
            this.getContent(id)[`${nextOrprev=="next" ? "forward" : "backword"}Until`](a=>{
                    if((at=next(id=a.get("id")))!==false)
                        return true
                })
        }
        if(at!==false)
            return {id,at}
        return this.cursor
	}
	onKeyArrowUp({shiftKey}){
		const {start,end,cursorAt}=this.selection
		const cursor=this.cursor

		if(!shiftKey){
			let {id, offset,x}=this.locator.prevLine(cursor.id, cursor.at)
			let cursorable=this.locate("prev","Cursorable",id)
			cursorable.at=this.getComposer(cursorable.id).distanceAt(x,offset)
			this.dispatch(ACTION.Cursor.AT(cursorable.id,cursorable.at))

		}else{
			let {id,at}=this.locator.prevLine(cursor.id, cursor.at,true)
			if(start.id==end.id && start.at==end.at){
				this.dispatch(ACTION.Selection.START_AT(id,at))
			}else{
				if(cursorAt=="start")
					this.dispatch(ACTION.Selection.START_AT(id,at))
				else if(cursorAt=="end"){
					let {left,top}=this.locator.position(id,at)
					let {left:left0,top:top0}=this.locator.position(start.id, start.at)
					if((top0==top && left<left0) //same line, new point is on the left of start
						|| (top<top0)) //above start point line
						{
						this.dispatch(ACTION.Selection.SELECT(id,at,start.id,start.at))
						this.dispatch(ACTION.Selection.START_AT(id,at))
					}else{
						this.dispatch(ACTION.Selection.END_AT(id,at))
					}
				}
			}
		}
	}

	onKeyArrowDown({shiftKey}){
		const {start,end,cursorAt}=this.selection
		const cursor=this.cursor

		if(!shiftKey){
			let {id, offset,x}=this.locator.prevLine(cursor.id, cursor.at)
			let cursorable=this.locate("next","Cursorable",id)
			cursorable.at=this.getComposer(cursorable.id).distanceAt(x,offset)
			this.dispatch(ACTION.Cursor.AT(cursorable.id,cursorable.at))
		}else{
			let {id,at}=this.locator.nextLine(cursor.id,cursor.at, true)
			if(start.id==end.id && start.at==end.at){
				this.dispatch(ACTION.Selection.END_AT(id,at))
			}else{
				if(cursorAt=="end")
					this.dispatch(ACTION.Selection.END_AT(id,at))
				else if(cursorAt=="start"){
					let {left,top}=this.locator.position(id,at)
					let {left:left1, top:top1}=this.locator.position(end.id, end.at)
					if((top==top1 && left>left1) || (top>top1)){
						this.dispatch(ACTION.Selection.SELECT(end.id,end.at,id,at))
						this.dispatch(ACTION.Selection.END_AT(id,at))
					}else{
						this.dispatch(ACTION.Selection.START_AT(id,at))
					}
				}
			}
		}
	}

	onKeyArrowLeft({shiftKey}){
        if(shiftKey){
            const {id,at}=this.locate("prev","Selectable")
            this.dispatch(ACTION.Selection.START_AT(id,at))
        }else{
            const{id,at}=this.locate("prev","Cursorable")
            this.dispatch(ACTION.Cursor.AT(id,at))
        }
	}
	
	onKeyArrowRight({shiftKey}){
        if(shiftKey){
            const {id,at}=this.locate("next","Selectable")
            this.dispatch(ACTION.Selection.END_AT(id,at))
        }else{
            const {id,at}=this.locate("next","Cursorable")
            this.dispatch(ACTION.Cursor.AT(id,at))
        }
	}	
}
