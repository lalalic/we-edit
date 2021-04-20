import React from "react"
import {dom, ReactQuery} from "we-edit"
import memoize from "memoize-one"

import {Layout, HasParentAndChild, editable} from "../../composable"
import {Group} from "../../composed"
import Manager from "./manager"
import AutoFitManager from "./autofit-manager"

class Frame extends Layout.Block{
	static displayName=HasParentAndChild(dom.Frame).displayName
	static Manager=Manager
	static AutoFitManager=AutoFitManager
	constructor(){
		super(...arguments)
		Object.defineProperties(this,{
			uuid:{
				get(){
					const {props:{i,id}}=this
					return `${id}${i!=undefined ? "_"+i : ""}`
				}
			},
			async:{
				get(){
					return this.props.async
				}
			}
		})
	}

	get isFrame(){
		return true
	}

	defineProperties(){
		super.defineProperties()
		Object.defineProperties(this,{
			composedHeight:{
				enumerable:true,
				configurable:true,
				get(){
					if(this.cols)
						return Math.max(...this.columns.map(a=>a.blockOffset))
					return this.blockOffset
				}
			}
		})
	}
	
	/**
	 * always use space to locate since layout using it 
	 ***.positionlines is used to get lineXY(line), so it should be added
	 */
	createComposed2Parent(rowHeight){
		const alignY=contentHeight=>{
			const {height=rowHeight||contentHeight, vertAlign,}=this.props
			if(contentHeight==undefined)
				return undefined
			switch(vertAlign){
				case "bottom":
					return height-contentHeight
				case "center":
				case "middle":
					return (height-contentHeight)/2
				default:
					return 0
			}
		}
		var content=this.positionLines(this.lines)
		const contentHeight=content.props.height
		content=React.cloneElement(content,{y:alignY(contentHeight),className:"positionlines"})
		const {width,height=rowHeight||contentHeight,margin:{left=0,top=0}={}, x,y,z,xhref}=this.props
		if(!this.cols && (left||top)){
			content=(<Group x={left} y={top}>{content}</Group>)
		}
		return (
			<Group {...{width,height,x,y,z,xhref, className:"frame", "data-frame":this.uuid}}>
				{[
					React.cloneElement(content,{key:"content"}),
					...this.anchors.map((a,i)=>React.cloneElement(a,{key:i})),
				].filter(a=>!!a).sort(({props:{z:z1=0}},{props:{z:z2=0}},)=>z1-z2)}
			</Group>
		)
	}	

	columnIndexOf(lineIndex){
		if(!this.cols || this.cols.length==1)
			return 0
		return this.columns.findIndex(({lines:{length, startIndex}})=>lineIndex>=startIndex && lineIndex<startIndex+length)
	}

	layoutOf(){
		const {width,height,margin}=this.props
		return {width,height,margin,cols:this.cols}
	}
}

/**
 * A frame would finally append composed to parent once, 
 * so lastComposed should have only one item
 * Frame cache key should based on 
 * 1. space {width,height, wrappees,cols}: width or cols[*].width is changed, the cache ususally can NOT be used
 * 2. content: space is not change, content can relayout from changed content
 * 
 */
export default class EditableFrame extends editable(Frame,{stoppable:true, continuable:true}){
	onAllChildrenComposed(){
		super.onAllChildrenComposed()
		return this.async && this.createComposed2Parent() || null
	}

	_cancelAllLastComposed(){
		super._cancelAllLastComposed()
		this.computed.anchors=[]
		if(this.autofitable){
			delete this.computed.autofit
		}
	}
	
	___createComposed2Parent=memoize((composedUUID,...args)=>super.createComposed2Parent(...args))
	createComposed2Parent(){
		return this.___createComposed2Parent(this.computed.composedUUID||this.context.parent?.computed?.composedUUID,...arguments)
	}
	
	/**
	 * @continuable
	 * multiple cols model should check on last column
	 * @param {*} a 
	 */
	shouldContinueCompose(){
		if(this.async)
			return true

		if(!this.cols || //non-column model
			this.columns.length==this.cols.length){//last column
			if(!this.context.shouldContinueCompose(...arguments))
				return false
			if(this.availableBlockSize<=0)
				return false
			return true
		}
		//non-last column always continue
		return true
	}

