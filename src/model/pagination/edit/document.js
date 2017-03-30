import React, {PureComponent, Component, PropTypes} from "react"
import Base from "../document"
import {Text} from "model/pagination"
import {ACTION} from "state"
import {getContent} from "state/selector"
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

		componentDidMount(){
			this.root.querySelector("svg").addEventListener("click", e=>{
				const target=e.target
				switch(target.nodeName){
				case 'text':
					let text=target.textContent
					let contentEndIndex=target.getAttribute("end")
					let from=contentEndIndex-text.length

					let contentID=target.getAttribute("data-content")
					let [x]=offset(e, target)
					let dispatch=this.context.store.dispatch
					const content=getContent(this.context.store.getState(), contentID).toJS()
					const wordwrapper=new Text.WordWrapper(content.props)
					const end=wordwrapper.widthString(x, content.children.substr(from))
					dispatch(ACTION.Cursor.AT(contentID,from+end))
					dispatch(ACTION.Cursor.ACTIVE(this.context.docId))
				break
				}
			})
		}

		render(){
			return (
				<div ref={a=>this.root=a}>
					<Base.Composed {...this.props}>
						<SVGCursor ref={a=>this.cursor=a}/>
					</Base.Composed>
				</div>
			)
		}

		componentDidUpdate(){
			this.cursor.forceUpdate()
		}
	}
}
