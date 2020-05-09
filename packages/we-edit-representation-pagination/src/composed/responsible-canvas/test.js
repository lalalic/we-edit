import {Test} from "we-edit"

export default class extends Test.Emulator{
    get canvas(){
        return this.selection.positioning.responsible.canvas
    }

    getXY(el){
        let x,y
        if(!el){
            const {position:{left,top}}=this.selection
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
}