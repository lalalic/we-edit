import React, {PureComponent, Children, Fragment} from "react"
import PropTypes from "prop-types"
import {compose,setDisplayName}  from "recompose"
import EventEmitter from "events"

import {WithSelection, when} from "we-edit"

import Status from "./status"
import Ruler from "./ruler"
import Ribbon from "./ribbon"

export const VerticalRuler=compose(
	setDisplayName("VerticalRuler"),
	when("cursorPlaced",({pageY})=>({pageY})),
)(({pageY=0, scale, ...props})=>{
	return (
		<div style={{position:"relative",width:0,top:pageY*scale}}>
			<Ruler direction="vertical" {...props} scale={scale}/>
		</div>
	)
})

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
	}


	constructor(){
		super(...arguments)
		this.state={
			layout:this.props.layout,
			scale: 100,
		}
	}

	getChildContext(){
		const {debug,events=new EventEmitter()}=this.props
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
		let {doc, children, toolBar, statusBar, ruler=true}=this.props
		children=Children.toArray(children)
		const {layout, scale}=this.state

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
						{toolbar && (
							<div style={{height:24+30}}>
								{toolBar}
							</div>
						)}

						<div style={{flex:"1 100%", overflow:"auto", display:"flex", flexDirection:"column"}}>
							<div style={{flex:1, display:"flex", flexDirection:"row"}}>

								{ruler && (
									<Fragment>
										<VerticalRuler scale={scale/100} />
										<div ref="rulerContainer" style={{position:"absolute",paddingTop:4}}>
											<Ruler direction="horizontal" scale={scale/100}/>
										</div>
									</Fragment>
								)}

								<div ref="contentContainer" style={{flex:"1 100%", textAlign:"center", margin:"4px auto auto auto"}}>
									<div style={{margin:"auto",display:"inline-block"}}>
										{current}
										{uncontrolled}
									</div>
								</div>
							</div>

						</div>

						{statusBar && (
							<div style={{height:30}}>
								{React.cloneElement(statusBar,{
									layout:{
										items:this.layouts,
										current:layout,
										onChange: layout=>this.setState({layout})
									},
									scale:{
										current:scale,
										onChange: scale=>this.setState({scale})
									},
								})}
							</div>
						)}

					</div>
				</WithSelection>
			</doc.Store>
		)
	}

	setupHorizontalRuler(){
		const {rulerContainer, contentContainer}=this.refs
		if(rulerContainer && contentContainer){
			rulerContainer.style.width=contentContainer.getBoundingClientRect().width+"px"
		}
	}

	componentDidMount(){
		this.setupHorizontalRuler()
	}

	componentDidUpdate(){
		this.setupHorizontalRuler()
	}
}
