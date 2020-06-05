import {Test} from "we-edit"

export default class extends Test.Emulator{
    get canvas(){
        return this.selectionStyle.positioning.responsible.canvas
    }

    getXY(el){
        let x,y
        if(!el){
            const {position:{left,top}}=this.selectionStyle
            x=left,y=top
        }else{
            const rect=el.getClientBoundingRect()
            x=rect.x+1, y=rect.y+1
        }
        return {x,y}
    }

    click(el, event){
        const {x,y}=this.getXY(el)
        this.canvas.dispatchEvent(new MouseEvent('click',{view:window,bubbles:true,cancelable:true,clientX:x,clientY:y,...event}))
        return this
    }
    
    doubleClick(el,event){
        const {x,y}=this.getXY(el)
        this.canvas.dispatchEvent(new MouseEvent('dblclick',{view:window,bubbles:true,cancelable:true,clientX:x,clientY:y,...event}))
        return this
    } 
    
    isInView(id){
        const positioning=this.selectionStyle.positioning
        const {height, width, node:{scrollTop=0,scrollLeft=0}}=this.selectionStyle.positioning.responsible.state.viewport     
        const rects=positioning.getRangeRects({id,at:0},{id,at:1})
        if(rects.length){
            const xs=rects.map(a=>[a.left,a.right]).flat(), ys=rects.map(a=>[a.top,a.bottom]).flat()
            const x0=Math.min(...xs), x1=Math.max(...xs)
            const y0=Math.min(...ys), y1=Math.max(...ys)
            return !((scrollLeft>=x1 || scrollLeft+width<=x0) && (scrollTop>=y1 || scrollTop+height<=y0))
        }else{
            const {x=0,y=0}=positioning.position(id,0)
            return (x>=scrollLeft && x<=scrollLeft+width) && (y>=scrollTop && y<=scrollTop+height)
        }
    }
}