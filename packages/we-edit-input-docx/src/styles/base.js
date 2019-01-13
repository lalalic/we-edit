import get from "lodash.get"
import invoke from "lodash.invoke"


export class Getable{
	constructor(node, styles, selector){
		this.styles=styles
	}
	
	get(path){
		if(this.cache && this.cache.has(path))
			return this.cache.get(path)

		let value=get(this,path)

		if(value==undefined)
			value=this._getFromBasedOn(...arguments)

		this.cache && this.cache.set(path,value)

		return value
	}

	_getFromBasedOn(path){
		const parent=this.parent
		return parent ? parent.get(...arguments) : undefined
	}

	invoke(path){
		let value=invoke(this,...arguments)
		if(value==undefined)
			value=this._invokeOnBasedOn(...arguments)
		return value
	}

	_invokeOnBasedOn(path){
		const parent=this.parent
		return parent ? parent.invoke(...arguments) : undefined
	}

	get parent(){
		return this.styles[this.basedOn]||this.basedOn||undefined
	}
		
	toJSON(){
		return undefined
	}
}

export default class Style extends Getable{
	constructor(node, styles, selector){
		super(...arguments)
		this.id=node.attribs["w:styleId"]
		node.children.filter(a=>a.type!="text").forEach(a=>{
			switch(a.name.split(":").pop()){
			case "name":
				return this.name=a.attribs["w:val"]
			case "rStyle":
			case "pStyle":
			case "tblStyle":
			case "basedOn":
				return this.basedOn=a.attribs["w:val"]
			}
		})
		if(!this.basedOn)
			;//this.basedOn="*"
		else
			this.cache=new Map()
	}
	
	inherit(next){
		const cloned=Object.create(this)
		if(next){
			let current=cloned,parent
			while(current.parent){
				parent=current
				current=current.parent
			}
			
			if(current.id=="*"){
				next=Object.create(next)
				next.basedOn='*'
				parent.basedOn=next.id||next
			}else{
				current.basedOn=next.id||next	
			}
		}
		
		return cloned
	}

	_convert(node, target, map, selector){
		let pr=target ? node.children.find(a=>a.name==target) : node
		if(pr){
			return pr.children.reduce((style,a)=>{
				let key=map[a.name]
				if(key)
					style[key]=selector.selectValue(a)
				return style
			},{})
		}
	}
}

