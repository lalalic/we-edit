import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"
import {ACTION, Cursor, Selection,ContentQuery} from "we-edit"

import Canvas from "../canvas"
import SelectionShape from "./selection"
import CursorShape from "./cursor-shape"
import Locator from "./locator"
import Positioning from "./positioning"
import ComposeMoreTrigger from "./compose-more-trigger"
import DefineShapes from "./define-shapes"

/**
 * must provide the following 
 * 1. static composedY(), used to trigger composing if scrolling to uncomposed position
 * 2. makeEventHandler(): make event handler to respond to user input
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
    static getDerivedStateFromProps({document:{dispatch,props:{editable,scale,content,canvasId}}}){
        return {editable,scale,content,canvasId,dispatch}
    }

    constructor(){
        super(...arguments)
        this.state={}
        this.selecting=React.createRef()
        this.getComposer=this.getComposer.bind(this)
        this.getContent=this.getContent.bind(this)
        this.positioning=new Positioning(this)

        this.onMove=this.onMove.bind(this)
        this.onResize=this.onResize.bind(this)
        this.onRotate=this.onRotate.bind(this)
        this.eventHandlers="onClick,onDoubleClick,onContextMenu,onMouseDown,onMouseMove,onMouseUp".split(",")
            .reduce((handlers,key)=>{
                if(key in this){
                    handlers[key]=this[key]=this[key].bind(this)
                }else{
                    console.warn(`responsible canvas doesn't implemented ${key} event`)
                }
                return handlers
            },{})
        this.__mouseDownFlag={}
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
						if(!document.isAllChildrenComposed()){
							notifyLocator(selection=>document.compose4Selection(selection))
						}
					}}
					compose4Scroll={y=>{
						if(!document.isAllChildrenComposed()){
							notifyLocator(()=>document.compose4Scroll(y))
						}
					}}
					/>
    }

    __shouldIgnoreMouseDownEvent({clientX,clientY}){
        return clientX==this.__mouseDownFlag.clientX && clientY==this.__mouseDownFlag.clientY
    }

    onClick(e){
        if(!this.__mouseDownFlag.selected){
            this.__mouseDownFlag.selected=false
            this.__onClick(e)
        }
    }

    onContextMenu(e){
        const {context:{onContextMenu}}=this
        this.__onClick(e)
        onContextMenu && onContextMenu(e)
    }

    onDoubleClick(e){
        if(!this.__mouseDownFlag.selected){
            this.__mouseDownFlag.selected=false
            this.__onClick(e,true)
        }
    }

    onMouseDown({clientX,clientY}){
        this.__mouseDownFlag={clientX,clientY}
    }

    onMouseMove(e){
        if(!(e.buttons&0x1)){
            return
        }
        if(this.__shouldIgnoreMouseDownEvent(e)){
            return
        }

        const {id,at}=this.positioning.around(e.clientX,e.clientY)
        if(id){
            const end={id,at}
            let {start=end}=this.selecting.current.state
            const rects=start==end ? [] : this.positioning.getRangeRects(start, end)
            this.selecting.current.setState({start:start||end, end, rects, selecting:true})
        }
    }

    onMouseUp(e){
        if(this.__shouldIgnoreMouseDownEvent(e)){
            return
        }
        var {start,end}=this.selecting.current.state
        if(start && end){
            this.selecting.current.setState({start:undefined, end:undefined, rects:undefined,selecting:false})
            ;({start,end}=this.positioning.extendSelection(start,end));
            this.dispatch(ACTION.Selection.SELECT(start.id,start.at,end.id,end.at))
            this.__mouseDownFlag.selected=true
        }
    }

    render(){
        const {props:{children, ...props}, state:{editable=true, canvasId,scale}}=this
        const noCursor=editable && editable.cursor===false
        const eventHandlers=!noCursor ? this.eventHandlers  : {}
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
                <DefineShapes/>
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

    __onClick({shiftKey:selecting, clientX:left,clientY:top}, doubleClicked=false){
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

    __onKeyArrow(id,at,selecting){
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
    		this.__onKeyArrow(id,at,selecting)
        }
	}

	onKeyArrowDown({shiftKey:selecting}){
		const {id, at}=this.locateLine("next")
        if(id){
            this.__onKeyArrow(id,at,selecting)
        }
    }
}


