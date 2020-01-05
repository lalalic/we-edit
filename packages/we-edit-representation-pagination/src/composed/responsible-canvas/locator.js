import React, {Component, Fragment} from "react"
import {connect,ACTION} from "we-edit"
import {compose} from "recompose"
import SelectionStyle from "./selection-style"

/**
 * To update cursor, selection, and focus shape only when
 * canvas is ready, which means document composed, and be updated in canvas
 * 
 * there are 3 states: [next, current, and last][content,selection]
 * if any of next is different from last or current, should update
 */
export default compose(
    connect(
        state=>({
            content:state.get("content"),
            selection:state.get("selection"),
        }),
        undefined,
        undefined,
        {withRef:true}
    ),
)(class Locator extends Component{
    constructor(){
        super(...arguments)
        this.state={composedContent:null}
    }

	render(){
        const {range=this.props.range, cursor=this.props.cursor}=this
        return (
            <Fragment>
                <g ref="cursor">{cursor}</g>
				{range}
            </Fragment>
        )
    }

    shouldComponentUpdate({content,selection, cursor, range, canvas, positioning=canvas.positioning},{composedContent}){
        const composedContentIsSynced=content.equals(composedContent)
        if(!composedContentIsSynced)
            return false

        const contentAndSelectionIsSynced=
            content.equals(this.props.content) &&
            selection.equals(this.props.selection) && 
            content.equals(this.last.content) && 
            selection.equals(this.last.selection)

        if(contentAndSelectionIsSynced)
            return false

        //initialize
        this.cursor=cursor
        this.range=range
        this.style=null

        //update cursor
        const {cursorAt, ...a}=selection.toJS()
        const {id,at}=a[cursorAt]
        if(!id)//
            return true
        const cursorPosition=positioning.position(id, at, true)
        this.style=new SelectionStyle(cursorPosition,positioning, a.start, a.end)

        const isCursor=a.start.id==a.end.id && a.start.at==a.end.at
        if(cursor){
            const {x,y,left,top,height,fontFamily,fontSize}=cursorPosition
            this.cursor=React.cloneElement(cursor, {
                x,y,left,top,fontFamily,fontSize,
                height: isCursor ? height : 0,
            })
        }
        const focusable=a.start.id==a.end.id && positioning.getComposer(id).focusable
        const rangeRects=!isCursor&&!focusable ? positioning.getRangeRects(a.start,a.end) : []
        if(range && (rangeRects && rangeRects.length)){
            this.range=React.cloneElement(range,{rects:rangeRects})
        }

        return true
    }

    componentDidUpdate(){
        const {props:{canvas,dispatch,content,selection}, refs:{cursor}, style}=this
        canvas.scrollNodeIntoView(cursor)
        dispatch(ACTION.Selection.STYLE(style))
        this.last={content, selection}
    }
})


