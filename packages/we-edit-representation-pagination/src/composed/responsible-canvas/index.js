import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"
import {ACTION, Cursor, Selection,ContentQuery, getSelection} from "we-edit"

import Canvas from "../canvas"
import SelectionShape from "./selection-shape"
import CursorShape from "./cursor-shape"
import Positioning from "./positioning"
import ComposeMoreTrigger from "./compose-more-trigger"
import DefineShapes from "./define-shapes"
import SelectionStyle from "./selection-style"
import Pilcrow from "./pilcrow"

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
            node: PropTypes.instanceOf(Element),
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
    }
    
    static getDerivedStateFromProps({document,...me}){
        const {props:{editable,canvasId,content,contentHash,viewport=me.viewport,screenBuffer=me.screenBuffer,},state:{y=0}}=document
        return {
            ...Canvas.getDerivedStateFromProps(...arguments), 
            editable,canvasId,content,contentHash,viewport,screenBuffer,composed4Y:y
        }
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
    }

    getChildContext(){
        return {
            positioning:this.positioning
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
        const {props:{children,document}, state:{editable=true,scale,pageGap,pages,precision}}=this
        const noCursor=editable && editable.cursor===false
        const eventHandlers=!noCursor ? this.eventHandlers  : {}
        const {Canvas, ComposeMoreTrigger}=this.constructor
        const id=`canvas${document.props.canvasId}`
        return (
            <Canvas 
                {...{scale,pageGap,pages,precision,document,paper:true, id}}
                innerRef={a=>{this.canvas=a}}
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
                <Pilcrow canvas={id}/>
                <DefineShapes/>
                {children}
				<Fragment>
                    <Cursor
                        ref={this.cursorNode}
                        keys={{
                            37:e=>this.onKeyArrowLeft(e),//move left
			                39:e=>this.onKeyArrowRight(e),//move right
                            38:e=>this.onKeyArrowUp(e),//move up
                            40:e=>this.onKeyArrowDown(e),//move down
                        }}>
                        <CursorShape/>
                    </Cursor>
                    <Selection onContextMenu={e=>{
                            e.stopPropagation()
                            e.preventDefault()
                            delete this.__mouseDownFlag.selected
                            const {onContextMenu}=document.props
                            onContextMenu && onContextMenu(e)
                        }}>
                        <SelectionShape ref={"selecting"}/>
                    </Selection>
				</Fragment>
            </Canvas>
        )
    }

    __focusCursor(){
        this.cursorNode.current.input.current.focus()
    }

    __statistics(){
        const {props:{document}}=this
        this.dispatch(ACTION.Statistics({
			pages:this.pages.length,
			allComposed:document.isAllChildrenComposed(),
			words: document.words
		}))
    }

    componentDidUpdate(){
        this.__statistics()
        //cavas is ready, so SelectionStyle SHOULD be updated
        if(this.props.document.isSelectionComposed(this.selection)){
            this.__updateSelectionStyle()
        }
    }

    componentDidMount(){
        this.active()
        this.unsubscribe=this.context.activeDocStore.subscribe(this.__updateSelectionStyleWhenSelectionChangeWithoutRecomposing())
        this.componentDidUpdate()
    }

    componentWillUnmount(){
        this.unsubscribe()
    }

    active(){
		this.dispatch(ACTION.Cursor.ACTIVE(this.state.canvasId))
    }

    __updateSelectionStyle(){
        const SelectionStyle=this.constructor.SelectionStyle
        const {start}=this.selection
        const end=this.cursor
        
        if(!this.props.document.isSelectionComposed({end,start})){
            console.error(`selection style: not fully composed ${end.id}`)
        }

        const pos=this.positioning.position(end, true)
        const style=new SelectionStyle(pos, start, end,this.positioning)
        this.dispatch(ACTION.Selection.STYLE(style))
    }
    
    __updateSelectionStyleWhenSelectionChangeWithoutRecomposing(){
        const document=this.props.document
        const getSelection=()=>this.context.activeDocStore.getState().get("selection")
        
        let lastSelection=getSelection()
        let lastComposedUUID=document.computed.composedUUID
        
        const selectionChanged=()=>!lastSelection.equals(getSelection())
        const withoutRecomposing=()=>document.computed.composedUUID===(lastComposedUUID||document.computed.composedUUID)
        
        return (()=>{
            if(this.context.activeDocStore.getState()){
                const a=withoutRecomposing(), b=selectionChanged()
                lastComposedUUID=document.computed.composedUUID
                lastSelection=getSelection()
                if( a && b && document.isSelectionComposed(this.selection)){
                    this.__updateSelectionStyle()
                } 
            }
        })
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
        this.__onClick(e)
        delete this.__mouseDownFlag.selected
        const {onContextMenu}=this.props.document.props
        onContextMenu && onContextMenu(e)
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
        console.log(JSON.stringify({start,end,page, rects}))
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