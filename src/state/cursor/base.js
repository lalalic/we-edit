import React, {PureComponent as Component, PropTypes} from "react"
import {connect} from "react-redux"
import {getContent, getContentStyle} from "state/selector"

export default class Cursor extends Component{
	static display="cursor"
	static contextTypes={
		store: PropTypes.any,
		docId: PropTypes.string,
		getCursorInput: PropTypes.func,
	}
	static propTypes={
		id: PropTypes.string,
		at: PropTypes.number,
		active: PropTypes.string,
	}
	timer=null
	state={top:0, left:0, height:0,color:"black",size:1}
	render(){
		return (
			<div style={{color:"red"}}>
			you should implement render/toggle/info
			</div>
		)
	}

	componentWillReceiveProps({active,id,at}, {docId,getCursorInput}){
		if(this.props.id!==id || this.props.at!==at){
			let style=this.position(docId,id,at)
			this.setState(style)
			if(docId==active)
				getCursorInput().setState(style)
		}else if(docId==active)
			getCursorInput().setState(this.state)
	}

	componentDidMount(){
		this.flash()
	}

	flash(){
		this.reset()
		if(this.state.height)
			this.timer=setInterval(a=>this.toggle(), 500)
	}

	position(docId,id,at){
		const state=this.context.store.getState()
		const {children:text}=getContent(state, id).toJS()
		const style=getContentStyle(state, docId, id)

		let {top,left,width,height,descent}=this.info(docId, id, at, text,style)
		left+=width

		return {...style,left,top,height}
	}

	//should implement,{top, left, width,height,descent}
	info(docId, id, at, text, style){
		throw new Error("implement Flasher.info, and return {top, left, width,height,descent}")
	}

	//should implement
	toggle(){
		throw new Error("implement Flasher.toggle to flash for cursor")
	}

	componentWillUnmount(){
		this.reset()
	}

	reset(){
		if(this.timer){
			clearInterval(this.timer)
			delete this.timer
		}
	}

	static connect(){
		return connect(state=>{
			let {start:{id,at},active}=state.get("selection")
			return {id,at,active}
		})(this)
	}
}
