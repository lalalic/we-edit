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
		let t
		if(this.basedOn && (t=this.styles[this.basedOn]))
			return t.get(...arguments)
		return undefined
	}

	invoke(path){
		let value=invoke(this,...arguments)
		if(value==undefined)
			value=this._invokeOnBasedOn(...arguments)
		return value
	}

	_invokeOnBasedOn(path){
		let t
		if(this.basedOn && (t=this.styles[this.basedOn]))
			return t.invoke(...arguments)
		return undefined
	}

	get parent(){
		let t
		if(this.basedOn && (t=this.styles[this.basedOn]))
			return t
	}
}

export default class Style extends Getable{
	constructor(node, styles, selector){
		super(...arguments)
		this.id=node.attribs["w:styleId"]
		node.children.forEach(a=>{
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
			this.basedOn="*"
		else
			this.cache=new Map()
	}

	_convert(node, target, map, selector){
		let pr=node.children.find(a=>a.name==target)
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

