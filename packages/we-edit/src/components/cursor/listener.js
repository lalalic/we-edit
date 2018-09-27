import React, {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"

import reactComposition from "../../tools/react-composition"
import {ACTION} from "../../state/action"

export default connect()(class Listener extends Component{
	state={value:""}
	KEYs={
		13:e=>this.props.dispatch(ACTION.Text.RETURN()),
		46:e=>this.props.dispatch(ACTION.Text.REMOVE(-1)),//delete
		8:e=>this.props.dispatch(ACTION.Text.REMOVE(1)),//backspace
		37:e=>this.props.dispatch(ACTION.Cursor.MOVE_LEFT(e.shiftKey)),//move left
		38:e=>this.props.dispatch(ACTION.Cursor.MOVE_LEFT(e.shiftKey)),//move up
		39:e=>this.props.dispatch(ACTION.Cursor.MOVE_RIGHT(e.shiftKey)),//move right
		40:e=>this.props.dispatch(ACTION.Cursor.MOVE_RIGHT(e.shiftKey)),//move down
	}
	
	render(){
		let {dispatch,keys={},...others}=this.props
		keys={...this.KEYS, ...keys}
		return <input
			ref={a=>this.input=a}
			className="cursor"
			type="text"
			value={this.state.value}
			{...others}
					{...reactComposition({
							onChange:e=>{
								let value = e.target.value
								if(e.reactComposition.composition === false){
									dispatch(ACTION.Text.INSERT(value))
									this.setState({value:""})
								}else
									this.setState({value})
							}
					})}

					onKeyDown={e=>{
						const control=keys[e.keyCode]
						if(control){
							e.preventDefault()
							control(e)
						}
					}}

		/>
	}

	componentDidUpdate(){
		this.input.focus()
	}
})
