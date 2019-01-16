import memoize from "memoize-one"

const Position={
    create({id,at,left,top,x,y,page,line, ...props}){
        return {
            id,at,
            page,line,
            left,top,
            x,y,
            ...props,
        }
    }
}

class Positioning{
    constructor(){
        this.reset(...arguments)
    }

    reset(getComposer, getContent, canvas, pages, gap, scale=1){
        this.getComposer=getComposer
        this.getContent=getContent
        this.canvas=canvas
        this.scale=scale
        this.pages=pages
        this.gap=gap
    }

    position(id,at){
        return {page:0}
    }
    around(left,top){
        return {}
    }
    lines(n){
        return []
    }
    line(id,at,offset){
        return null
    }
    getRangeRects(start,end){

        return []
    }
    getClientRects(id){
        return []
    }
    getClientRect(id){
        return null
    }

    getCursorSelection=memoize((content, selection,scale)=>{
        const {cursorAt, ...a}=selection.toJS()
        const {id,at}=a[cursorAt]
        let rects=[]
        if(a.start.id!=a.end.id || a.start.at!=a.end.at){
            rects=this.getRangeRects(a.start,a.end)
        }

        const position=this.position(id, at)
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

    nextLine(id,at){
        return this.line(id,at,1)
    }

    prevLine(id,at){
        return this.line(id,at,-1)
    }

    pageXY(i=0){
        const pages=this.canvas.querySelectorAll(".page")
        const page=pages[i]
        if(page){
            const {left,top}=page.getBoundingClientRect()
            return this.asCanvasPoint({left,top})
        }
        return {x:0,y:0}
    }

    pageY(i){
        return this.pageXY(...arguments).y
    }

    getSelectionStyle=memoize((content,selection,scale)=>{
        var position=0,page,column,line,node,id
        const fromContent=type=>{
            let $=this.getContent(id)
            let props=$.is(type) ? $.props() : $.closest(type).props()
            return props ? props.toJS().props : null
        }
        const self=this
        return {
            version:"1.0.0",
            props:memoize((type,bContent=true)=>{
                if(position===0){
                    ({position}=this.getCursorSelection(content,selection, scale));
					if(position){
						({page,column,line,node,id}=position);
					}else{
						const {cursorAt, ...a}=selection.toJS()
						id=a[cursorAt].id
					}
                }

                if(bContent){//from content in state
                    return fromContent(type)
                }

                let reType=new RegExp(type,"i")
                if(reType.test("page")){
					if(position){
						return {
							page,
							column,
							line,
							get pageY(){
								return self.pageY(page)
							}
						}
					}

					return null
                }


				if(node){
					let found=node.closest(`[data-type="${type}"]`)
					if(found){
						let composer=self.getComposer(found.dataset.content)
						if(composer){
							return composer.props
						}
					}
				}

                return fromContent(type)
            })
        }
    })
}

/**
* positioning based on browser DOM
*** it need all pages rendered dom, so can't render only pages in viewport, which would impact on performance
**/
class DOMPositioning extends Positioning{
    LINE=".line:not(:empty)"
    position(id,at){
        const paginate=node=>{
            if(!node){
                return {page:0,column:0,line:0}
            }
            const page=node.closest(".page")
            const line=node.closest(".line")
            return {
                page:Array.from(this.canvas.querySelectorAll(".page")).indexOf(page),
                line:line!==undefined ? this.lines(page).indexOf(line): undefined
            }
        }
        const composer=this.getComposer(id)

        if(composer){
            const rect=composer.position(this,at)

            if(rect){
                const {x,y,width,node, ...position}=rect

                return {
                    id,at,//node,
                    x,y,
                    ...position,
                    ...this.asViewportPoint({x,y}),
                    //...paginate(node),
                }
            }
        }

        return null
    }

    around(left, top){
        const {x,y}=this.asCanvasPoint({left,top})

        const locateLine=(container,top=true)=>Array.from(container.querySelectorAll(this.LINE)).find(a=>{
            const {right,bottom,left,top}=a.getBoundingClientRect()
            const p1=this.asCanvasPoint({left:right,top:bottom})
            if(y<=p1.y){
				const p0=this.asCanvasPoint({left,top})
				return p0.x<=x && p1.x>=x
			}
			return false
        })

		const line=(()=>{
			let container=locateLine(this.canvas)
			while(container && container.querySelector(this.LINE)){
				container=locateLine(container,false)
			}
			return container
		})();

        return (()=>{
			if(line){
				const {left,right}=line.getBoundingClientRect()
				let contents=Array.from(line.querySelectorAll(`[data-content]:not(g)`))
				if(contents.length==0){
					contents=Array.from(line.querySelectorAll(`[data-content]`))
				}
				const rects=contents.map(a=>{
					const {left,top}=a.getBoundingClientRect()
					return this.asCanvasPoint({left,top}).x
				})
				const i=Math.max(0,Math.min(rects
					.concat([x])
					.sort((a,b)=>a-b)
					.indexOf(x)-1,rects.length-1))
				const node=contents[i]
				if(node){
					return {
						id:node.dataset.content,
						x:x-rects[i],
						node
					}
				}
			}

            return {}
        })();
    }

    lines(node){
        const nested=Array.from(node.querySelectorAll(".line .line"))
        return Array.from(node.querySelectorAll(this.LINE)).filter(a=>!nested.includes(a))
    }

    line(id,at,offset){
        const position=this.position(id,at)
        if(!position)
            return
        const locate=position=>{
            const {page,line,left}=position
            const pages=this.canvas.querySelectorAll(".page")
            const nPage=pages[page]
            const lines=this.lines(nPage)
            const nLine=lines[line+offset]
            if(!nLine){
                switch(offset){
                    case 1:{
                        if(pages.length-1>page){
                            return locate({...position,page:page+1,line:-1})
                        }
                        break
                    }
                    case -1:{
                        if(page>0){
                            const lines=this.lines(pages[page-1])
                            return locate({...position,page:page-1,line:lines.length})
                        }
                        break
                    }
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
                x:(left-node.getBoundingClientRect().left)/this.scale,
                node
            }
        }

        return locate(position)
    }

    getRangeRects(start, end){
        if(start.id==end.id && !this.getComposer(start.id).splittable){
			const rect=this.getClientRect(start.id)
			if(rect){
				const {x,y,width,height}=rect
				return [{
					left:x,
					top:y,
					right:x+width,
					bottom:y+height
				}]
			}
        }else{
            const [p0,p1]=((start,end)=>{
				if(!start || !end)
					return []

                if(end.page<start.page ||
                    (end.page==start.page && end.line<start.line) ||
                    (end.page==start.page && end.line==start.line && end.left<start.left)){
                    return [end,start]
                }
                return [start,end]
            })(this.position(start.id,start.at),this.position(end.id, end.at));

			if(p0 && p1){
				if(p0.top==p1.top){
					const {x:left, y:top, height, bottom=top+height}=p0
					const {x:right}=p1
					return [{left,right,top,bottom}]
				}else{
					return ((p0, p1)=>{
                        const rects=[]
                        const lineRect=line=>{
                            const {left,top,width,height}=line.getBoundingClientRect()
                            rects.push({left,top,right:left+width,bottom:top+height})
                        }

                        const pages=Array.from(this.canvas.querySelectorAll(".page"))
                        const query2Line=(page,line)=>{
                            return this.lines(pages[page])[line]
                        }

                        pages.slice(p0.page, p1.page+1).forEach(a=>{
                            this.lines(a).forEach(lineRect)
                        });

                        //remove from first page before
                        (({page,line,left,top,node})=>{
                            //remove first page prev sibling lines
                            const lines=this.lines(pages[page])
                            let nLine=line==undefined ? node.querySelector(this.LINE) : query2Line(page,line)
                            if(!nLine){
                                throw new Error("can't find line for start point")
                            }
                            rects.splice(0,lines.indexOf(nLine)+1)
                            //first line rect
                            const a=nLine.getBoundingClientRect()
                            rects.unshift({left,top,right:a.left+a.width,bottom:a.top+a.height})
                        })(p0);


                        //remove from last page next
                        (({page,line,left:right,node})=>{
                            const nLine=line==undefined ? this.lines(node).pop() : query2Line(page,line)
                            if(!nLine){
                                throw new Error("can't find line for end point")
                            }
                            //remove last page next sibling lines
                            const lines=this.lines(pages[page])
                            rects.splice(lines.indexOf(nLine)-lines.length)

                            //last line rect
                            const {left,top,height}=nLine.getBoundingClientRect()
                            rects.push({left,top,right,bottom:top+height})
                        })(p1);

                        return rects.map(({left,top,right,bottom,...others})=>{
                            let a=this.asCanvasPoint({left,top})
                            let b=this.asCanvasPoint({left:right,top:bottom})
                            return {left:a.x,top:a.y,right:b.x,bottom:b.y,...others}
                        })
                    })(p0, p1)
				}
			}
        }

		return []
    }

    getClientRect(id, node){
        node=node||this.canvas.querySelector(`[data-content="${id}"]`)
		if(node){
			const {left,top,width,height}=node.getBoundingClientRect()
			const {x,y}=this.asCanvasPoint({left,top})
			return {
				x,y,left,top,
                text:node.textContent,
                endat:node.dataset.endat,
				width:width/this.scale,height:height/this.scale
			}
		}

		return null
    }

    getClientRects(id){
        return Array.from(this.canvas.querySelectorAll(`[data-content="${id}"]`))
            .map(a=>this.getClientRect(id,a))
			.filter(a=>!!a)
    }
}

class ReactPositioning extends Positioning{
    position(id,at){
        const composer=this.getComposer(id)
        if(!composer){
            return super.position(...arguments)
        }

        const {page, x,y,...position}=composer.position(id,at)||{}
        if(page!=undefined){
            const {x:x0,y:y0}=this.pageXY(page)
            return {
                id,at,
                x:x0+x,y:y0+y,
                ...this.asViewportPoint({x:x0+x,y:y0+y}),
                page,
                ...position,
            }
        }else{

        }
    }

    nextLine(id,at){
        return this.getComposer(id).nextLine(id,at)||{}
    }

    prevLine(id,at){
        return this.getComposer(id).prevLine(id,at)||{}
    }

    around(left,top){
        const {page, x, y}=(()=>{
            let {x,y}=this.asCanvasPoint({left,top}), xy
            const page=this.pages.find(({props:{width,height}},i)=>{
                xy=this.pageXY(i)
                return x>=xy.x && x<=xy.x+width && y>=xy.y && y<=xy.y+height
            })
            return {page, x:x-xy.x, y:y-xy.y}
        })();

        return page.positionFromPoint(x,y)
    }

    extendSelection(start, end){
        if(start.id==end.id)
            return {start,end}
        const framesA=this.getComposer(start.id).composeFrames()
        const framesB=this.getComposer(end.id).composeFrames()
        const i=framesA.findIndex((a,i)=>a==framesB[i])
        if(i!=-1){
            framesA.splice(0,i+1)
            framesB.splice(0,i+1)
        }

        if(framesA[0]){
            start={id:framesA[0],at:1}
        }

        if(framesB[0]){
            end={id:framesB[0],at:1}
        }

        return {start,end}
    }

    getRangeRects(start,end){
        const p0=this.position(start.id, start.at)
        const p1=this.position(end.id, end.at)
        const frame=this.getComposer(start.id).composeFrames().pop()
        const composer=this.getComposer(frame||"root")
        return composer.getRangeRects(p0,p1, page=>this.pageXY(this.pages.indexOf(page)))
    }

    getClientRect(id){
        return this.getClientRects(id)[0]
    }

    getClientRects(id){
        return this.getComposer(id).getPages()
            .reduce((rects,page)=>[...rects, ...page.getClientRects(id)],[])
            .filter(a=>!!a)
    }
}

export default ReactPositioning
