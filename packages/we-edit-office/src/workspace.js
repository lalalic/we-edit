import React, {PureComponent, Component, Children, Fragment} from "react"
import {connect} from "we-edit"
import PropTypes from "prop-types"
import {pure}  from "recompose"
import EventEmitter from "events"
import memoize from "memoize-one"
import {Tabs,Tab} from "material-ui/Tabs"

import Status from "./status"
import Ribbon from "./ribbon"
import Canvas from "./canvas"
import ACTION,{getOffice} from "./state/action"

/**
 * doc.Store can't be removed to Workspace since cursor
 */
export default class Workspace extends PureComponent{
	static childContextTypes={
		events: PropTypes.object,
		panelManager: PropTypes.shape({
			register: PropTypes.func,
			toggle: PropTypes.func,
		}),
		debug: PropTypes.bool,
	}

	static propTypes={
		toolBar:PropTypes.node,
		statusBar: PropTypes.node,
		debug: PropTypes.bool,
		doc: PropTypes.object,
		ruler: PropTypes.bool,
		channel: PropTypes.string,
		layout: PropTypes.node,
		tests: PropTypes.node,
	}

	static defaultProps={
		toolBar: (<Ribbon/>),
		statusBar:(<Status/>)
	}

	constructor(){
		super(...arguments)
		this.state={}
		this.events=new EventEmitter()
		const panelContainers=[]
		this.panelManager={
			register(a){
				if(!panelContainers.includes(a)){
					panelContainers.push(a)
				}
			},
			toggle(el, container){
				this.get(container).toggle(el)
			},
			get(name){
				return panelContainers.find(a=>a.props.name==name)||panelContainers[0]
			}
		}
	}
	
	getChildContext(){
		const {debug}=this.props
		return {
			events:this.events,
			panelManager:this.panelManager,
			debug
		}
	}

	render(){
		const {error}=this.state
		if(error){
			return (
				<div style={{flex:1, display:"flex", flexDirection:"column"}}>
					<pre style={{margin:"auto",color:"red",fontSize:"bigger"}}>
						{error.stack}
					</pre>
				</div>
			)
		}
		const {doc,reducer, ...props}=this.props
		return (
			<doc.Store reducer={reducer}>
				<Channels {...props}/>
			</doc.Store>
		)
	}

	componentDidCatch(error){
		this.setState({error})
	}

	static Desk=connect((state)=>{
		const scale=getOffice(state).scale
		if(scale!=undefined)
			return {scale:scale/100}
		return {}
	})(pure(({children, toolBar, ruler, channel, statusBar, icon, layout,...props})=>(
		<Fragment>
			{React.cloneElement(children,props)}
		</Fragment>
	)))

	static Layout=pure(({canvas, left,  right, style})=>(
		<div style={{flex:"1 100%", display:"flex",  flexDirection:"row", overflow:"auto",...style}}>
			{left && <div style={{overflow:"auto",...left.props.containerStyle}}>{left}</div>}
			{canvas}
			{right && <div style={{overflow:"auto",...right.props.containerStyle}}>{right}</div>}
		</div>
	))

	static PanelContainer=class PanelContainer extends Component{
		static contextTypes={
			panelManager: PropTypes.any
		}

		constructor(...args){
			super(...args)
			this.state={panels:[]}
		}

		render(){
			const {state:{panels=[]},props:{containerStyle, ...props}}=this
			if(panels.length==0)
				return null
			return (
				<Tabs {...props}>
					{panels.map(a=><Tab key={a.props.title} label={a.props.title}>{a}</Tab>)}
				</Tabs>
			)
		}

		componentDidMount(){
			this.context.panelManager.register(this)
		}

		toggle(el){
			const {panels=[]}=this.state
			const i=panels.findIndex(a=>a.props.title==el.props.title)
			if(i!=-1){
				panels.splice(i,1)
			}else{
				panels.push(el)
			}
			this.setState({panels:[...panels]})
		}
	}
}

//extract Channels from Workspace to make channel into redux state
const Channels=connect((state,props)=>({channel:getOffice(state).channel||props.channel}))(
	class BaseChannels extends Component{
		getChannels=memoize(children=>
			Children.toArray(children).filter(a=>a.props)
				.map(({props:{channel,icon}})=>channel ? {channel,icon:icon||<span title={{channel}}/>} : null)
				.filter(a=>!!a)
		)

		getCurrent=memoize((children,channel)=>{
			children=Children.toArray(children)
			const current=children.filter(a=>a.props).find(({props})=>props.channel==channel)
			const uncontrolled=children.filter(({props})=>!props || !props.channel).filter(a=>a!=current)
			return {current, uncontrolled}
		})	

		render(){
			let {channel, children, toolBar, statusBar, ruler=true, layout, dispatch}=this.props
			let {current,uncontrolled}=this.getCurrent(children, channel)

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
				<div style={rootStyle} key={channel}>
					{toolBar}

					{layout ? React.cloneElement(layout, {canvas, children:layout.props.children||canvas}) : canvas}

					{statusBar && React.cloneElement(statusBar,{
						channel:{
							items:this.getChannels(children),
							current:channel,
							onChange: channel=>dispatch(ACTION.channel(channel))
						}
					})}
				</div>
			)		
		}
	}
)