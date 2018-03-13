import React, {PureComponent, Component} from "react"
import PropTypes from "prop-types"

import {connect} from "react-redux"
import Waypoint from "react-waypoint"

import Base from "../document"
import {Text} from "model/pagination"
import ComposedDocument from "./composed-document"
import {Query} from "../composed/document"

import {ACTION} from "state"
import {getContent,getSelection} from "state/selector"
import {editable} from "model/edit"
import recomposable from "./recomposable"

import offset from "mouse-event-offset"
import getClientRect from "tools/get-client-rect"

const Super=editable(recomposable(Base))

export default class Document extends Super{
	static contextTypes={
		...Super.contextTypes,
		viewport:PropTypes.any,
		media: PropTypes.string,
		pgGap: PropTypes.number,
		store: PropTypes.any,
		isContentChanged: PropTypes.func
	}

	static childContextTypes={
		...Super.childContextTypes,
		shouldContinueCompose: PropTypes.func,
		shouldRemoveComposed: PropTypes.func,
		query: PropTypes.func,
		mount: PropTypes.func,
		unmount: PropTypes.func,
	}

	state={compose2Page:1}
	composers=new Map([[this.props.id,this]])
	getChildContext(){
		let shouldRemoveComposed=this.shouldRemoveComposed.bind(this)
		let shouldContinueCompose=this.shouldContinueCompose.bind(this)
		let query=this.query.bind(this)
		let mount=a=>this.composers.set(a.props.id,a)
		let unmount=a=>this.composers.delete(a.props.id)
		return {
			...super.getChildContext(),
			shouldContinueCompose,
			shouldRemoveComposed,
			query,mount,unmount
		}
	}

	query(){
		return new Query(this,this.context.store.getState())
	}

	get canvas(){
		return this.refs.canvas
	}

	render(){
		const {mode}=this.state
		let props={}
		if(mode=="content")
			props.minHeight=this.canvas.getClientRect().height

        return (
			<div>
				<div style={{display:"none"}}>
				{this.props.children}
				</div>
				<ComposedDocument ref="canvas"
					{...props}
					pages={this.computed.composed}
					isAllComposed={()=>this.computed.children.length==this.props.children.length}
					composeMore={e=>this.composeMore()}
					/>
			</div>
		)
    }

	composeMore(){
		console.log("compose more to "+(this.state.compose2Page+1))
		this.setState(p=>({compose2Page:p.compose2Page+1,mode:"performant"}))
	}

	componentWillReceiveProps(){
		this.clearComposed()
		this.setState({mode:"content"})
		this.continueComposing=true
	}

	shouldRemoveComposed(){
		return this.state.mode=="content"
	}

	shouldContinueCompose(){
		const {compose2Page,mode}=this.state
		if(compose2Page==1)
			return true
		
		if(mode=="content" && this.continueComposing==false)
			return false

		const $=this.query()
		let contentY=$.y
		if(contentY>$.svg.height){
			switch(mode){
			case "content":
				return this.continueComposing=contentY<$.svg.height-$.svg.top
			case "performant":
			default:
				return this.computed.composed.length<compose2Page+1
			}
		}else
			return true
	}

}
