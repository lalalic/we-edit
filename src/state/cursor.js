import React, {PureComponent as Component, PropTypes} from "react"
import {connect} from "react-redux"

import {ACTION} from "."

import {getContent} from "./selector"

export class Cursor extends Component{
	focus(){
		this.refs.input.focus()
	}
	
	render(){
		const {top,left}=this.active
		const style={margin:0,padding:0,border:0,position:"absolute"}
		return (
			<div unselectable="on"
				style={{...style,left,top,position:"absolute",height:0.1,width:0.1}}>
				<Input ref="input" 
					dispatch={this.props.dispatch} 
					style={{
						...style,
						height:0.1,
						width:0.1,
						background:"transparent",
						color:"transparent"
					}}/>
			</div>
		)
	}
}

export class Flasher extends Component{
	static contextTypes={
		store: PropTypes.any,
		docId: PropTypes.string,
	}
	static propTypes={
		id: PropTypes.string,
		at: PropTypes.number
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
	
	componentWillReceiveProps({id,at}){
		this.position(this.context.docId,id,at)
	}

	componentDidMount(){
		this.flash()
	}

	componentDidUpdate(){
		this.flash()
	}

	flash(){
		this.reset()
		if(this.state.height)
			this.timer=setInterval(a=>this.toggle(), 700)
	}
	
	position(docId,id,at){
		const state=this.context.store.getState()
		const {children:text, ...style}=getContent(state, id).toJS()
		
		let {top,left,width,height,descent}=this.info(docId, id, at, text,style)
		left+=width
		
		this.setState({...style,left,top,height})
		
		return {left, top}
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
}

export class HtmlFlasher extends Flasher{
	render(){
		const {left, top, height, color, size}=this.state
		const style={margin:0,padding:0,border:0,position:"absolute"}
		
		return (
			<div unselectable="on" ref={a=>this.root}
				style={{...style,left,top,height,width:size}}/>
		)
	}
	
	info(docId, id, text, style){
		let node=document.querySelector(`#${docId} span[data-content="${id}"]`)
		if(!node)
			return null
		
		let {top,left}=node.getBoundingClientRect()
		let wordwrapper=new HtmlWrapper(node)
		let width=wordwrapper.stringWidth(text.substring(0,at))
		let {height, descent}=wordwrapper
		wordwrapper.close()
		return {top, left, width,height,descent}
	}
	
	toggle(){
		let color=this.root.style.background
		this.root.style.background=color=="transparent" ? this.state.color : "transparent"
	}
}

class HtmlWrapper{
	constructor(node){
		this.node=node
		this.tester=node.cloneNode(false)
		this.tester.style="position:absolute;left:-999;top:0;"
		node.parentNode.appendChild(this.tester)
		this.height=node.getBoundingClientRect().height
		this.descent=0
	}
	
	stringWidth(word){
        this.tester.innerHTML=word
        return this.tester.getBoundingClientRect().width
    }
	
	close(){
		this.tester.parentNode.removeChild(this.tester)
	}
}

class Input extends Component{
	state={value:""}
	focus(){
		this.input.focus()
	}
	render(){
		let {dispatch,...others}=this.props
		return <input ref={a=>this.input=a} type="text" value="" {...others}
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

export function stateful(flasher){
	return connect(state=>{
		const {start:{id,at}}=state.get("selection")
		return {id,at}
	})(flasher)
}