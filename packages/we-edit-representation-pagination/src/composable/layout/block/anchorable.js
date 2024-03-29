import { ReactQuery, dom } from "we-edit"
import Flow from "./flow"
const Geometry=dom.Shape.Geometry

/**
 * anchorable can layout positioned content, and ***MAY change space if supporting wrap***
 * data-anchor: check inline.appendAnchorAtom, to identify anchor placeholder in paragraph
 */
export default class Anchorable extends Flow {
    defineProperties() {
		super.defineProperties();
		Object.defineProperties(this, {
			anchoring: {
				enumerable: false,
				configurable: false,
				get() {
					return this.computed.recomposing
				}
			}
		});
	}

    getAnchorSpace(line){
        const space=this.nextAvailableSpace({height:line.props.height})
        const edges={
            paragraph:{
                top:(id=>{
                    const line=this.lines.find(a=>a.props.pagination?.id==id)
                    if(line){
                        return this.__lineXY(line).y
                    }
                    return space.blockOffset
                })(line.props.pagination.id)
            },
            line:{top:space.blockOffset},
            character:{
                left:space.left+(()=>{
                    const {first,parents}=new ReactQuery(line).findFirstAndParents(`[data-anchor]`)
                    return [...parents,first.get(0)].reduce((X,{props:{x=0}})=>X+x,0)
                })()
            },
        }
        return space.clone({edges})
    }

    appendComposed(line){
        const isPageAnchor=line.props.anchor && !line.props.pagination
        if(isPageAnchor){
            const { props: { anchor: anchorContentFn } } = line;
            const space=this.nextAvailableSpace()
            const anchored = anchorContentFn(space)
            return super.appendComposed(anchored)
        }

        const appended=super.appendComposed(...arguments)
        if(false===appended && this.anchoring){
            /**No available space, should stop anchoring in this frame */
            return this.constructor.IMMEDIATE_STOP;
        }
        return appended
    }

	/**
     * line with/without anchors
     * anchors with wrap can affect exclusives, so it need re-layout
     * anchor need know anchor host to position itself
     * anchor host
     */
    /**
     * @param {*} line
     * @returns
     * int: rollback n unpositioned lines
     * false: space can't flow more content
     * Number.SAFE_MAX_INTEGER: let descendant stop layout
     * else: good
     */
	appendFlowBlock(line) {
        const { props: { anchor: anchorContentFn } } = line;
		//data-anchor is placeholder specification in inline layout
        const anchorPlaceholderPlaced = (anchorId, line) => new ReactQuery(line).findFirst(`[data-anchor="${anchorId}]`).length == 1;
		if (!anchorContentFn) {
            if (this.anchoring && anchorPlaceholderPlaced(this.anchoring, line)) {
                /**
                 * anchor and placeholder be in same frame, so stop immediately
                 * ** the placeholder line should be appended, since later 
                 * by checking this placeholder existence to decide if recompose success
                 * but this line will be rollbacked
                 */
                super.appendFlowBlock(...arguments)
                return this.constructor.IMMEDIATE_STOP;
			}
			return super.appendFlowBlock(...arguments)
        }
        
        /**
         * it's only to append anchored content,
         * anchor placeholder in line will be relayouted later,
         * so from here
         * return 1 to ignore and relayout current line or
         * return false to notify infeasible space, and ignore and re-layout current line and anchor
         */
        const anchored = anchorContentFn(this.getAnchorSpace(line))
        const { wrap, geometry, "data-content": anchoring } = anchored.props;
        /**
         * @TODO: wrap each other with already anchored wrappees, and this wrappees
         */
		if (!(wrap && this.__isDirtyIn(geometry))) {
			super.appendComposed(anchored);
			return 1;
		}
        /**
         * the area above current block offset is affected by this wrap area
         * temporarily anchor it to exclude the wrap area, and relayout whole to see:
         * if the anchor can be layouted within the space, keep relayouted, relayout last line
         * if not, rollback to last layout result, and return false
         */
		const rollback = this.recompose((recomposingLines, anchors) => {
            //keep all anchors, @TODO: it's supposed: later anchor can't affect previous anchors layout????
            this.anchors=anchors
            super.appendComposed(anchored)
            //recompose until this anchor
            recomposingLines.push(line)
			return anchoring;
		});
        /**
         * then check if this anchor is in this block, specifically in last line
         * */
		if (anchorPlaceholderPlaced(anchoring, this.lines[this.lines.length-1])) {
            /**
             * anchor and placeholder can be on same block, 
             * so keep recomposed lines and anchors (including appending anchor),
             * and re-layout last line that contains anchor placeholder
             *** the last line in paragraph MAY not equal to appending line since recompose changes it
             *** while paragraph should already be synced with recompose
             */
            this.lines.pop()//rollback last line definitely in this block
			return 0 + 1;//rollback last line of paragrpah accordingly
		}
		else {
            //anchor and placeholder can NOT be on same frame, so throw to parent
			rollback();
			return false;
		}
    }
    
