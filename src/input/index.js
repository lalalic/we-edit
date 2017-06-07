import React, {Component, PropTypes} from "react"
import {Provider} from "react-redux"
import Immutable, {Map,Collection} from "immutable"

import DOMAIN from "model"
import {createState} from "state"
import {getContent,getSelection,getFile} from "state/selector"
import * as reducer from "state/reducer"

import {History} from "state/undoable"

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
		let store,history
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


				 function onChange(state,action,historyEntry){
					if(action.type=="@@INIT")
						return state


					let changed
					let changedContent=new Map()
						.withMutations(a=>changed=self.onChange(state,action,createElementFactory(a)))

					if(changed===false){
						return state
					}else if(typeof(changed)=="object"){
						let {selection,styles,updated,undoables}=changed
						if(selection)
							state=state.mergeIn(["selection"], selection)

						if(styles)
							state=state.setIn("content.root.props.styles".split("."),new Map(styles))
						
						if(undoables){
							const collect=(collected,k)=>{
								let children=state.getIn(`content.${k}.children`.split("."))
								if(children instanceof Collection){
									children.reduce(collect,collected)
								}
								collected.push(k)
								return collected
							}
							
							let removed=Object.keys(undoables)
								.filter(k=>!changedContent.has(k))
								.reduce(collect,[])
								.filter(k=>!changedContent.has(k))
								
							if(removed.length>0){
								state=state.updateIn(["content"],c=>removed.reduce((c,k)=>c.remove(k),c))
							}
							historyEntry.changed=undoables
						}
						
						if(updated){
							state=Object.keys(updated)
								.filter(k=>!!updated[k].children)
								.reduce((merged,k)=>{
									if(!undoables){
										undoables=historyEntry.changed={}
									}
									return state.updateIn(["content",k,"children"],c=>{
										undoables[k]={children:c.toJS()}
										return Immutable.fromJS(updated[k].children)
									})
								},state)

							state.get("violent").changing=updated
						}else{
							state.get("violent").changing={}
						}
					}else{
						state=state.mergeIn(["selection"],reducer.selection(getSelection(state),action))
					}

					if(changedContent.size!=0){
						state=state.mergeIn(["content"],changedContent)
					}
					return state
				}

				let content=new Map()
					.withMutations(a=>self.render(doc, DOMAIN, createElementFactory(a)))

				history=new History()
				store=createState(doc,content,history.undoable(onChange))

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
			dispatch(){
				return store.dispatch(...arguments)
			},
			history(){
				return {
					canRedo(){
						return history.past.length>0
					},
					canRedo(){
						return history.future.length>0
					}
				}
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
