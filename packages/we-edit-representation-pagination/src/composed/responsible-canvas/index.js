import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"
import {ACTION, Cursor, Selection,ContentQuery, getSelection} from "we-edit"

import Canvas from "../canvas"
import {SelectionShape,WorkerSelection} from "./selection-shape"
import {CursorShape, WorkerCursor} from "./cursor-shape"
import Positioning from "./positioning"
import ComposeMoreTrigger from "./compose-more-trigger"
import DefineShapes from "./define-shapes"
import SelectionStyle from "./selection-style"
import Pilcrow from "./pilcrow"
import SelectionStyleNotify from "./selection-style-notify"
import DrawLayer from "./draw-layer"
import ScaleNotify from "./scale-notify"
import Inspector from "../inspector"

/**
 * must provide the following 
 * 1. for Positioning: pages, getComposer, getContent, asCanvasPoint, asViewportPoint, pageXY(I)
 * 2. for Responsible Events: 
 * 
 * SelectionStyle is provided when following events and selection composed
 * recompose for any purpose, such as content change, scroll, or selection change
 *      done in compontentDidUpdate
 * selection change without recomposing(composedUUID not changed)
 *      done in subscribe store change
 */
class Responsible extends Component{
    static displayName="responsible-composed-document-default-canvas"
    static Canvas=Canvas
    static ComposeMoreTrigger=ComposeMoreTrigger
    static Positioning=Positioning
    static SelectionStyle=SelectionStyle
    static propTypes={
        pageGap: PropTypes.number,
        screenBuffer: PropTypes.number,
        scale: PropTypes.number,  
		viewport: PropTypes.shape({
            height:PropTypes.number,
            width: PropTypes.number,
            node: PropTypes.object,
		}),        
        document: PropTypes.object,
    }

    static defaultProps={
		pageGap:12,
        screenBuffer: 1,
        scale:1,
    }
    
    static contextTypes={
        activeDocStore: PropTypes.any,
    }

    static childContextTypes={
        positioning:PropTypes.object,
        responsible: PropTypes.object,
    }
    
    static getDerivedStateFromProps({viewport, screenBuffer,pageGap,scale:scale0, document:{pages, props:{editable,content, precision},state:{y=0}}},{scale=scale0}){
        return {pages, precision, pageGap, scale,editable,content,viewport,screenBuffer,composed4Y:y}
    }

    constructor(){
        super(...arguments)
        this.state={}
        this.getComposer=this.getComposer.bind(this)
        this.getContent=this.getContent.bind(this)
        const Positioning=this.constructor.Positioning
        const SafePositioning=Positioning.makeSafe(Positioning)
        this.positioning=new SafePositioning(this)
        this.cursorNode=React.createRef()
        this.updateSelectionStyle=this.updateSelectionStyle.bind(this)
        this.onViewportChange=this.onViewportChange.bind(this)
    }

    getChildContext(){
        return {
            positioning:this.positioning,
            responsible:this,
        }
    }

    /**the following API must be provided to Positioning */
    get pages(){
        return this.state.pages
    }

    getComposer(id){
		return this.props.document.getComposer(id)
	}

	getContent(id){
        return ContentQuery.fromContent(this.state.content,  id ? `#${id}`  : undefined)
    }
    
    asCanvasPoint({left,top}){
        const point=this.canvas.createSVGPoint()
        point.x=left,point.y=top
        const {x,y}=point.matrixTransform(this.canvas.getScreenCTM().inverse())
        return {x, y}
    }

    asViewportPoint({x,y}){
        let point=this.canvas.createSVGPoint()
        point.x=x,point.y=y
        let location=point.matrixTransform(this.canvas.getScreenCTM())
        return {left:location.x, top:location.y}
    }
    
    pageXY(I=0){
        const rect=this.canvas && this.constructor.Canvas.pageRect(I,this.canvas)
        return !rect ? {x:0,y:0} : this.asCanvasPoint(rect)
    }
    ////End Positioning API/
    
    get dispatch(){
        return this.context.activeDocStore.dispatch
    }

    get selecting(){
        if(this.refs.selecting)
            return this.refs.selecting.getWrappedInstance()
    }

	get selection(){
        return getSelection(this.context.activeDocStore.getState())
	}

	get cursor(){
        const {end,page}=this.selection
        return {...end,page}
    }

    get id(){
        return `canvas${this.props.id}`
    }

    get canvas(){
        return document.getElementById(this.id)
    }

    get inspector(){
        return <Inspector document={this.props.document}/>
    }

