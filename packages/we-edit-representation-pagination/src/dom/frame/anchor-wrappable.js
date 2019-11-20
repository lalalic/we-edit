import React, {Component} from "react"
import PropTypes from "prop-types"
import {ReactQuery} from "we-edit"
import {Group} from "../../composed"
import PaginationControllable from "./pagination-controllable"


/*
<line anchor={}/>
*/
export default class AnchorWrappable extends PaginationControllable{
	static AnchorWrappable=AnchorWrappable

	nextAvailableSpace(required={}){
		const {width:minWidth=0, height:minHeight=0}=required
		const availableSpace=super.nextAvailableSpace(...arguments)
		if(availableSpace==false){
			return false
		}
		const {wrappees,width, ...space}=availableSpace
		if(Array.isArray(wrappees) && wrappees.length>0){
			const clears=wrappees.filter(a=>a.type=="clear")
			if(clears.length){
				return this.nextAvailableSpace({...required,y:Math.max(...clears.map(a=>a.y))})
			}

			const spaces=this.mergeWrappees([...wrappees,{x:width}])
				.map(a=>(a.x2=a.x+a.width,a))
				.map((a,i,self)=>a.x-(i>0 ? self[i-1].x2 : 0))
			const hasMinWidth=Math.max(...spaces)>=minWidth
			if(!hasMinWidth){
				const untils=wrappees.filter(a=>a.y!=undefined)
				if(untils){
					return this.nextAvailableSpace({...required,y:Math.min(...untils.map(a=>a.y))})
				}else{
					return this.nextAvailableSpace({...required, height:minHeight+10})
				}
			}
		}

		if(space.y==this.blockOffset)
			delete space.y

		return {wrappees, width, ...space, exclude: (y,height)=>this.nextAvailableSpace({y,height})}
		
	}

	appendComposed(){
		const appended=super.appendComposed(...arguments)
		if(appended===false && //will create new page
			this.recomposing4Anchor &&
			!this.recomposing4Anchor.anchored){
			return Frame.IMMEDIATE_STOP
		}
		return appended
	}

	/*bad but faster*/
	isAnchored(id){
		const composed=super.isAnchored(id)
		if(this.recomposing4Anchor && this.recomposing4Anchor.anchor==id){
			this.recomposing4Anchor.anchored=true
		}
		return composed
	}

	/**
	* . can be placed in this page
		>current paragraph composing process should be terminated
	* . can't
		>current paragraph composing process should continue by rollback line, and start next page
	**/
	appendLine(line){
		if(!line.props.anchor){
			
			if(line.props.blockOffset!=undefined){
				const dy=line.props.blockOffset-this.blockOffset
				const {height,width,pagination}=line.props
				return super.appendLine(<Group {...{width,height:height+dy,pagination}}><Group y={dy}>{line}</Group></Group>)
			}
			

			return super.appendLine(...arguments)
		}

		const lastComputed={
			composed:[...this.computed.composed],
			columns:this.columns.reduce((cloned,a)=>[...cloned,{...a,children:[...a.children]}],[]),
		}

		const anchored=line.props.anchor(this,line)
		const {wrap,geometry,"data-content":anchorId}=anchored.props

		try{
			if(wrap){
				if(this.isDirtyIn(geometry)){
					try{
						this.recomposing4Anchor=lastComputed
						this.recomposing4Anchor.anchor=anchorId
						this.recompose()
						//then check if this anchor is in this page
						if(!this.recomposing4Anchor.anchored){
							//recover
							this.computed.composed=this.recomposing4Anchor.composed
							this.columns=this.recomposing4Anchor.columns
							this.recompose()
							return false
						}else{
							return 0+1
						}
					}finally{
						delete this.recomposing4Anchor
					}
				}else{
					return 0+1
				}
			}else{
				return 0+1
			}
		}finally{
			//anchored content positioned in frame
			this.appendComposed(anchored)
		}
	}

	rollbackLines(n,handleAnchor=true){
		const removedLines=super.rollbackLines(...arguments)
		if(removedLines.anchors){
			const anchors=removedLines.anchors
			const asRect=({x=0,y=0,width,height,wrap},a={})=>({x,y,width,height,...a})
			const intersectWithContent=!!anchors.find(a=>{
				if(!a.props.wrap)
					return false

				const wrapRect=asRect(a.props)
				return !!this.columns.find(b=>this.isIntersect(wrapRect, asRect(b,{height:b.height-b.availableHeight})))
			})

			if(intersectWithContent){
				this.recompose()
			}
		}
		return removedLines
	}
}
