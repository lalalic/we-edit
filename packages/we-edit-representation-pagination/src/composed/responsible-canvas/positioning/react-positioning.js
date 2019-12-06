import Positioning from "./base"
import {ReactQuery} from "we-edit"

class PositioningHelper extends Positioning{
    /**
     * in paragraph: id->paragraph->line
     * paragraph:
     * larger frame than paragraph:
     * anchor not in paragraph:
     * @param {*} id 
     * @param {*} at 
     */
    positionToFrameLine(id,at){
        const paragraph=this.getComposer(id).closest("paragraph")
        const $find=at==1 ? 'findLast' : 'findFirst'
        const find=at==1 ? "findLast" : "find"
        var i=0, frame,lineInFrame, position
        if(paragraph){
            if(paragraph.props.id==id){
                //paragraph level
                i=at==1? paragraph.lines.length-1 : 0
            }else{
                //inline level
                i=paragraph.lineIndexOf(id,at)
            }
            frame=paragraph.lines[i].space.frame
            lineInFrame=frame.lines.find(({props:{pagination:{id:p,i:I}={}}})=>p==paragraph.props.id&&I==i+1)
            position=()=>paragraph.xyInLine(id,at,i)
        }else{
            /**
             * bigger than paragraph level
             * wrapper of paragraph
             * table/row/cell
             * frame/shape
             */
            const firstParagraph=this.getComposer(this.getContent(id)[$find]("paragraph").attr("id"))
            
            frame=this.getCheckedGrandFrameByFrame(
                firstParagraph.lines[at==1 ? firstParagraph.lines.length-1 : 0].space.frame, 
                a=>new ReactQuery(a.createComposed2Parent()).findFirst(`[data-content=${id}]`).length==1,
                true,//first frame includes id
                find
            )
            lineInFrame=frame.lines[find](line=>new ReactQuery(line).findFirst(`[data-content=${id}]`).length==1)
            position=()=>{
                const {first,last,node=first||last, parents}=new ReactQuery(lineInFrame)[`${$find}AndParents`](`[data-content=${id}]`)
                const x=[...parents,node.get(0)].reduce((X,{props:{x=0}})=>x+X,0)
                return {x:at==1 ? x+(node.attr('width')||0) : x, y:0}
            }
        }
        
        const line=new Proxy(lineInFrame,{
            get(line,prop){
                switch(prop){
                case "position":
                    return position
                case "paragraph":
                    return paragraph ? paragraph.props.id : undefined
                case "i":
                    return paragraph ? i : undefined
                case "inFrame":
                    return line
                case "height":
                    return line.props.height
                }
                return line[prop]
            }
        })

        return {frame, line}
    }

    /**
     * frame layout or fissionable's fission
     * @param {*} frame, start point 
     * @param {*} check(frame) 
     * @param {boolean} first
     */
    getCheckedGrandFrameByFrame(frame,check, first, find="find"){
        if(!check)//default: frame or any grandFrame including frame
            check=a=>a==frame || new ReactQuery(a.createComposed2Parent()).findFirst(`[data-frame=${frame.uuid}]`).length==1
        var current=frame, grandMaybe=null
        while(current){
            if(current.isFrame && check(current)){
                grandMaybe=current 
            }else if(current.isFissionable){
                grandMaybe=current.computed.composed[find](check)
            }
            
            if(first && grandMaybe){
                return grandMaybe
            }

            if(current.context)
                current=current.context.frame||current.context.parent
        }
        return grandMaybe
    }

    getGrandFrameXY(grandFrame){
        return this.pageXY(grandFrame.props.I)
    }

    getGrandFrameByPosition(x,y){
        return this.pages.find(({ props: { width, height, I } }) => {
            const xy = this.pageXY(I);
            return x >= xy.x && x <= xy.x + width && y >= xy.y && y <= xy.y + height;
        });
    }

    orderPosition(start,end){
        const p0=this.position(start.id,start.at, true)
        const p1=this.position(end.id, end.at,true)
        return {p0,p1}
    }

    frameOffsetGrandFrame(grandFrame,frame){
        const grandFrameLayouted=grandFrame.createComposed2Parent()
        const {first,parents}=new ReactQuery(grandFrameLayouted).findFirstAndParents(`[data-frame=${frame.uuid}]`)
        return [...parents,first.get(0)].filter(a=>!!a).reduce((xy,{props:{x=0,y=0}})=>(xy.x+=x, xy.y+=y, xy),{x:0,y:0})
    }

