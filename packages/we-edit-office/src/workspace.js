import React, {PureComponent, Component, Children, Fragment} from "react"
import { createPortal } from "react-dom"
import {connect, getUI, ACTION as weACTION} from "we-edit"
import PropTypes from "prop-types"
import {pure}  from "recompose"
import EventEmitter from "events"
import memoize from "memoize-one"
import {Tabs,Tab} from "material-ui/Tabs"
import Divider from "material-ui/Divider"

import Status from "./status"
import ContextMenu from "./components/context-menu"
import Ribbon, {Clipboard, Text, Paragraph} from "./ribbon"
import Canvas from "./canvas"
import ACTION,{getOffice} from "./state/action"
import IconClose from "material-ui/svg-icons/action/highlight-off"
import Theme from "./components/prop-types-ui/theme"

/**
 * doc.Store can't be removed to Workspace since cursor
 */
export default class Workspace extends PureComponent{
	static Context=class PureComponent{
		static contextTypes={
			dispatch: PropTypes.func
		}
		render(){
			const {children, ...props}=this.props
			return children(this.context, props)
		}
	}
	static childContextTypes={
		debug: PropTypes.bool,
		events: PropTypes.object,
		panelManager: PropTypes.shape({
			register: PropTypes.func,
			toggle: PropTypes.func,
		}),
		dialogManager: PropTypes.shape({
			register: PropTypes.func,
			show: PropTypes.func,
			get: PropTypes.func,
		}),
		officeUITheme:PropTypes.object,
		dispatch: PropTypes.func,
		setting: PropTypes.func,
	}

	static propTypes={
		toolBar:PropTypes.node,
		statusBar: PropTypes.node,
		debug: PropTypes.bool,
		doc: PropTypes.object,
		ruler: PropTypes.oneOfType([PropTypes.bool,PropTypes.object]),
		channel: PropTypes.string,
		layout: PropTypes.node,
		tests: PropTypes.node,
		officeUITheme: PropTypes.object,
		contextMenu: PropTypes.element,
		theme: PropTypes.object,
	}

	static defaultProps={
		officeUITheme:Theme,
		toolBar: (<Ribbon/>),
		statusBar:(<Status/>),
		contextMenu:(
			<ContextMenu desktop={true}>
				<Clipboard/>
				<Divider/>
				<Text/>
				<Paragraph/>
			</ContextMenu>
		)
	}

	constructor(){
		super(...arguments)
		const me=this
		this.store=React.createRef()
		this.events=new EventEmitter()
		const panelContainers=[]
		this.panelManager={
			register(a){
				if(!panelContainers.includes(a)){
					panelContainers.push(a)
				}
			},
			unregister(a){
				const i=panelContainers.indexOf(a)
				if(i!=-1){
					panelContainers.splice(i,1)
				}
			},
			toggle(el, container){
				this.get(container).toggle(el)
			},
			get(name){
				return panelContainers.find(a=>a.props.name==name)||panelContainers[0]
			}
		}

		const dialogs=new Proxy({},{
			get(target,key){
				return target[key]||me.props.officeUITheme.$settingDialogs[key]
			},
			set(target,key,value){
				target[key]=value
				return true
			}
		})

		this.dialogManager={
			register(el){
				return dialogs[el.props.name]=el
			},
			show(type,props){
				let dialog=dialogs[type]
				if(dialog.props.portalContainer){
					dialog=createPortal(React.cloneElement(dialog,{portalContainer:undefined,...props}), dialog.props.portalContainer)
					me.dispatch(weACTION.UI({dialog}))
				}else{
					me.dispatch(weACTION.UI({dialog:React.cloneElement(dialog,props)}))
				}
			},
			get(type){
				return dialogs[type]
			}
		}
		this.state={inited:false}
	}

	get dispatch(){
		return this.store.current.store.dispatch
	}
	
