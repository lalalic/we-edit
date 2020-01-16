import React from "react"
import {dom} from "we-edit"
import memoize from "memoize-one"

import {Layout, HasParentAndChild, editable} from "../composable"
import {Group} from "../composed"

class Frame extends Layout.Block{
	static displayName=HasParentAndChild(dom.Frame).displayName
	constructor(){
		super(...arguments)
		Object.defineProperties(this,{
			uuid:{
				get(){
					const {props:{i,id}}=this
					return `${id}${i!=undefined ? "_"+i : ""}`
				}
			}
		})
	}

	get isFrame(){
		return true
	}

	getSpace(){
		return this.__getSpace(this.props)
	}

	__getSpace=memoize(props=>{
		const space=super.getSpace()
		const {width,height=Number.MAX_SAFE_INTEGER,margin:{left=0,right=0,top=0,bottom=0}={},x=0,y=0}=this.props
		const edges={
			[this.getComposeType()]:{left:x,top:y,right:x+width,bottom:y+height},
			margin:{left:x+left,top:y+top,right:width+x-right,bottom:y+height-bottom}
		}
		if(this.cols)
			return Layout.ConstraintSpace.create(space).clone({edges})

		return Layout.ConstraintSpace.create(space).clone({
			left:x+left,
			right:x+width-right,
			blockOffset:y+top,
			height:height-top-bottom,
			edges
		})
	})

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
	 */
	createComposed2Parent(){
		const alignY=contentHeight=>{
			const {height=contentHeight, vertAlign}=this.props
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
		content=React.cloneElement(content,{y:alignY(contentHeight)})
		const {width,height=contentHeight,margin:{left=0,top=0}={}, x,y,z,named}=this.props
		if(!this.cols && (left||top)){
			content=(<Group x={left} y={top}>{content}</Group>)
		}
		return (
			<Group {...{width,height,x,y,z,named, className:"frame", "data-frame":this.uuid}}>
				{[
					React.cloneElement(content,{key:"content"}),
					...this.anchors.map((a,i)=>React.cloneElement(a,{key:i})),
				].filter(a=>!!a).sort(({props:{z:z1=0}},{props:{z:z2=0}},)=>z1-z2)}
			</Group>
		)
	}

	lineXY(line){
		if(!this.cols){
			const {margin:{top=0,left=0}={}}=this.props
			return {
				x:left,
				y:this.lines.slice(0,this.lines.indexOf(line)).reduce((Y,{props:{height=0}})=>Y+height,top)
			}
		}
		const {y:y0=0,x=0,lines}=this.columns.find(a=>a.lines.includes(line))||this.currentColumn
		return {
			x,
			y:lines.slice(0,lines.indexOf(line)).reduce((Y,{props:{height=0}})=>Y+height,y0)
		}
	}

	columnIndexOf(lineIndex){
		if(!this.cols)
			return 0
		return this.columns.findIndex(a=>a.lines.startIndex>=lineIndex)
	}

	layoutOf(){
		const {width,height,margin}=this.props
		return {width,height,margin,cols:this.cols}
	}

	clone(props={}){
		const {computed}=this
		return Object.assign(new this.constructor({...this.props, ...props},this.context),{computed})
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
	___createComposed2Parent=memoize(composedUUID=>super.createComposed2Parent())
	createComposed2Parent(){
		return this.___createComposed2Parent(this.computed.composedUUID||this.context.parent.computed.composedUUID)
	}
	
	/**
	 * @continuable
	 * multiple cols model should check on last column
	 * @param {*} a 
	 */
	shouldContinueCompose(){
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
		const space=new this.constructor(nextProps,this.context).getSpace()
		
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
		const firstLineNeedRecompose=this.lines.findIndex(a=>childrenNeedRecompose.includes(this.childIdOf(a)))
		this.removeFrom(firstLineNeedRecompose)
	}
	
	_cancelUntilLastAllChildrenComposed(){
       const lastLineOfAllChildrenComposed=this.lines.findLastIndex((a,i,_,$,id=this.childIdOf(a))=>{
			const composer=this.context.getComposer(id)
			return composer && composer.isAllChildrenComposed()
		})
		this.removeFrom(lastLineOfAllChildrenComposed+1)
	}

    appendLastComposed(){
		if(!this.isAllChildrenComposed()){
			if(this.lastLine){
				const lastId=this.lastLine.props["data-content"]
				return this.childrenArray(this.props.children).findIndex(a=>a && a.props.id==lastId)
			}
			return false
		}
		return true
	}

	removeFrom(lineIndex){
		const removed=super.rollbackLines(this.lines.length-lineIndex)
		if(removed.length>0){
			delete this.computed.allComposed
		}
		return removed
	}
}
