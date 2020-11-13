import React,{Component} from "react"
import PropTypes from "prop-types"
import {connect, ACTION} from "../state"
import {getUI} from "../state/selector"

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
		if(!at)
			return null
		return (
			<div style={{position:"fixed",left:0,top:0,width:"100%",height:"100%"}}
                onClick={this.close}
                onDoubleClick={this.close}
				>
				<div style={{position:"absolute", ...at}}>{children}</div>
			</div>
		)
	}
})