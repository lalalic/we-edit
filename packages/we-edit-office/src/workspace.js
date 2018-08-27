import React, {PureComponent, Children, Fragment} from "react"
import PropTypes from "prop-types"
import {compose,setDisplayName,getContext,withProps}  from "recompose"
import EventEmitter from "events"

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
	}

	static defaultProps={
		toolBar: (<Ribbon/>),
		statusBar:(<Status/>),
		events:new EventEmitter(),
	}


	constructor(){
		super(...arguments)
		this.state={
			layout:this.props.layout,
			scale: 100,
		}
	}

	getChildContext(){
		const {debug,events}=this.props
		return {
			events,
			debug
		}
	}

	get layouts(){
		return Children.toArray(this.props.children)
			.map(({props:{layout,icon}})=>layout ? {layout,icon} : null)
			.filter(a=>!!a)
	}

	render(){
		const {layout, scale, error}=this.state
		if(error){
			return (
				<div style={{flex:1, display:"flex", flexDirection:"column"}}>	
					<pre style={{margin:"auto",color:"red",fontSize:"bigger"}}>
						{error.stack}
					</pre>
				</div>
			)
		}
		
		let {doc, children, toolBar, statusBar, ruler=true}=this.props
		children=Children.toArray(children)
		

		let current=children.find(({props})=>props.layout==layout)
		const uncontrolled=children.filter(({props})=>!props.layout)

		if(current){
			toolBar=typeof(current.props.toolBar)=="undefined" ? toolBar : current.props.toolBar
			statusBar=typeof(current.props.statusBar)=="undefined"? statusBar : current.props.statusBar
			ruler=typeof(current.props.ruler)=="undefined"? ruler : current.props.ruler
			current=React.cloneElement(current,{scale:scale/100})
		}

		return (
			<doc.Store>
				<WithSelection>
					<div style={{flex:1, display:"flex", flexDirection:"column"}}>
						{toolBar}

						<Canvas scale={scale} ruler={!!ruler}>
							{current}
							{uncontrolled}
						</Canvas>

						{statusBar && React.cloneElement(statusBar,{
							layout:{
								items:this.layouts,
								current:layout,
								onChange: layout=>this.setState({layout})
							},
							scale:{
								current:scale,
								onChange: scale=>this.setState({scale})
							}
						})}
					</div>
				</WithSelection>
			</doc.Store>
		)
	}
	
	componentDidCatch(error){
		this.setState({error})
	}
	
	static Desk=({children, toolBar, ruler, layout, statusBar, icon})=><Fragment>{children}</Fragment>
}
