import React,{Component} from "react"
import PropTypes from "prop-types"
import {connect, ACTION} from "../state"
import {getUI} from "../state/selector"

/**
 * HACK by event.dialog
 */
export default connect(state=>{
	const {contextMenuAt:at}=getUI(state)
	return {at}
})(class ContextMenu extends Component{
	static childContextTypes={
		isContextMenu: PropTypes.bool
	}

    constructor(){
        super(...arguments)
		this.close=this.close.bind(this)
		this.menu=React.createRef()
		this.state={dialog:null}
    }
	
	getChildContext(){
        return {
            isContextMenu:true
        }
    }
	
	close(){
        this.props.dispatch(ACTION.UI({contextMenuAt:undefined}))
    }

	render(){
		const {children, at}=this.props
		const {dialog}=this.state
		if(dialog){
			return React.cloneElement(dialog,{close:()=>this.setState({dialog:null})})
		}
		if(!at){
			return null
		}
		return (
			<div style={{position:"fixed",left:0,top:0,width:"100%",height:"100%"}}
                onClick={e=>{
					this.setState({dialog:e.dialog})
					delete e.dialog
					this.close()
				}}
				onDoubleClick={this.close}
				onContextMenu={this.close}
				>
				<div ref={this.menu} style={{position:"fixed", ...at}}>{children}</div>
			</div>
		)
	}

	componentDidUpdate(){
		if(!this.props.at)
			return 
		if(this.menu.current.getBoundingClientRect().bottom>window.innerHeight){
			this.menu.current.style.top='unset'
			this.menu.current.style.bottom=0
		}
	}
})