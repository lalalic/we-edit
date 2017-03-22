import React, {PureComponent as Component, PropTypes} from "react"
import {ACTION} from "."

export class Cursor extends Component{
	static propTypes={
		left: PropTypes.number,
		top: PropTypes.number,
		height: PropTypes.number,
		color: PropTypes.string,
		size: PropTypes.number,
		editorId: PropTypes.any.isRequired
	}

	static defaultProps={
		left:0,
		top:0,
		height:20,
		color:"black",
		size:1
	}

	timer=null
	render(){
		const {left, top, height, color, size}=this.props
		const style={margin:0,padding:0,border:0}
		return (
			<div unselectable="on" ref="cursor"
				style={{...style,background:color,left,top,position:"absolute",height:20,width:size}}>
				<Focus dispatch={this.props.dispatch} style={{...style,height:0.1,width:0.1,background:"transparent",color:"transparent"}}/>
			</div>
		)
	}

	componentDidMount(){
		this.flash()

	}

	componentDidUpdate(){
		this.flash()
	}

	flash(){
		let node=this.refs.cursor
		if(this.timer){
			clearInterval(this.timer)
			delete this.timer
		}
		if(this.props.height){
			this.timer=setInterval(a=>{
				if(node.style.backgroundColor=="transparent"){
					node.style.backgroundColor=this.props.color
				}else{
					node.style.backgroundColor="transparent"
				}
			}, 700)
		}
		node.querySelector("input").focus()
	}

	componentWillUnmount(){
		if(this.timer){
			clearInterval(this.timer)
			delete this.timer
		}
	}
}

class Focus extends Component{
	state={value:""}
	render(){
		let {dispatch,...others}=this.props
		return <input type="text" value="" {...others}
					onChange={({target:{value}})=>{
							this.props.dispatch(ACTION.Text.INSERT(value))
							this.setState({value:""})
						}
					}
					onKeyDown={e=>{
							switch(e.keyCode){
							case 8://backspace
								e.preventDefault()
								this.props.dispatch(ACTION.Text.REMOVE(1))
							break
							case 37://ARROW LEFT
								e.preventDefault()
								this.props.dispatch(ACTION.Cursor.MOVE_LEFT())
							break
							case 38://ARROW UP
								e.preventDefault()
								this.props.dispatch(ACTION.Cursor.MOVE_UP())
							break
							case 39://ARROW RIGHT
								e.preventDefault()
								this.props.dispatch(ACTION.Cursor.MOVE_RIGHT())
							break
							case 40://ARROW DOWN
								e.preventDefault()
								this.props.dispatch(ACTION.Cursor.MOVE_DOWN())
							break
							}
						}
					}

		/>
	}
}
