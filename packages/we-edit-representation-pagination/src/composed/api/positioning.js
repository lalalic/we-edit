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

    position(id,at){
        return {page:0}
    }

    extendWord(id,at){
        const p=this.getComposer(id).closest("paragraph")
        if(p){
            return p.extendAtom(id,at)
        }
        return {}
    }

    around(left,top){
        return {}
    }

    getRangeRects(start,end){
        return []
    }


    nextLine(id,at){

    }

    prevLine(id,at){

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
}