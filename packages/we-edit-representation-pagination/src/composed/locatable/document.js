import React from "react"
import PropTypes from "prop-types"
import {ContentQuery} from "we-edit"
import memoize from "memoize-one"

const LINE=".line:not(:empty)"
export default A=>class LocatableDocument extends A{
    static contextTypes={
        ...A.contextTypes,
        activeDocStore: PropTypes.any,
        Measure: PropTypes.func
    }
    render(){
        return this.root=React.cloneElement(super.render(),{ref:a=>this.canvas=a})
    }

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

    getContent=memoize((state, id)=>{
        return new ContentQuery(state, id ? "#"+id : undefined)
    })

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

    position(id,at){
        const paginate=node=>{
            const {page,column,line}=this.closest(node, ["line","column","page"])
            return {
                page:Array.from(this.canvas.querySelectorAll(".page")).indexOf(page),
                column:Array.from(page.querySelectorAll(".column")).indexOf(column),
                line:line!==undefined ? Array.from(column.querySelectorAll(LINE)).indexOf(line): undefined
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
        return null
    }

    nextLine(id,at){
        const position=this.position(id,at)
        if(!position)
            return
        const {page,column,line,left}=position
        const pages=this.canvas.querySelectorAll(".page")
        const nPage=pages[page]
        const columns=nPage.querySelectorAll(".column")
        const nColumn=columns[column]
        const lines=nColumn.querySelectorAll(LINE)
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
        const contents=Array.from(nLine.querySelectorAll("[data-content]"))
        const i=contents.map(a=>a.getBoundingClientRect().left)
            .concat([left])
            .sort((a,b)=>a-b)
            .indexOf(left)
        const node=contents[i>0 ? i-1 : 0]
        if(!node)
            return {id,at}
        const text=node.dataset.type=="text" ? node : node.querySelector('[data-type="text"]')
        if(!text)
            return {id,at}
        const {content, endat}=text.dataset
        const rect=text.getBoundingClientRect()
        if(left>rect.left){
            return this.locate(content,parseInt(endat),left-rect.left)
        }else{
            return {id:content, at: endat-text.textContent.length}
        }
    }

    prevLine(id,at){
        const position=this.position(id,at)
        if(!position)
            return
        const {page,column,line,left}=position
        const pages=this.canvas.querySelectorAll(".page")
        const nPage=pages[page]
        const columns=nPage.querySelectorAll(".column")
        const nColumn=columns[column]
        const lines=nColumn.querySelectorAll(LINE)
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
        const contents=Array.from(nLine.querySelectorAll("[data-content]"))
        const i=contents.map(a=>a.getBoundingClientRect().left)
            .concat([left])
            .sort((a,b)=>a-b)
            .indexOf(left)
        const node=contents[i>0 ? i-1 : 0]
        if(!node)
            return {id,at}

        const text=node.dataset.type=="text" ? node : Array.from(node.querySelectorAll('[data-type="text"]')).pop()
        if(!text)
            return {id,at}

        const rect=text.getBoundingClientRect()
        const {content, endat}=text.dataset
        if(left>rect.left){
            return this.locate(content,parseInt(endat),left-rect.left)
        }else{
            return {id:content, at:endat}
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
            return pages[page].querySelectorAll(".column")[column].querySelectorAll(LINE)[line]
        }

        pages.slice(p0.page, p1.page+1).forEach(a=>{
            Array.from(a.querySelectorAll(LINE)).forEach(lineRect)
        })
        //remove from first page before
        let firstIndex=0;
        (({page,column,line,left,top,node})=>{
            //remove first page prev sibling lines
            const lines=Array.from(pages[page].querySelectorAll(LINE))
            let nLine=line==undefined ? node.querySelector(LINE) : query2Line(page,column,line)
            firstIndex=lines.indexOf(nLine)
            rects.splice(0,firstIndex+1)
            //first line rect
            const a=nLine.getBoundingClientRect()
            rects.unshift({left,top,right:a.left+a.width,bottom:a.top+a.height})
        })(p0);


        //remove from last page next
        (({page,column,line,left:right,node})=>{
            const nLine=line==undefined ? Array.from(node.querySelectorAll(LINE)).pop() : query2Line(page,column,line)
            //remove last page next sibling lines
            const lines=Array.from(pages[page].querySelectorAll(LINE))
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
        const {left,top}=this.canvas.querySelectorAll(".page")[page].getBoundingClientRect()
        return this.asCanvasPoint({left,top}).y
    }

    asSelection({page,column,line,node,id,at}){
        const self=this
		const state=this.context.activeDocStore.getState()
        const fromContent=type=>{
			let $=self.getContent(state,id)
			let props=$.is(type) ? $.props() : $.closest(type).props()
			return props ? props.toJS().props : null
		}
		return {
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
    }
}
