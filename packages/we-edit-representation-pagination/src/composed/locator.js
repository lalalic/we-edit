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
            const {position,rects}=this.getRangeAndPosition(positioning,selection)
            this.makeCursorSelection(position,rects,arguments[0])
            this.style=new SelectionStyle(position,positioning)
            return true
        }

        return false
    }

    makeCursorSelection(position,rects,{cursor, range, selection,getComposer}){
        this.cursor=null
        this.range=null
        try{
			this.range=range
            if(!!position){
                const {x,y,left,top,height,fontFamily,fontSize}=position
                this.cursor=React.cloneElement(cursor, {x,y,left,top,height,fontFamily,fontSize})
            }

            if(range && rects && rects.length){
				const {start, end}=selection.toJS()
				this.range=React.cloneElement(range,{
                    rects,
                    shape: start.id==end.id && getComposer(start.id).getFocusShape()
                })

                this.cursor=React.cloneElement(this.cursor||cursor,{height:0.1})
			}
		}catch(e){

		}
    }

    getRangeAndPosition(positioning,selection){
        const {cursorAt, ...a}=selection.toJS()
        const {id,at}=a[cursorAt]
        return {
            position:positioning.position(id, at),
            rects:a.start.id!=a.end.id || a.start.at!=a.end.at ? positioning.getRangeRects(a.start,a.end) :[]
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

class SelectionStyle{
    constructor(position,positioning){
        this.position=position
        this.positioning=positioning
        this.getComposer=a=>positioning.getComposer(a)
        this.getContent=a=>positioning.getContent(a)
    }

    props(type, getFromContent=true){
        if(getFromContent){
            return this.content(type).props
        }

        if(type.toLowerCase()=="page"){
            return this.pageProps()
        }

        const {id:typed}=this.content(type)
        if(typed){
            const composer=this.getComposer(typed)
            if(composer){
                return composer.props
            }
        }
    }

    pageProps(){
        const pageY=()=>this.positioning.pageXY(this.position.page).y
        return {
            ...this.position,
            get pageY(){
                return pageY()
            }
        }
    }

    content(type){
        let $=this.getContent(this.position.id)
        let props=$.is(type) ? $.props() : $.closest(type).props()
        return props ? props.toJS() : {props:null}
    }
}