	getChildContext(){
		const {debug, officeUITheme}=this.props
		return {
			debug,
			events:this.events,
			panelManager:this.panelManager,
			dialogManager:this.dialogManager,
			officeUITheme,
			dispatch: action=>this.dispatch(action),
			setting:(type,props)=>{
				if(this.dialogManager.get(type)){
					this.dialogManager.show(type,props)
				}else{
					const panel=officeUITheme.$settingPanels[type]
					if(panel){
						this.panelManager.toggle(panel, panel.props.side||"right")
					}else{
						console.warn(`no setting for ${type}`)
					}
				}
			}
		}
	}

	render(){
		const {doc, reducer,contextMenu,theme, ...props}=this.props
		return (
			<doc.Store ref={this.store}>
				{this.state.inited ? <Channels {...props}/> : null}
				<UIDialog/>
			</doc.Store>
		)
	}

	componentDidMount(){
		const {props:{theme, contextMenu, reducer, doc:{doc}}}=this
		contextMenu && this.dispatch(weACTION.UI({contextMenu}));
		reducer && this.dispatch(ACTION.reducer(reducer))

		const themes=[theme,doc.theme].filter(a=>!!a)
		themes.length && this.dispatch(ACTION.theme(...themes));

		this.setState({inited:true})
	}

	static Desk=pure(({children, toolBar, ruler, channel, statusBar, icon, layout,...props})=>(
		<Fragment>
			{React.cloneElement(children,props)}
		</Fragment>
	))

	static Layout=class Layout extends PureComponent{
		render(){
			const {props:{canvas, left,  right, style}}=this
			return (
				<div style={{flex:"1 100%", display:"flex",  flexDirection:"row", overflow:"auto",...style}}>
					{left && React.cloneElement(left,{name:"left"})}
					{canvas}
					{right && React.cloneElement(right,{name:"right"})}
				</div>
			)
		}
	}

	static PanelContainer=class PanelContainer extends PureComponent{
		static contextTypes={
			panelManager: PropTypes.any
		}

		static childContextTypes={
			uiContext: PropTypes.string
		}

		constructor(...args){
			super(...args)
			this.state={panels:React.Children.toArray(this.props.children)}
		}

		static getDerivedStateFromProps(props, {panels,active}){
			if(panels.length==0){
				return {active:undefined}
			}else if(!panels.find(a=>a.props.title==active)){
				return {active:panels[0].props.title}
			}
			return null
		}

		getChildContext(){
			return {uiContext:"Panel"}
		}

		render(){
			const {
				state:{panels=[],active},
				props:{name,children, style,contentContainerStyle, containerStyle,...props}
			}=this
			if(panels.length==0)
				return null
			const reverse=name=="right" ? -1 : 1
			let container
			return (
				<div ref={a=>container=a} 
					style={{
						overflow:"hidden",maxWidth:"300px", minWidth:"300px", position:"relative",
						display:"flex",flexDirection:`row`,
						...containerStyle
						}}>
					<Tabs {...props} value={active} 
						style={{flex:1,margin:5,display:"flex",flexDirection:"column",width:"100%",order:0,overflowX:"hidden",...style}}
						contentContainerStyle={{height:"100%", overflow:"auto", ...contentContainerStyle}}
						tabTemplateStyle={{height:"100%"}}
						>
						{panels.map((a,i)=>{
							const {title, label=title}=a.props
							return <Tab key={title} label={label} value={title} onActive={()=>this.setState({active:title})}>{a}</Tab>
						})}
					</Tabs>
					<Resizer style={{order:reverse}}
						onResizing={({moved})=>{
							const {width}=container.getBoundingClientRect()
							container.style.maxWidth=container.style.minWidth=`${Math.max(width+moved*reverse,50)}px`
						}}/>
					<IconClose 
						color="darkgray"
						style={{position:"absolute", top:5, [name]:5, width:12, height:12}}
						onClick={e=>{
							this.setState({panels:[]})
						}}/>
				</div>
			)
		}

		componentDidMount(){
			this.context.panelManager.register(this)
		}

		componentWillUnmount(){
			this.context.panelManager.unregister(this)
		}

		toggle(el){
			const {state:{panels=[]}}=this
			const i=panels.findIndex(a=>a.props.title==el.props.title)
			if(i!=-1){
				panels.splice(i,1)
				this.setState({panels:[...panels]})
			}else{
				panels.push(el)
				this.setState({panels:[...panels],active:el.props.title})
			}
		}
	}
}

