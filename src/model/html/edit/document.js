import React, {PureComponent, Component, PropTypes} from "react"
import Base from "../document"

import {ACTION} from "state"

import {editable} from "model/edit"

import uuid from "tools/uuid"

import {HtmlFlasher} from "state/cursor"

export default class Document extends editable(Base){
	uuid=`doc${uuid()}`
	render(){
        return (
			<div id={this.uuid}>
				<div ref="main">
					{super.render()}
				</div>
			</div>
		)
    }

	componentDidMount(){
		if(super.componentDidMount)
			super.componentDidMount()
		
		//this.cursorReady()
	}

	cursorReady(){
		let firstText=this.root.querySelector("span[data-content]").getAttribute("data-content")
		this.context.store.dispatch(ACTION.Selection.SELECT(firstText,0))
		this.root.addEventListener("click", e=>{
			const target=e.target
			switch(target.nodeName.toLowerCase()){
			case 'span':
				let text=target.textContent
				let contentID=target.getAttribute("data-content")
				let [x]=offset(e, target)
				this.context.store.dispatch(ACTION.Cursor.AT(contentID,0, x,this.uuid))
			break
			}
		})
	}

	static contextTypes={
		store:PropTypes.any
	}
}





