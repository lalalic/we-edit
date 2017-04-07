import React, {PureComponent as Component, PropTypes} from "react"
import {connect} from "react-redux"
import {getContent, getContentStyle, getSelection} from "state/selector"

export class Cursor extends Component{
	static display="cursor"
	static contextTypes={
		store: PropTypes.any,
		docId: PropTypes.string,
		getCursorInput: PropTypes.func
	}
	static propTypes={
		id: PropTypes.string,
		at: PropTypes.number,
		active: PropTypes.string,
		/**
		* return flasher position {top,left,width,height,descent}
		*/
		positioning: PropTypes.func.isRequired
	}

	render(){
		return null
	}

	componentWillReceiveProps({active,id,at}, {docId,getCursorInput}){
		if(this.props.id!==id || this.props.at!==at){
			this.style=this.position(docId,id,at)
			if(docId==active)
				getCursorInput().setState(this.style)
		}else if(docId==active)
			getCursorInput().setState(this.style)
	}

	active(){
		this.context.getCursorInput().setState(this.style)
	}

	componentDidMount(){
		const {active,id,at}=this.props
		const {docId,getCursorInput}=this.context
		this.style=this.position(docId,id,at)
	}

	position(docId,id,at){
		const state=this.context.store.getState()
		const {children:text}=getContent(state, id).toJS()
		const style=getContentStyle(state, docId, id)

		let {top,left,width,height,descent}=this.props.positioning(id, at, text,style)
		left+=width

		return {...style,left,top,height}
	}
}

export default connect(state=>{
	let {start:{id,at},active}=getSelection(state)
	return {id,at,active}
})(Cursor)
