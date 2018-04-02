import React,{Fragment} from "react"
import PropTypes from "prop-types"

import Base from "../document"

import {ACTION, Cursor, getContent, getClientRect} from "we-edit"
import {editify} from "we-edit"
import offset from "mouse-event-offset"

export default class Document extends editify(Base){
	static contextTypes={
		store:PropTypes.any,
		docId:PropTypes.any
	}

	render(){
		const {canvas, ...props}=this.props
        return (
			<Fragment>
				<div ref={a=>this.root=a}>
					<Base {...props}/>
				</div>
				{canvas ? React.cloneElement(canvas,{content:<Base {...props}/>}) : null}
			</Fragment>
		)
    }

	componentDidMount(){
		this.root.addEventListener("click", e=>{
			const target=e.target
			switch(target.nodeName.toLowerCase()){
			case 'span':
				let contentID=target.dataset.content
				console.assert(!!contentID)
				let [x]=offset(e, target)

				let dispatch=this.context.store.dispatch
				const content=getContent(this.context.store.getState(), contentID).toJS()

				let wrapper=new HTMLMeasure(target)
				let end=wrapper.widthString(x,content.children)

				dispatch(ACTION.Cursor.AT(contentID,end))
				dispatch(ACTION.Cursor.ACTIVE(this.context.docId))
			break
			}
		})
		this.context.store.dispatch(ACTION.Cursor.ACTIVE(this.context.docId))
	}

	cursorPosition(id, at, text, style){
		let node=document.querySelector(`#${this.context.docId} span[data-content="${id}"]`)
		if(!node)
			return null

		let {top,left}=getClientRect(node)
		let wordwrapper=new HTMLMeasure(node)

		let width=wordwrapper.stringWidth(text.substring(0,at))
		let {height, descent}=wordwrapper

		return {top, left, width,height,descent}
	}
}

class HTMLMeasure{
	widthString(width, text){
		return 0
	}

	stringWidth(str){
		return str.length
	}
}
