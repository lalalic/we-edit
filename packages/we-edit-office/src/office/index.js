import React, {PureComponent} from "react"
import PropTypes from "prop-types"
import {WeEdit,shallowEqual} from "we-edit"
import memoize from "memoize-one"
import EventEmitter from "events"

import WeEditUI from "../we-edit-ui"

import PaginationOffice from "./pagination"
import PlainOffice from "./plain"


const myOffice=[PaginationOffice,PlainOffice]

const event=new (class OfficeEvent extends EventEmitter{
	constructor(){
		super(...arguments)
		var inits=[]
		var onReady=(workspaces,init)=>{
			if(init){
				inits.push(init)
			}
		}

		this.on("change",onReady)
		
		this.once('office ready',dispatch=>{
			this.removeListener("change", onReady)
			try{
				inits.forEach(init=>init(dispatch))
			}catch(e){
				console.error(e)
			}
		})
	}

	ready(){
		this.emit("office ready", ...arguments)
	}
})();

export default class Office extends PureComponent{
	static propTypes={
		workspaces: PropTypes.arrayOf(PropTypes.element),
		installable:PropTypes.bool,
	}

	static defaultProps={
		installable:true,
	}

	static install(workspaces,init){
		workspaces=Array.isArray(workspaces) && workspaces || [workspaces]
		workspaces.reverse().forEach(a=>myOffice.unshift(a))
		event.emit("change", [...myOffice], init)
	}

	static uninstall(workspaces){
		workspaces=Array.isArray(workspaces) && workspaces || [workspaces]
		workspaces.forEach(a=>myOffice.splice(myOffice.indexOf(a),1))
		event.emit("change",[...myOffice])
	}

	static getDerivedStateFromProps({workspaces,installable},state){
		return {workspaces: (installable && state.workspaces)||workspaces||[...myOffice]}
	}

	constructor(){
		super(...arguments)
		this.state={workspaces:null,excludes:{}}
		this.wedit=React.createRef()
	}

	componentDidMount(){
		const {installable}=this.props
		if(installable){
			const dispatch=this.wedit.current.store.dispatch
			event.ready(dispatch)
			event.on("change", this.updateWorkspaces=(workspaces,init)=>{
				this.setState({workspaces}, ()=>{
					init && init(dispatch)
				})
			})
		}
	}

	render(){
		const {workspaces}=this.state
		const {titleBarProps,children, titleBar, dashboard, reducers}=this.props
		
		return (
			<WeEdit reducers={reducers} ref={this.wedit}>
				<WeEditUI {...{titleBarProps, titleBar,dashboard}}>
					{workspaces}
					{children}
				</WeEditUI>
			</WeEdit>
		)
	}

	componentWillUnmount(){
		if(this.props.installable){
			event.removeListener("change",this.updateWorkspaces)
		}
	}
}
