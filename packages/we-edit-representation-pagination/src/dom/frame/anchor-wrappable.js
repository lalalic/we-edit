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
			this.recomposing){// &&
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

		this.appendComposed(anchored)
		if( !(wrap && this.isDirtyIn(geometry))){
			return 1
		}
		let rollback
		try{
			const lastColumns=[...this.columns]
			rollback=this.recompose(()=>{
				this.lines.push(line)
				return anchorId
			})
			/**
			 * then check if this anchor is in this page
			 * data-anchor is placeholder specification in inline layout
			 * */
			const anchorPlaced=!!this.lines.findLast(a=>new ReactQuery(a).findFirst(`[data-anchor="${anchorId}]`).length==1)
			if(anchorPlaced){
				return 0+1
			}else{
				//recover
				rollback()
				this.columns=lastColumns
				return false
			}
		}catch(e){
			rollback()
			this.columns=lastColumns
			return false
		}
	}
}