    extendSelection(start, end) {
        if (start.id == end.id)
            return { start, end }
        
        const framesA = this.getComposer(start.id).composeFrames();
        const framesB = this.getComposer(end.id).composeFrames();
        const i = framesA.findLastIndex((a, i) => a == framesB[i]);
        if (i != -1) {
            framesA.splice(0, i + 1);
            framesB.splice(0, i + 1);
        }
        if (framesA[0]) {
            start = { id: framesA[0], at: 1 };
        }
        if (framesB[0]) {
            end = { id: framesB[0], at: 1 };
        }
        return { start, end };
    }
}
/**
 * It utilize composer to do positioning, 
 * so each composer must implement itself positioning methods, which actually make composer complex
 * Can we make a pure positioning isolated from composer???
 * 
 */
export default class ReactPositioning extends PositioningHelper {
    /**
     * 2 options:
     * >>a. positioning from up to id, scope from big to small
     * >>b. positioning from id up, performance should be better, chosen
     * the location may be:
     * Inline Level
     * based on paragraph.xyInLine(id,at,paragraph.lineIndexOf(id,at)) 
     */
    position(id,at, internal){
        //#b , (id,at)->line->frame->grandFrame
        /**
         * maybe no line
         * > anchor
         * > grandFrame itself
         */
        const {frame,line, anchor}=this.positionToFrameLine(id,at)
        const grandFrame=this.getCheckedGrandFrameByFrame(frame)
        const grandFrameOffset=this.getGrandFrameXY(grandFrame)
        const frameOffset=this.frameOffsetGrandFrame(grandFrame,frame)
        const lineOffset=frame.lineXY(line.inFrame)
        const inline=line.position()

        //finally
        const x=grandFrameOffset.x+frameOffset.x+lineOffset.x+inline.x
        const y=grandFrameOffset.y+frameOffset.y+lineOffset.y+inline.y
        const position={
            id,at,
            ...inline,
            x,
            y,
            ...this.asViewportPoint({ x,y }),
            page:grandFrame.props.I,
            paragraph:line.paragraph,
            lineIndexOfParagraph:line.i,
            lineHeight:line.height
        }

        if(!internal)
            return position
        return Object.assign(position, {grandFrame, frame, lineIndexInFrame:frame.lines.indexOf(line.inFrame)})
    }

    around(left,top){
        //convert to canvas co-ordinate
        const { x, y } = this.asCanvasPoint({ left, top })
        const pointIsInside=({x:x0=0,y:y0=0,width,height})=>x0<=x && y0<=y && (x0+width)>=x && (y0+height)>=y
        
        const grandFrame=this.getGrandFrameByPosition(x,y)
        if(!grandFrame)
            return {}
        //first check if it's anchor
        const anchor=grandFrame.anchors.find(({props:{geometry:{x=0,y=0,width=0,height=0}}})=>pointIsInside({x,y,width,height}))
        if(anchor){
            const $anchor=new ReactQuery(anchor)
            const notFrameAnchor=$anchor.findFirst(`[data-frame]`).length==0
            if(notFrameAnchor){
                //@TODO: ReactQuery.findLast doesn't work as expected
                return {id:$anchor.findLast('[data-content]').attr('data-content')}
            }else{
                //continue use frame search
            }
        }
    
        //locate most inner frame that includes the point in grandFrame
        const {frame, ...frameOffset}=(grandFrameLayouted=>{
            const rect=(nodes,size={})=>nodes.reduce((bound, a)=>{
                const {height,x=0,y=0,"data-type":type}=a.props||{}
                bound.x+=x
                if(type!=="text"){
                    bound.y+=y
                }
                if(type=="paragraph"){
                    bound.height=height
                }
                return bound
            },{...size,x:0,y:0})

            var current=new ReactQuery(grandFrameLayouted), allParents=[]
            while(true){//find most inner frame that includes the point
                const found=current.findFirstAndParents((node,parents)=>{
                    if(!node) return false
                    const {props:{'data-content':id, width,height, composer=this.getComposer(id)}}=node
                    if(composer && composer.isFrame)
                        return pointIsInside(rect([...allParents,current.get(0),...parents,node],{width,height}))
                })
                if(found.first.length==1){
                    allParents=[...allParents,current.get(0), ...found.parents]
                    current=found.first
                }else{
                    break
                }
            }

            //get frame from data-content and data-frame
            const frame=(({'data-content':id,'data-frame':frameId, composer=this.getComposer(id)})=>{
                return frameId==id ? composer : composer.computed.composed.find(a=>a.uuid==frameId)
            })(current.get(0).props);

            return [...allParents,current.get(0)].filter(a=>!!a)
                .reduce((xy,{props:{x=0,y=0}})=>(xy.x+=x,xy.y+=y,xy),{x:0,y:0,frame})
        })(grandFrame.createComposed2Parent());

        //locate the line 
        const line=(me=>{
            const line=frame.lines.find((line,i,_,_1,{props:{width=0,height=0}}=line)=>pointIsInside({...frame.lineXY(line),width,height}))
            if(!line)
                return 
            return new Proxy(line,{
                get(line,prop){
                    switch(prop){
                    case "inFrame": 
                        return line
                    case "around":
                        return (x,y)=>{
                            const {pagination:{id:paragraphId,i}}=line.props
                            return me.getComposer(paragraphId).positionFromPoint(x,y,i-1)
                        }
                    }
                    return line[prop]
                }
            })
        })(this);
        if(!line)
            return {}
        
        const lineOffset=frame.lineXY(line.inFrame)

        return line.around(x-frameOffset.x-lineOffset.x,y-frameOffset.y-lineOffset.y)
    }

