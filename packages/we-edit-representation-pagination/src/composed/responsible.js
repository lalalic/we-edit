import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"

import {setDisplayName,compose, getContext} from "recompose"
import Waypoint from "react-waypoint"

import {getSelection, ACTION, Cursor, Selection,connect,ContentQuery} from "we-edit"
import offset from "mouse-event-offset"

import {Document as ComposedDocument,Group} from "../composed"
import SelectionShape from "./selection"
import Locator from "./locator"
import Positioning from "./positioning"

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
    selecting=React.createRef()
    positioning=new Positioning()
    getComposer=this.getComposer.bind(this)
    getContent=this.getContent.bind(this)

	getChildContext(){
		return {
			onPageHide:e=>e,
            onPageShow:e=>e,
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
        if(this.locator)
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
        return ContentQuery.fromContent(this.props.content,  id ? `#${id}`  : undefined)
	}

	getComposeTrigger(){
		const {continueCompose:{isAllComposed, isSelectionComposed, compose4Selection, compose4Scroll,composedY}, pages, pgGap}=this.props
		const notifyLocator=callback=>{
			if(this.locator){
				this.locator.setState({content:null,canvas:null},callback)
			}else{
				callback()
			}
		}

		return <ComposeMoreTrigger
					y={()=>composedY()}
					isSelectionComposed={isSelectionComposed}
					compose4Selection={a=>{
						if(!isAllComposed()){
							notifyLocator(compose4Selection)
						}
					}}
					compose4Scroll={y=>{
						if(!isAllComposed()){
							notifyLocator(()=>compose4Scroll(y))
						}
					}}
					/>
	}

    render(){
        const {children,docId, continueCompose, getComposer,dispatch, ...props}=this.props
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
				onMouseMove={e=>{
                    const {buttons, target, clientX:left,clientY:top}=e
					if(!(buttons&0x1))
						return
                    const {id,at}=this.positioning.around(left,top)
                    if(id){
                        const end={id,at}
                        let {start=end}=this.selecting.current.state

                        const rects=start==end ? [] : this.positioning.getRangeRects(start, end)
                        this.selecting.current.setState(({start})=>({start:start||end, end, rects, selecting:true}))
                    }
				}}
                onMouseUp={e=>{
                    const {start,end}=this.selecting.current.state
                    if(start && end){
                        this.selecting.current.setState({start:undefined, end:undefined, rects:undefined,selecting:false})
                        this.dispatch(ACTION.Selection.SELECT(start.id,start.at,end.id,end.at))
                        this.selected=true
                    }
				}}
				>
                <Fragment>
                    <defs>
                        <path id="table.adder"
                            width={14}
                            height={20}
                            strokeWidth={1}
                            fill="transparent"
                            d="M8,9h8M12,5v8 M12,2C8.13,2,5,5.13,5,9c0,5.25,7,13,7,13s7-7.75,7-13C19,5.13,15.87,2,12,2z"
                            />
                        <svg id="rotator" viewBox="0 0 24 24" width={24} height={24}>
                            <circle cx={12} cy={12} r={15}
                                stroke="transparent"
                                fillOpacity={0.01}
                                cursor="pointer"/>
                            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                        </svg>
                    </defs>
                </Fragment>
				<Fragment>
                    {children}
					{this.getComposeTrigger()}
					<Locator
                        docId={docId}
                        scale={this.props.scale}
                        positioning={this.positioning}
                        ref="locator"
                        cursor={
                            <Cursor
                                dispatch={dispatch}
                                keys={{
									37:e=>this.onKeyArrowLeft(e),//move left
									38:e=>this.onKeyArrowUp(e),//move up
									39:e=>this.onKeyArrowRight(e),//move right
									40:e=>this.onKeyArrowDown(e),//move down
								}}
								>

								<CursorShape/>

							</Cursor>
                        }
                        range={
                            <Selection
                                around={(target,left,top)=>{
                                    const {id,at}=this.positioning.around(left, top)
                            		if(id){
                                        if(at!==null){
                                            return this.positioning.position(id,at)
                                        }
                                    }
                                }}

                                onMove={this.onMove}
                                onResize={this.onResize}
                                onRotate={this.onRotate}>
        						<SelectionShape ref={this.selecting}
									asCanvasPoint={a=>this.positioning.asCanvasPoint(a)}
									/>
        					</Selection>
                        }
                        getComposer={getComposer}/>
				</Fragment>
            </ComposedDocument>
        )
    }

    componentDidUpdate({},state,snapshot){
        this.positioning.reset(this.getComposer, this.getContent, this.canvas, this.props.pages,this.props.pgGap,this.props.scale)
        this.locator && this.locator.setState({content:this.props.content, canvas:this.canvas})
    }

    componentDidMount(){
        this.positioning.reset(this.getComposer, this.getContent, this.canvas, this.props.pages,this.props.pgGap, this.props.scale)
        if(this.selection && !this.selection.id){
            const page0=this.props.pages[0]
            const {id,at}=this.getComposer(page0.getParagraph(page0.lines[0])).nextCursorable()
            this.dispatch(ACTION.Cursor.AT(id,at))
        }
        this.dispatch(ACTION.Cursor.ACTIVE(this.props.docId))
        this.locator && this.locator.setState({content:this.props.content, canvas:this.canvas})
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

    onClick({shiftKey:selecting, target, clientX:left,clientY:top}){
		const {id,at}=this.positioning.around(left, top)
		if(id){
            if(at==undefined){
                this.dispatch(ACTION.Selection.SELECT(id))
            }else{
    			if(!selecting){
    				this.dispatch(ACTION.Cursor.AT(id,at))
    			}else{
    				let {end}=this.selection
    				let {left,top}=this.positioning.position(id,at)
    				let {left:left1,top:top1}=this.positioning.position(end.id,end.at)
    				if(top<top1 || (top==top1 && left<=left1)){
    					this.dispatch(ACTION.Selection.START_AT(id,at))
    				}else{
    					this.dispatch(ACTION.Selection.SELECT(end.id, end.at, id, at))
    				}
    			}
            }
		}

        this.active()
    }

	locate(nextOrprev, CursorableOrSelectable, id, at, inclusive=false){
		if(id==undefined){
			({id,at}=this.cursor)
		}
        let composer=this.getComposer(id)
        if(composer){
            return composer[`${nextOrprev}${CursorableOrSelectable}`](id,at)||{}
        }
        return this.cursor
	}

	onKeyArrowLeft({shiftKey:selecting}){
        const {id,at}=this.locate("prev",selecting ? "Selectable" :"Cursorable")
        if(!id)
            return

        if(!selecting){
            this.dispatch(ACTION.Cursor.AT(id,at))
        }else{
            const {cursorAt}=this.selection
            if(cursorAt=="end"){
                this.dispatch(ACTION.Selection.END_AT(id,at))
            }else{
                this.dispatch(ACTION.Selection.START_AT(id,at))
            }
        }
	}

	onKeyArrowRight({shiftKey:selecting}){
        const {id,at}=this.locate("next",selecting ? "Selectable" :"Cursorable")
        if(!id)
            return
        if(!selecting){
            this.dispatch(ACTION.Cursor.AT(id,at))
        }else{
            const {cursorAt}=this.selection
            if(cursorAt=="start"){
                this.dispatch(ACTION.Selection.START_AT(id,at))
            }else{
                this.dispatch(ACTION.Selection.END_AT(id,at))
            }
        }
	}

	locateLine(nextOrPrev, cursorableOrSelectable){
		const {id,at}=this.cursor
        return this.positioning[`${nextOrPrev}Line`](id,at)||{}
	}

	onKeyArrowUp({shiftKey:selecting, clientX:left}){
		const {id, at}=this.locateLine("prev")
        if(!id)
            return
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
					let {left,top}=this.positioning.position(id,at)
					let {left:left0,top:top0}=this.positioning.position(start.id, start.at)
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

	onKeyArrowDown({shiftKey:selecting, clientX:left}){
		const {id, at}=this.locateLine("next")
        if(!id){
            return
        }
		if(!selecting){
			this.dispatch(ACTION.Cursor.AT(id,at))
		}else{//extends start and end to at outest frame
            const {start,end,cursorAt}=this.selection
            const extended=this.positioning.extendSelection(start, {id,at})

            ;(({start,end})=>this.dispatch(ACTION.Selection.SELECT(start.id,start.at,end.id,end.at)))(extended);
            return
            if(start.id==end.id && start.at==end.at){
				this.dispatch(ACTION.Selection.END_AT(id,at))
			}else{
				if(cursorAt=="end")
					this.dispatch(ACTION.Selection.END_AT(id,at))
				else if(cursorAt=="start"){
					let {left,top}=this.positioning.position(id,at)
					let {left:left1, top:top1}=this.positioning.position(end.id, end.at)
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

const ComposeMoreTrigger=compose(
	setDisplayName("More"),
	getContext({debug: PropTypes.bool}),
	connect(state=>({selection:getSelection(state)})),
)(class extends Component{
	shouldComponentUpdate({selection,isSelectionComposed,compose4Selection}){
		if(!isSelectionComposed(selection)){
			compose4Selection()
			return false
		}
		return true
	}

	render(){
		const {compose4Scroll,debug}=this.props
		const y=this.props.y()
		return (
			<Waypoint onEnter={()=>compose4Scroll(y)} >
                <Group y={y-100}>
                    <line x1="0" y1="0" x2="2" y2="0" strokeWidth="2" stroke={debug ? "red" : "transparent"}/>
                </Group>
			</Waypoint>
		)
	}
})
