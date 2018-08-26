export default class Query{
    constructor(document, state){
        this.document=document
        this.state=state
    }

    position(id,at){
        let el=this.document.root.querySelector(`[data-content="${id}"]`)
        let text=el.textContent
        el.textContent=text.substring(0,at||1)
        let rects=el.getClientRects()
        let {left,right,top,bottom,height}=rects[rects.length-1]
        el.textContent=text
        return {id,at,left:at==0 ? left : right,top,height}
    }

    prevLine({id,at}){
        let {left,top}=this.position(id,at)

        return ((left,top)=>{
            let range=document.caretRangeFromPoint(left,top)
            let {endContainer:{parentElement:{dataset:{content:id}}}, endOffset:at}=range
            return {id,at}
        })(left,top-5)
    }

    nextLine({id,at}){
        let {left,top,height}=this.position(id,at)

        return ((left,top)=>{
            let range=document.caretRangeFromPoint(left,top)
            let {endContainer:{parentElement:{dataset:{content:id}}}, endOffset:at}=range
            return {id,at}
        })(left,top+height+5)
    }
}