    /**
     * 1. start and end must be normalized to same layout block
     * 2. append rect line by line up to 
     * 3. remove left of first line, and right of end line
     * @param {*} start 
     * @param {*} end 
     */
    getRangeRects(start,end){
        //normalize up to (same level???) of layout block
        try{
            ({ start, end } = this.extendSelection(start,end));//this.normalizeToFrame(start, end));
            const rects=[]
            const { p0, p1 } = this.orderPosition(start, end)
            
            const scope=(function* (frame0, frame1){
                const makeRects=(frame,from=0,to=frame.lines.length-1)=>{
                    const grandFrame=this.getCheckedGrandFrameByFrame(frame)
                    const o=this.getGrandFrameXY(grandFrame)
                    const {x,y}=this.frameOffsetGrandFrame(grandFrame,frame) 
                    return frame.lines.slice(from,to+1)
                        .map((line,_,_1,{props:{width,height,pagination:{id:isParagraphLine}={}}}=line)=>{
                            const xy=frame.lineXY(line)
                            if(isParagraphLine){
                                const story=new ReactQuery(line).findFirstAndParents('.story')
                                const x=[...story.parents,story.first.get(0)].reduce((X,{props:{x=0}})=>X+x,0)
                                const first=story.first.findFirstAndParents('[data-content],.ender')
                                const x0=[...first.parents,first.first.get(0)].reduce((X,{props:{x=0}})=>X+x,x)
                                const last=story.first.findLastAndParents('[data-content],.ender')
                                const x1=[...last.parents,last.last.get(0)].reduce((X,{props:{x=0}})=>X+x,x+last.last.attr('width'))
                                return {...xy,x:xy.x+x0, width:x1-x0,height}
                            }else{
                                return {...xy,width,height}
                            }
                        })
                        .map(a=>(a.x+=(x+o.x), a.y+=(y+o.y), a))
                        .map(({x:left,y:top,width,height})=>({left,top,right:left+width,bottom:top+height}))
                }
                if(frame0==frame1){
                    yield makeRects(frame0, p0.lineIndexInFrame, p1.lineIndexInFrame)
                    return 
                }
                yield makeRects(frame0, p0.lineIndexInFrame)
                for(let frames=frame0.context.parent.computed.composed,i=frame0.props.i+1;i<frame1.props.i;i++){
                    yield makeRects(frames[i])
                }
                yield makeRects(frame1, 0,p0.lineIndexInFrame)
            }).call(this, p0.frame, p1.frame);

            for(const bounds of scope){
                rects.splice(rects.length, 0, ...bounds)
            }

            if(rects.length==0)
                return rects
        
            Object.assign(rects[0],{left:p0.left})
            Object.assign(rects[rects.length-1], {right:p1.left})

            return rects.filter(({left,right})=>(left-right)!=0)
        }catch(e){
            console.error(e)
            return []
        }
    }

    nextLine(id,at){
        const {left,top,lineHeight}=this.position(id,at)
        const location=this.around(left,top+lineHeight+2)
        return location
    }

    prevLine(id,at){
        const {left,top}=this.position(id,at)
        const location=this.around(left,top-2)
        return location
    }
    /*
    getRangeRects(start, end) {
        try {
            ({ start, end } = this.extendSelection(start, end));
            const frame = this.getComposer(start.id).closest(a => !!a.getRangeRects && a.props.id != start.id);
            const rects = frame.getRangeRects(start, end, page => this.pageXY(page.props.I));
            if (end.at == 1) {
                const endComposer = this.getComposer(end.id);
                if (endComposer.getComposeType() == "paragraph") {
                    rects[rects.length - 1].right += endComposer.enderWidth;
                }
            }
            return rects.filter(({left,right})=>(left-right)!=0);
        }
        catch (e) {
            return [];
        }
    }
    */
}