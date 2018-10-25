import memoize from "memoize-one"

const LINE=".line:not(:empty)"
export default class Positioning{
    constructor(){
        this.reset(...arguments)
    }

    reset(getComposer, getContent, canvas, scale=1){
        this.getComposer=getComposer
        this.getContent=getContent
        this.canvas=canvas
        this.scale=scale
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

    around(node, left, top){
        const {x,y}=this.asCanvasPoint({left,top})
		
        const locateLine=(container,top=true)=>Array.from(container.querySelectorAll(LINE)).find(a=>{
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
			while(container && container.querySelector(LINE)){
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
            if(!node){
                return {page:0,column:0,line:0}
            }
            const {page,column,line}=this.closest(node, ["line","column","page"])
            return {
                page:Array.from(this.canvas.querySelectorAll(".page")).indexOf(page),
                column:Array.from(page.querySelectorAll(".column")).indexOf(column),
                line:line!==undefined ? this.lines(column).indexOf(line): undefined
            }
        }
		
		const rect=this.getComposer(id).position(this,at)

		if(rect){
			const {x,y,width,node, ...position}=rect

			return {
				id,at,node,x,y,
				...position,
				...this.asViewportPoint({x,y}),
				...paginate(node),
			}
		}
		
		return null
    }

    line(id,at,offset){
        const position=this.position(id,at)
        if(!position)
            return
        const locate=position=>{
            const {page,column,line,left}=position
            const pages=this.canvas.querySelectorAll(".page")
            const nPage=pages[page]
            const columns=nPage.querySelectorAll(".column")
            const nColumn=columns[column]
            const lines=this.lines(nColumn)
            const nLine=lines[line+offset]
            if(!nLine){
                switch(offset){
                    case 1:{
                        if(columns.length-1>column){
                            return locate({...position,column:column+1,line:-1})
                        }

                        if(pages.length-1>page){
                            return locate({...position,page:page+1,column:0,line:-1})
                        }
                        break
                    }
                    case -1:{
                        if(column>0){
                            return locate({...position,column:column-1,line:this.lines(columns[column-1]).length})
                        }

                        if(page>0){
                            const columns=pages[page-1].querySelectorAll(".column")
                            const lines=this.lines(columns[columns.length-1])
                            return locate({...position,page:page-1,column:columns.length-1,line:lines.length})
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
        });

        //remove from first page before
        (({page,column,line,left,top,node})=>{
            //remove first page prev sibling lines
            const lines=this.lines(pages[page])
            let nLine=line==undefined ? node.querySelector(LINE) : query2Line(page,column,line)
            if(!nLine){
                throw new Error("can't find line for start point")
            }
            rects.splice(0,lines.indexOf(nLine)+1)
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
                    (end.page==start.page && end.column<start.column) ||
                    (end.page==start.page && end.column==start.column && end.line<start.line) ||
                    (end.page==start.page && end.column==start.column && end.line==start.line && end.left<start.left)){
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
					return this._getRangeRects(p0, p1)
				}
			}
        }
		
		return []
    }

    getClientRects(id){
        return Array.from(this.canvas.querySelectorAll(`[data-content="${id}"]`))
            .map(a=>this.getClientRect(id,a))
			.filter(a=>!!a)
    }

    getClientRect(id, node){
        node=node||this.canvas.querySelector(`[data-content="${id}"]`)
		if(node){
			const {left,top,width,height}=node.getBoundingClientRect()
			const {x,y}=this.asCanvasPoint({left,top})
			return {
				x,y,left,top,node,
				width:width/this.scale,height:height/this.scale
			}
		}
		
		return null
    }

    pageY(page){
        const {left,top}=this.canvas.querySelectorAll(".page")[page].closest("[transform]").getBoundingClientRect()
        return this.asCanvasPoint({left,top}).y
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
					let found=this.closest(node,[type],a=>a.dataset.type)
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
