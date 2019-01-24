import React, {Component, Fragment, PureComponent} from "react"
import PropTypes from "prop-types"
import {connect,ACTION, ContentQuery} from "we-edit"
import {compose} from "recompose"
import memoize from "memoize-one"

//update when content recomposed, and selection changed
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

	updateSelectionStyle(style){
		this.props.dispatch(ACTION.Selection.STYLE(style))
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

    shouldComponentUpdate({content,selection,positioning},state){
		if(content.equals(state.content)){
			if(!content.equals(this.props.content) || !selection.equals(this.props.selection)
                || !content.equals(this.last.content) || !selection.equals(this.last.selection)){
				const {position,rects}=this.getRangeAndPosition(positioning,selection)
				this.makeCursorSelection(position,rects,arguments[0])
				this.style=position ? new SelectionStyle(position,positioning) : null
				return true
			}
        }

        return false
    }

    componentDidUpdate({selection,content}){
        this.scrollCursorIntoView()
        this.updateSelectionStyle(this.style)
        this.last={content:this.props.content, selection:this.props.selection}
    }

    makeCursorSelection(position,rects,{cursor, range, selection,positioning}){
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
                    shape: start.id==end.id && positioning.getComposer(start.id).getFocusShape()
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

class SelectionStyle{
    constructor(position,positioning){
        this.position=position
        this.positioning=positioning
        this.getComposer=a=>positioning.getComposer(a)
        this.getContent=a=>positioning.getContent(a)
    }

    toJSON(){
        return "Selection.Style"
    }

    props=memoize((type, getFromContent=true)=>{
        if(type.toLowerCase()=="page"){
            return this.pageProps()
        }

        if(getFromContent){
            return this.content(type).props
        }

        const {id:typed}=this.content(type)
        if(typed){
            const composer=this.getComposer(typed)
            if(composer){
                return composer.props
            }
        }
    })

    pageProps(){
        const page=this.positioning.pages[this.position.page]
        const pageY=()=>this.positioning.pageXY(this.position.page).y
        const line=()=>page.lineIndexOf(this.position)
        const column=()=>page.columnIndexOf(line())
        const cols=()=>[...page.cols]
        return {
            ...this.position,
            get pageY(){
                return pageY()
            },
            get line(){
                return line()
            },
            get column(){
                return column()
            },
            get cols(){
                return cols()
            },
        }
    }

    content(type){
        let $=this.getContent(this.position.id)
        let props=$.is(type) ? $.props() : $.closest(type).props()
        return props ? props.toJS() : {props:null}
    }
}
