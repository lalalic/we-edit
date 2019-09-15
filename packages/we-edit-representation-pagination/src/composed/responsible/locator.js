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
                if(cursor && cursorPosition && isCursor){
                    const {x,y,left,top,height,fontFamily,fontSize}=cursorPosition
                    this.cursor=React.cloneElement(cursor, {x,y,left,top,height,fontFamily,fontSize})
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

class SelectionStyle{
    constructor(position,positioning, start, end){
        this.position=position
        this.positioning=positioning
        this.getComposer=a=>positioning.getComposer(a)
        this.getContent=a=>positioning.getContent(a)
        this.start=start.id
        this.end=end.id
        if(start.id!=end.id){
            if(this.getContent(start.id).forwardFirst(`#${end.id}`).length==0){
                this.start=end.id
                this.end=start.id
            }
        }
    }

    toJSON(){
        return "Selection.Style"
    }

    props(type, getFromContent=true){
        if(type.toLowerCase()=="page"){
            return this.pageProps()
        }else if(type.toLowerCase()=="layout"){
            return this.layoutProps()
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
    }

    layoutProps(){
        if(!this.positioning.canvas)
            return null
        const page=this.positioning.pages[this.position.page]
        return page.layoutOf(page.columnIndexOf(page.lineIndexOf(this.position)))
    }

    pageProps(){
        if(!this.positioning.canvas)
            return null
        const page=this.positioning.pages[this.position.page]
        const pageY=()=>this.positioning.pageXY(this.position.page).y
        const line=()=>page.lineIndexOf(this.position)
        const column=()=>page.columnIndexOf(line())
        const cols=()=>[...page.cols]
        const {margin, width,height}=page.props
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
            get size(){
                return {width,height}
            },

            get margin(){
                return margin
            }
        }
    }

    content(type){
        if(this.start!=this.end){
            var targets=this.getContent(this.start).forwardUntil(`#${this.end}`)
            targets=targets.add('#'+this.end).add('#'+this.start,"unshift")
            targets=targets.filter(type)
            if(targets.length>0){
                return targets.props().toJS()
            }else{
                return {props:null}
            }
        }else{
            let $=this.getContent(this.position.id)
            let props=$.is(type) ? $.props() : $.closest(type).props()
            return props ? props.toJS() : {props:null}
        }
    }
}
