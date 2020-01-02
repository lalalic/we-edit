import { ReactQuery } from "we-edit"
import Flow from "./flow"
/**
 * anchorable can layout positioned content, and ***MAY change space if supporting wrap***
 */
export default class Anchorable extends Flow {
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
	appendComposed(line) {
		const { props: { anchor, height: requiredBlockSize = 0 } } = line;
		const space = this.nextAvailableSpace({ height: requiredBlockSize });
		if (space == false) {
			if (this.computed.recomposing) {
                /**
                 * when space infeasible and recomposing
                 * paragraph must immediate stop, so to return back to outer layout
                 */
				return this.constructor.IMMEDIATE_STOP;
			}
			return false;
		}
		const anchorPlaced = (anchorId, line) => new ReactQuery(line).findFirst(`[data-anchor="${anchorId}]`).length == 1;
		if (!anchor) {
            if (this.computed.recomposing) {
				if (anchorPlaced(this.computed.recomposing, line)) {
                    /**
                     * anchor and placeholder be in same frame, so stop immediately
                     * ** the placeholder line should be appended, since later 
                     * by checking this placeholder existence to decide if recompose success
                     * but this line will be rollbacked
                     */
                    super.appendComposed(...arguments)
					return this.constructor.IMMEDIATE_STOP;
				}
			}
			return super.appendComposed(...arguments)
        }
        
        /**
         * it's only to append anchored content,
         * anchor placeholder in line will be relayouted later,
         * so from here
         * return 1 to ignore and relayout current line or
         * return false to notify infeasible space, and ignore and re-layout current line and anchor
         */
        const anchored = anchor(space.clone({
            edges:{
                paragraph:{
                    top:((id,line=this.lines.find(a=>a.props.pagination.id==id))=>this.lineXY(line).y)(line.props.pagination.id)
                },
                line:{top:space.blockOffset},
                character:{
                    left:space.left+(()=>{
                        const {first,parents}=new ReactQuery(line).findFirstAndParents(`[data-anchor]`)
                        return [...parents,first.get(0)].reduce((X,{props:{x=0}})=>X+x,0)
                    })()
                },
            }
        }))
		const { wrap, geometry, y = 0, "data-content": anchorId } = anchored.props;
        /**
         * @TODO: wrap each other with already anchored wrappees, and this wrappees
         */
		if (!(wrap && this.isDirtyIn(geometry))) {
			super.appendComposed(anchored);
			return 1;
		}
        /**
         * the area above current block offset is affected by this wrap area
         * temporarily anchor it to exclude the wrap area, and relayout whole to see:
         * ** always rollback to current stack
         * if the anchor can be layouted within the space, rollback and keep this wrappee, relayout this line
         * if not, rollback to last layout result, and return false
         */
		const rollback = this.recompose(() => {
			/**add anchored and line arbitarily to make recompose until current anchor, so, then recompose to check */
			super.appendComposed(anchored);
			super.appendComposed(line);
			return anchorId;
		});
        /**
         * then check if this anchor is in this page
         * data-anchor is placeholder specification in inline layout
         * */
		if (this.lines.findLast(a => anchorPlaced(anchorId, a))) {
            /**
             * anchor and placeholder can be on same frame, so keep anchor,
             * and re-layout the line
             */
			rollback();
			super.appendComposed(anchored);
			return 0 + 1;
		}
		else {
            /**
             * anchor and placeholder can NOT be on same frame, so throw to parent
             */
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
        
        return Object.assign(removedLines, {anchors:removedAnchors})
    }
}
