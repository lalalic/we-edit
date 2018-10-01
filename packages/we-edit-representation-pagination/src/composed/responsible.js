import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"

import {getSelection, ACTION, Cursor, Selection,connect} from "we-edit"
import offset from "mouse-event-offset"

import {Document as ComposedDocument} from "../composed"
import SelectionShape from "./selection"
import Locator from "./locator"

const CursorShape=({y=0,x=0,height=0,color="black"})=>(
    <Cursor.Flash color={color}><path d={`M${x} ${y} v${height}`} strokeWidth={1}/></Cursor.Flash>
)

export default connect(null,null,null,{withRef:true})(class Responsible extends Component{
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
        if(this.refs.locator)
        return this.refs.locator.getWrappedInstance()
    }

	get dispatch(){
		return this.props.dispatch
	}

	get selection(){
        if(this.refs.locator)
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
        const {children, contentHash,docId, getComposer,dispatch,...props}=this.props
        return (
            <ComposedDocument {...props}
				innerRef={a=>{this.canvas=a}}
                onClick={e=>{
                    if(this.selected){
                        this.selected=false
                    }else{
                        this.onClick(e)
                    }
                }}
				onMouseMove={({buttons, target, clientX:left})=>{
					if(!(buttons&0x1))
						return
                    const {id,x,node}=this.locator.around(target, left)
                    if(id){
                        const at=this.getComposer(id).distanceAt(x, node)
                        const end={id,at}
                        let {start=end}=this.refs.selecting.state

                        const rects=start==end ? [] : this.locator.getRangeRects(start, end)
                        this.refs.selecting.setState(({start})=>({start:start||end, end, rects}))
                    }
				}}
                onMouseUp={e=>{
					const {start,end}=this.refs.selecting.state
                    if(start && end){
                        this.refs.selecting.setState({start:undefined, end:undefined, rects:undefined})
                        this.dispatch(ACTION.Selection.SELECT(start.id,start.at,end.id,end.at))
                        this.selected=true
                    }
				}}
				>
				<Fragment>
                    {children}
						{/*
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
								>

								<CursorShape
									onMove={this.onMove}
									onResize={this.onResize}
									onRotate={this.onRotate}
									/>

							</Cursor>
                        }
                        range={
                            <Selection onMove={this.onMove}>
        						<SelectionShape ref="selecting"
									asCanvasPoint={a=>this.locator.asCanvasPoint(a)}
									/>
        					</Selection>
                        }
                        getComposer={getComposer}/>
					*/}
				</Fragment>
            </ComposedDocument>
        )
    }

    notify(){
        this.locator.setState({content:null,canvas:null})
    }

    componentDidUpdate(){
        this.locator && this.locator.setState({content:this.props.contentHash, canvas:this.canvas})
        //this.emit(`emitted${this.props.isAllComposed() ? '.all' : ''}`, this.props.pages.length)
    }

    componentDidMount(){
        this.dispatch(ACTION.Cursor.ACTIVE(this.props.docId))
        this.locator && this.locator.setState({content:this.props.contentHash, canvas:this.canvas})
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

    onClick({shiftKey:selecting, target, clientX:left}){
		const {id,x,node}=this.locator.around(target, left)
		if(id){
			const at=this.getComposer(id).distanceAt(x, node)
			if(!selecting){
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

        this.active()
    }

    onSelect(selection){
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

	locate(nextOrprev, CursorableOrSelectable, id, at, inclusive=false){
		if(id==undefined){
			({id,at}=this.cursor)
		}
		let path=[]
        const next=(id,at)=>{
			path.push(id)
            let composer=this.getComposer(id)
            if(composer){
                return composer[`${nextOrprev}${CursorableOrSelectable}`](at)
            }
            return false
        }

		const $=this.getContent(id)
		if(inclusive){
			$[`find${nextOrprev=="next" ? "First" :"Last"}`](a=>{
				if((at=next(id=a.get("id")))!==false)
					return true
			},true)
		}else{
			at=next(id,at)
		}

		if(at===false){
			$[`${nextOrprev=="next" ? "forward" : "backward"}Until`](a=>{
				if((at=next(id=a.get("id")))!==false)
					return true
			})
		}
		console.log(path.join(","))
        if(at!==false)
            return {id,at}
        return this.cursor
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

	locateLine(nextOrPrev, cursorableOrSelectable){
		const cursor=this.cursor
		let {id, x, node}=this.locator[`${nextOrPrev}Line`](cursor.id, cursor.at)
		let location=this.locate(nextOrPrev,cursorableOrSelectable,id,undefined,true)//inclusive
		if(id!==location.id){
			if(nextOrPrev=="next"){
				node=this.locator.getClientRect(location.id).node
			}else{
				node=this.locator.getClientRects(location.id).pop().node
			}
		}
		location.at=this.getComposer(location.id).distanceAt(x,node)
		return location
	}

	onKeyArrowUp({shiftKey:selecting}){
		const {id, at}=this.locateLine("prev", selecting ? "Selectable" : "Cursorable")
		if(!selecting){
			this.dispatch(ACTION.Cursor.AT(id,at))
		}else{
			const {start,end,cursorAt}=this.selection

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

	onKeyArrowDown({shiftKey:selecting}){
		const {id, at}=this.locateLine("next", selecting ? "Selectable" : "Cursorable")
		if(!selecting){
			this.dispatch(ACTION.Cursor.AT(id,at))
		}else{
			const {start,end,cursorAt}=this.selection
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
})
