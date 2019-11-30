import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"
import {ACTION, Cursor, Selection,ContentQuery} from "we-edit"

import Canvas from "../canvas"
import SelectionShape from "../selection"
import Locator from "./locator"
import Positioning from "./positioning"
import ComposeMoreTrigger from "./compose-more-trigger"

const CursorShape=({y=0,x=0,height=0,color="black", style})=>(
    <path d={`M${x} ${y} v${height}`} strokeWidth={1} stroke={color} style={style}/>
)
CursorShape.displayName="CursorShape"

/**
 * must provide the following 
 * 1. static composedY(), used to trigger composing if scrolling to uncomposed position
 */
export default class Responsible extends Component{
    static displayName="responsible-composed-document-default-canvas"
    static propTypes={
        document: PropTypes.object,
    }
    static contextTypes={
        onContextMenu: PropTypes.func,
    }
    static composedY=document=>{
        const {computed:{composed:pages}, props:{pageGap}}=document
        return pages.reduce((w,page)=>w+page.composedHeight+pageGap,0)
    }
    static getDerivedStateFromProps({document:{props:{editable,scale,content,canvasId,dispatch}}}){
        return {editable,scale,content,canvasId,dispatch}
    }

    constructor(){
        super(...arguments)
        this.state={}
        this.selecting=React.createRef()
        this.onMove=this.onMove.bind(this)
        this.onResize=this.onResize.bind(this)
        this.onRotate=this.onRotate.bind(this)
        this.getComposer=this.getComposer.bind(this)
        this.getContent=this.getContent.bind(this)
        this.positioning=new Positioning(this)
    }

    /**the following API must be provided to Positioning */
    get scale(){
        return this.state.scale
    }

    get pages(){
        return this.props.document.pages
    }

    get pageGap(){
        return this.state.pageGap
    }

    get dispatch(){
        return this.state.dispatch
    }

	getComposer(id){
		return this.props.document.getComposer(id)
	}

	getContent(id){
        return ContentQuery.fromContent(this.state.content,  id ? `#${id}`  : undefined)
	}
    ////End Positioning API/

    get locator(){
        if(this.refs.locator)
            return this.refs.locator.getWrappedInstance()
    }

	get selection(){
        if(this.locator)
		     return this.locator.props.selection.toJS()
	}

	get cursor(){
		const {cursorAt, x, ...a}=this.selection
        return {...a[cursorAt],x}
    }
    
	renderComposeTrigger(){
		const {document}=this.props
		const notifyLocator=callback=>{
			if(this.locator){
				this.locator.setState({content:null,canvas:null},callback)
			}else{
				callback()
			}
		}

		return <ComposeMoreTrigger
					getComposedY={()=>document.composedY()}
					isSelectionComposed={selection=>document.isSelectionComposed(selection)}
					compose4Selection={a=>{
						if(!document.isAllComposed()){
							notifyLocator(selection=>document.compose4Selection(selection))
						}
					}}
					compose4Scroll={y=>{
						if(!document.isAllComposed()){
							notifyLocator(()=>document.compose4Scroll(y))
						}
					}}
					/>
    }
    
    makeEventHandlers(){
        const {context:{onContextMenu}}=this
        const flagEvent=({clientX,clientY})=>this.down={clientX,clientY}
        const shouldIgnore=({clientX,clientY})=>clientX==this.down.clientX && clientY==this.down.clientY
        return {
            onContextMenu:e=>{
                this.onClick(e)
                onContextMenu && onContextMenu(e)
            },

            onClick:e=>{
                if(!this.down.selected){
                    this.down.selected=false
                    this.onClick(e)
                }
            },

            onDoubleClick:e=>{
                if(!this.down.selected){
                    this.down.selected=false
                    this.onClick(e,true)
                }
            },

            onMouseDown:flagEvent,

            onMouseMove:e=>{
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
            },
            onMouseUp:e=>{
                if(shouldIgnore(e)){
                    return
                }
                var {start,end}=this.selecting.current.state
                if(start && end){
                    this.selecting.current.setState({start:undefined, end:undefined, rects:undefined,selecting:false})
                    ;({start,end}=this.positioning.extendSelection(start,end));
                    this.dispatch(ACTION.Selection.SELECT(start.id,start.at,end.id,end.at))
                    this.down.selected=true
                }
            },
        }
    }

    render(){
        const {props:{children, ...props}, state:{editable=true, canvasId,scale}}=this
        const noCursor=editable && editable.cursor===false
        const eventHandlers=!noCursor && this.makeEventHandlers()
        const locator=!noCursor && (
                <Locator
                    canvasId={canvasId}
                    scale={scale}
                    positioning={this.positioning}
                    ref="locator"
                    cursor={
                        <Cursor
                            dispatch={this.dispatch}
                            keys={{
                                38:e=>this.onKeyArrowUp(e),//move up
                                40:e=>this.onKeyArrowDown(e),//move down
                            }}
                            editable={!!editable}
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

                            onMove={editable && this.onMove}
                            onResize={editable && this.onResize}
                            onRotate={editable && this.onRotate}>
                            <SelectionShape ref={this.selecting}
                                asCanvasPoint={a=>this.positioning.asCanvasPoint(a)}
                                />
                        </Selection>
                    }
                    getComposer={this.getComposer}/>
            )
        
            return (
            <Canvas 
                {...props} 
                innerRef={a=>{this.canvas=a}} 
                {...eventHandlers}>
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
					{this.renderComposeTrigger()}
					{locator}
				</Fragment>
            </Canvas>
        )
    }

    componentDidUpdate({}){
        this.locator && this.locator.setState({content:this.state.content, canvas:this.canvas})
    }

    componentDidMount(){
        this.active()
        this.locator && this.locator.setState({content:this.state.content, canvas:this.canvas})
    }

    active(){
		this.dispatch(ACTION.Cursor.ACTIVE(this.state.canvasId))
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
        this.dispatch(ACTION.Selection.MOVE(e))
    }

    onClick({shiftKey:selecting, clientX:left,clientY:top}, doubleClicked=false){
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

    locateLine(nextOrPrev){
		const {id,at,x}=this.cursor
        return this.positioning[`${nextOrPrev}Line`](id,at,x)||{}
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


