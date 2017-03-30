import React, {PureComponent, Component, PropTypes} from "react"
import Base from "../document"

import {ACTION} from "state"

import {editable} from "model/edit"
import recomposable from "./recomposable"

import SVGFlasher from "./svg-flasher"

export default class Document extends editable(recomposable(Base)){
	_reComposeFrom(section){
		let index=this.computed.children.findIndex(a=>a==section)
		this.computed.children.splice(index,1)
	}
	
	static Composed=class extends Component{
		static contextTypes={
			getCursor: PropTypes.func,
			docId: PropTypes.string,
			store: PropTypes.any
		}
		
		componentDidMount(){
			this.context.getCursor().addFlasher(this.context.docId, this.refs.flasher)
			
			this.refs.root.addEventListener("click", e=>{
				const target=e.target
				switch(target.nodeName){
				case 'text':
					let text=target.textContent
					let contentEndIndex=target.getAttribute("end")
					let contentID=target.getAttribute("data-content")
					let [x]=offset(e, target)
					let dispatch=this.context.store.dispatch
					dispatch(ACTION.Cursor.AT(contentID,contentEndIndex-text.length, x))
					dispatch(ACTION.Cursor.ACTIVE(this.context.docId))
				break
				}
			})
		}
		
		render(){
			return (
				<div ref="root">
					<Based.Composed {...this.props}>
						<SVGFlasher ref="flasher"/>
					</Based.Composed>
				</div>
			)
		}
	}
}

