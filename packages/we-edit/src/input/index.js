import buildEditableDoc from "./build-editable-doc"

import {Viewable, Editable} from "./type"
import EditableDocument from "./editable-doc"

const supported=[]

export default {
	Viewable,
	Editable,
	EditableDocument,
	load(url){
		let Found=supported.find(TYPE=>TYPE.support(url))
		if(Found){
			const inst=new Found()
			return Promise.resolve(inst.load(url)).then(doc=>buildEditableDoc(doc,inst))
		}else{
			throw new Error(`we cannot edit ${url}`)
		}
	},
	create(type){
		let Found=supported.find(TYPE=>TYPE.support(type))
		if(Found){
			const inst=new Found()
			return Promise.resolve(inst.create(type)).then(doc=>buildEditableDoc(doc,inst))
		}else{
			throw new Error(`we cannot create ${type} content`)
		}
	},

	support(...inputs){
		inputs.forEach(a=>{
			if(!supported.includes(a)){
				supported.push(a)
			}
		})
		return this
	}
}
