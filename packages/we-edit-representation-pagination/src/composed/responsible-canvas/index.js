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
        onContextMenu: PropTypes.func,
        activeDocStore: PropTypes.any,
    }
    
    static getDerivedStateFromProps({document,...me}){
        const {props:{editable,canvasId,content,viewport=me.viewport,screenBuffer=me.screenBuffer,},state:{y=0}}=document
        return {...Canvas.getDerivedStateFromProps(...arguments), editable,canvasId,content,viewport,screenBuffer,composed4Y:y}
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
    get pages(){
        return this.state.pages
    }

    get dispatch(){
        return this.context.activeDocStore.dispatch
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

    asCanvasPoint({left,top}){
        let point=this.canvas.createSVGPoint()
        point.x=left,point.y=top
        let a=point.matrixTransform(this.canvas.getScreenCTM().inverse())
        return {x:a.x, y:a.y}
    }

    asViewportPoint({x,y}){
        let point=this.canvas.createSVGPoint()
        point.x=x,point.y=y
        let location=point.matrixTransform(this.canvas.getScreenCTM())
        return {left:location.x, top:location.y}
    }

    pageXY(I=0){
        const page=this.canvas.querySelector(".page"+I)
        if(page){
            const {left,top}=page.getBoundingClientRect()
            return this.asCanvasPoint({left,top})
        }
        return {x:0,y:0}
    }

    composedY(){
        const {state:{pageGap,pages}}=this
        const last=pages[pages.length-1]
        if(!last)
            return 0
        const heightOfLast=last.context.parent.isAllChildrenComposed() ? last.props.height : last.composedHeight
        return pages.slice(0,pages.length-1).reduce((w,page)=>w+page.props.height+pageGap,heightOfLast)
    }

    isAboveViewableBottom(){
        const {scale, composed4Y=0,screenBuffer,viewport:{height,node:{scrollTop}}}=this.state
        const composedY=this.composedY() * scale
        return composedY<Math.max(scrollTop,composed4Y)+height+screenBuffer*height
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
					getComposedY={()=>this.composedY()}
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
            ;({start,end}=this.positioning.normalizeSelection(start,end));
            this.dispatch(ACTION.Selection.SELECT(start.id,start.at,end.id,end.at))
            this.__mouseDownFlag.selected=true
        }
    }

    render(){
        const {props:{children,document}, state:{editable=true, canvasId,scale,pageGap,pages,precision}}=this
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
                {...{scale,pageGap,pages,precision,document}} 
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

    statistics(){
        const {props:{document}}=this
        this.dispatch(ACTION.Statistics({
			pages:this.pages.length,
			allComposed:document.isAllChildrenComposed(),
			words: Array.from(document.composers.values()).filter(a=>!!a)
				.reduce((words,a)=>words+=(a.computed.atoms ? a.computed.atoms.length : 0),0)
		}))
    }

    componentDidUpdate({}){
        this.statistics()
        this.locator && this.locator.setState({content:this.state.content, canvas:this.canvas})
    }

    componentDidMount(){
        this.statistics()
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
                        const a=this.positioning.normalizeSelection(a.end,{id,at})
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
            const {start,end}=this.positioning.normalizeSelection(a.start,a.end)
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


