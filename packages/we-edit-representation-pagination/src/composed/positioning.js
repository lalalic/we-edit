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

    getRangeRects(start,end){

        return []
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
        const i=framesA.findLastIndex((a,i)=>a==framesB[i])
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
        ({start,end}=this.extendSelection(start,end));

        const p0=this.position(start.id, start.at)
        const p1=this.position(end.id, end.at)
        const composer=this.getComposer(this.getComposer(start.id).composeFrames().pop())
        return composer.getRangeRects(p0,p1, page=>this.pageXY(this.pages.indexOf(page)))
    }
}

export default ReactPositioning
