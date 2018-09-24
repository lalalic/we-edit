import React from "react"
import PropTypes from "prop-types"
import {ContentQuery} from "we-edit"
import memoize from "memoize-one"

export default A=>class LocatableDocument extends A{
    static contextTypes={
        ...A.contextTypes,
        store: PropTypes.any,
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

    getContent(selector){
        const content=this.context.store.getState().get("content")
        return new ContentQuery(content, selector)
    }

    locate(id,at,left){
        let x=left/this.props.scale
        const {endat, node}=this.getTextClientRect(id,at)
        let text=node.textContent
        const measure=this.getComposer(id).measure
        const end=measure.widthString(x, text)
        return {id,at:endat-text.length+end}
    }

    position(id,at){
        const paginate=node=>{
            const {page,column,line}=((a,selectors,found={})=>{
                while(a && a.nodeName.toUpperCase()!="SVG" && selectors.length){
                    let type=a.getAttribute("class")
                    if(selectors.includes(type)){
                        found[type]=a
                        selectors.splice(selectors.indexOf(type),1)
                    }
                    a=a.parentNode
                }
                return found
            })(node,"line,column,page".split(","));

            return {
                page:Array.from(this.canvas.querySelectorAll(".page")).indexOf(page),
                column:Array.from(page.querySelectorAll(".column")).indexOf(column),
                line:line!==undefined ? Array.from(column.querySelectorAll(".line:not(:empty)")).indexOf(line): undefined
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
                }
            }
        }else{
            if(at==0){
                const node=this.canvas.querySelector(`[data-content="${id}"]`)
                const {left,top,width,height}=node.getBoundingClientRect()
                return {
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
                const bottom=top+height
                return {
                    ...this.asCanvasPoint({left:right,top:bottom}),
                    left:right,top:bottom,
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
        const lines=nColumn.querySelectorAll(".line:not(:empty)")
        const nLine=lines[line+1]
        if(!nLine){
            if(columns.length-1>column){
                return this.nextLine({...arguments[0],column:column+1})
            }

            if(pages.length-1>page){
                return this.nextLine({...arguments[0],page:page+1})
            }

            return arguments[0]
        }
        const contents=Array.from(nLine.querySelectorAll("[data-content]"))
        const i=contents.map(a=>a.getBoundingClientRect().left)
            .concat([left])
            .sort((a,b)=>a-b)
            .indexOf(left)
        const node=contents[i<0 ? 0 : i-1]
        const rect=node.getBoundingClientRect()
        const {content, endat}=node.dataset
        return this.locate(content,parseInt(endat),left-rect.left)
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
        const lines=nColumn.querySelectorAll(".line:not(:empty)")
        const nLine=lines[line-1]
        if(!nLine){
            if(column>0){
                return this.prevLine({...arguments[0],column:column-1})
            }

            if(page>0){
                return this.prevLine({...arguments[0],page:page-1})
            }

            return arguments[0]
        }
        const contents=Array.from(nLine.querySelectorAll("[data-content]"))
        const i=contents.map(a=>a.getBoundingClientRect().left)
            .concat([left])
            .sort((a,b)=>a-b)
            .indexOf(left)
        const node=contents[i<0 ? 0 : i-1]
        const rect=node.getBoundingClientRect()
        const {content, endat}=node.dataset
        return this.locate(content,parseInt(endat),left-rect.left)
    }

    _getRangeRects(p0, p1){
        const rects=[]
        const lineRect=line=>{
            const {left,top,width,height}=line.getBoundingClientRect()
            rects.push({left,top,right:left+width,bottom:top+height})
        }

        const pages=Array.from(this.canvas.querySelectorAll(".page"))
        const query2Line=(page,column,line,node,at)=>{
            return pages[page].querySelectorAll(".column")[column].querySelectorAll(".line")[line]
        }

        pages.slice(p0.page, p1.page+1).forEach(a=>{
            Array.from(a.querySelectorAll(".line")).forEach(lineRect)
        })

        //remove from first page before
        (({page,column,line,left,top,node})=>{
            //remove first page prev sibling lines
            const lines=Array.from(pages[page].querySelectorAll(".line"))
            let nLine=line==undefined ? node.querySelector(".line") : query2Line(page,column,line)
            rects.splice(0,lines.indexOf(nLine)+1)
            //first line rect
            const {width,height}=nLine.getBoundingClientRect()
            rects.unshift({left,top,right:left+width,bottom:top+height})
        })(p0);


        //remove from last page next
        (({page,column,line,left:right,node})=>{
            const nLine=line==undefined ? Array.from(node.querySelectorAll(".line")).pop() : query2Line(page,column,line)
            //remove last page next sibling lines
            const lines=Array.from(pages[page].querySelectorAll(".line"))
            rects.splice(lines.indexOf(nLine))

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
        if(start.id==end.id && this.getComposer(start.id).noChild && type!="text"){
            const a=this.canvas.querySelector(`[data-content="${start.id}"]`).getBoundingClientRect()
            const {x:left,y:top}=this.asCanvasPoint({left:a.left,top:a.top})
            const {x:right,y:bottom}=this.asCanvasPoint({left:a.left+a.width,top:a.top+a.height})
            return {type,path:`M${left} ${top} L${right} ${top} L${right} ${bottom} L${left} ${bottom} Z`}
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
			let x0=p0.x, x1=p1.x
			let {y:top,height}=p0
			paths.push(`M${x0} ${top} L${x1} ${top} L${x1} ${top+height} L${x0} ${top+height} L${x0} ${top} Z`)
		}else{
			let lines=this._getRangeRects(p0, p1)
			lines.reduce((paths, {left,top,right,bottom}, i, t)=>{
				switch(i){
				case 0:
					paths.push(`M${p0.left} ${top} L${right} ${top} L${right} ${bottom} L${p0.left} ${bottom} Z`)
				break
				case lines.length-1:
					paths.push(`M${p1.left} ${top} L${p1.left} ${bottom} L${left} ${bottom} L${left} ${top} Z`)
				break
				default:
					paths.push(`M${left} ${top} L${right} ${top} L${right} ${bottom} L${left} ${bottom} Z`)
				break
				}
				return paths
			},paths)
		}
        return {type:"range", path:paths.join(" ")}
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
}
