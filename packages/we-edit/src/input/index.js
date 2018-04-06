import buildDoc from "./build-doc"

import {Viewable, Editable} from "./type"
import EditableDocument from "./editable-doc"

const supported=[]

export default {
	Viewable,
	Editable,
	EditableDocument,
	load(file){
		let Found=supported.find(TYPE=>TYPE.support(file))
		if(Found){
			const inst=new Found()
			return Promise.resolve(inst.load(file)).then(doc=>buildDoc(doc,inst))
		}else{
			throw new Error(`we cannot edit ${file}`)
		}
	},

	create(type){
		let Found=supported.find(TYPE=>TYPE.getType()==type)
		if(Found){
			const inst=new Found()
			return Promise.resolve(inst.create(type)).then(doc=>buildDoc(doc,inst))
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
	},

	get supports(){
		return [...supported]
	}
}
