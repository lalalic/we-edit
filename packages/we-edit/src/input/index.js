import buildDoc from "./build-doc"

import {Viewable, Editable} from "./type"
import EditableDocument from "./editable-doc"
import extendible from "../tools/extendible"

export default extendible({
	Viewable,
	Editable,
	EditableDocument,
	load(file){
		console.log(file)
		const type=this.resolveFileType(file)
		let Found=this.get(type)
		if(Found){
			const inst=new Found()
			return Promise.resolve(inst.load(file)).then(doc=>buildDoc(doc,inst))
		}else{
			throw new Error(`we cannot edit ${file}`)
		}
	},

	create(type){
		let Found=this.get(type)
		if(Found){
			const inst=new Found()
			return Promise.resolve(inst.create(type)).then(doc=>buildDoc(doc,inst))
		}else{
			throw new Error(`we cannot create ${type} content`)
		}
	},
	
	resolveFileType({data, type, mimeType, ext, name}){
		if(type){
			return type
		}
		
		if(name && !ext){
			ext=name.split(".").pop().trim()
		}
		
		const supports=this.supports()
		return Object.keys(supports)
			.reduce((foundType, a)=>{
				if(foundType)
					return foundType
				
				Type=this.get(a)
				if(Type){
					if(ext){
						if(Type.getTypeExt()==ext)
							return Type.getType()
					}
					
					if(mimeType){
						if(Type.getTypeMimeType()==mimeType)
							return Type.getType()
					}
					
					if(Type.support &&  Type.support(arguments[0]))
						return Type.getType()
				}
			}, null)
	}
},"input format")
