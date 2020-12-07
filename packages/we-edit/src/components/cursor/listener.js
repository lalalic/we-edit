import React, {Component} from "react"
import PropTypes from "prop-types"

import reactComposition from "../../tools/react-composition"
import {ACTION} from "../../state"

export default class Listener extends Component{
	static contextTypes={
		onKeyDown:PropTypes.func,
		editable: PropTypes.any,
	}

	constructor(){
		super(...arguments)
		this.state={value:""}
		const {dispatch}=this.props
		this.KEYs={
			13:e=>dispatch(ACTION.Text.ENTER(e)),
			46:e=>dispatch(ACTION.Text.DELETE(e)), 
			8:e=>dispatch(ACTION.Text.BACKSPACE(e)),
			9:e=>dispatch(ACTION.Text.TAB(e)),
			
			37:e=>dispatch(ACTION.Cursor.BACKWARD(e)),//move left
			39:e=>dispatch(ACTION.Cursor.FORWARD(e)),//move right
			
			38:e=>dispatch(ACTION.Cursor.BACKWARD(e)),//move up
			40:e=>dispatch(ACTION.Cursor.FORWARD(e)),//move down

			116:e=>dispatch(ACTION.Refresh(e)),//F5: refresh move down

			//ctrl+,or meta+ on mac
			"c":e=>dispatch(ACTION.Selection.COPY(e)),
			"x":e=>dispatch(ACTION.Selection.CUT(e)),
			"v":e=>dispatch(ACTION.Selection.PASTE(e)),
			"z":e=>dispatch(ACTION.History.undo(e)),
			"y":e=>dispatch(ACTION.History.redo(e)),
		}
		this.onChange=this.onChange.bind(this)
		this.isOnComposition = false
        this.emittedInput = true
	}

	render(){
		let {dispatch,keys={},inputRef,...others}=this.props
		const {editable}=this.context
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
			onChange={this.onChange}

			onCompositionStart={e=>{
				this.isOnComposition = true
            	this.emittedInput = false
			}}

			onCompositionEnd={e=>{
				this.isOnComposition = false
				// fixed for Chrome v53+ and detect all Chrome
				// https://chromium.googlesource.com/chromium/src/+/afce9d93e76f2ff81baaa088a4ea25f67d1a76b3%5E%21/
				// also fixed for the native Apple keyboard which emit input event before composition event
				// subscribe this issue: https://github.com/facebook/react/issues/8683
				if (!this.emittedInput) {
					this.onChange(e)
				}				
			}}

			onKeyDown={e=>{
				if(editable==false && ![37,38,39,40].includes(e.keyCode)){
					e.preventDefault()
					return
				}

				const onMac=navigator.userAgent.indexOf("Mac OS") != -1
				const {key,keyCode,ctrlKey,metaKey,shiftKey}=e
				const control=keys[keyCode]|| (((onMac && metaKey) ||ctrlKey ||shiftKey) && keys[key])
				if(control){
					e.preventDefault()
					control(toMyEvent(e))
					return 
				}

				if(this.context.onKeyDown){
					if(this.context.onKeyDown(e)!==false){
						dispatch(ACTION.Text.CONTROL(toMyEvent(e)))
					}
				}
			}}
		/>
	}

	onChange(e){
		if(this.context.editable==false)
			return
		const value = e.target.value
		if(!this.isOnComposition){
			this.props.dispatch(ACTION.Text.TYPE(value))
			this.setState({value:""})
			this.emittedInput = true
		}else{
			this.setState({value})
			this.emittedInput = false
		}
	}

	componentDidUpdate(){
		requestAnimationFrame(()=>{
			this.props.inputRef.current?.focus()
		})
	}
}

const toMyEvent=e=>{
	return Object.keys(e).reduce((keys,k)=>{
		if(k.endsWith("Key")){
			keys[k]=e[k]
		}
		return keys
	},{keyCode:e.keyCode})
}