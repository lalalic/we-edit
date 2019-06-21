import React, {Component} from "react"
import PropTypes from "prop-types"

import reactComposition from "../../tools/react-composition"
import {ACTION, connect} from "../../state"
import {getSelection} from "../../state/selector"

export default connect(
	state=>({actived:getSelection(state).actived})
)(class Listener extends Component{
	static contextTypes={
		onKeyDown:PropTypes.func,
	}

	state={value:""}
	KEYs={
		13:e=>this.props.dispatch(ACTION.Text.RETURN()),
		46:e=>this.props.dispatch(ACTION.Text.REMOVE(-1)),//delete
		8:e=>this.props.dispatch(ACTION.Text.REMOVE(1)),//backspace
		9:e=>this.props.dispatch(ACTION.Text.INSERT(String.fromCharCode(9),e.shiftKey)),//tab
		37:({shiftKey})=>this.props.dispatch(ACTION.Cursor.BACKWARD({shiftKey})),//move left
		38:e=>this.props.dispatch(ACTION.Cursor.MOVE_LEFT(e.shiftKey)),//move up
		39:({shiftKey})=>this.props.dispatch(ACTION.Cursor.FORWARD({shiftKey})),//move right
		40:e=>this.props.dispatch(ACTION.Cursor.MOVE_RIGHT(e.shiftKey)),//move down
		116:e=>this.props.dispatch(ACTION.Refresh()),//F5: refresh move down
		metaz:e=>this.props.dispatch(ACTION.History.undo()),//meta +z,
		metay:e=>this.props.dispatch(ACTION.History.redo()),//meta +y,
	}

	render(){
		let {dispatch,keys={},inputRef,editable,...others}=this.props
		keys={...this.KEYs, ...keys}
		if(editable==false){
			delete others.onPaste
			delete others.onCut
		}
		return <input
			ref={inputRef}
			className="cursor"
			type="text"
			value={this.state.value}

			{...others}

			{...reactComposition({
					onChange:e=>{
						if(editable==false)
							return
						let value = e.target.value
						if(e.reactComposition.composition === false){
							dispatch(ACTION.Text.INSERT(value, e.shiftKey))
							this.setState({value:""})
						}else
							this.setState({value})
					}
			})}

			onKeyDown={e=>{
				if(editable==false && ![37,38,39,40].includes(e.keyCode)){
					e.preventDefault()
					return
				}
				const control=keys[e.keyCode]||(({key,metaKey,ctrlKey,fnx=metaKey||ctrlKey ? "meta" :""})=>keys[`${fnx}${key.toLowerCase()}`])(e);
				if(control){
					e.preventDefault()
					control(e)
				}

				if(this.context.onKeyDown){
					this.context.onKeyDown(e)
				}
			}}
		/>
	}

	componentDidUpdate(){
		this.props.inputRef.current.focus()
	}
})
