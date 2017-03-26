import React, {Component, PropTypes} from "react"
import {Provider} from "react-redux"
import Immutable, {Map} from "immutable"

import models from "model"
import {createState} from "state"

import {uuid} from "tools/uuid"

export default class{
	static support(){
		return false
	}

	load(url){
		let self=this
		return this._loadFile(url)
			.then(doc=>{
				return {
					render(domain){
						return self._render(doc, domain, (type, props, children, raw)=>{
							return React.createElement(type,{...props,key:self._identify(raw)},children)
						}, React.cloneElement)
					},
					Store(props){
						let content=new Map().withMutations(function(content){
							self._render(doc, models, (type, props, children, raw)=>{
								const id=type.displayName=="document" ? "root" : self._identify(raw)

								content.set(id, new Map({
									type:type.displayName,
									props,
									children: !Array.isArray(children) ? children : children.map(a=>a.id)
								}))

								return {id,type,props,children}
							}, ({id},props,children)=>{
								let item=content.get(id)
								content.set(id,item.withMutations(map=>{
									if(props)
										map.props={...map.props,...props}
									if(children)
										map.children=!Array.isArray(children) ? children : children.map(a=>a.id)
								}))
							})
						})

						return (
							<Provider store={createState(doc,content, self.onChange.bind(self))}
								transformer={self._transform}>
								<div>
									{props.children}
								</div>
							</Provider>
						)
					},
					save(option, name=url){
						return self.save(doc, option, name)
					}
				}
			})
	}

	save(doc, option, name){
		return doc.save(name)
	}

	_loadFile(url){
		return Promise.reject(new Error("need implementation to load and parse content at "+url))
	}

	/**
	* render a doc, loaded by this._loadFile, with models in domain to a element tree,
	* whose element is created with createElement
	*/
	_render(doc, domain, createElement/*(TYPE, props, children, rawcontent)*/, cloneElement/*(element,props,children)*/){
		return <div>{"Input._render should be implemented"}</div>
	}

	//to identify raw content node with an id, so editor can specify what is changed
	_identify(rawNode){
		return uuid()+""
	}

	onChange(state, action){
		if(action.type=="@@INIT")
			return state

		const doc=state.get("doc")
		const selection=state.get("selection")
		const content=state.get("content")
		if(selection && content)
			this._onChange(doc, action, selection,
					content.get(selection.start.id),state)

		return state
	}

	_onChange(doc,action,selection){
		//change your content
	}

	//a higher-order component of models
	_transform(Component){
		return Component
	}
}
