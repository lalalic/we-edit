import React, { Component } from "react"
import PropTypes from "prop-types"
import {ReactQuery} from "we-edit"
/**
 * 
 */
export default class ExcludableLine extends Component {
    static propTypes={
        space:PropTypes.object.isRequired,
        presets:PropTypes.arrayOf(PropTypes.object),
    }
	constructor({ space, presets=[],top=0}) {
		super(...arguments);
		this.space = space;
        this.segments = space.getInlineSegements(top);
        this.segments.hold(presets)
        this.frame=space.props.frame
	}
	get currentX() {
        const {x=0,items=[]}=this.segments.current
		return items.reduce((X,{props:{width}})=>X+width, x)
    }
    
	get first() {
		return this.segments.items[0];
	}
	get last() {
		return this.segments.items.pop();
    }

    get width(){
        return this.space.width
    }

	get contentHeight() {
		return this.segments.items.reduce((H, { props: { height = 0 } }) => Math.max(H, height), 0);
    }

    get textHeight(){
        return this.segments.items.reduce((H, { props: { height = 0, descent:isText } }) => Math.max(H, isText ? height : 0), 0);
    }

    get lineHeight(){
        return this.getLineHeight()
    }

    isEmpty(){
        return this.segments.items.length==0
    }
    /**
     * 1. has more space to continue layout
     * 2. has no space for current atom, then commit
     * 3. need block layout
     * @param {*} atom
     * @param {*} at
     * @returns
     * false: stop and commit this line immediately
     * int: rollback current line, start new line at atom index
     * else: continue
     */
	appendComposed(atom, at) {
        if (atom.props.anchor) {
            /**
             * anchor content may alreay anchored, or may not
             * if already anchored, continue
             * if not, let parent block layout it since it possibly affect layout space, block offset
             */
            const $anchor=new ReactQuery(atom).findFirst('[data-type="anchor"]')
            const anchorId=$anchor.attr("data-content")
            this.segments.push(<Group {...{atom,width:0,"data-anchor":anchorId}}/>)
            
            if (!this.frame.isAnchored(anchorId)) { //let frame anchor this atom first
                /**
                 * anchor position MAY not decided, so it's NOT sure if space can hold anchor
                 * to Let it simply, let block/parent layout engine layout it immediatly 
                 */
                this.anchor = atom.props.anchor;
                //commit for anchor, this line should be rollback
				return false
            }else{
                //not full, continue
            }
        }else if ((atom.props.height - this.contentHeight) > 0) {
            /**
             * inline layout doesn't consider block layout capacity,
             * leave it to block layout engine decide how to handle overflow block size
             */
            const blockSize=(this.props.top||0)+this.getLineHeight(atom.props.height)
            const inlineSegments = this.space.getInlineSegements(blockSize);
            if (inlineSegments.hold([...this.segments.items, atom]) !== false) {
                //new line box is ok for already layouted and this one
                this.segments = inlineSegments;
                //not full, continue
            }else{
                //new line box has no valid space from atom
                //not full, but commit current line box
                return false
            }
		}else if (this.segments.push(atom) !== false) {
			//not full, continue
		}else {
            //full, commit
			return false;
		}
	}
    
    getLineHeight(contentHeight = this.contentHeight) {
        const {lineHeight}=this.props
        return contentHeight+(typeof(lineHeight)=='string' ? Math.ceil(this.textHeight*(parseInt(lineHeight)-100)/100.0): 0)
    }
    
	commit() {
        this.children = this.segments.render();
        return this
    }
}
