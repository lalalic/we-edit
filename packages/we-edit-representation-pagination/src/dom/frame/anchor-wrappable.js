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
		const {height:minHeight=0,y=this.currentY}=required
		const blocks=this.exclusive(y,y+minHeight)
		if(blocks.y){
			return this.nextAvailableSpace({...required,y:blocks.y})
		}
		return super.nextAvailableSpace(...arguments)
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
		debugger
		if(!line.props.anchor){
			const blocks=this.exclusive(this.currentY,this.currentY+line.props.height)
			if(blocks.y){
				const dy=blocks.y-this.currentY
				if(this.currentColumn.children.length>0){
					const last=this.currentColumn.children.pop()
					this.currentColumn.children.push(React.cloneElement(last,{height:last.props.height+dy}))
				}else{
                    const {height,width,pagination}=line.props
                    return super.appendLine(<Group {...{width,height:height+dy,pagination}}><Group y={dy}>{line}</Group></Group>)
				}
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
