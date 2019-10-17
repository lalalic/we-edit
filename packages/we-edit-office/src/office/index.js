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

const excludeReducer=(state={})=>state

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

	getReducers=memoize((workspaces,reducers)=>{
		return workspaces.reduce((collected,a)=>{
			if(a.props.reducer){
				collected[a.key]=(state,action)=>{
					let reduced=a.props.reducer(state,action)
					return {...state,...reduced}
				}
			}
			return collected
		},{...reducers})
	},(a,b)=>a===b || shallowEqual(a,b))

	componentDidMount(){
		const {installable}=this.props
		if(installable){
			const dispatch=this.wedit.current.store.dispatch
			event.ready(dispatch)
			event.on("change", this.updateWorkspaces=(workspaces,init)=>{
				this.setState(({workspaces:current})=>{
					return {
						workspaces,
						excludes:current.filter(a=>!workspaces.find(b=>b.key===a.key))
									.reduce((excludes,a)=>{
										excludes[a.key]=excludeReducer
										return excludes
									},{})
					}
				}, init && (()=>{
					init(dispatch)
				}))
			})
		}
	}

	render(){
		const {workspaces, excludes}=this.state
		let {titleBarProps,children, titleBar, dashboard, reducers={}}=this.props
		
		reducers=this.getReducers(workspaces,{...excludes,...reducers})

		return (
			<WeEdit reducers={reducers} ref={this.wedit}>
				<WeEditUI {...{titleBarProps, titleBar,dashboard}}>
					{workspaces.map(a=>a.props.reducer ? React.cloneElement(a,{reducer:undefined}) : a)}
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
