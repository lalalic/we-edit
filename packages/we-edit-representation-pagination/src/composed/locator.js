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
        let {cursor, range, selection, scale, content}=this.props
        const {position,rects}=this.getCursorSelection(content, selection, scale)
		if(cursor  && position){
			const {id}=position
			let myShape=this.getComposer(id).getCursor()
			if(myShape){
				const {children:defaultCursorShape}=cursor.props
				if(defaultCursorShape){
					const {children:_forget, onMove, onResize, onRotate}=defaultCursorShape.props
					myShape=React.cloneElement(myShape, {onMove, onResize, onRotate})
				}
				cursor=React.cloneElement(cursor,{children:myShape})
			}
			const {x,y,left,top,height,fontFamily,fontSize}=position

			cursor=React.cloneElement(cursor, {x,y,left,top,height,fontFamily,fontSize})
		}

		if(range && rects){
			range=React.cloneElement(range, {rects})
		}
        return (
            <Fragment>
				<g ref="cursor">
					{cursor}
				</g>
                {range}
            </Fragment>
        )
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
		this.scrollCursorIntoView()
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

    getCursorSelection=memoize((content, selection,scale)=>{
        const {updateSelection}=this.props
        const {cursorAt, ...a}=selection.toJS()
        const {id,at}=a[cursorAt]
        let position=this.position(id, at)
        let rects=undefined
        try{
            if(a.start.id!=a.end.id || a.start.at!=a.end.at){
                rects=this.getRangeRects(a.start,a.end)
            }
        }catch(e){
            console.warn(e)
        }
        return {position,rects}
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

	around(node, left){
		let {content}=node.dataset
		if(content){
			return {
				id:content,
				x:Math.max(left-node.getBoundingClientRect().left,0)/this.props.scale,
				node
			}
		}

		let child=node.querySelector("[data-content]")
		if(child){
			return this.around(child,left)
		}

		let parent=node.closest("[data-content]")
		if(parent){
			return this.around(parent,left)
		}

		return {}
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

		const {x,y,width,node, ...position}=this.getComposer(id).position(this,at)

		return {
			id,at,node,x,y,
			...position,
			...this.asViewportPoint({x,y}),
			...paginate(node),
		}
    }

    line(id,at,offset){
		const position=this.position(id,at)
        if(!position)
            return
        const {page,column,line,left}=position
        const pages=this.canvas.querySelectorAll(".page")
        const nPage=pages[page]
        const columns=nPage.querySelectorAll(".column")
        const nColumn=columns[column]
        const lines=this.lines(nColumn)
        const nLine=lines[line+offset]
        if(!nLine){
            if(columns.length-1>column){
                return this.nextLine({...arguments[0],column:column+offset})
            }

            if(pages.length-1>page){
                return this.nextLine({...arguments[0],page:page+offset})
            }

            return {id,at}
        }

		const contents=Array.from(nLine.querySelectorAll("[data-content]"))
        const i=contents.map(a=>a.getBoundingClientRect().left)
            .concat([left])
            .sort((a,b)=>a-b)
            .lastIndexOf(left)
		const node=contents[i==0 ? 0 : i-1]
		return {
			id:node.dataset.content,
			x:(left-node.getBoundingClientRect().left)/this.props.scale,
			node
		}
	}
	nextLine(id,at){
        return this.line(id,at,1)
    }

    prevLine(id,at){
        return this.line(id,at,-1)
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
    getRangeRects(start, end){
        if(start.id==end.id && !this.getComposer(start.id).splittable){
			const {x,y,width,height}=this.getClientRect(start.id)
			const {left,top}=this.asViewportPoint({x,y})
			const {right,bottom}=this.asViewportPoint({x:x+width, y:y+height})
			return [{left,right,top,bottom}]
		}else{
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
				return [{left,right,top,bottom}]
			}else{
				return this._getRangeRects(p0, p1)
			}
		}
    }

    getClientRects(id){
        return Array.from(this.canvas.querySelectorAll(`[data-content="${id}"]`))
			.map(a=>this.getClientRect(id,a))
    }

	getClientRect(id, node){
		node=node||this.canvas.querySelector(`[data-content="${id}"]`)
		const {left,top,width,height}=node.getBoundingClientRect()
        const {x,y}=this.asCanvasPoint({left,top})
		return {
			x,y,left,top,node,
			width:width/this.props.scale,height:height/this.props.scale
		}
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
