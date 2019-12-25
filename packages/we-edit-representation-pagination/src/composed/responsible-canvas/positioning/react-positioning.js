import React from "react"
import {ReactQuery} from "we-edit"
import Positioning from "./base"

/**
 * layouted is a frame tree
 * top frame(topFrame) is the top frame
 * leafFrame is a frame without nested frame
 * it's based on some knowledge:
 * 1. data-frame=frame.uuid
 * 2. inline layout story, and its baseline
 * 
 * the positioning basic idea is to positioning in leafFrame(so the content is exact atoms, or merging up with atoms), 
 * and then computed with topFrame.offset, and leafFrame.offset
 */
class PositioningHelper extends Positioning{
    getTopFrameXY(topFrame){
        const {x,y}=this.pageXY(topFrame.props.I)
        return {x,y,top:y,bottom:y+topFrame.props.height}
    }

    getTopFrameByPosition(x,y){
        var xy
        const topFrame=this.frames.find(({ props: { width, height, I } }) => {
            xy = this.pageXY(I);
            return x >= xy.x && x <= xy.x + width && y >= xy.y && y <= xy.y + height;
        })
        return {topFrame, topFrameOffset:xy} 
    }

    /**
     * start and end must be in same block level (NOT same frame, BUT same level of grand content), 
     * if not, start and end must be extended up to same block level
     * 
     * there are two type of block line
     * 1. paragraph line
     * 2. table row
     * there are two types of frame 
     * 1. frame content, 
     * 2. fission frame as layout engine
     * 
     * @param {*} start 
     * @param {*} end 
     */
    normalizeSelection(start, end) {
        if (start.id == end.id)
            return { start, end }
        const getGrandBlockContents=(current,blocks=[])=>{
            while(current){
                if(current.isSection
                    ||current.isFrame
                    ||["row","document"].includes(current.getComposeType())
                    ){
                    blocks.push(current.props.id)
                }
                current=current.context ? current.context.parent : null
            }
            return blocks
        }
        
        const blocksA = getGrandBlockContents(this.getComposer(start.id))
        const blocksB = getGrandBlockContents(this.getComposer(end.id))
        const i = blocksA.findLastIndex((a, i) => a == blocksB[i]);
        if (i != -1) {
            blocksA.splice(0, i + 1);
            blocksB.splice(0, i + 1);
        }
        if (blocksA[0]) {
            start = { id: blocksA[0], at: 1 };
        }
        if (blocksB[0]) {
            end = { id: blocksB[0], at: 1 };
        }
        return { start, end };
    }

    getOrderedPosition(start,end){
        //at first start and end must be normalized to same block level
        ({ start, end } = this.normalizeSelection(start,end));
        const p0=this.position(start.id,start.at, true)
        const p1=this.position(end.id, end.at,true)
        const reverted={p0:p1,p1:p0}
        if(p0.topFrame.props.i>p1.topFrame.props.i){
            return reverted
        }else if(p0.topFrame.props.i==p1.topFrame.props.i){
            if(p0.leafFrame==p1.leafFrame){
                if(p0.lineIndexInLeafFrame>p1.lineIndexInLeafFrame){
                    return reverted
                }else if(p0.lineIndexInLeafFrame==p1.lineIndexInLeafFrame){
                    if(p0.x>p1.x){
                        return reverted
                    }
                }
            }else if(p0.leafFrame.props.i>p1.leafFrame.props.i){
                return reverted
            }
        }
        return {p0,p1}
    }

    getFrameOffsetGrandFrame(grandFrame,frame){
        if(grandFrame==frame)
            return {x:0,y:0}
        const grandFrameLayouted=grandFrame.createComposed2Parent()
        const {first,parents}=new ReactQuery(grandFrameLayouted).findFirstAndParents(`[data-frame=${frame.uuid}]`)
        return [...parents,first.get(0)].filter(a=>!!a).reduce((xy,{props:{x=0,y=0}})=>(xy.x+=x, xy.y+=y, xy),{x:0,y:0})
    }

