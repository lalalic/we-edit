import React, {Component, PropTypes} from "react"
import {Provider} from "react-redux"
import Immutable, {Map,List} from "immutable"

import DOMAIN from "model"
import {createState} from "state"
import {getContent,getSelection,getFile,getComposer} from "state/selector"
import * as reducer from "state/reducer"

const supported=[]

export default {
	load(url){
		let Found=supported.find(TYPE=>TYPE.support(url))
		if(Found){
			const inst=new Found()
			return inst.load(url).then(doc=>this.build(doc,inst))
		}else{
			throw new Error(`we cannot edit this type of file`)
		}
	},
	create(type){
		let Found=supported.find(TYPE=>TYPE.support(type))
		if(Found){
			const inst=new Found()
			return inst.create(type).then(doc=>this.build(doc,inst))
		}else{
			throw new Error(`we cannot create this type of file`)
		}
	},

	support(...inputs){
		inputs.forEach(a=>supported.findIndex(a)==-1 && supported.push(a))
		return this
	},

	build(doc,self){
		let store
		return {
			render(domain){
				return self.render(doc, domain, (type, props, children)=>{
					return React.createElement(type,{...props,key:uuid()},children)
				})
			},
			Store(props){
				const createElementFactory=content=>(type, props, children, raw)=>{
					let id
					if(type.displayName=="document"){
						id="root"
						props.styles=new Map(props.styles)
					}else{
						id=self.identify(raw)
					}

					content.set(id, Immutable.fromJS({
						type:type.displayName,
						props,
						children: !Array.isArray(children) ? children : children.map(a=>a.id)
					}))

					return {id,type,props,children}
				}


				 function onChange(state,action){
					if(action.type=="@@INIT")
						return state

					if(self.onChangeEx){
						state=self.onChangeEx(state,action)
					}else{
						let docx=getFile(state)
						let selection=getSelection(state)
						let changed
						let changedContent=new Map()
							.withMutations(a=>changed=self.onChange(docx,selection,action,createElementFactory(a),state))

						if(changed===false){
							return state
						}else{
							if(changedContent.size!=0)
								state=state.mergeIn(["content"],changedContent)

							if(typeof(changed)=="object"){
								Object.keys(changed).forEach(k=>{
									switch(k){
									case "selection":
										state=state.mergeIn(["selection"], changed.selection)
									break
									case "styles":
										state=state.setIn("content.root.props.styles".split("."),new Map(changed.styles))
									break
									case "removed":{
										let content=state.get("content")
										content=content.withMutations(content=>
											changed.removed.forEach(([id,parent])=>{
												content.delete(id)
												content.updateIn([parent,"children"],list=>list.delete(list.indexOf(id)))
											})
										)
										state=state.set("content",content)
									}
									case "updated":{//only children
										let content=state.get("content")
										Object.keys(changed.updated).forEach(id=>{
											content=content.set(id,getContent(state,id).set("children",Immutable.fromJS(changed.updated[id])))
										})
						
										state=state.set("content",content)
									}
									break
									}
								})
							}
						}
					}
					state=state.mergeIn(["selection"],reducer.selection(getSelection(state),action))
					return state
				}

				let content=new Map()
					.withMutations(a=>self.render(doc, DOMAIN, createElementFactory(a)))

				store=createState(doc,content,onChange)

				return (
					<Provider store={store}>
						<TransformerProvider transformer={self.transform}>
							{props.children}
						</TransformerProvider>
					</Provider>
				)
			},
			save(name,option){
				return self.save(doc, name, option)
			},
			getState(){
				return store.getState()
			},
			get dispatch(){
				return store.dispatch
			}
		}
	}
}

import Input from "state/cursor/input"
class TransformerProvider extends Component{
	static propTypes={
		transformer: PropTypes.func.isRequired
	}

	static childContextTypes={
		transformer: PropTypes.func,
		getCursorInput: PropTypes.func
	}

	getChildContext(){
		const self=this
		return {
			transformer:this.props.transformer,
			getCursorInput(){
				return self.refs.input
			}
		}
	}

	render(){
		return (
			<div>
				<Input ref="input"/>
				{this.props.children}
			</div>
		)
	}
}
