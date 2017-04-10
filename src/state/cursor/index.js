import React, {PureComponent as Component, Children, PropTypes} from "react"
import {connect} from "react-redux"
import {getContent, getContentStyle, getSelection} from "state/selector"
import Selection from "state/selection"

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
		start: PropTypes.shape({
			id: PropTypes.string,
			at: PropTypes.number
		}),
		active: PropTypes.string,
		/**
		* return flasher position {top,left,width,height,descent}
		*/
		positioning: PropTypes.func.isRequired,
		getRange: PropTypes.func.isRequired
	}

	render(){
		return <Selection ref={a=>this.selection=a}
			start={this.props.start}
			end={{id:this.props.id,at:this.props.at}}
			getRange={this.props.getRange}
			/>
	}

	componentWillReceiveProps({active,id,at,start}, {docId,getCursorInput}){
		if(this.props.id!==id || this.props.at!==at)
			this.style=this.position(docId,id,at)

		if((start.id==id && start.at==at) || this.context.docId!==active)
			this.selection.clear();

		if(docId==active)
			getCursorInput().setState(this.style)
	}

	shouldComponentUpdate({id,at,start,active}){
		let should=(start.id!==id || start.at!==at) && this.context.docId==active


		return should
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

		let {top,left,width,height,descent,up,down}=this.props.positioning(id, at, text,style)
		left+=width

		return {...style,left,top,height,up,down}
	}
}

export default connect(state=>{
	let {end:{id,at},start,active}=getSelection(state)
	return {id,at,active,start}
})(Cursor)