    rollbackLines(){
        const removedLines=super.rollbackLines(...arguments)
        const removedAnchors = (lines => {
			const remove = a => this.anchors.splice(this.anchors.indexOf(a), 1)[0];
            const anchorId = a=>new ReactQuery(a).findFirst(`[data-type="anchor"]`).attr('data-content')
            const anchorsInLine=line=> new ReactQuery(line).find('[data-anchor]').toArray().map(a=>a.props["data-anchor"])
			const removingAnchorIds = lines.map(a=>anchorsInLine(a)).flat()
			return this.anchors.filter(a => removingAnchorIds.includes(anchorId(a))).map(remove);
        })(removedLines);

        //if removed anchors affect wrap areas above removed lines,
        const blockOffset=this.blockOffset
        const removedWrappeesAffectedLayoutedSpace=this.wrappees.filter(a=>removedAnchors.includes(a))
            .filter(({props:{geometry:{y=0,height=0}}})=>y+height<blockOffset)
        if(removedWrappeesAffectedLayoutedSpace.length>0){
            this.recompose()
        }
        
        return Object.assign(removedLines, {anchors:removedAnchors})
    }


	__isDirtyIn(rect){
        const isIntersect=(A,B)=>Geometry.create(A).isIntersectedWith(Geometry.create(B))
		//wrappee already take up
		if(this.wrappees.find(({props:{x,y,width,height}})=>isIntersect(rect,{x,y,width,height}))){
			return true
		}

		//content already take up
		if(isIntersect(rect,{x:0,y:0,width:this.props.width,height:this.blockOffset})){
			return true
		}

		if(this.cols){
			//if any non-current column content already take up
			return !!this.columns
				.filter(a=>a!=this.currentColumn)//current block has already checked in super as normal space
				.find(({x=0,y=0,width,blockOffset:height})=>isIntersect(rect,{x,y,width,height}))
		}

		return false
    }

    /**
	 * it should be in accordance with createComposed2Parent, 
     * but during composing, it's not possible to get position when vertAlign is any of middle/center/bottom
     * so it only support default vertAlign=top
     * so It can't be used by normal frame
	 * @param {*} line : composed line object
	 */
	__lineXY(line){
		if(!this.cols){
			const {margin:{top=0,left=0}={}}=this.props
			return {
				x:left,
				y:this.lines.slice(0,this.lines.indexOf(line)).reduce((Y,{props:{height=0}})=>Y+height,top)
			}
		}
		//make columns simple to ignore margin, vertAlign, or say not supporting margin and vertAlign in columns frame
		const {y:y0=0,x=0,lines}=this.columns.find(a=>a.lines.includes(line))||this.currentColumn
		return {
			x,
			y:lines.slice(0,lines.indexOf(line)).reduce((Y,{props:{height=0}})=>Y+height,y0)
		}
	}
}
