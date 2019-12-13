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
                /**
                 * inline content includes: 
                 * 1. atoms,such as image,text,..., which is not sensitive to query.findFirst/findLast
                 * 2. inline container: it's sensitive to at(0:conainer start|1: container end) to query.findFirst/findLast
                 */
                i=paragraph.lines[`${find}Index`](line=>line.children.find(atom=>{
                    const node=new ReactQuery(atom)[$find](`[data-content="${id}"]`)
                    if(node.length==0)
                        return 
                    const {props:{"data-endat":endat, children:text}}=node.get(0)
                    if(endat==undefined //not text, true
                        || (at>=endat-text.length && at<endat))//inside text,true
                        return true
                    if(at==endat && this.getComposer(id).text.length==endat)//next of last text
                        return true
                }))
            }
            
            frame=paragraph.lines[i].space.frame
            lineInFrame=frame.lines.find(({props:{pagination:{id:p,i:I}={}}})=>p==paragraph.props.id&&I==i+1)
            position=()=>this.positionInInline(id,at,paragraph.computed.lastComposed[i])
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

    getGrandestFrameXY(grandFrame){
        const {x,y}=this.pageXY(grandFrame.props.I)
        return {x,y,top:y,bottom:y+grandFrame.props.height}
    }

    getGrandestFrameByPosition(x,y){
        var xy
        const grandFrame=this.pages.find(({ props: { width, height, I } }) => {
            xy = this.pageXY(I);
            return x >= xy.x && x <= xy.x + width && y >= xy.y && y <= xy.y + height;
        })
        return {grandFrame, grandFrameOffset:xy} 
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

    /**
     * 
     * @param {*} composed 
     * @param {*} check(rect, node), rect({initial bounary}) is funciton to return node boundary
     * @param {} formatNode(node)  
     */
    getBoundaryCheckedMostInnerNode(composed,check,formatNode=a=>a){
        const rect=(nodes,size={})=>nodes.filter(a=>a!=composed)
        .reduce((bound, {props:{height,width,x=0,y=0,"data-type":type}={}}={})=>{
            bound.x+=x
            if(type!=="text")
                bound.y+=y
            if(type=="paragraph")
                bound.height=height
            if(width!=undefined)
                bound.width=width
            return bound
        },{...size,x:0,y:0})
        
        var current=new ReactQuery(composed), allParents=[]
        while(true){//find most inner frame that includes the point
            const found=current.findFirstAndParents((node,parents)=>{
                if(!node) 
                    return false
                if(node.props && node.props["data-nocontent"])
                    return false
                if(node==current.get(0))
                    return 
                return check(o=>rect([...allParents, ...parents,node],o),node)
            })
            if(found.first.length==1){
                allParents=[...allParents,...found.parents]
                current=found.first
            }else{
                break
            }
        }
        allParents=allParents.filter(a=>a!=composed)
        return [...allParents,current.get(0)].filter(a=>!!a)
            .reduce((xy,{props:{x=0,y=0}})=>(xy.x+=x,xy.y+=y,xy),{
                x:0,y:0,
                node:formatNode(current.get(0),allParents),
                parents: allParents
            })
    }

    aroundInBlockLine(grandestFrame, line, {x=0,y=0}={}){
        if(!line || !grandestFrame)
            return {}
        /**
         * now next line found, then locate with one of following ways
         * 1. to round(left, top+1)???? what if it's on top margin/border
         * 2. **find most inner node that includes (left,*), and then position in paragraph line
         */
        const lineOffset=grandestFrame.lineXY(line)
        const grandFrameOffset=this.getGrandestFrameXY(grandestFrame)
        x=x-grandFrameOffset.x-lineOffset.x
        const isIncludeX=(rect)=>rect.x<=x && (rect.x+rect.width)>=x
        var {node,parents,...inlineOffset}=this.getBoundaryCheckedMostInnerNode(
            line,
            //only content include x
            (rect,{props:{width}})=>{
                if(width!=undefined){
                    const bounary=rect({width})
                    return isIncludeX(bounary)
                }
            }
        )
        var $paragraph
        const possibleParagraph=new ReactQuery(node).findFirstAndParents('[data-type=paragraph]')
        const isInlineNode=possibleParagraph.first.length==0
        if(isInlineNode){
            //find paragraph block up
            const j=parents.findLastIndex(a=>a.props.pagination)
            if(j==-1){
                //nextLine should be paragraph line
                $paragraph=line
                inlineOffset={x:0,y:0}
            }else{
                $paragraph=parents[j]
                inlineOffset=parents.slice(0,j+1).reduce((xy,{props:{x=0,y=0}})=>(xy.x+=x,xy.y+=y,xy),{x:0,y:0})
            }
        }else{//nested paragraph, which means frame in paragraph
            inlineOffset=[...possibleParagraph.parents,possibleParagraph.first.get(0)]
                .reduce((xy,{props:{x=0,y=0}})=>(xy.x+=x,xy.y+=y,xy),inlineOffset)
            $paragraph=possibleParagraph.first.get(0)
        }
        const {pagination:{id:pid,i},paragraph=this.getComposer(pid)}=$paragraph.props
        return this.aroundInInline(paragraph.computed.lastComposed[i-1], x-inlineOffset.x)
    }

    aroundInInline(composedLine,X){
        //find atom node that include x
        const {node, parents, ...offset}=this.getBoundaryCheckedMostInnerNode(
            composedLine,
            (rect,{props:{width}})=>{
                if(width!=undefined){
                    const {x}=rect()
                    return x<=X && (x+width)>=X
                }
            },
            node=>node==composedLine ? undefined : node
        )

        if(node){
            const $node=new ReactQuery(node)
            if($node.attr("className")=="ender")
                return {id:composedLine.props["data-content"],at:1}
            const textNode=$node.findFirst(`[data-type="text"]`).get(0)
            if(textNode){//text
                const {props:{children:text, "data-content":id,"data-endat":endat},composer=this.getComposer(id)}=textNode
                const i=composer.measure.widthString(X-offset.x,text)
                return {id, at:endat-text.length+i}
            }
            const id=$node.findFirst(`[data-content]`).attr("data-content")
            if(id)
                return {id}
            const wrapper=parents.find(a=>a.props["data-content"])
            if(wrapper)
                return {id:wrapper.props["data-content"]}
        }else{
            const $line=new ReactQuery(composedLine.props.children)
            const {first,parents}=$line.findFirstAndParents('[data-content]')
            if(first.length>0){
                if(X<=[...parents,first.get(0)].reduce((x0,{props:{x=0}})=>x0+x,0)){
                    return {id:first.attr('data-content'),at:0}
                }else{
                    const {last,parents}=$line.findLastAndParents('[data-content]')
                    if(last.attr('data-type')=="text"){
                        offset.x=[...parents,last.get(0)].reduce((x0,{props:{x=0}})=>x0+x,0)
                        if(X>=(offset.x+last.attr('width'))){
                            return {id:last.attr('data-content'),at:last.attr('data-endat')}
                        }else{
                            const {props:{children:text, "data-content":id,"data-endat":endat},composer=this.getComposer(id)}=last.get(0)
                            const i=composer.measure.widthString(X-offset.x,text)
                            return {id, at:endat-text.length+i}
                        }
                    }else{
                        return {id:last.attr('data-content'),at:1}
                    }
                }
            }
        }
        //last chance at beginning of paragraph, such as empty paragraph
        return {id:composedLine.props["data-content"],at:0}
    }

    /**
	 * composedLine VS line
	 * @param {*} id 
	 * @param {*} at 
	 * @param {*} i 
	 */
	positionInInline(id,at,composedLine){
        const paragraph=this.getComposer(composedLine.props["data-content"])
		const defaultStyle=paragraph.getDefaultMeasure().defaultStyle
		//could it search from line directly to target
		const {first:story,parents:storyUps}=new ReactQuery(composedLine).findFirstAndParents(".story")
		const pos=storyUps.reduce((xy,{props:{x=0,y=0}})=>(xy.x+=x,xy.y+=y,xy),{x:0,y:0,...defaultStyle})
		
		const isParagraphSelf=id==paragraph.props.id
		const {first,last,target=first||last,parents}=story[`${at==1 ? "findLast" : "findFirst"}AndParents`](
			isParagraphSelf ? 
			`.ender${at==0 ? ",[data-content]" : ""}` : 
			({props:{"data-content":content,"data-endat":endat,children:text}})=>{
				if(content!=id)
					return
				if(endat==undefined || (at<=endat && at>=endat-text.length))
					return true
			}
		)
		pos.x+=[target.get(0),...parents].reduce((X,{props:{x=0}})=>X+x,0)
		pos.y+=(({y=story.attr('baseline'),height=0,descent=0})=>y-(height-descent))(target.get(0).props)
        
        if(isParagraphSelf){
			return pos
		}
		
		const composer=this.getComposer(id)
		if(composer.getComposeType()=="text"){
			const endat=target.attr("data-endat")
			const text=target.attr('children')
			if(endat>=at){
				const len=at-(endat-text.length)
				const offset=composer.measure.stringWidth(text.substring(0,len))
				pos.x+=offset
			}
		}else{
			if(target.attr('height'))
				pos.height=target.attr('height')+pos.descent
			 if(at==1 && target.attr('width'))
				pos.x+=target.attr('width')
		}
		return pos
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
        const grandFrameOffset=this.getGrandestFrameXY(grandFrame)
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
        var { x, y } = this.asCanvasPoint({ left, top })
        
        const {grandFrame,grandFrameOffset}=this.getGrandestFrameByPosition(x,y)
        if(!grandFrame)
            return {}
        
        const pointIsInside=({x:x0=0,y:y0=0,width,height},...offsets)=>{
            const o=offsets.reduce((o,{x,y})=>(o.x-=x,o.y-=y,o),{x,y})
            return x0<=o.x && y0<=o.y && (x0+width)>=o.x && (y0+height)>=o.y
        }
        
        //first check if it's anchor
        const anchor=grandFrame.anchors.find(({props:{geometry:{x=0,y=0,width=0,height=0}}})=>pointIsInside({x,y,width,height},grandFrameOffset))
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
        //to get most inner frame that includes the point, and return the frame
        const {node:frame, parents:_1,...frameOffset}=this.getBoundaryCheckedMostInnerNode(
            grandFrame.createComposed2Parent(), 
            //only frame that contain the point
            (rect,node)=>{
                const {props:{'data-content':id, width,height, composer=this.getComposer(id)}}=node
                if(composer && composer.isFrame)
                    return pointIsInside(rect({width,height}),grandFrameOffset)
            },
            //get frame from data-content and data-frame
            ({props:{'data-content':id,'data-frame':frameId, composer=this.getComposer(id)}})=>{
                return frameId==id ? composer : composer.computed.composed.find(a=>a.uuid==frameId)
            }
        )

        //locate the line that contain the point
        var line=frame.lines.find(line=>{
            const {props:{width=0, height=0}}=line
            return pointIsInside({...frame.lineXY(line),width,height},frameOffset,grandFrameOffset)
        })

        if(!line){
            //end of frame
            return {id:frame.props["layout-for"]||frame.props.id,at:1}
        }
        
        const lineOffset=frame.lineXY(line)
        const {pagination:{id,i}, paragraph=this.getComposer(id)}=line.props
        return this.aroundInInline(paragraph.computed.lastComposed[i-1],x-grandFrameOffset.x-frameOffset.x-lineOffset.x)
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
                    const o=this.getGrandestFrameXY(grandFrame)
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
        
            Object.assign(rects[0],{left:p0.x})
            Object.assign(rects[rects.length-1], {right:p1.x})

            return rects.filter(({left,right})=>(left-right)!=0)
        }catch(e){
            return []
        }
    }

    /**
     * 
     * @param {*} id 
     * @param {*} at 
     */
    nextLine(id,at){
        //to get next line below input line in the frame
        const nextLineBelowInFrame=(frame,lineInFrame)=>{
            if(frame.lastLine==lineInFrame)//go to next grandest frame
                return
            if(frame.cols && frame.cols.length>1){
                const isColumnLastLine=frame.columns.reduce((isLast,a)=>
                    isLast || (a.chilren.length>0 && a.children.length-1==a.children.indexOf(lineInFrame)),
                    false,
                )
                if(isColumnLastLine){//go to next grandest frame
                    return 
                }
                //@TODO: column may below the column of line
            }
            return frame.lines[frame.lines.indexOf(lineInFrame)+1]
        }
        
        const firstLineIncludeXInGrandestFrame=(grandestFrame,X)=>{
            if(!(grandestFrame.cols && grandestFrame.cols.length>1))
                return grandestFrame.firstLine
            const column=grandestFrame.columns.find(({x,width})=>X>=x && X<=x+width)
            if(column)
                return column.children[0]
        }

        const nextGrandestFrame=a=>this.frames[this.frames.indexOf(a)+1]


        var {x,y, frame, lineIndexInFrame, grandFrame}=this.position(id,at,true)
        var lineInFrame=frame.lines[lineIndexInFrame]
        
        var nextLine
        //find next line in current grandest frame
        while(frame && lineInFrame && !(nextLine=nextLineBelowInFrame(frame, lineInFrame))){
            //direct parent frame
            const parentFrame=this.getCheckedGrandFrameByFrame(
                frame,
                a=>a!=frame && new ReactQuery(a.createComposed2Parent()).findFirst(`[data-frame=${frame.uuid}]`).length==1/**/,
                true/*first*/)
            if(parentFrame){
                //locate line includes frame
                lineInFrame=parentFrame.lines.find(line=>new ReactQuery(line).findFirst(`[data-frame=${frame.uuid}]`).length==1)
                frame=parentFrame
            }else{
                break
            }
        }
        //find first line in next siblings of current grandest frame
        while(grandFrame && !nextLine && (grandFrame=nextGrandestFrame(grandFrame))){
            if(nextLine=firstLineIncludeXInGrandestFrame(grandFrame,x)){
                //adjust top to new grandest frame
                break
            }
        }
        return this.aroundInBlockLine(grandFrame,nextLine, {x,y})
    }

    prevLine(id,at){
        //to get prev line above input line in the frame
        const prevLineAboveInFrame=(frame,lineInFrame)=>{
            if(frame.firstLine==lineInFrame)//go to prev grandest frame
                return
            if(frame.cols && frame.cols.length>1){
                const isColumnFirstLine=frame.columns.reduce((isFirst,a)=>
                    isFirst || a.children.indexOf(lineInFrame)==0,
                    false,
                )
                if(isColumnFirstLine){//go to next grandest frame
                    return 
                }
                //@TODO: column may below the column of line
            }
            return frame.lines[frame.lines.indexOf(lineInFrame)-1]
        }
        
        const firstLineIncludeXInGrandestFrame=(grandestFrame,X)=>{
            if(!(grandestFrame.cols && grandestFrame.cols.length>1))
                return grandestFrame.lastLine
            const column=grandestFrame.columns.find(({x,width})=>X>=x && X<=x+width)
            if(column)
                return column.children[column.children.length-1]
        }

        const prevGrandestFrame=a=>this.frames[this.frames.indexOf(a)-1]


        var {x,y, frame, lineIndexInFrame, grandFrame}=this.position(id,at,true)
        var lineInFrame=frame.lines[lineIndexInFrame]
        
        var prevLine
        //first try to find next line in current grandest frame
        while(frame && lineInFrame && !(prevLine=prevLineAboveInFrame(frame, lineInFrame))){
            //direct parent frame
            const parentFrame=this.getCheckedGrandFrameByFrame(
                frame,
                a=>a!=frame && new ReactQuery(a.createComposed2Parent()).findFirst(`[data-frame=${frame.uuid}]`).length==1/**/,
                true/*first*/)
            if(parentFrame){
                //locate line includes frame
                lineInFrame=parentFrame.lines.find(line=>new ReactQuery(line).findFirst(`[data-frame=${frame.uuid}]`).length==1)
                frame=parentFrame
            }else{
                break
            }
        }
        //otherwise find first line in next siblings of current grandest frame
        while(grandFrame && !prevLine && (grandFrame=prevGrandestFrame(grandFrame))){
            if(prevLine=firstLineIncludeXInGrandestFrame(grandFrame,x)){
                //adjust top to new grandest frame
                break
            }
        }
        //then around in the line
        return this.aroundInBlockLine(grandFrame,prevLine, {x,y})
    }

    
	extendWord(id,at){
        const paragraph=this.getComposer(id).closest("paragraph")
        if(!paragraph)
            return {}
		const atom=paragraph.atoms.find(a=>{
			const found=new ReactQuery(a).findFirst(({props:{"data-content":xid, "data-endat":end=0}})=>{
				return (xid==id && end>=at)||undefined
			})
			return found.length>0
		})
		if(atom){
			const target=new ReactQuery(atom)
			const first=target.findFirst(`[data-type="text"]`)
			if(first.length){
				const last=target.findLast(`[data-type="text"]`)
				if(last.length){
					return {
						start:{
							id:first.attr('data-content'),
							at:parseInt(first.attr('data-endat'))-first.attr("children").length
						},
						end:{
							id:last.attr('data-content'),
							at:parseInt(last.attr('data-endat'))
						}
					}
				}
			}
		}
		return {}
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