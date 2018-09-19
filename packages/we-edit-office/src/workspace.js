import React, {PureComponent, Children, Fragment} from "react"
import PropTypes from "prop-types"
import {compose,setDisplayName,getContext,withProps, pure}  from "recompose"
import {Provider} from "react-redux"
import EventEmitter from "events"
import memoize from "memoize-one"

import {WithSelection} from "we-edit"

import Status from "./status"
import Ribbon from "./ribbon"
import Canvas from "./canvas"

/**
 * doc.Store can't be removed to Workspace since cursor
 *
 */
export default class Workspace extends PureComponent{
	static childContextTypes={
		events: PropTypes.object,
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
	}

	static defaultProps={
		toolBar: (<Ribbon/>),
		statusBar:(<Status/>)
	}
	
	static contextTypes={
		store: PropTypes.object
	}


	constructor(){
		super(...arguments)
		this.state={
			channel:this.props.channel||this.getChannels()[0],
			scale: 100,
		}
		this.events=new EventEmitter()
	}

	getChildContext(){
		const {debug}=this.props
		return {
			events:this.events,
			debug
		}
	}

	getChannels=memoize(children=>{
		return Children.toArray(children)
			.map(({props:{channel,icon}})=>channel ? {channel,icon:icon||<span title={{channel}}/>} : null)
			.filter(a=>!!a)
	})
	
	getCurrent=memoize((children,channel)=>{
		children=Children.toArray(children)
		const current=children.find(({props})=>props.channel==channel)
		const uncontrolled=children.filter(({props})=>!props.channel).filter(a=>a!=current)
		return {current, uncontrolled}
	})

	render(){
		const {channel, scale, error}=this.state
		if(error){
			return (
				<div style={{flex:1, display:"flex", flexDirection:"column"}}>
					<pre style={{margin:"auto",color:"red",fontSize:"bigger"}}>
						{error.stack}
					</pre>
				</div>
			)
		}
		
		let {doc, children, toolBar, statusBar, ruler=true, layout, reducer}=this.props
		const channels=this.getChannels(children)
		let {current,uncontrolled}=this.getCurrent(children, channel)

		if(current){
			toolBar=typeof(current.props.toolBar)=="undefined" ? toolBar : current.props.toolBar
			statusBar=typeof(current.props.statusBar)=="undefined"? statusBar : current.props.statusBar
			ruler=typeof(current.props.ruler)=="undefined"? ruler : current.props.ruler
			layout=typeof(current.props.layout)=="undefined"? layout : current.props.layout
			current=React.cloneElement(current,{scale:scale/100})
		}
		
		
		const canvas=(
			<Canvas scale={scale} ruler={ruler}>
				{current}
				{uncontrolled}
			</Canvas>
		)

		return (
			<WithSelection key={channel}>
				<div style={{flex:1, display:"flex", flexDirection:"column"}}>
					{toolBar}
					
					<doc.Store reducer={reducer}>
						{layout ? React.cloneElement(layout, {canvas, children:layout.props.children||canvas}) : canvas}			
					</doc.Store>
					
					{statusBar && React.cloneElement(statusBar,{
						channel:{
							items:this.getChannels(this.props.children),
							current:channel,
							onChange: channel=>this.setState({channel})
						},
						scale:{
							current:scale,
							onChange: scale=>this.setState({scale})
						}
					})}
				</div>
			</WithSelection>
		)
	}

	componentDidCatch(error){
		this.setState({error})
	}

	static Desk=pure(({children, toolBar, ruler, channel, statusBar, icon, layout,...props})=>(
		<Fragment>
			{React.cloneElement(children,props)}
		</Fragment>
	))
	
	static Layout=pure(({canvas, left,  right})=>(
		<div style={{flex:"1 100%", display:"flex",  flexDirection:"row"}}>
			{left && <div>{left}</div>}
			{canvas}
			{right && <div>{right}</div>}
		</div>
	))
}
