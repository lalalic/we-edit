import {Test} from "we-edit"

export default class extends Test.Emulator{
    get canvas(){
        return this.selectionStyle.positioning.responsible.canvas
    }

    get scale(){
        return this.selectionStyle.positioning.responsible.state.scale||1
    }

    get precision(){
        return this.selectionStyle.positioning.responsible.state.precision||1
    }

    getXY(el){
        const {position:{left:x,top:y}}=this.selectionStyle
        return {x,y}
    }

    click(event){
        const {x,y}=this.getXY()
        this.canvas.dispatchEvent(new MouseEvent('click',{view:window,bubbles:true,cancelable:true,clientX:x,clientY:y,...event}))
        return this
    }
    
    doubleClick(event){
        const {x,y}=this.getXY()
        this.canvas.dispatchEvent(new MouseEvent('dblclick',{view:window,bubbles:true,cancelable:true,clientX:x,clientY:y,...event}))
        return this
    }

    _detransform(v){
        return v*this.scale/this.precision
    }
    
    isInView(id){
        const positioning=this.selectionStyle.positioning, precision=this.precision, scale=this.scale
        const {height, width, node:{scrollTop=0,scrollLeft=0}}=this.selectionStyle.positioning.responsible.state.viewport     
        const rects=positioning.getRangeRects({id,at:0},{id,at:1})
        if(rects.length){
            const xs=rects.map(a=>[a.left,a.right]).flat(), ys=rects.map(a=>[a.top,a.bottom]).flat()
            const x0=this._detransform(Math.min(...xs)), x1=this._detransform(Math.max(...xs))
            const y0=this._detransform(Math.min(...ys)), y1=this._detransform(Math.max(...ys))
            return !((scrollLeft>=x1 || scrollLeft+width<=x0) && (scrollTop>=y1 || scrollTop+height<=y0))
        }else{
            let {x=0,y=0}=positioning.position(id,0)
            x=this._detransform(x)
            y=this._detransform(y)
            return (x>=scrollLeft && x<=scrollLeft+width) && (y>=scrollTop && y<=scrollTop+height)
        }
    }
}