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

const CursorShape=({y=0,x=0,height=0,color="black", style})=>(
    <path d={`M${x} ${y} v${height}`} strokeWidth={1} stroke={color} style={style}/>
)
CursorShape.displayName="CursorShape"

export default class Responsible extends Component{  
    static contextTypes={
        onContextMenu: PropTypes.func
    }

    static displayName="composed-document-with-cursor"

    scale=this.props.scale
    onMove=this.onMove.bind(this)
    onResize=this.onResize.bind(this)
    onRotate=this.onRotate.bind(this)
    selecting=React.createRef()
    positioning=new Positioning(this)
    getComposer=this.getComposer.bind(this)
    getContent=this.getContent.bind(this)

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
        console.log("render")
        const {children,canvasId, continueCompose, getComposer,dispatch, viewport, ...props}=this.props
		const flagEvent=({clientX,clientY})=>this.down={clientX,clientY}
		const shouldIgnore=({clientX,clientY})=>clientX==this.down.clientX && clientY==this.down.clientY
        return (
            <ComposedDocument {...props}
				innerRef={a=>{this.canvas=a}}

                onContextMenu={e=>{
                    this.onClick(e)
                    if(this.context.onContextMenu){
                        this.context.onContextMenu(e)
                    }
                }}

                onClick={e=>{
                    if(!this.down.selected){
                        console.log("on click")
                        this.down.selected=false
                        this.onClick(e)
                    }
                }}

				onDoubleClick={e=>{
					if(!this.down.selected){
						this.down.selected=false
						this.onClick(e,true)
					}
				}}
				onMouseDown={flagEvent}
				onMouseMove={e=>{
					if(!(e.buttons&0x1)){
						return
					}
                    if(shouldIgnore(e)){
						return
					}

					const {id,at}=this.positioning.around(e.clientX,e.clientY)
                    if(id){
                        const end={id,at}
                        let {start=end}=this.selecting.current.state
                        const rects=start==end ? [] : this.positioning.getRangeRects(start, end)
                        this.selecting.current.setState({start:start||end, end, rects, selecting:true})
                    }
				}}
                onMouseUp={e=>{
					if(shouldIgnore(e)){
                        return
					}
					var {start,end}=this.selecting.current.state
                    if(start && end){
						this.selecting.current.setState({start:undefined, end:undefined, rects:undefined,selecting:false})
                        ;({start,end}=this.positioning.extendSelection(start,end))
                        this.dispatch(ACTION.Selection.SELECT(start.id,start.at,end.id,end.at))
                        this.down.selected=true
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
                        canvasId={canvasId}
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
                                    46:e=>this.onKeyDelete(),//delete
                                    8:e=>this.onKeyBackspace(),//backspace
								}}

                                onCopy={e=>this.onCopy(e)}

                                onPaste={e=>this.onPaste(e)}

                                onCut={e=>this.onCut(e)}

                                >

								<CursorShape/>

							</Cursor>
                        }
                        range={
                            <Selection
                                around={(left,top)=>{
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
        this.locator && this.locator.setState({content:this.props.content, canvas:this.canvas})
    }

    componentDidMount(){
        if(this.selection && !this.selection.id){
            const page0=this.props.pages[0]
            const firstParagraph=this.getComposer(page0.getParagraph(page0.lines[0]))
            if(firstParagraph){
                const {id,at}=firstParagraph.nextCursorable()
                this.dispatch(ACTION.Cursor.AT(id,at))
            }
        }
        this.active()
        this.locator && this.locator.setState({content:this.props.content, canvas:this.canvas})
    }

    active(){
		this.dispatch(ACTION.Cursor.ACTIVE(this.props.canvasId))
    }

    onRotate({degree,id}){
		id=id||this.selection.start.id
		const content=this.getContent(id)
        this.dispatch(ACTION.Entity.UPDATE({id,type:content.attr("type"),rotate:degree}))
    }

    onResize({x,y,id}){
		id=id||this.selection.start.id
		const content=this.getContent(id)
		//const {width,height}=content.attr("size").toJS()
        const width=content.attr('width')
        const height=content.attr('height')

		let size=null

		if(y===undefined){
			size={width:width+x}
		}else if(x===undefined){
			size={height:height+y}
		}else{
			let scale=1+Math.max(Math.abs(x)/width,Math.abs(y)/height)*x/Math.abs(x)
			size={width:width*scale, height:height*scale}
		}
        this.dispatch(ACTION.Entity.UPDATE({id,type:content.attr("type"),size}))
    }

    onMove(e){
        if(e.absolute){
            const xy=this.positioning.asCanvasPoint(e.dest)
            return
            const {line,x,y,paragraph}=this.positioning.getPage(xy)
            this.dispatch(ACTION.Entity.MOVE({dest:{id,at}}))
        }else{
            this.dispatch(ACTION.Selection.MOVE(e))
        }
    }

    onCopy(e){
        this.dispatch(ACTION.Selection.COPY(e))
    }

    onCut(e){
        this.dispatch(ACTION.Selection.CUT(e))
    }

    onPaste(e){
        this.dispatch(ACTION.Selection.PASTE(e))
    }

    onClick({shiftKey:selecting, target, clientX:left,clientY:top}, doubleClicked=false){
		const {id,at}=this.positioning.around(left, top)
		if(id){
            if(at==undefined){
                this.dispatch(ACTION.Selection.SELECT(id,0,id,1))
            }else{
    			if(!selecting){
                    if(doubleClicked){
                        const {start,end}=this.positioning.extendWord(id,at)
                        if(start && end){
                            this.dispatch(ACTION.Selection.SELECT(start.id,start.at, end.id, end.at))
                        }else{
                            this.dispatch(ACTION.Cursor.AT(id,at))
                        }
                    }else{
        				this.dispatch(ACTION.Cursor.AT(id,at))
                    }
    			}else{
    				let {end}=this.selection
    				let {left,top}=this.positioning.position(id,at)
    				let {left:left1,top:top1}=this.positioning.position(end.id,end.at)
    				if(top<top1 || (top==top1 && left<=left1)){
    					this.dispatch(ACTION.Selection.START_AT(id,at))
    				}else{
                        const a=this.positioning.extendSelection(a.end,{id,at})
    					this.dispatch(ACTION.Selection.SELECT(a.start.id,a.start.at, a.end.id, a.end.at))
    				}
    			}
            }
		}

        this.active()
    }

    onKeyDelete(){
        this.dispatch(ACTION.Text.REMOVE({backspace:false}))
    }

    onKeyBackspace(){
        this.dispatch(ACTION.Text.REMOVE({backspace:true}))
    }

	locate(nextOrprev){
		const {id,at}=this.cursor
        const composer=this.getComposer(id)
        if(composer){
            return composer[`${nextOrprev}Cursorable`](id,at)||{}
        }
        return this.cursor
	}

    locateLine(nextOrPrev){
		const {id,at}=this.cursor
        return this.positioning[`${nextOrPrev}Line`](id,at)||{}
	}

    onKeyArrow(id,at,selecting){
        if(!selecting){
            this.dispatch(ACTION.Cursor.AT(id,at))
        }else{
            const {cursorAt,...a}=this.selection
            a[cursorAt]={id,at}
            const {start,end}=this.positioning.extendSelection(a.start,a.end)
            this.dispatch(ACTION.Selection.SELECT(start.id, start.at, end.id,end.at))
        }
    }

	onKeyArrowLeft({shiftKey:selecting}){
        const {id,at}=this.locate("prev")
        if(id){
            this.onKeyArrow(id,at,selecting)
        }
	}

	onKeyArrowRight({shiftKey:selecting}){
        const {id,at}=this.locate("next")
        if(id){
            this.onKeyArrow(id,at,selecting)
        }
	}

	onKeyArrowUp({shiftKey:selecting}){
		const {id, at}=this.locateLine("prev")
        if(id){
    		this.onKeyArrow(id,at,selecting)
        }
	}

	onKeyArrowDown({shiftKey:selecting}){
		const {id, at}=this.locateLine("next")
        if(id){
            this.onKeyArrow(id,at,selecting)
        }
	}
}

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