   /**
     * travel up
     * to find up frame layout or fissionable's fission based on following knowledge
     * 1. composed frame must give data-frame=frame.uuid on content
     * 2. each frame layout must have context.frame(for fission)|.parent(for frame content) to travel up frame tree
     * @param {*} frame, start point 
     * @param {*} check(frame) 
     * @param {boolean} first: return first found or topFrame
     * @Default for topFrame
     */
    getCheckedGrandFrameByFrame(frame,check, first, find="find"){
        if(!check)//default: frame or any grandFrame including frame
            check=a=>a==frame || new ReactQuery(a.createComposed2Parent()).findFirst(`[data-frame=${frame.uuid}]`).length==1
        var current=frame, grandMaybe=null
        while(current){
            if(current.isFrame && check(current)){
                grandMaybe=current 
            }else if(current.isSection){
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

 
    /**
     * travel down
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
        while(true){//find most inner node that includes the point
            const found=current.findFirstAndParents((node,parents)=>{
                if(!node || !React.isValidElement(node)) 
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

    /**
     * to around to x in a line of frame, the line may contain frame
     * scope it to leafFrame, and proxy to aourndInInline
     * @param {*} topFrame 
     * @param {*} line 
     * @param {*} param2 
     */    
    aroundInBlockLine({x=0,y=0}={},line, topFrame, blockFrame=topFrame){
        if(!line || !topFrame)
            return {}
        /**
         * now next line found, then locate with one of following ways
         * 1. to round(left, top+1)???? what if it's on top margin/border
         * 2. **find most inner node that includes (left,*), and then position in paragraph line
         */
        const lineOffset=blockFrame.lineXY(line)
        const topFrameOffset=this.getTopFrameXY(topFrame)
        const blockFrameOffset=this.getFrameOffsetGrandFrame(topFrame,blockFrame)
        x=x-topFrameOffset.x-blockFrameOffset.x-lineOffset.x
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

    /**
     * to around to x in a line of paragraph, the paragraph line must be in  leafFrame
     * @param {*} composedLine 
     * @param {*} X 
     */
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
     * in paragraph: id->paragraph->line
     * paragraph:
     * larger frame than paragraph:
     * anchor not in paragraph:
     * @param {*} id 
     * @param {*} at 
     */
    positionToLeafFrameLine(id,at){
        const paragraph=this.getComposer(id).closest("paragraph")
        const $find=at==1 ? 'findLast' : 'findFirst'
        const find=at==1 ? "findLast" : "find"
        var i=0, leafFrame,lineInFrame, position
        const targetHasParagraph=this.getContent(id)[$find]('paragraph').attr('id')
        if(paragraph && !targetHasParagraph){
            if(paragraph.props.id==id){
                //paragraph level
                i=at==1 ? paragraph.lines.length-1 : 0
            }else if(false){

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
            
            leafFrame=paragraph.lines[i].space.frame
            lineInFrame=leafFrame.lines.find(({props:{pagination:{id:p,i:I}={}}})=>p==paragraph.props.id&&I==i+1)
            position=()=>this.positionInInline(id,at,paragraph.computed.lastComposed[i])
        }else{
            /**
             * bigger than paragraph level
             * wrapper of paragraph
             * table/row/cell
             * frame/shape
             */
            const firstParagraph=this.getComposer(targetHasParagraph)// this.getContent(id)[$find]("paragraph").attr("id"))
            
            leafFrame=this.getCheckedGrandFrameByFrame(
                firstParagraph.lines[at==1 ? firstParagraph.lines.length-1 : 0].space.frame, 
                a=>new ReactQuery(a.createComposed2Parent()).findFirst(`[data-content=${id}]`).length==1,
                true,//first frame includes id
                find
            )
            lineInFrame=leafFrame.lines[find](line=>new ReactQuery(line).findFirst(`[data-content=${id}]`).length==1)
            position=()=>{
                const {first,last,node=first||last, parents}=new ReactQuery(lineInFrame)[`${$find}AndParents`](`[data-content=${id}]`)
                const x=[...parents,node.get(0)].reduce((X,{props:{x=0}})=>x+X,0)
                return {x:at==1 ? x+(node.attr('width')||0) : x, y:0}
            }
        }
        
        return {
            leafFrame, 
            line:new Proxy(lineInFrame,{
                get(line,prop){
                    return {
                        position,
                        paragraph:paragraph ? paragraph.props.id : undefined,
                        i:paragraph ? i : undefined,
                        inFrame:line,
                        height:line.props.height
                    }[prop]||line[prop]
                }
            })
        }
    }

    /**
	 * position (id,at) on paragraph composedLine, paragraph line must be in a  leafFrame
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
			node=>{
                if(!React.isValidElement(node))
                    return false
                const {props:{"data-content":content,"data-endat":endat,children:text}}=node
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
export default Positioning.makeSafe(class ReactPositioning extends PositioningHelper {
    /**
     * 2 options:
     * >>a. positioning from up to id, scope from big to small
     * >>b. positioning from id up, performance should be better, chosen
     * the location may be:
     * Inline Level
     */
    position(id,at, internal){
        //#b , (id,at)->line->frame->topFrame
        /**
         * maybe no line
         * > anchor
         * > topFrame itself
         */
        const {leafFrame,line, anchor}=this.positionToLeafFrameLine(id,at)
        const topFrame=this.getCheckedGrandFrameByFrame(leafFrame)
        const topFrameOffset=this.getTopFrameXY(topFrame)
        const leafFrameOffset=this.getFrameOffsetGrandFrame(topFrame,leafFrame)
        const lineOffset=leafFrame.lineXY(line.inFrame)
        const inline=line.position()

        //finally
        const x=topFrameOffset.x+leafFrameOffset.x+lineOffset.x+inline.x
        const y=topFrameOffset.y+leafFrameOffset.y+lineOffset.y+inline.y
        const position={
            id,at,
            ...inline,
            x,
            y,
            ...this.asViewportPoint({ x,y }),
            page:topFrame.props.I,
            paragraph:line.paragraph,
            lineIndexOfParagraph:line.i,
            lineHeight:line.height
        }

        if(!internal)
            return position
        return Object.assign(position, {topFrame, leafFrame, lineIndexInLeafFrame:leafFrame.lines.indexOf(line.inFrame)})
    }

    around(left,top){
        //convert to canvas co-ordinate
        var { x, y } = this.asCanvasPoint({ left, top })
        
        const {topFrame,topFrameOffset}=this.getTopFrameByPosition(x,y)
        if(!topFrame)
            return {}
        
        const pointIsInside=({x:x0=0,y:y0=0,width,height},...offsets)=>{
            const o=offsets.reduce((o,{x,y})=>(o.x-=x,o.y-=y,o),{x,y})
            return x0<=o.x && y0<=o.y && (x0+width)>=o.x && (y0+height)>=o.y
        }
        
        //first check if it's anchor
        const anchor=topFrame.anchors.find(({props:{geometry:{x=0,y=0,width=0,height=0}}})=>pointIsInside({x,y,width,height},topFrameOffset))
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
        //to get leaf frame that includes the point, and return the frame
        const {node:leafFrame}=this.getBoundaryCheckedMostInnerNode(
            topFrame.createComposed2Parent(), 
            //only frame that contain the point
            (rect,node)=>{
                const {props:{"data-frame":isFrame, width,height}}=node
                if(isFrame)
                    return pointIsInside(rect({width,height}),topFrameOffset)
            },
            //get frame from data-content and data-frame
            ({props:{'data-content':id,'data-frame':frameId, composer=this.getComposer(id)}})=>{
                return frameId==id ? composer : composer.computed.composed.find(a=>a.uuid==frameId)
            }
        )
        const leafFrameOffset=this.getFrameOffsetGrandFrame(topFrame,leafFrame)

        //locate the line that contain the point
        var line=leafFrame.lines.find(line=>{
            const {props:{width=0, height=0}}=line
            return pointIsInside({...leafFrame.lineXY(line),width,height},leafFrameOffset,topFrameOffset)
        })

        if(!line){
            //end of frame
            return {id:leafFrame.props.id,at:1}
        }
        
        const lineOffset=leafFrame.lineXY(line)
        //what if leafFrame is not leaf node?????
        const {pagination:{id,i}, paragraph=this.getComposer(id)}=line.props
        return this.aroundInInline(paragraph.computed.lastComposed[i-1],x-topFrameOffset.x-leafFrameOffset.x-lineOffset.x)
    }

    /**
     * 1. start and end must be normalized to same layout block
     * 2. append rect line by line up to 
     * 3. remove left of first line, and right of end line
     * @param {*} start 
     * @param {*} end 
     */
    getRangeRects(start,end){
        const rects=[]
        const { p0, p1 } = this.getOrderedPosition(start, end)
        
        const scope=(function* (frame0, frame1){
            const makeRects=(frame,from=0,to=frame.lines.length-1)=>{
                const topFrame=this.getCheckedGrandFrameByFrame(frame)
                const o=this.getTopFrameXY(topFrame)
                const {x,y}=this.getFrameOffsetGrandFrame(topFrame,frame) 
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
                yield makeRects(frame0, p0.lineIndexInLeafFrame, p1.lineIndexInLeafFrame)
                return 
            }
            yield makeRects(frame0, p0.lineIndexInLeafFrame)
            for(let frames=frame0.context.parent.computed.composed,i=frame0.props.i+1;i<frame1.props.i;i++){
                yield makeRects(frames[i])
            }
            yield makeRects(frame1, 0,p0.lineIndexInLeafFrame)
        }).call(this, p0.leafFrame, p1.leafFrame);

        for(const bounds of scope){
            rects.splice(rects.length, 0, ...bounds)
        }

        if(rects.length==0)
            return rects
    
        Object.assign(rects[0],{left:p0.x})
        Object.assign(rects[rects.length-1], {right:p1.x})

        return rects.filter(({left,right})=>(left-right)!=0)
    }

    /**
     * use composed to locate, so frame would not 
     * @param {*} id 
     * @param {*} at 
     */
    nextLine(id,at){
        //to get next line below input line in the frame
        const nextLineBelowInFrame=(frame,lineInFrame, offset)=>{
            var nextLine=(()=>{
                if(frame.lastLine==lineInFrame)//go to next top frame
                    return
                if(frame.cols && frame.cols.length>1){
                    const isColumnLastLine=frame.columns.reduce((isLast,a)=>
                        isLast || (a.lines.length>0 && a.lines.length-1==a.lines.indexOf(lineInFrame)),
                        false,
                    )
                    if(isColumnLastLine){//go to next top frame
                        return 
                    }
                }
                return frame.lines[frame.lines.indexOf(lineInFrame)+1]
            })();
            if(nextLine)
                return nextLine

            if(frame.unusualFrameLineBelow){
                //provide chance to unusal frame, such as docx continuous section, a page may includes multi continous sections' content
                offset=[
                    this.getTopFrameXY(topFrame),
                    this.getFrameOffsetGrandFrame(topFrame,leafFrame)
                ].reduce((o,a)=>({x:o.x-a.x,y:o.y-a.y}),offset)
                const found=frame.unusualFrameLineBelow(offset)
                if(found){
                    leafFrame=found.frame
                    return found.line
                }
            }
            /*
            

            const pointIsInside=({x:x0=0,y:y0=0,width,height})=>o.x>=x0 && o.y>=y0 && o.x<=x0+width && offset.y<=y0+height
            
            this.getBoundaryCheckedMostInnerNode(
                frame.createComposed2Parent(),
                //only frame that contain the point
                (rect,node)=>{
                    const {props:{"data-frame":isFrame, pagination:isLine, width,height}}=node
                    if(isFrame && !pointIsInside(rect({width,height})))
                        return false
                    if(isLine){
                        return pointIsInside(rect({width,height}))
                    }
                },
                //get frame from data-content and data-frame
                ({props:{pagination:{id,i}}},parents)=>{
                    const composedFrame=parents.findLast(({props:{'data-content':id,'data-frame':frameId, composer=this.getComposer(id)}})=>{
                        if(frameId){
                            return leafFrame=frameId==id ? composer : composer.computed.composed.find(a=>a.uuid==frameId)
                        }
                    })
                    if(composedFrame){
                        nextLine=leafFrame.lines.find(({props:{pagination:a={}}})=>a.id==id && a.i==i)
                    }
                }
            )
            return nextLine
            */
        }
        
        const firstLineIncludeXInTopFrame=(topFrame,X)=>{
            if(!(topFrame.cols && topFrame.cols.length>1))
                return topFrame.firstLine
            const column=topFrame.columns.find(({x,width})=>X>=x && X<=x+width)
            if(column)
                return column.lines[0]
        }

        const nextTopFrame=a=>this.frames[this.frames.indexOf(a)+1]


        var {x,y, leafFrame, lineIndexInLeafFrame, topFrame}=this.position(id,at,true)
        var lineInLeafFrame=leafFrame.lines[lineIndexInLeafFrame]
        
        var nextLine
        //find next line in current TOP frame
        while(leafFrame && lineInLeafFrame){
            if(nextLine=nextLineBelowInFrame(leafFrame, lineInLeafFrame,{x,y})){
                return this.aroundInBlockLine({x,y},nextLine, topFrame, leafFrame)
            }
            //direct parent frame
            const parentFrame=this.getCheckedGrandFrameByFrame(
                leafFrame,
                a=>a!=leafFrame && new ReactQuery(a.createComposed2Parent()).findFirst(`[data-frame=${leafFrame.uuid}]`).length==1/**/,
                true/*first*/)
            if(parentFrame){
                //locate line includes frame
                lineInLeafFrame=parentFrame.lines.find(line=>new ReactQuery(line).findFirst(`[data-frame=${leafFrame.uuid}]`).length==1)
                leafFrame=parentFrame
            }else{
                break
            }
        }
        //find first line in next siblings of current top frame
        while(topFrame && !nextLine && (topFrame=nextTopFrame(topFrame))){
            if(nextLine=firstLineIncludeXInTopFrame(topFrame,x)){
                return this.aroundInBlockLine({x,y}, nextLine, topFrame)
            }
        }
        
    }

    prevLine(id,at){
        //to get prev line above input line in the frame
        const prevLineAboveInFrame=(frame,lineInFrame)=>{
            if(frame.firstLine==lineInFrame)//go to prev top frame
                return
            if(frame.cols && frame.cols.length>1){
                const isColumnFirstLine=frame.columns.reduce((isFirst,a)=>
                    isFirst || a.lines.indexOf(lineInFrame)==0,
                    false,
                )
                if(isColumnFirstLine){//go to next top frame
                    return 
                }
                //@TODO: column may below the column of line
            }
            return frame.lines[frame.lines.indexOf(lineInFrame)-1]
        }
        
        const firstLineIncludeXInTopFrame=(topFrame,X)=>{
            if(!(topFrame.cols && topFrame.cols.length>1))
                return topFrame.lastLine
            const column=topFrame.columns.find(({x,width})=>X>=x && X<=x+width)
            if(column)
                return column.lines[column.lines.length-1]
        }

        const prevTopFrame=a=>this.frames[this.frames.indexOf(a)-1]


        var {x,y, leafFrame, lineIndexInLeafFrame, topFrame}=this.position(id,at,true)
        var lineInLeafFrame=leafFrame.lines[lineIndexInLeafFrame]
        
        var prevLine
        //first try to find prev line in current top frame
        while(leafFrame && lineInLeafFrame){
            if(prevLine=prevLineAboveInFrame(leafFrame, lineInLeafFrame)){
                return this.aroundInBlockLine({x,y},prevLine,topFrame,leafFrame)
            }
            //direct parent frame
            const parentFrame=this.getCheckedGrandFrameByFrame(
                leafFrame,
                a=>a!=leafFrame && new ReactQuery(a.createComposed2Parent()).findFirst(`[data-frame=${leafFrame.uuid}]`).length==1/**/,
                true/*first*/)
            if(parentFrame){
                //locate line includes frame
                lineInLeafFrame=parentFrame.lines.find(line=>new ReactQuery(line).findFirst(`[data-frame=${leafFrame.uuid}]`).length==1)
                leafFrame=parentFrame
            }else{
                break
            }
        }
        //otherwise find first line in next siblings of current top frame
        while(topFrame && !prevLine && (topFrame=prevTopFrame(topFrame))){
            if(prevLine=firstLineIncludeXInTopFrame(topFrame,x)){
                //then around in the line
                return this.aroundInBlockLine({x,y},prevLine, topFrame)
            }
        }
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
})