/**
 * Terms:
 * Position: object must with coordinate figures like {x,y,left,top, ...} on canvas
 * Location: {id, at}
 */
//export default 
export default class Positioning{
    constructor(responsible){
        this.responsible=responsible
        //check responsible API
        const wellResponsibleAPI="getComposer,getContent,canvas,pages,gap,scale".split(",").find(k=>!(k in responsible))
        if(!wellResponsibleAPI){
            throw new Error("Responsible API providing to Positioning is not compatible")
        }
    }

    getComposer(){
        return this.responsible.getComposer(...arguments)
    }
    getContent(){
        return this.responsible.getContent(...arguments)
    }

    get canvas(){
        return this.responsible.canvas
    }

    get pages(){
        return this.responsible.pages
    }

    get gap(){
        return this.responsible.pageGap
    }

    get scale(){
        return this.responsible.scale
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

    pageXY(I=0){
        const page=this.canvas.querySelector(".page"+I)
        if(page){
            const {left,top}=page.getBoundingClientRect()
            return this.asCanvasPoint({left,top})
        }
        return {x:0,y:0}
    }

    pageY(i){
        return this.pageXY(...arguments).y
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
        const position=this.position(id,at)
        if(!position && nextFrame){
            return this.around(left,nextFrame.firstLine.y+1)
        }
        return this.around(left,top+lineHeight+1)
    }
    /**get location of prev line for a location */
    prevLine(id,at){
        const position=this.position(id,at)
        if(!position && prevFrame){
            return this.around(left,prevFrame.lastLine.y-1)
        }
        return this.around(left,top-1)
    }

    /**extend selection from location to word range*/
    extendWord(id,at){
        const p=this.getComposer(id).closest("paragraph")
        if(p){
            return p.extendAtom(id,at)
        }
        return {}
    }

    /**extend selection from location to line range*/
    extendLine(id,at){

    }
}