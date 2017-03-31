import React, {PureComponent, Component, PropTypes} from "react"
import Base from "../document"

import {ACTION} from "state"
import {editable} from "model/edit"
import {HtmlCursor} from "state/cursor"
import {getContent} from "state/selector"
import offset from "mouse-event-offset"

export default class Document extends editable(Base){
	static contextTypes={
		store:PropTypes.any,
		docId:PropTypes.any
	}

	render(){
        return (
			<div ref={a=>this.root=a}>
				{super.render()}
				<HtmlCursor ref={a=>this.cursor=a}/>
			</div>
		)
    }

	componentDidMount(){
		this.root.addEventListener("click", e=>{
			const target=e.target
			switch(target.nodeName.toLowerCase()){
			case 'span':
				let contentID=target.getAttribute("data-content")
				console.assert(!!contentID)
				let [x]=offset(e, target)

				let dispatch=this.context.store.dispatch
				const content=getContent(this.context.store.getState(), contentID).toJS()

				let wrapper=new HtmlCursor.HtmlWrapper(target)
				let end=wrapper.widthString(x,content.children)
				wrapper.close()

				dispatch(ACTION.Cursor.AT(contentID,end))
				dispatch(ACTION.Cursor.ACTIVE(this.context.docId))
			break
			}
		})
	}

	componentDidUpdate(){
		this.cursor.forceUpdate()
	}
}
