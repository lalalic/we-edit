import React, {Component, Fragment, PureComponent} from "react"
import PropTypes from "prop-types"
import {connect,ACTION, ContentQuery} from "we-edit"
import {compose} from "recompose"
import memoize from "memoize-one"

export default compose(
    connect(
        state=>({
            content:state.get("content"),
            selection:state.get("selection"),
        }),
        (dispatch)=>{
            return {
                updateSelectionStyle(style){
                    dispatch(ACTION.Selection.STYLE(style))
                },
                dispatch
            }
        },
        undefined,
        {withRef:true}
    ),

)(class Locator extends Component{
    constructor(){
        super(...arguments)
        this.state={content:null,canvas:null}
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

    shouldComponentUpdate({content,selection,scale,getComposer,getContent,positioning},state){
        if(selection && !selection.equals(this.props.selection)){
            this.newSelection=true
        }
        if(this.newSelection===false){
            delete this.newSelection
            return false
        }

        if(!state.canvas)
            return false

        if(content.equals(state.content)){
            this.makeCursorSelection(arguments[0])
            if(this.newSelection){
                this.style=positioning.getSelectionStyle(content,selection,scale)
            }
            return true
        }

        return false
    }

    makeCursorSelection(props){
        let {cursor, range, selection, scale, content,getComposer,positioning}=props
        const {position,rects}=positioning.getCursorSelection(content, selection, scale)
        if(cursor  && position){
            const {id}=position
            let myShape=getComposer(id).getCursor()
            if(myShape){
                const {children:defaultCursorShape}=cursor.props
                if(defaultCursorShape){
                    const {children:_forget, onMove, onResize, onRotate}=defaultCursorShape.props
                    myShape=React.cloneElement(myShape, {onMove, onResize, onRotate})
                }
                cursor=React.cloneElement(cursor,{children:myShape})
            }
            const {x,y,left,top,height,fontFamily,fontSize}=position

            this.cursor=React.cloneElement(cursor, {x,y,left,top,height,fontFamily,fontSize})
        }

        if(range){
            this.range=React.cloneElement(range,{rects})
        }
    }

    componentDidUpdate({selection}){
        if(this.canvas){
            if(this.newSelection){
                this.scrollCursorIntoView()
                this.props.updateSelectionStyle(this.style)
                this.newSelection=false
            }
        }
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

    get canvas(){
        return this.state.canvas
    }
})
