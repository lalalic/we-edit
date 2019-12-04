import {ReactQuery} from "we-edit"
/**
 * Terms:
 * Position: object must with coordinate figures like {x,y,left,top, ...} on canvas
 * Location: {id, at}
 */
//export default 
class Positioning{
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

/**
 * Location Or Range
 * Range is an algorithm of from start location to end location, so it can be an isolated algorithm
 * Task:
 * 1. From Location{id,at} to Position{x,y}
 * >>>a. decide which fission includes the location{id,at}
 * >>>b. position line that includes the location in frame layout
 * >>>c. position inline that is the location in inline layout 
 * 2. From Position{x,y} to Location{id,at}
 * >>>a. decide which fission inludes the position{x,y}
 * >>>b. position line that includes the position{xOfFissionOffset,yOfFissionOffset}
 * >>>c. positioning line that includes the position{xOfLineOffset,yOfLineOffset}
 * 
 * Text: {font..., and measure information} to position
 * Paragraph: Inline Level positioning
 * Frame: : Frame Level positioning
 * Fissionable: 
 * 
 * the layouted structure as following:
 * Layout(Page,Cell), Frame, Line, Inline
 * 
 */

 export default class Fake extends Positioning{
    /**
     * in paragraph: id->paragraph->line
     * paragraph:
     * larger frame than paragraph:
     * anchor not in paragraph:
     * @param {*} id 
     * @param {*} at 
     */
    positionToLine(id,at){
        const target=this.getComposer(id)
        var paragraph=target.closest("paragraph")
        const find=at==1 ? "findLast" : "findFirst"
        
        var i=0
        if(!paragraph){
            //more than paragraph level
            paragraph=this.getComposer(this.getContent(id)[find]("paragraph").attr("id"))
            if(at==1){
                i=paragraph.lines.length-1
            }
        }else if(paragraph==target){
            //paragraph level
            if(at==1){
                i=paragraph.lines.length-1
            }
        }else{
            //inline level
            i=paragraph.lineIndexOf(id,at)
        }


        const line=paragraph.lines[i]
        return new Proxy(line,{
            get(line,prop){
                switch(prop){
                case "position":
                    return (id,at)=>paragraph.xyInLine(id,at,i)
                case "raw":
                    return line
                case "paragraph":
                    return paragraph.props.id
                case "i":
                    return i
                case "height":
                    return paragraph.computed.lastComposed[i].props.height
                }
                return line[prop]
            }
        })
    }

    postionLineToFrame(line){
        //line.space.frame->frame
        return line.space.frame
    }

    getGrandFrameByFrame(frame){
        //frame.context.parent->
        var current=frame, grandMaybe=frame
        while(current){
            if(current.isFrame)
                grandMaybe=current
            if(current.context)
                current=current.context.frame||current.context.parent
        }
        //this.pages.indexOf(grandMaybe)!=-1//grandMaybe should be in this.pages
        return grandMaybe
    }

    getGrandFrameXY(grandFrame){
        return this.pageXY(grandFrame.props.I)
    }

    /**
     * 2 options:
     * >>a. positioning from up to id, scope from big to small
     * >>b. positioning from id up, performance should be better, chosen
     * the location may be:
     * Inline Level
     * 
     */
    position(id,at){
        //#b , (id,at)->line->frame->grandFrame
        //maybe no line, which means positioned(only anchor???)
        const line=this.positionToLine(id,at)
        const frame=this.postionLineToFrame(line)
        const grandFrame=this.getGrandFrameByFrame(frame)
        
        const grandFrameOffset=this.getGrandFrameXY(grandFrame)
        const frameOffset=(grandFrameLayouted=>{
            const {first,parents}=new ReactQuery(grandFrameLayouted).findFirstAndParents(`[data-frame=${frame.uuid}]`)
            return [...parents,first.get(0)].filter(a=>!!a).reduce((xy,{props:{x=0,y=0}})=>(xy.x+=x, xy.y+=y, xy),{x:0,y:0})
        })(grandFrame.render())
        const lineInFrame=frame.lines.find(({props:{pagination:{id:paragraph,i}={}}})=>paragraph==line.paragraph&&i==line.i+1)
        const lineOffset=frame.lineXY(lineInFrame)
        lineOffset.y-=line.height
        const inline=line.position(id,at)

        //finally
        return {
            page:grandFrame.props.I,
            paragraph:line.paragraph,
            lineIndexOfParagraph:line.i,
            ...inline,
            x:grandFrameOffset.x+frameOffset.x+lineOffset.x+inline.x,
            y:grandFrameOffset.y+frameOffset.y+lineOffset.y+inline.y,
        }
    }

    aroundToFrame(x,y){

    }

    aroundToLine(x,y){

    }

    around1(x,y){
        const grandFrame=this.getGrandFrameByPosition(x,y)
        const {frame, ...frameOffset}=(grandFrameLayouted=>{
            const {last,parents}=new ReactQuery(grandFrameLayouted).findLastAndParents(()=>{
                isFrame && xyInRect()
            })
            const xy=[...parents,last.get(0)].reduce(()=>{},{x,y})
            return {frame, ...xy}
        })(grandFrame.render());
        const line=this.aroundFrameToLine({x:x-frameOffset.x,y:y-frameOffset.y})
        const lineOffset=inline.xy
        const location=inline.around({x:x-frameOffset.x-lineOffset.x,y:y-frameOffset.y-lineOffset.y})
        return {
            x:frameOffset.x+lineOffset.x+inlineOffset.x,
            y:frameOffset.y+lineOffset.y+inlineOffset.y
        }
    }


    getRangeRects(start,end){

    }
 }