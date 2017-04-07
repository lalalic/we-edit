import React, {PureComponent, Component, PropTypes} from "react"
import Base from "../document"
import {Text} from "model/pagination"
import {ACTION} from "state"
import {getContent,getContentStyle} from "state/selector"
import {editable} from "model/edit"
import recomposable from "./recomposable"

import SVGCursor from "./svg-cursor"
import offset from "mouse-event-offset"

export default class Document extends editable(recomposable(Base)){
	_reComposeFrom(section){
		let index=this.computed.children.findIndex(a=>a==section)
		this.computed.children.splice(index,1)
	}

	static Composed=class extends Component{
		static displayName="composed-document-with-flasher"
		static contextTypes={
			docId: PropTypes.string,
			store: PropTypes.any
		}

		render(){
			return (
				<div ref={a=>this.root=a}>
					<Base.Composed {...this.props}>
						<SVGCursor/>
					</Base.Composed>
				</div>
			)
		}
		
		componentDidMount(){
			this.root.querySelector("svg").addEventListener("click", e=>{
				const target=e.target
				switch(target.nodeName){
				case 'text':
					let text=target.textContent
					let contentEndIndex=target.getAttribute("data-endAt")
					let from=contentEndIndex-text.length

					let contentID=target.getAttribute("data-content")
					let [x]=offset(e, target)
					let dispatch=this.context.store.dispatch
					const state=this.context.store.getState()
					const content=getContent(state, contentID).toJS()
					const style=getContentStyle(state,this.context.docId, contentID)
					const wordwrapper=new Text.WordWrapper(style)
					const end=wordwrapper.widthString(x, content.children.substr(from))
					dispatch(ACTION.Cursor.AT(contentID,from+end))
					dispatch(ACTION.Cursor.ACTIVE(this.context.docId))
				break
				}
			})
		}
	}
}
