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
						})
					},
					Store(props){
						let content=new Map().withMutations(function(content){
							self._render(doc, models, (type, props, children, raw)=>{
								const id=type.displayName=="document" ? "root" : self._identify(raw)
								content.set(id, new Map({type:type.displayName,props,children}))
								return id
							})
						})

						return (
							<Provider store={createState(doc,content, self.onChange.bind(this))}>
								<div>
									{props.children}
								</div>
							</Provider>
						)
					}
				}
			})
	}

	_loadFile(url){

	}

	_render(doc, domain, createElement/*(TYPE, props, children, rawcontent)*/){

	}

	_identify(raw){
		return uuid()+""
	}

	onChange(state, action){
		return state
	}
}
