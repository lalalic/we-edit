import buildDoc from "./build-doc"

import {Viewable, Editable} from "./type"
import extendible from "../tools/extendible"

const Input=extendible({
	Viewable:Object.assign(Viewable,{
		install(conf){
			Input.install(this,conf)
		},

		uninstall(){
			Input.uninstall(this)
		}
	}),
	Editable: Object.assign(Editable,{
		install(conf){
			Input.install(this,conf)
		},

		uninstall(){
			Input.uninstall(this)
		}
	}),
	parse(file){
		const type=this.resolveFileType(file)
		let Found=this.get(type)
		if(Found){
			const inst=new Found()
			return Promise.resolve(inst.parse(file)).then(doc=>buildDoc(doc,inst))
		}else{
			throw new Error(`we cannot edit ${file}`)
		}
	},

	resolveFileType({data, type, mimeType, ext, name}){
		if(type){
			return type
		}

		if(name && !ext){
			ext=name.split(".").pop().trim()
		}

		return Array.from(this.supports.keys()).reverse()
			.reduce((foundType, a)=>{
				if(foundType)
					return foundType

				const Type=this.get(a)
				if(Type){
					if(Type.support &&  Type.support(arguments[0]))
						return Type.getType()
				}
			}, null)
	}
},"input format")

export default Input