	/**
	 * lastComposed is useless for frame, since it only commit once
	 * to sync lines, anchors, 
	 */
    cancelUnusableLastComposed({id,...nextProps}){
		//**remove id to avoid replace this real composer */
		const space=new this.constructor(nextProps,{...this.context,editable:false}).getSpace()
		
		const isInlineSizeChanged=this.getSpace().isInlineSizeDifferent(space)
		if(isInlineSizeChanged){
			//if inline size change, all have to be recomposed
			this.computed.anchors=[]
			return super.cancelUnusableLastComposed(...arguments)
		}

		//last composed is still valid if block size change 
		//@TODO: wrappees change, but our wrappees are functions, how to compare???

		const changed=nextProps.hash!=this.props.hash
		if(changed){
			this._cancelChangedPart(...arguments)
		}
		this._cancelUntilLastAllChildrenComposed(...arguments)
	}

	_cancelChangedPart(next){
		const childrenNeedRecompose=this.childrenNeedRecompose(next,this.props)
		if(childrenNeedRecompose.length==0){
			if(childrenNeedRecompose.sizeChanged){
				delete this.computed.allComposed
				return 
			}
		}
		const firstLineNeedRecompose=this.lines.findIndex(a=>childrenNeedRecompose.includes(this.childIdOf(a)))
		this.removeFrom(firstLineNeedRecompose)
		this.removePositioned(childrenNeedRecompose)
	}
	
	_cancelUntilLastAllChildrenComposed(){
       const lastLineOfAllChildrenComposed=this.lines.findLastIndex((a,i,_,$,id=this.childIdOf(a))=>{
			const composer=this.context.getComposer(id)
			return composer && composer.isAllChildrenComposed()
		})
		this.removeFrom(lastLineOfAllChildrenComposed+1)
	}

    appendLastComposed(){
		//lastComposed is the frame or the result of createComposed2Parent, so it always should be removed
		this.computed.lastComposed=[]
		if(!this.isAllChildrenComposed()){
			if(this.lastLine){
				const lastId=this.lastLine.props["data-content"]
				return this.childrenArray(this.props.children).findIndex(a=>a && a.props.id==lastId)
			}
			return false
		}
		//this event should be called to append to parent
		return true
	}

	removeFrom(lineIndex){
		const removed=super.rollbackLines(this.lines.length-lineIndex)
		if(removed.length>0){
			delete this.computed.allComposed
		}
		return removed
	}

	removePositioned(ids){
		let removed=[]
		this.anchors.reduceRight((_,anchor,i,anchors)=>{
			const id=anchor.props["data-content"]
			if(ids.includes(id)){
				anchors.splice(i,1)
				removed.push(id)
			}
		},ids)
		if(removed.length>0){
			delete this.computed.allComposed
			console.debug("removed anchors: "+removed.join(","))
		}
		
		return removed
	}

	/**
	 * it should be in accordance with createComposed2Parent()
	 ***positionlines is used to get the origin
	 *** it works only when document composed, and it's using lastComposed, so it need cacheable implementation
	 * @param {*} line : composed line object
	 */
	lineXY(line){
		if(!this.cols){
			const composed=this.computed.lastComposed
			const {first, parents:[_,...parents]}=new ReactQuery(composed).findFirstAndParents(".positionlines")
			const offset=[...parents, first.get(0)].filter(a=>!!a)
				.reduce((o,{props:{x=0,y=0}})=>(o.x+=x,o.y+=y,o),{x:0,y:0})
			return {
				x:offset.x,
				y:this.lines.slice(0,this.lines.indexOf(line)).reduce((Y,{props:{height=0,dy=0}})=>Y+height+dy,offset.y)
			}
		}
		//make columns simple to ignore margin, vertAlign, or say not supporting margin and vertAlign in columns frame
		const {y:y0=0,x=0,lines}=this.columns.find(a=>a.lines.includes(line))||this.currentColumn
		return {
			x,
			y:lines.slice(0,lines.indexOf(line)).reduce((Y,{props:{height=0,dy=0}})=>Y+height+dy,y0)
		}
	}
}
