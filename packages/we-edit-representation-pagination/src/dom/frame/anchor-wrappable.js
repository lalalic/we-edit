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

	appendComposed(){
		const appended=super.appendComposed(...arguments)
		if(appended===false && //will create new page
			this.recomposing4Anchor){// &&
			return Frame.IMMEDIATE_STOP
		}
		return appended
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

		const anchored=line.props.anchor(this,line)
		const {wrap,geometry,"data-content":anchorId}=anchored.props

		try{
			if(wrap){
				if(this.isDirtyIn(geometry)){
					try{
						this.recomposing4Anchor={
							anchors:[...this.anchors],
							columns:this.columns.reduce((cloned,a)=>[...cloned,{...a,children:[...a.children]}],[]),
						}
						this.recompose()
						/**
						 * then check if this anchor is in this page
						 * data-anchor is placeholder specification in inline layout
						 * */
						const anchorPlaced=!!this.lines.findLast(a=>new ReactQuery(a).findFirst(`[data-anchor="${anchorId}]`).length==1)
						if(anchorPlaced){
							return 0+1
						}else{
							//recover
							this.computed.anchors=this.recomposing4Anchor.anchors
							this.columns=this.recomposing4Anchor.columns
							this.recompose()
							return false
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