//extract Channels from Workspace to make channel into redux state
const Channels=connect((state,props)=>({channel:getOffice(state).channel||props.channel}))(
	class BaseChannels extends Component{
		getChannels=memoize(children=>{
			const channels=Children.toArray(children).flat()
				.filter(a=>a.props)
				.reduce((channels, {props:{channel,icon}})=>{
					if(channel && !channels[channel]){
						channels[channel]={channel,icon:icon||<span title={{channel}}/>}
					}
					return channels
				}, {})
			return Object.values(channels)
		})

		getCurrent=memoize((children,channel)=>{
			children=Children.toArray(children).flat()
			const current=children.filter(a=>a.props).find(({props})=>props.channel==channel)
			const uncontrolled=children.filter(({props})=>!props || !props.channel).filter(a=>a!=current)
			return {current, uncontrolled}
		})

		render(){
			let {children, toolBar, statusBar, ruler=true, layout, dispatch,channel}=this.props
			let {current,uncontrolled}=this.getCurrent(children, channel||this.getChannels()[0])

			if(current){
				toolBar=typeof(current.props.toolBar)=="undefined" ? toolBar : current.props.toolBar
				statusBar=typeof(current.props.statusBar)=="undefined"? statusBar : current.props.statusBar
				ruler=typeof(current.props.ruler)=="undefined"? ruler : current.props.ruler
				layout=typeof(current.props.layout)=="undefined"? layout : current.props.layout
			}

			const canvas=(
				<Canvas ruler={ruler}>
					{current}
					{uncontrolled}
				</Canvas>
			)

			const rootStyle={
				flex:1, 
				display:"flex", 
				flexDirection:"column", 
				overflow:"hidden"/**can't remove, otherwise editor  scroll would be destroied */
			}

			return (
				<div style={rootStyle} key={channel} className="workspace">
					{toolBar}

					{layout ? React.cloneElement(layout, {canvas, children:layout.props.children||canvas}) : canvas}

					{statusBar && React.cloneElement(statusBar,{
						channel:{
							items:this.getChannels(children),
							current:channel,
							onChange: channel=>dispatch(ACTION.office({channel}))
						}
					})}
				</div>
			)		
		}
	}
)

const UIDialog=connect(state=>({dialog:getUI(state)?.dialog}))(class UIDialog extends PureComponent{
	static getDerivedStateFromError(error){
		return {error}
	}

	constructor(){
		super(...arguments)
		this.state={}
	}

	render(){
		const {dialog, dispatch}=this.props
		if(!dialog){
			return null
		}

		if(!dialog.type)//portal
			return dialog
		
		return React.cloneElement(dialog,{
			onRequestClose:e=>{
				dispatch(weACTION.UI({dialog:null}))
				dialog.props.onRequestClose?.(e)
			}
		})
	}

	componentDidCatch(error){
		console.error(error)
		dispatch(weACTION.UI({dialog:null}))
	}
})

class Resizer extends PureComponent{
	state={}
	render(){
		const { state:{resizing}, props:{style}}=this
		const resizer=(
			<div key="resizer" 
				onMouseDown={e=>this.start(e)}
				style={{cursor:"ew-resize",...style}}>
				<div style={{background:"darkgray",width:1,height:"100%",marginLeft:1,marginRight:1}}/>
			</div>
		)
		if(!resizing){
			return [resizer]
		}

		return [
			resizer,
			<div key="overlap" 
				onMouseMove={e=>this.resizing(e)}
				onMouseUp={e=>this.end(e)}
				style={{position:"fixed", left:0, top:0, width:"100%", height:"100%",background:"transparent",cursor:"ew-resize"}}/>,
		]
	}

	start(e){
		this.setState({resizing:true, left:e.clientX})
	}

	resizing(e){
		const {props:{onResizing}, state:{left}}=this
		const current=e.clientX
		this.setState({left:current},()=>onResizing({moved:current-left}))
	}

	end(){
		this.setState({resizing:undefined, left:undefined})
	}
}