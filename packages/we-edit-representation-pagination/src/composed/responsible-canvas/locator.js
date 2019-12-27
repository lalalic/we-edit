import React, {Component, Fragment} from "react"
import {connect,ACTION} from "we-edit"
import {compose} from "recompose"
import SelectionStyle from "./selection-style"

/**
 * To update cursor, selection, and focus shape only when
 * canvas is ready, which means document composed, and be updated in canvas
 * 
 * the following time should trigger locator updated:
 * 1. content change
 * 2. selection change
 * 3. canvas change(such as scale)???
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
        this.state={content:null,canvas:null}
    }

    get canvas(){
        return this.state.canvas
    }

	render(){
        const {range=this.props.range, cursor=this.props.cursor}=this

        return (
            <Fragment>
                <g ref="cursor">
                    {cursor}
                </g>
				{range}
            </Fragment>
        )
    }

    shouldComponentUpdate({content,selection,positioning, cursor, range},state){
        if(content.equals(state.content)){
			if(!content.equals(this.props.content) || !selection.equals(this.props.selection)
                || !content.equals(this.last.content) || !selection.equals(this.last.selection)){
				const {cursorAt, ...a}=selection.toJS()
                const {id,at}=a[cursorAt]
                const cursorPosition=positioning.position(id, at)
                const isCursor=a.start.id==a.end.id && a.start.at==a.end.at
                var rangeRects=!isCursor ? positioning.getRangeRects(a.start,a.end) : []
                var focusShape=null
                const composer=positioning.getComposer(id)
                if(composer){
                    focusShape=composer.getFocusShape()
                    if(focusShape){
                        const {id:fid, x:x0=0, y:y0=0}=focusShape.props
                        const isSelfSelected=a.start.id==a.end.id && fid==id && a.start.at!=a.end.at
                        const isContentSelected=!!positioning.getContent(id).parents(`#${fid}`).length
                        if(isSelfSelected || isContentSelected){
                            const {x=0,y=0}=positioning.position(fid, 0)||{}
                            const props={x:x+x0,y:y+y0,positioning}
                            if(isContentSelected){
                                props.onMove=null
                            }
                            focusShape=React.cloneElement(focusShape,props)
                            if(isSelfSelected){
                                rangeRects=[]
                            }
                        }else{
                            focusShape=null
                        }
                    }
                }

                this.cursor=cursor
                this.range=range
                if(cursor && cursorPosition){
                    const {x,y,left,top,height,fontFamily,fontSize}=cursorPosition
                    this.cursor=React.cloneElement(cursor, {
                        x,y,left,top,fontFamily,fontSize,
                        height: isCursor ? height : 0,
                    })
                }

                if(range && (rangeRects && rangeRects.length || focusShape)){
                    this.range=React.cloneElement(range,{rects:rangeRects,shape:focusShape})
                }

				this.style=cursorPosition ? new SelectionStyle(cursorPosition,positioning, a.start, a.end) : null
				return true
			}
        }

        return false
    }

    componentDidUpdate({selection,content}){
        this.scrollCursorIntoView()
        this.props.dispatch(ACTION.Selection.STYLE(this.style))
        this.last={content:this.props.content, selection:this.props.selection}
    }

	scrollCursorIntoView(){
        const viewporter=this.canvas.closest('[style*="overflow"]')
		const cursor=this.refs.cursor.getBoundingClientRect()
		const {top,height,bottom=top+height}=viewporter.getBoundingClientRect()
		if(cursor.bottom<top){
			viewporter.scrollTop-=(top-cursor.top+cursor.height)
		}else if(cursor.top>bottom){
			viewporter.scrollTop+=(cursor.bottom-bottom+cursor.height)
		}
	}
})


