import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"
import {connect,ACTION, ContentQuery} from "we-edit"
import {compose} from "recompose"
import memoize from "memoize-one"

const LINE=".line:not(:empty)"

export default compose(
    connect(
        state=>({
            content:state.get("content").hashCode(),
            selection:state.get("selection"),
            getContent(id){
				return new ContentQuery(state,  id ? `#${id}`  : undefined)
			},
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
    state={content:null,canvas:null}
    render(){
        if(!this.state.canvas)
            return null
        const {cursor, range, selection, scale, content}=this.props
        const {position={height:0,x:0,y:0},path={path:""}}=this.getCursorSelection(content, selection, scale)
        return (
            <Fragment>
                {cursor && React.cloneElement(cursor, {
                    ...position,
                    onArrowRight:this.onArrowRight.bind(this),
                    onArrowLeft:this.onArrowLeft.bind(this),
                })}
                {range && React.cloneElement(range, path)}
            </Fragment>
        )
    }

    get cursor(){
        const {cursorAt, ...a}=this.props.selection.toJS()
        return a[cursorAt]
    }

    onArrowRight(selecting){
        const {dispatch}=this.props
        if(selecting){
            const {id,at}=this.nextSelectable()
            dispatch(ACTION.Selection.END_AT(id,at))
        }else{
            const {id,at}=this.nextCursorable()
            dispatch(ACTION.Cursor.AT(id,at))
        }
    }

    onArrowLeft(selecting){
        const {dispatch}=this.props
        if(selecting){
            const {id,at}=this.prevSelectable()
            dispatch(ACTION.Selection.START_AT(id,at))
        }else{
            const{id,at}=this.prevCursorable()
            dispatch(ACTION.Cursor.AT(id,at))
        }
    }

    nextCursorable(){
        let {id,at}=this.cursor
        const next=(id,at)=>{
            let composer=this.getComposer(id)
            if(composer){
                return composer.nextCursorable(at)
            }
            return false
        }


        if((at=next(id,at))===false){
            this.getContent(id)
                .forwardUntil(a=>{
                    if((at=next(id=a.get("id")))!==false)
                        return true
                })
        }
        if(at!==false)
            return {id,at}
        return this.cursor
    }

    prevCursorable(){
        let {id,at}=this.cursor
        const next=(id,at)=>{
            let composer=this.getComposer(id)
            if(composer){
                return composer.prevCursorable(at)
            }
            return false
        }

        if((at=next(id,at))===false){
            this.getContent(id)
                .backwardUntil(a=>{
                    if((at=next(id=a.get("id")))!==false)
                        return true
                })
        }
        if(at!==false)
            return {id,at}
        return this.cursor
    }

    nextSelectable(){
        let {id,at}=this.cursor
        const next=(id,at)=>{
            let composer=this.getComposer(id)
            if(composer){
                return composer.nextSelectable(at)
            }
            return false
        }


        if((at=next(id,at))===false){
            this.getContent(id)
                .forwardUntil(a=>{
                    if((at=next(id=a.get("id")))!==false)
                        return true
                })
        }
        if(at!==false)
            return {id,at}
        return this.cursor
    }

    prevSelectable(){
        let {id,at}=this.cursor
        const next=(id,at)=>{
            let composer=this.getComposer(id)
            if(composer){
                return composer.prevSelectable(at)
            }
            return false
        }


        if((at=next(id,at))===false){
            this.getContent(id)
                .backwardUntil(a=>{
                    if((at=next(id=a.get("id")))!==false)
                        return true
                })
        }
        if(at!==false)
            return {id,at}
        return this.cursor
    }

    getComposer(id){
        return this.props.getComposer(id)
    }

    shouldComponentUpdate({content,selection},state){
        return state.content==content
    }

    componentDidUpdate({selection},{content}){
        if(!this.props.selection.equals(selection) || content!=this.state.content){
            const {scale, updateSelectionStyle}=this.props
			const style=this.getSelectionStyle(this.props.content,this.props.selection, scale)
            updateSelectionStyle(style)
        }
    }

    get canvas(){
        return this.state.canvas
    }

    getCursorSelection=memoize((content, selection,scale)=>{
        const {updateSelection}=this.props
        const {cursorAt, ...a}=selection.toJS()
        const {id,at}=a[cursorAt]
        let position=this.position(id, at)
        let path=undefined
        try{
            if(a.start.id!=a.end.id || a.start.at!=a.end.at){
                path=this.getRangePath(a.start,a.end)
            }
        }catch(e){
            console.warn(e)
        }
        return {position,path}
    })

    getBoundingClientRect(){
        return this.canvas.getBoundingClientRect()
    }

    asCanvasPoint({left,top}, element){
        let point=this.canvas.createSVGPoint()
        point.x=left,point.y=top
        let a=point.matrixTransform((element||this.canvas).getScreenCTM().inverse())
        return {x:a.x, y:a.y}
    }

    asViewportPoint({x,y}){
        let point=this.canvas.createSVGPoint()
        point.x=x,point.y=y
        let location=point.matrixTransform(this.canvas.getScreenCTM())
        return {left:location.x, top:location.y}
    }

    getContent(id){
        return this.props.getContent(...arguments)
    }

    locate(id,at,left){
        let x=left/this.props.scale
        const {endat, node}=this.getTextClientRect(id,at)
        let text=node.textContent
        const measure=this.getComposer(id).measure
        const end=measure.widthString(x, text)
        return {id,at:endat-text.length+end}
    }

    closest(a,types,test=a=>a.getAttribute("class")){
        let found={}
        let selectors=[...types]
        while(a && a!=this.canvas && selectors.length){
            let type=test(a)
            if(selectors.includes(type)){
                found[type]=a
                selectors.splice(selectors.indexOf(type),1)
            }
            a=a.parentNode
        }
        if(types.length==1)
            return found[types[0]]

        return found
    }

	lines(n){
		const nested=Array.from(n.querySelectorAll(".line .line"))
		return Array.from(n.querySelectorAll(LINE)).filter(a=>!nested.includes(a))
	}

    position(id,at){
        const paginate=node=>{
            const {page,column,line}=this.closest(node, ["line","column","page"])
            return {
                page:Array.from(this.canvas.querySelectorAll(".page")).indexOf(page),
                column:Array.from(page.querySelectorAll(".column")).indexOf(column),
                line:line!==undefined ? this.lines(column).indexOf(line): undefined
            }
        }

        if(this.getComposer(id).getComposeType()=="text"){
            const rect=this.getTextClientRect(id,at)
            if(rect){
                let x=rect.x
                const {y,endat,node}=rect
                const text=node.textContent
                const measure=this.getComposer(id).measure
                const {fontSize, fontFamily,height}=measure.defaultStyle

                x+=measure.stringWidth(text.substring(0,at-(endat-text.length)))

                return {
                    id,at,
                    x,y,
                    ...this.asViewportPoint({x,y}),
                    ...paginate(node),
                    height,
                    fontFamily,fontSize,
                    node
                }
            }
        }else{
            if(at==0){
                const node=this.canvas.querySelector(`[data-content="${id}"]`)
                const {left,top,width,height}=node.getBoundingClientRect()
                return {
                    id,at,
                    ...this.asCanvasPoint({left,top}),
                    left,top,
                    height,
                    ...paginate(node),
                    node
                }
            }else{
                const node=Array.from(this.canvas.querySelectorAll(`[data-content="${id}"]`)).pop()
                const {left,top,width,height}=node.getBoundingClientRect()
                const right=left+width
                return {
                    id,at,
                    ...this.asCanvasPoint({left:right,top}),
                    left:right,top,
                    height,
                    ...paginate(node),
                    node
                }
            }
        }
    }

    nextLine(id,at, selecting){
        const position=this.position(id,at)
        if(!position)
            return
        const {page,column,line,left}=position
        const pages=this.canvas.querySelectorAll(".page")
        const nPage=pages[page]
        const columns=nPage.querySelectorAll(".column")
        const nColumn=columns[column]
        const lines=this.lines(nColumn)
        const nLine=lines[line+1]
        if(!nLine){
            if(columns.length-1>column){
                return this.nextLine({...arguments[0],column:column+1})
            }

            if(pages.length-1>page){
                return this.nextLine({...arguments[0],page:page+1})
            }

            return {id,at}
        }
		const firstContent=nLine.querySelector("[data-content]")
		if(firstContent){
			if(firstContent.dataset.type=="table"){
				let row=firstContent.querySelector('[data-type="row"]')
				return {id:row.dataset.content, at:1}
			}
		}else{
			return {id,at}
		}

        const contents=Array.from(nLine.querySelectorAll("[data-content]"))
        const i=contents.map(a=>a.getBoundingClientRect().left)
            .concat([left])
            .sort((a,b)=>a-b)
            .indexOf(left)
        let node=contents[i>0 ? i-1 : 0]
        if(!node)
            return {id,at}

		switch(node.dataset.type){
			case "image":
				return {id:node.dataset.content, at:1}
			case "text":
				break
			default:
				node=node.querySelector('[data-type="text"]')
		}
		//suppose text positioning
        if(!node)
            return {id,at}
        const {content, endat}=node.dataset
        const rect=node.getBoundingClientRect()
        if(left>rect.left){
            return this.locate(content,parseInt(endat),left-rect.left)
        }else{
            return {id:content, at: endat-node.textContent.length}
        }
    }

    prevLine(id,at, selecting){
        const position=this.position(id,at)
        if(!position)
            return
        const {page,column,line,left}=position
        const pages=this.canvas.querySelectorAll(".page")
        const nPage=pages[page]
        const columns=nPage.querySelectorAll(".column")
        const nColumn=columns[column]
        const lines=this.lines(nColumn)
        const nLine=lines[line-1]
        if(!nLine){
            if(column>0){
                return this.prevLine({...arguments[0],column:column-1})
            }

            if(page>0){
                return this.prevLine({...arguments[0],page:page-1})
            }

            return {id,at}
        }

		const firstContent=nLine.querySelector("[data-content]")
		if(firstContent){
			if(firstContent.dataset.type=="table"){
				let row=firstContent.querySelector('[data-type="row"]')
				return {id:row.dataset.content, at:1}
			}
		}else{
			return {id,at}
		}

        const contents=Array.from(nLine.querySelectorAll("[data-content]"))
        const i=contents.map(a=>a.getBoundingClientRect().left)
            .concat([left])
            .sort((a,b)=>a-b)
            .indexOf(left)
        let node=contents[i>0 ? i-1 : 0]
        if(!node)
            return {id,at}


		switch(node.dataset.type){
			case "image":
				return {id:node.dataset.content, at:1}
			case "text":
				break
			default:
				node=node.querySelector('[data-type="text"]')
		}
		//suppose text positioning
        if(!node)
            return {id,at}
        const {content, endat}=node.dataset
        const rect=node.getBoundingClientRect()
        if(left>rect.left){
            return this.locate(content,parseInt(endat),left-rect.left)
        }else{
            return {id:content, at: endat}
        }
    }

    _getRangeRects(p0, p1){
        const rects=[]
        const lineRect=line=>{
            const {left,top,width,height}=line.getBoundingClientRect()
            rects.push({left,top,right:left+width,bottom:top+height})
        }

        const pages=Array.from(this.canvas.querySelectorAll(".page"))
        const query2Line=(page,column,line,node,at)=>{
            return this.lines(pages[page].querySelectorAll(".column")[column])[line]
        }

        pages.slice(p0.page, p1.page+1).forEach(a=>{
            this.lines(a).forEach(lineRect)
        })
        //remove from first page before
        let firstIndex=-1;
        (({page,column,line,left,top,node})=>{
            //remove first page prev sibling lines
            const lines=this.lines(pages[page])
            let nLine=line==undefined ? node.querySelector(LINE) : query2Line(page,column,line)
			if(!nLine){
				throw new Error("can't find line for start point")
			}
            firstIndex=lines.indexOf(nLine)
            rects.splice(0,firstIndex+1)
            //first line rect
            const a=nLine.getBoundingClientRect()
            rects.unshift({left,top,right:a.left+a.width,bottom:a.top+a.height})
        })(p0);


        //remove from last page next
        (({page,column,line,left:right,node})=>{
            const nLine=line==undefined ? this.lines(node).pop() : query2Line(page,column,line)
			if(!nLine){
				throw new Error("can't find line for end point")
			}
            //remove last page next sibling lines
            const lines=this.lines(pages[page])
            rects.splice(lines.indexOf(nLine)-firstIndex)

            //last line rect
            const {left,top,height}=nLine.getBoundingClientRect()
            rects.push({left,top,right,bottom:top+height})
        })(p1);

        return rects.map(({left,top,right,bottom})=>{
            let a=this.asCanvasPoint({left,top})
            let b=this.asCanvasPoint({left:right,top:bottom})
            return {left:a.x,top:a.y,right:b.x,bottom:b.y}
        })
    }
    getRangePath(start, end){
        const type=this.getComposer(start.id).getComposeType()
        const rect=a=>`M${a.left} ${a.top} L${a.right} ${a.top} L${a.right} ${a.bottom} L${a.left} ${a.bottom} Z`
        if(start.id==end.id && this.getComposer(start.id).noChild && type!="text"){
            const a=this.canvas.querySelector(`[data-content="${start.id}"]`).getBoundingClientRect()
            const {x:left,y:top}=this.asCanvasPoint({left:a.left,top:a.top})
            const {x:right,y:bottom}=this.asCanvasPoint({left:a.left+a.width,top:a.top+a.height})
            return {type,path:rect({left,right,top,bottom})}
        }

        const [p0,p1]=((start,end)=>{
            if(end.page<start.page ||
				(end.page==start.page && end.column<start.column) ||
				(end.page==start.page && end.column==start.column && end.line<start.line) ||
				(end.page==start.page && end.column==start.column && end.line==start.line && end.left<start.left)){
                return [end,start]
            }
            return [start,end]
        })(this.position(start.id,start.at),this.position(end.id, end.at));

        let paths=[]
		if(p0.top==p1.top){
            const {x:left, y:top, height, bottom=top+height}=p0
            const {x:right}=p1
            return {type:"range",path:rect({left,right,top,bottom})}
		}else{
			return {type:"range",path: this._getRangeRects(p0, p1).map(rect).join(" ")}
		}
    }

    getClientRects(id){
        let rects=[]
        this.canvas.querySelectorAll(`[data-content="${id}"]`)
            .forEach(a=>{
                let {left,top,width,height,length}=a.getBoundingClientRect()
                const {endat,type}=a.dataset
                const {x,y}=this.asCanvasPoint({left,top})
                if(type=="text"){
                    length=a.textContent.length
                }
                rects.push(Object.freeze({
                    node:a,x,y,
                    endat:parseInt(endat), type,length,
                    width:width/this.props.scale,height:height/this.props.scale
                }))
            })
        return rects.length ? rects : null
    }

    getTextClientRect(id, at){
        const rects=this.getClientRects(id)
        if(rects){
            const i=rects.map(a=>a.endat)
                .concat([at])
                .sort((a,b)=>a-b)
                .indexOf(at)
            return rects[i]
        }
        return null
    }

    pageY(page){
        const {left,top}=this.canvas.querySelectorAll(".page")[page].closest("[transform]").getBoundingClientRect()
        return this.asCanvasPoint({left,top}).y
    }

    getSelectionStyle=memoize((content,selection,scale)=>{
        const {position,path}=this.getCursorSelection(content,selection, scale)
		if(!position)
			return null
		const {page,column,line,id,at,node}=position
        const fromContent=type=>{
            let $=this.getContent(id)
            let props=$.is(type) ? $.props() : $.closest(type).props()
            return props ? props.toJS().props : null
        }
        const self=this
        return {
			version:"1.0.0",
            props:memoize((type,bContent=true)=>{
				if(bContent){//from content in state
					return fromContent(type)
				}

				let reType=new RegExp(type,"i")
				if(reType.test("page")){
					return {
						page,
						column,
						line,
						get pageY(){
							return self.pageY(page)
						}
					}
				}

                let found=this.closest(node,[type],a=>a.dataset.type)
				if(found){
					let composer=self.getComposer(found.dataset.content)
					if(composer){
						return composer.props
					}
				}

				return fromContent(type)
			})
        }
    })
})
