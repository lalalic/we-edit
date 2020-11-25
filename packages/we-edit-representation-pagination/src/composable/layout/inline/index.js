import React, {Component} from "react"
import {ReactQuery, dom} from "we-edit"
import InlineSegments from "./lnline-space-segments"
import Story from "./story"
import Group from "../../../composed/group"

/**
 * height: line box height
 * contentHeight: max of all atoms' height
 * textHeight: max of text atoms' height, percentage line box height should be based on textHeight
 * line block height: topToBlockOffset + height (content height), parent can add its own logic to change line height
 * .atoms can't be broke (means each atom must be an item of inlineSegments), otherwise .items/.firstAtom/.lastAtom will be broke
 */
export default class Inline extends Component{
	constructor({space:{left, right, findInlineSegments}}){
		super(...arguments)
		this.findInlineSegments=findInlineSegments
			||(()=>({segments:[{x:left, width:this.width}]}));//@TODO: why is there no findInlineSegments some times? TEST ???
		const segments=this.findInlineSegments(this.topToBlockOffset,left,right)
		this.inlineSegments=InlineSegments.create({left,...segments})
	}

	get space(){
		return this.props.space
	}

	/** inline box height, considering props.lineHeight, content/text height */
	get height(){
		return this.getLineHeight()
	}
	/**max of all atoms' height */
	get contentHeight() {
		const lineDescent=this.descent
		return this.items.reduce((H, { props: { height = 0,descent } }) => Math.max(H, descent ? height : height+lineDescent), 0);
    }

	/**max of text atoms' height, percentage line box height should be based on textHeight */
    get textHeight(){
        return this.items.reduce((H, { props: { height = 0, descent:isText } }) => Math.max(H, isText ? height : 0), 0);
	}	

	get descent(){
		return Math.max(0,...this.items.map(({ props: {descent=0 } }) => descent))
	}

	/** inline layout width */
	get width(){
		const {space:{width=0,left=0, right=width}}=this.props
		return right-left
	}
		
	get firstAtom(){
		const first=this.inlineSegments.items.find(a=>a.props.x===undefined)
		if(first && first.props.atom)
			return first.props.atom
		if(first && first.props.descent==undefined)
			return first.props.children
		return first
	}

	get lastAtom(){
		const last=this.inlineSegments.items.findLast(a=>a.props.x===undefined)
		if(last && last.props.atom)
			return last.props.atom
		return last
	}

	get atoms(){
		return this.inlineSegments.items.map(a=>a && a.props.atom ||a)
	}

	get items(){
		return [...this.props.positioned,...this.inlineSegments.items]
	}

	/** the distance between line blockOffset  and line content top*/
	get topToBlockOffset(){
		const {props:{top:lineTop=0}, inlineSegments:{props:{top:opportunityTop=0}}={props:{}}}=this
		return opportunityTop+lineTop
	}

	get pageBreak(){
		const atoms=this.atoms, l=atoms.length
		const isPageBreak=a=> a?.props.tokenizeOpportunity===dom.Text.PageBreak
		return isPageBreak(atoms[l-2])||isPageBreak(atoms[l-1])
	}

	isEmpty(){
		return !!!this.firstAtom
	}

	/**
	 * anchor content may alreay anchored, or may not
	 * if already anchored, continue next atom
	 * if not, let parent block layout it since it possibly affect layout space, block offset
	 */
	appendAnchorAtom(atom){
		const $atom=new ReactQuery(atom)
		const $anchor=$atom.findFirst('[data-type="anchor"]')
		const anchorId=$anchor.attr("data-content")
		const placeholder=React.cloneElement(
			$atom.replace($anchor.get(0),<Group/>).get(0),
			{atom,width:0,"data-anchor":anchorId}
		)
		//React.cloneElement($anchor.get(0),{atom,width:0,"data-anchor":anchorId})
		this.inlineSegments.push(placeholder)
		if(!this.space.isAnchored(anchorId)){//let frame anchor this atom first
			/**
			 * anchor position MAY not decided, so it's NOT sure if space can hold anchor
			 * to Let it simply, let block/parent layout engine layout it immediatly 
			 */
			this.anchor=atom.props.anchor
			//commit for anchor, this line should be rollback
			return false
		}else{
			//not full, continue next atom
		}
	}

	/**
	 * inline layout doesn't consider block layout capacity,
	 * leave it to block layout engine decide how to handle overflow block size
	 */
	appendAtom(atom){
		if(atom.props.anchor){
			return this.appendAnchorAtom(atom)
		}

		if(atom.props.tokenizeOpportunity===dom.Text.LineBreak){
			this.inlineSegments.push(atom,true/*append atom without considering inline size*/)
			return true
		}

		if(atom.props.tokenizeOpportunity===dom.Text.PageBreak){
			this.inlineSegments.push(atom,true/*append atom without considering inline size*/)
			return
		}

		if(atom.props.className=="ender"){
			this.inlineSegments.push(atom,true/*append atom without considering inline size*/)
			return
		}

		if(this.pageBreak){/*immediately break line*/
			return false
		}
		
		const appended=(newHeight=>{
			if((newHeight-this.height)>1){
				/**
				 * line rect change may lead to different inline opportunities and top
				 * get opportunities again
				 */
				const {space:{left,right},top=0}=this.props
				const segments=this.findInlineSegments(this.topToBlockOffset+newHeight,left,right)
				if(this.inlineSegments.shouldRelayout(segments)){
					const relayouted=this.inlineSegments.relayout(segments,atom)
					if(relayouted!==false){
						this.inlineSegments=relayouted
						//new inline opportunities can hold layouted and atom, replace inlineSegments, and top
						//not full, continue next atom
						return 
					}else{
						//new inline opportunities can NOT hold atom, commit to block layout
						return false
					}
				}else{
					//same inline opportunities, continue normal inline layout later 
				}
			}else{
				//line rect doesn't change, continue normal inline layout later 
			}
			
			return this.inlineSegments.push(atom)
		})(this.getLineHeight(atom.props.height));

		if(appended===false){
			if(this.isEmpty()){
				//empty inline layout is not allowed
				this.inlineSegments.push(atom,true/*append atom without considering inline size*/)
				return
			}
			return false
		}
	}
	
	getLineHeight(contentHeight=this.contentHeight){
		const {lineHeight}=this.props
		if(typeof(lineHeight)=='string'){
			return contentHeight+(typeof(lineHeight)=='string' ? this.textHeight*(parseInt(lineHeight)-100)/100.0: 0)
		}else if(typeof(lineHeight)=="number"){
			return lineHeight
		}
		return contentHeight
        
	}

	freeze(){
		const {props:{children}}=this.inlineSegments.render()
		this.children=[...this.props.positioned,...children]
		return this
	}

	render(bLastLine){
		const {props:{align}}=this
		const story=new Story({
			children:this.children, 
			width:this.width,
			align:bLastLine && ["justify","both"].includes(align) ? undefined : align,
		})
		return story.render()
	}

	isFitTo(space){
		if(!space)
			return false
		if(this.space.width!=space.width)
			return false
		const {segments}=space.findInlineSegments(this.topToBlockOffset+this.height,space.left,space.right)

		return this.inlineSegments.segments.length==segments.length &&
			!!!this.inlineSegments.segments.find(({props:{x,width}},i,_,$,b=segments[i])=>b.x!=x && b.width!=width)
	}

	clone4Space(space){
		return Object.assign(new this.constructor({...this.props,space}),{inlineSegments:this.inlineSegments,children:this.children})
	}
}
