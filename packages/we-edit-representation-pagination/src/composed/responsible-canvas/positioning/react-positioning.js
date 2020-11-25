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
        const topFrame=this.frames.find(({ props: { width=Number.MAX_SAFE_INTEGER, height=Number.MAX_SAFE_INTEGER, I=0 } }) => {
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

    _targetFrameContainsFrame=frame=>targetFrame=>{
        const parents=((a,found=[])=>{
            while(a=a.context.parent){
                found.push(a.props.id)
            }
            return found
        })(this.getComposer(frame.props.id))

        return new ReactQuery(targetFrame.createComposed2Parent()).findFirst(node=>{
            if(!(node && node.props))
                return 
            const {props:{"data-content":id,"data-frame":isFrame}}=node
            if(!isFrame) 
                return 

            if(isFrame==frame.uuid){
                return true
            }
            if(!parents.includes(id)){
                return false
            }
        }).length==1  
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
        if(!check){//default: frame or any grandFrame including frame
            const frameContainedBy=this._targetFrameContainsFrame(frame)
            check=targetFrame=>targetFrame==frame || frameContainedBy(targetFrame)
        }

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
     * travel down composed to find node,
     * ** it should always find from last to consider z order
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
            const found=current.findLastAndParents((node,parents)=>{
                if(!node || !React.isValidElement(node)) 
                    return false
                
                if(node.props && node.props["data-nocontent"])
                    return false
                if(node==current.get(0))
                    return 
                return check(o=>rect([...allParents, ...parents,node],o),node)
            })
            if(found.last.length==1){
                allParents=[...allParents,...found.parents]
                current=found.last
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
            const wrapper=parents.findLast(a=>a.props["data-content"])
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

    //to make positioning only based on compose, not content
    __findFirstParagraphInTarget(target){
        const getParagraphInCell=a=>new ReactQuery(a.createComposed2Parent()).findFirst(`[data-type="paragraph"]`).attr("data-content")
        var paragraphInCell=null
        if(target.getComposeType()=="cell"){
            target.computed.lastComposed.find(a=>paragraphInCell=getParagraphInCell(a))
            return paragraphInCell
        }

        const paragraphDirect=new ReactQuery(target.computed.lastComposed).findFirst(a=>{
                if(!a || !a.props)
                    return 
                if(a.props["data-type"]=="paragraph")
                    return true
                if(a.isFrame){//table Cell is special, since table and row last composed element includes Cell Frames, instead of cell content
                    return paragraphInCell=getParagraphInCell(a)
                }
            })
        return paragraphInCell || paragraphDirect.attr("data-content")
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
        const target=this.getComposer(id)
        const paragraph=target.closest("paragraph")
        const $find=at==1 ? 'findLast' : 'findFirst'
        const find=at==1 ? "findLast" : "find"
        var i=0, leafFrame,lineInFrame, position, anchor
        //@TODO: how to find target's first paragraph??? //
        const targetHasParagraph= target!=paragraph && this.__findFirstParagraphInTarget(target)//this.getContent(id)[$find]('paragraph').attr('id')
        if(paragraph && !targetHasParagraph){
            if(paragraph.props.id==id){
                //paragraph level
                i=at==1 ? paragraph.lines.length-1 : 0
            }else{
                //inline level
                /**
                 * inline content includes: 
                 * 1. atoms,such as image,text,..., which is not sensitive to query.findFirst/findLast
                 * 2. inline container: it's sensitive to at(0:conainer start|1: container end) to query.findFirst/findLast
                 * 3. anchors
                 */
                i=paragraph.lines[`${find}Index`](line=>line.atoms.find(atom=>{
                    const $atom=new ReactQuery(atom)
                    const node=$atom[$find](`[data-content="${id}"]`)
                    if(node.length==0)
                        return 
                        
                    if((()=>{
                        const {props:{"data-endat":endat, children:text}}=node.get(0)
                        if(endat==undefined //not text, true
                            || (at>=endat-text.length && at<endat))//inside text,true
                            return true
                        if(at==endat && this.getComposer(id).text.length==endat)//next of last text
                            return true
                    })()){
                        if(atom.props.anchor){
                            anchor=$atom.findFirst('[data-type="anchor"]').attr('data-content')
                        }
                        return true
                    }
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
             * 
             * use the first paragraph of target, and find up frame that includes target 
             */
            const firstParagraph=this.getComposer(targetHasParagraph)
            
            leafFrame=this.getCheckedGrandFrameByFrame(
                firstParagraph.lines[at==1 ? firstParagraph.lines.length-1 : 0].space.frame, 
                a=>new ReactQuery(a.createComposed2Parent()).findFirst(`[data-content=${id}]`).length==1,
                true,//first frame includes id
                find
            )
            lineInFrame=leafFrame.lines[find](line=>new ReactQuery(line).findFirst(`[data-content=${id}]`).length==1)
                
            if(!lineInFrame){
                position=()=>{
                    if(at==1){
                        const {width,height}=leafFrame.createComposed2Parent().props
                        return {x:width,y:height}
                    }
                    return {x:0,y:0,}
                }
            }else{
                position=()=>{
                    const {first,last,node=first||last, parents}=new ReactQuery(lineInFrame)[`${$find}AndParents`](`[data-content=${id}]`)
                    const x=[...parents,node.get(0)].reduce((X,{props:{x=0}})=>x+X,0)
                    return {x:at==1 ? x+(node.attr('width')||0) : x, y:0}
                }
            }
        }
        
        return {
            leafFrame, 
            line:new Proxy(lineInFrame||{},{
                get(line,prop){
                    if(["position","paragraph","i","inFrame","height"].includes(prop)){
                    return {
                            position,
                            paragraph:paragraph ? paragraph.props.id : undefined,
                            i:paragraph ? i : undefined,
                            inFrame:lineInFrame,
                            height:lineInFrame && lineInFrame.props.height
                        }[prop]
                    }
                    return line[prop]
                }
            }),
            anchor: anchor && ({
                id:anchor,
                position:null,//implemented by offset 
                offset(topFrame){
                    const offset=nodes=>nodes.filter(a=>!!a).reduce((o,{props:{x=0,y=0}})=>(o.x+=x, o.y+=y, o),{x:0,y:0})
                    const {first, parents}=new ReactQuery(topFrame.createComposed2Parent())
                        .findFirstAndParents(`[data-content="${anchor}"]`)
                    this.position=()=>{
                        const a=first.findFirstAndParents(`[data-content="${id}]`)
                        return offset([...a.parents,a.first.get(0)])
                    }
                    return offset([...parents])
                },
            }),
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
        const lineDescent=story.attr('lineDescent')
        
        const isParagraphSelf=id==paragraph.props.id
        


		const {first,last,target=first||last,parents}=story[`${at>0 ? "findLast" : "findFirst"}AndParents`](
			isParagraphSelf ? "[data-content],.ender":
			node=>{
                if(!React.isValidElement(node))
                    return false
                const {props:{"data-content":content,"data-endat":endat,children:text}}=node
				if(content!=id)
					return
				if(endat==undefined || (at<=endat && at>=endat-text.length))
					return true
			}
        );
        

		[target.get(0),...parents].reduce((o,{props:{x=0,y=0}})=>(o.x+=x, o.y+=y, o), pos);
        
        const {height,width,descent}=target.get(0).props
        if(descent!=undefined){//text or text inline container
            pos.y-=(height-descent)
            pos.height=height
        }else{
            pos.height=height+lineDescent
        }

		const composer=this.getComposer(id)
		if(composer.getComposeType()=="text"){
            const endat=target.attr("data-endat")
            const text=target.attr('displayText')||target.attr('children')
            if(text.length==1 && endat==1){//only 1, then quick width
                pos.x+=text[0].props.width
            }else if(at>0 && endat>=at){
				const len=at-(endat-text.length)
				const offset=composer.measure.stringWidth(text.substring(0,len))
				pos.x+=offset
            }
        }else if(at==1 && width && !isParagraphSelf){
            pos.x+=width
        }
        
		return pos
    }
    
    getFrameByLayoutedFrameNode({props:{'data-content':id,'data-frame':frameId, composer=this.getComposer(id)}}){
        return frameId==id ? composer : composer.computed.composed.find(a=>a.uuid==frameId)
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
     */
    position(id,at, __returnEverything){
        //#b , (id,at)->line->frame->topFrame
        /**
         * maybe no line
         * > anchor
         * > topFrame itself
         */
        const {leafFrame,line, anchor}=this.positionToLeafFrameLine(id,at)
        const topFrame=this.getCheckedGrandFrameByFrame(leafFrame)
        const topFrameOffset=this.getTopFrameXY(topFrame)
        const leafFrameOffset=!anchor ? this.getFrameOffsetGrandFrame(topFrame,leafFrame) : anchor.offset(topFrame,leafFrame)
        const lineOffset=(!anchor && line.inFrame) ? leafFrame.lineXY(line.inFrame) : {x:0,y:0}
        const inline=!anchor ? line.position(id,at) : anchor.position(topFrame,id,at)

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

        if(!__returnEverything)
            return position
        return Object.assign(position, {
            topFrame, 
            leafFrame, 
            get lineIndexInLeafFrame(){
                if(!line.inFrame && !anchor){
                    return at==0 ? 0 : leafFrame.lines.length-1
                }
                return leafFrame.lines.indexOf(line.inFrame)
            },
            get line(){
                if(topFrame==leafFrame)
                    return this.lineIndexInLeafFrame
                return topFrame.lines.findIndex(a=>new ReactQuery(a).findFirst(`[data-frame="${leafFrame.uuid}"]`).length==1)
            },

            get layer(){
                const {parents}=new ReactQuery(topFrame.createComposed2Parent()).findFirstAndParents(`[data-content="${id}]`)
                const layer=parents.find(a=>a && a.type.displayName=="layer")
                if(layer){
                    return layer.props.z
                }
            }
        })
    }

    positionToLineEnd(id,at){
        const pos=this.position(id,at,true)
        const {paragraph, lineIndexOfParagraph}=pos
        if(lineIndexOfParagraph!=-1){
            const $p=this.getComposer(paragraph)
            const atom=$p.lines[lineIndexOfParagraph].lastAtom
            if(atom==$p.atoms[$p.atoms.length-1])
                return {id:paragraph, at:1}

            const node=new ReactQuery(atom).findLast(node=>{
                if(!React.isValidElement(node))
                    return false
                const {props:{"data-content":isContent, "data-type":type, children}}=node
                if(isContent && (type=="text" || !children)){
                    return true
                }
            })
            if(node.length){
                if(node.attr("data-type")=="text"){
                    return {id:node.attr('data-content'), at:Math.max(0,node.attr("data-endat")-1)}
                }else{
                    return {id:node.attr('data-content'),at:1}
                }
            }
        }
        return {id,at}
    }

    positionToLineStart(id,at){
        const pos=this.position(id,at,true)
        const {paragraph, lineIndexOfParagraph}=pos
        if(lineIndexOfParagraph!=-1){
            const $p=this.getComposer(paragraph)
            const atom=$p.lines[lineIndexOfParagraph].firstAtom
            if(atom==$p.atoms[0])
                return {id:paragraph, at:0}
            const node=new ReactQuery(atom).findFirst(node=>{
                if(!React.isValidElement(node))
                    return false
                const {props:{"data-content":isContent, "data-type":type, children}}=node
                if(isContent && (type=="text" || !children)){
                    return true
                }
            })
            if(node.length){
                if(node.attr("data-type")=="text"){
                    return {id:node.attr('data-content'), at:node.attr("data-endat")-node.attr('children').length}
                }else{
                    return {id:node.attr('data-content'),at:0}
                }
            }
        }
        return {id,at}
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
        const anchor=topFrame.anchors.find(({props})=>{
            const {x=0,y=0,width=0,height=0}=props.geometry||props
            return pointIsInside({x,y,width,height},topFrameOffset)
        })
        if(anchor){
            const $anchor=new ReactQuery(anchor)
            const notFrameAnchor=$anchor.findFirst(`[data-frame]`).length==0
            if(notFrameAnchor){
                const {node}=this.getBoundaryCheckedMostInnerNode(
                    anchor, 
                    (rect,node)=>{
                        const {props:{width,height, "data-nocontent":noContent}}=node
                        if(noContent)
                            return false
                        if(width && height)
                            return pointIsInside(rect({width,height}),topFrameOffset, anchor.props.geometry)
                    },
                    (node,parents)=>[node,...parents].find(a=>a && a.props && "data-content" in a.props)
                )

                return {id:node.props["data-content"]}
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
            layoutedFrameNode=>this.getFrameByLayoutedFrameNode(layoutedFrameNode)
        )
        const leafFrameOffset=this.getFrameOffsetGrandFrame(topFrame,leafFrame)

        //locate the line that contain the point
        var line=leafFrame.lines.find(line=>{
            const {props:{width=0, height=0}}=line
            return pointIsInside({...leafFrame.lineXY(line),width,height},leafFrameOffset,topFrameOffset)
        })

        if(!line){
            const isEmpty=leafFrame.lines.length==0
            const isAboveFirstLine=()=>{
                return y<leafFrame.lineXY(leafFrame.lines[0]).y+leafFrameOffset.y+topFrameOffset.y
            }
            const isBelowLastLine=()=>{
                const last=leafFrame.lines[leafFrame.lines.length-1]
                return y>leafFrame.lineXY(last).y+last.props.height+leafFrameOffset.y+topFrameOffset.y
            }
            if(!isEmpty && isAboveFirstLine()){
                line=leafFrame.lines[0]
            }else if(!isEmpty && isBelowLastLine()){
                line=leafFrame.lines[leafFrame.lines.length-1]
            }else{
                //end of frame
                return {id:leafFrame.props.id,at:1}
            }
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
        const nextLineBelow=(frame,line, offset)=>{
            var nextLine=(()=>{
                if(frame.lastLine==line)//go to next top frame
                    return
                if(frame.cols && frame.cols.length>1){
                    const isColumnLastLine=frame.columns.reduce((isLast,a)=>
                        isLast || (a.lines.length>0 && a.lines.length-1==a.lines.indexOf(line)),
                        false,
                    )
                    if(isColumnLastLine){//go to next top frame
                        return 
                    }
                }
                return frame.lines[frame.lines.indexOf(line)+1]
            })();
            if(nextLine)
                return nextLine

            //frame can be customized to break Block Layout structure(such as Word continuous section), 
            //so try to locate from layouted 
            const point=[this.getTopFrameXY(topFrame)].reduce((o,a)=>({x:o.x-a.x,y:o.y-a.y}),offset)
            const frameIsBelowPointAndContainPointX=({x,y,width})=>point.x>=x && point.x<=x+width && y>point.y
            //to get most inner frame that under offset.y and include offset.x
            const found=this.getBoundaryCheckedMostInnerNode(
                topFrame.createComposed2Parent(), 
                (rect,node)=>{
                    const {props:{"data-frame":isFrame, width,height}}=node
                    if(isFrame){
                        if(this.getFrameByLayoutedFrameNode(node)==frame)
                            return false
                        return frameIsBelowPointAndContainPointX(rect({width,height}))
                    }
                },
                //get frame from data-content and data-frame
                (layoutedFrameNode,[layoutedTopFrame])=>
                    layoutedFrameNode && layoutedTopFrame/*not top frame or layouted not synced*/
                        ? this.getFrameByLayoutedFrameNode(layoutedFrameNode) : null
            )
            if(found.node){
                return firstLineIncludeX(leafFrame=found.node, point.x-found.x)
            }
        }
        
        const firstLineIncludeX=(frame,X)=>{
            if(!(frame.cols && frame.cols.length>1))
                return frame.firstLine
            const column=frame.columns.find(({x,width})=>X>=x && X<=x+width)
            if(column)
                return column.lines[0]
        }

        const nextTopFrame=a=>this.frames[this.frames.indexOf(a)+1]


        var {x,y, leafFrame, lineIndexInLeafFrame, topFrame}=this.position(id,at,true)
        var lineInLeafFrame=leafFrame.lines[lineIndexInLeafFrame]
        
        var nextLine
        //find next line in current TOP frame
        while(leafFrame && lineInLeafFrame){
            if(nextLine=nextLineBelow(leafFrame, lineInLeafFrame,{x,y})){
                return this.aroundInBlockLine({x,y},nextLine, topFrame, leafFrame)
            }
            //direct parent frame
            const leafFrameContainedBy=this._targetFrameContainsFrame(leafFrame)
            const parentFrame=this.getCheckedGrandFrameByFrame(
                leafFrame,
                a=>a!=leafFrame && leafFrameContainedBy(a)/**/,
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
            if(nextLine=firstLineIncludeX(topFrame,x)){
                return this.aroundInBlockLine({x,y}, nextLine, topFrame)
            }
        }
        
    }

    prevLine(id,at){
        //to get prev line above input line in the frame
        const prevLineAbove=(frame,line, offset)=>{
            const prevLine=(()=>{
                if(frame.firstLine==line)//go to prev top frame
                    return
                if(frame.cols && frame.cols.length>1){
                    const isColumnFirstLine=frame.columns.reduce((isFirst,a)=>
                        isFirst || a.lines.indexOf(line)==0,
                        false,
                    )
                    if(isColumnFirstLine){//go to next top frame
                        return 
                    }
                }
                return frame.lines[frame.lines.indexOf(line)-1]
            })();
            if(prevLine)
                return prevLine

            //frame can be customized to break Block Layout structure(such as Word continuous section), 
            //so try to locate from layouted 
            const point=[this.getTopFrameXY(topFrame)].reduce((o,a)=>({x:o.x-a.x,y:o.y-a.y}),offset)
            const frameIsAbovePointAndContainPointX=({x,y,width,height})=>point.x>=x && point.x<=x+width && (point.y-y-height)>=0
            //to get most inner frame that under offset.y and include offset.x
            const found=this.getBoundaryCheckedMostInnerNode(
                topFrame.createComposed2Parent(), 
                (rect,node)=>{
                    const {props:{"data-frame":isFrame, width,height}}=node
                    if(isFrame){
                        if(this.getFrameByLayoutedFrameNode(node)==frame)
                            return false
                        return frameIsAbovePointAndContainPointX(rect({width,height}))
                    }
                },
                //get frame from data-content and data-frame
                (layoutedFrameNode,[layoutedTopFrame])=>
                    layoutedFrameNode && layoutedTopFrame/*not top frame or layouted not synced*/
                        ? this.getFrameByLayoutedFrameNode(layoutedFrameNode) : null,
                true//findLast
            )
            if(found.node){
                return lastLineIncludeX(leafFrame=found.node, point.x-found.x)
            }
        }
        
        const lastLineIncludeX=(frame,X)=>{
            if(!(frame.cols && frame.cols.length>1))
                return frame.lastLine
            const column=frame.columns.find(({x,width})=>X>=x && X<=x+width)
            if(column)
                return column.lines[column.lines.length-1]
        }

        const prevTopFrame=a=>this.frames[this.frames.indexOf(a)-1]


        var {x,y, leafFrame, lineIndexInLeafFrame, topFrame}=this.position(id,at,true)
        var lineInLeafFrame=leafFrame.lines[lineIndexInLeafFrame]
        
        var prevLine
        //first try to find prev line in current top frame
        while(leafFrame && lineInLeafFrame){
            if(prevLine=prevLineAbove(leafFrame, lineInLeafFrame,{x,y})){
                return this.aroundInBlockLine({x,y},prevLine,topFrame,leafFrame)
            }
            //direct parent frame
            const leafFrameContainedBy=this._targetFrameContainsFrame(leafFrame)
            const parentFrame=this.getCheckedGrandFrameByFrame(
                leafFrame,
                a=>a!=leafFrame && leafFrameContainedBy(a)/**/,
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
            if(prevLine=lastLineIncludeX(topFrame,x)){
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
}