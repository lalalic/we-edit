import React, {Component, PropTypes} from "react"
import {ACTION} from "state"

import reactComposition from "react-composition"

export default class Listener extends Component{
	static contextTypes={
		store: PropTypes.any
	}
	state={value:""}

	render(){
		let {dispatch}=this.context.store
		let {up,down,...others}=this.props
		return <input ref={a=>this.input=a} type="text" value={this.state.value} {...others}
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
						switch(e.keyCode){
							case 13:
								e.preventDefault()
								dispatch(ACTION.Text.RETURN())
							break
							case 46:
								e.preventDefault()
								dispatch(ACTION.Text.REMOVE(-1))
							break
							case 8://backspace
								e.preventDefault()
								dispatch(ACTION.Text.REMOVE(1))
							break
							case 37://ARROW LEFT
								e.preventDefault()
								dispatch(ACTION.Cursor.MOVE_LEFT(e.shiftKey))
							break
							case 38://ARROW UP
								e.preventDefault()
								up(e.shiftKey)
							break
							case 39://ARROW RIGHT
								e.preventDefault()
								dispatch(ACTION.Cursor.MOVE_RIGHT(e.shiftKey))
							break
							case 40://ARROW DOWN
								e.preventDefault()
								down(e.shiftKey)
							break
							}
						}
					}

		/>
	}

	componentDidUpdate(){
		this.input.focus()
	}
}
