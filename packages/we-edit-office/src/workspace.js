import React, {PureComponent, Children, Fragment} from "react"
import PropTypes from "prop-types"
import {compose,setDisplayName,getContext,withProps}  from "recompose"
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
			layout:this.props.layout||this.getLayouts()[0],
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

	getLayouts=memoize(children=>{
		return Children.toArray(children)
			.map(({props:{layout,icon}})=>layout ? {layout,icon:icon||<span title={{layout}}/>} : null)
			.filter(a=>!!a)
	})
	
	getCurrent=memoize((children,layout)=>{
		children=Children.toArray(children)
		const current=children.find(({props})=>props.layout==layout)
		const uncontrolled=children.filter(({props})=>!props.layout).filter(a=>a!=current)
		return {current, uncontrolled}
	})

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
		
		let {doc, children, toolBar, statusBar, ruler=true, reducer}=this.props
		const layouts=this.getLayouts(children)
		let {current,uncontrolled}=this.getCurrent(children, layout)

		if(current){
			toolBar=typeof(current.props.toolBar)=="undefined" ? toolBar : current.props.toolBar
			statusBar=typeof(current.props.statusBar)=="undefined"? statusBar : current.props.statusBar
			ruler=typeof(current.props.ruler)=="undefined"? ruler : current.props.ruler
			current=React.cloneElement(current,{scale:scale/100})
		}

		return (
			<WithSelection key={layout}>
				<div style={{flex:1, display:"flex", flexDirection:"column"}}>
					{toolBar}

					<Canvas scale={scale} ruler={ruler}>
						<doc.Store reducer={reducer}>
							{current}
							{uncontrolled}
						</doc.Store>
					</Canvas>

					{statusBar && React.cloneElement(statusBar,{
						layout:{
							items:this.getLayouts(this.props.children),
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
		)
	}

	componentDidCatch(error){
		this.setState({error})
	}

	static Desk=({children, toolBar, ruler, layout, statusBar, icon})=><Fragment>{children}</Fragment>
}