    __composedY(){
        const {pages, pageGap,precision=1}=this.state
        return this.constructor.Canvas.composedY(pages, pageGap*precision)/precision
    }
    
    //provide to document to query 
    availableBlockSize(){
        const {scale,composed4Y=0,screenBuffer,viewport:{height,node:{scrollTop}}}=this.state
        const composedY=this.__composedY() * scale
        return Math.max(0,(Math.max(scrollTop,composed4Y)+height+screenBuffer*height)-composedY)
    }

    render(){
        const {props:{style, children,document, onKeyDown=e=>e, onContextMenu=e=>e}, state:{editable=true,scale,pageGap,pages,precision}}=this
        const noCursor=editable && editable.cursor===false
        const eventHandlers=!noCursor ? this.eventHandlers  : {}
        const {Canvas, ComposeMoreTrigger}=this.constructor
        return (
            <Canvas 
                {...{style,scale,pageGap,pages,precision,document,paper:true, id:this.id}}
                {...eventHandlers}>
                <ComposeMoreTrigger
                    getComposedY={()=>this.__composedY()}
                    isSelectionComposed={selection=>{
                        return document.isSelectionComposed(selection)
                    }}

                    compose4Selection={selection=>{
                        if(!document.isAllChildrenComposed()){
                            document.compose4Selection(selection)
                        }
                    }}
                    
                    compose4Scroll={y=>{
                        if(!document.isAllChildrenComposed()){
                            document.compose4Scroll(y)
                        }
                    }}
                />
                <Pilcrow canvas={this.id}/>
                <DefineShapes/>
                {children}
				<Fragment>
                    <SelectionStyleNotify notify={this.updateSelectionStyle} hash={document.props.hash}/>
                    <Cursor 
                        workerShape={<WorkerCursor/>}
                        onKeyDown={e=>onKeyDown(e)}
                        ref={this.cursorNode}
                        keys={{
                            37:e=>this.onKeyArrowLeft(e),//move left
			                39:e=>this.onKeyArrowRight(e),//move right
                            38:e=>this.onKeyArrowUp(e),//move up
                            40:e=>this.onKeyArrowDown(e),//move down
                        }}>
                        <CursorShape/>
                    </Cursor>
                    <Selection 
                        workerShape={<WorkerSelection/>}
                        onContextMenu={e=>{
                            e.stopPropagation()
                            e.preventDefault()
                            delete this.__mouseDownFlag.selected
                            onContextMenu(e)
                        }}>
                        <SelectionShape ref={"selecting"}/>
                    </Selection>
				</Fragment>
                {!noCursor && <DrawLayer/>}
                <ScaleNotify notify={scale=>this.setState({scale})}/>
            </Canvas>
        )
    }

    __focusCursor(){
        this.cursorNode.current.input.current.focus()
    }

    componentDidMount(){
        this.active()
        window.addEventListener("resize",this.onViewportChange)
    }

    componentWillUnmount(){
        window.removeEventListener("resize",this.onViewportChange)
    }

    onViewportChange(){

    }

    active(){
		this.dispatch(ACTION.Cursor.ACTIVE(this.props.id))
    }

    updateSelectionStyle(){
        const SelectionStyle=this.constructor.SelectionStyle
        const {start}=this.selection
        const end=this.cursor
        if(!end.id)
            return
        
        if(!this.props.document.isSelectionComposed({end,start})){
            console.info(`selection style: not fully composed ${end.id},delay update selection style`)
            return 
        }

        const pos=this.positioning.position(end, true)
        const style=new SelectionStyle(pos, start, end,this.positioning)
        this.dispatch(ACTION.Selection.STYLE(style))
    }
}

