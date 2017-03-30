import React, {Component, PropTypes} from "react"
import {ACTION} from "state"

export default class Listener extends Component{
	static contextTypes={
		store: PropTypes.any
	}
	state={value:""}
	focus(){
		this.input.focus()
	}
	render(){
		let {dispatch}=this.context.store
		return <input ref={a=>this.input=a} type="text" value="" {...this.props}
					onChange={({target:{value}})=>{
							dispatch(ACTION.Text.INSERT(value))
							this.setState({value:""})
						}
					}
					onKeyDown={e=>{
							switch(e.keyCode){
							case 8://backspace
								e.preventDefault()
								dispatch(ACTION.Text.REMOVE(1))
							break
							case 37://ARROW LEFT
								e.preventDefault()
								dispatch(ACTION.Cursor.MOVE_LEFT())
							break
							case 38://ARROW UP
								e.preventDefault()
								dispatch(ACTION.Cursor.MOVE_UP())
							break
							case 39://ARROW RIGHT
								e.preventDefault()
								dispatch(ACTION.Cursor.MOVE_RIGHT())
							break
							case 40://ARROW DOWN
								e.preventDefault()
								dispatch(ACTION.Cursor.MOVE_DOWN())
							break
							}
						}
					}

		/>
	}
}
