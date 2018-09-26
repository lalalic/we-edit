import React, {Component} from "react"
import PropTypes from "prop-types"

import reactComposition from "../../tools/react-composition"
import {ACTION} from "../../state/action"

export default class Listener extends Component{
	static contextTypes={
		activeDocStore: PropTypes.any,
		query: PropTypes.func
	}
	state={value:""}

	render(){
		let {dispatch}=this.context.activeDocStore
		let {up,down,...others}=this.props
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
		this.input.scrollIntoView()
		this.input.focus()
	}
}