export default class EventResponsible extends Responsible{
    constructor(){
        super(...arguments)
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

    __onClick({shiftKey:selecting, clientX:left,clientY:top}, doubleClicked=false){
		const {id,at,page}=this.positioning.around(left, top)
		if(id){
            if(at==undefined){
                this.dispatch(ACTION.Selection.SELECT(id,1,id,0,page))
            }else{
    			if(!selecting){
                    if(doubleClicked){
                        const {start,end}=this.positioning.extendWord({id,at,page})
                        if(start && end){
                            this.dispatch(ACTION.Selection.SELECT(start.id,start.at, end.id, end.at,page))
                        }else{
                            this.__focusCursor()
                            this.dispatch(ACTION.Cursor.AT(id,at,page))
                        }
                    }else{
                        this.__focusCursor()
        				this.dispatch(ACTION.Cursor.AT(id,at,page))
                    }
    			}else{
    				let {end}=this.selection
    				let {left,top}=this.positioning.position({id,at})
    				let {left:left1,top:top1}=this.positioning.position(end)
    				if(top<top1 || (top==top1 && left<=left1)){
    					this.dispatch(ACTION.Selection.SELECT(end.id,end.at,id,at,page))
    				}else{
                        const a=this.positioning.normalizeSelection(end,{id,at})
    					this.dispatch(ACTION.Selection.SELECT(a.start.id,a.start.at, a.end.id, a.end.at,page))
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
            const {...a}=this.selection
            const {start,end}=this.positioning.normalizeSelection(a.start,a.end={id,at})
            this.dispatch(ACTION.Selection.SELECT(start.id, start.at, end.id,end.at))
        }
    }

    __shouldIgnoreMouseDownEvent({clientX,clientY}){
        return clientX==this.__mouseDownFlag.clientX && clientY==this.__mouseDownFlag.clientY
    }

    onClick(e){
        if(!this.__mouseDownFlag.selected){
            this.__onClick(e)
        }
        delete this.__mouseDownFlag.selected
    }

    onContextMenu(e){
        if(!e.focusable){
            this.__onClick(e)
            delete this.__mouseDownFlag.selected
        }
        this.props.onContextMenu?.(e)
    }

    onDoubleClick(e){
        if(!this.__mouseDownFlag.selected){
            this.__onClick(e,true)
        }
        delete this.__mouseDownFlag.selected
    }

    onMouseDown({clientX,clientY}){
        console.log("svg mouse down")
        this.__mouseDownFlag={clientX,clientY}
    }

    onMouseMove(e){
        if(!(e.buttons&0x1)){
            return
        }
        if(this.__shouldIgnoreMouseDownEvent(e)){
            return
        }

        const {id,at,page}=this.positioning.around(e.clientX,e.clientY)
        if(!id)
            return 
        
        const end={id,at}
        const {start=end, page:lastPage=page}=this.selecting.state
        
        if(this.positioning.shouldLimitInTemplate({...start,page:lastPage})){
            if(lastPage!==page){
                return   
            }
            if(id!=start.id){
                if(!this.positioning.shouldLimitInTemplate({...end,page})){
                    return 
                }
            }
        }
        const rects=start==end ? [] : this.positioning.getRangeRects(start, {...end,page})
        this.selecting.setState({start:start||end, end, page, rects, selecting:true})
    }

    onMouseUp(e){
        if(this.__shouldIgnoreMouseDownEvent(e)){
            return
        }
        var {start,end,page}=this.selecting.state
        if(start && end){
            this.selecting.setState({page:undefined,start:undefined, end:undefined, rects:undefined,selecting:false})
            ;({start,end}=this.positioning.normalizeSelection(start,end));
            this.dispatch(ACTION.Selection.SELECT(start.id,start.at,end.id,end.at,page))
            this.__mouseDownFlag.selected=true
        }
    }

	onKeyArrowUp({shiftKey:selecting}){
        const cursor=this.cursor
        const {id, at}=this.positioning.prevLine(cursor)
        if(id){
    		this.__onKeyArrow(id,at,selecting)
        }
	}

	onKeyArrowDown({shiftKey:selecting}){
		const cursor=this.cursor
		const {id, at}=this.positioning.nextLine(cursor)
        if(id){
            this.__onKeyArrow(id,at,selecting)
        }
    }

    onKeyArrowLeft(e){
        const {metaKey,ctrlKey,shiftKey:selecting}=e
        if(metaKey||ctrlKey){
            const cursor=this.cursor
            const start=this.positioning.positionToLineStart(cursor.id,cursor.at)
            if(cursor.id!=start.id || cursor.at!=start.at){
                this.__onKeyArrow(start.id, start.at, selecting)
                return 
            }
        }
        this.dispatch(ACTION.Cursor.BACKWARD(e))
    }

    onKeyArrowRight(e){
        const {metaKey,ctrlKey,shiftKey:selecting}=e
        if(metaKey||ctrlKey){
            const cursor=this.cursor
            const end=this.positioning.positionToLineEnd(cursor.id,cursor.at)
            if(cursor.id!=end.id || cursor.at!=end.at){
                this.__onKeyArrow(end.id, end.at, selecting)
                return 
            }
        }
        this.dispatch(ACTION.Cursor.FORWARD(e))
    }
}