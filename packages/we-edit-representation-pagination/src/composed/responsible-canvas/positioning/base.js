/**
 * Terms:
 * Position: object must with coordinate figures like {x,y,left,top, ...} on canvas
 * Location: {id, at}
 */
export default class Positioning{
    constructor(responsible){
        this.responsible=responsible
    }

    getComposer(){  
        return this.responsible.getComposer(...arguments)
    }
    getContent(){
        return this.responsible.getContent(...arguments)
    }

    asCanvasPoint({left,top}){
        return this.responsible.asCanvasPoint(...arguments)
    }

    asViewportPoint({x,y}){
        return this.responsible.asViewportPoint(...arguments)
    }

    pageXY(I=0){
        return this.responsible.pageXY(...arguments)
    }

    get pages(){
        return this.responsible.pages
    }

    get frames(){
        return this.pages
    }

    get ready(){
        return !!this.responsible.canvas
    }

    get scale(){
        return this.responsible.state.scale||1
    }

    get precision(){
        return this.responsible.state.precision||1
    }

    /**
     * To get position{page,line, x,y,left,top,} for a location{id,at}
     * 
     */
    position(id,at){
        return {page:0}
    }

    /**get a location{id,at} from a position{left,top}*/
    around(left,top){
        return {}
    }

    /**get range rects from position start to position end*/
    getRangeRects(start,end){
        return []
    }

    /**get location of next line for a location 
     * simple: find location from 1 pixel below the line, what about if it's last line of frame
    */
    nextLine(id,at){
        const position=this.position({id,at})
        if(!position && nextFrame){
            return this.around(left,nextFrame.firstLine.y+1)
        }
        return this.around(left,top+lineHeight+1)
    }
    /**get location of prev line for a location */
    prevLine(id,at){
        const position=this.position({id,at})
        if(!position && prevFrame){
            return this.around(left,prevFrame.lastLine.y-1)
        }
        return this.around(left,top-1)
    }

    positionAtLineEnd(id,at){
        return {id,at}
    }

    positionAtLineStart(id,at){
        return {id,at}
    }



    /**extend selection from location to word range*/
    extendWord(id,at){
        return {}
    }

    /**extend selection from location to line range*/
    extendLine(id,at){
        return {}
    }

    static makeSafe=A=>class SafePositioning extends A{
        constructor(...args){
            super(...args)
            "position,around,nextLine,prevLine,extendWord".split(",").forEach(k=>{
                this[k]=(...args)=>{
                    try{
                        return super[k](...args)||{}
                    }catch(e){
                        return {}
                    }
                }
            }) 
        }
        getRangeRects(...args){
            try{
                return super.getRangeRects(...args)||[]
            }catch(e){
                return []
            }
        }
    }    
}