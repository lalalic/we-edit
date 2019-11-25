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
		if(appended===false){
			if(this.recomposing){
				return Frame.IMMEDIATE_STOP
			}
			return false
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
			if(this.computed.recomposing){
				const anchorPlaced=new ReactQuery(line).findFirst(`[data-anchor="${this.computed.recomposing}]`).length==1
				if(anchorPlaced){
					return Frame.IMMEDIATE_STOP
				}
			}
			return super.appendLine(...arguments)
		}

		const anchored=line.props.anchor(this,line)
		const {wrap,geometry,"data-content":anchorId}=anchored.props

		if( !(wrap && this.isDirtyIn(geometry))){
			this.anchors.push(anchored)
			return 1
		}

		/**
		 * could normalize only to lines and anchors????
		 */
		const rollback=((rollback0,lastColumns)=>()=>{
			rollback0()
			this.columns=lastColumns
		})(this.recompose(()=>{
			this.anchors.push(anchored)
			this.lines.push(line)
			return anchorId
		}), [...this.columns]);

		/**
		 * then check if this anchor is in this page
		 * data-anchor is placeholder specification in inline layout
		 * */
		const anchorPlaced=!!this.lines.findLast(a=>new ReactQuery(a).findFirst(`[data-anchor="${anchorId}]`).length==1)
		if(anchorPlaced){
			/**
			 * anchor and placeholder can be on same frame, so keep anchor, 
			 * and re-layout the line
			 */
			rollback()
			this.anchors.push(anchored)
			return 0+1
		}else{
			/**
			 * anchor and placeholder can NOT be on same frame, so throw to parent
			 */
			rollback()
			return false
		}
	}
}
