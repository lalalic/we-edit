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


class Linkable extends Getable{
	constructor(){
		super(...arguments)
		this.next=[]
	}

	_getFromBasedOn(path){
		let value=super._getFromBasedOn(...arguments)
		if(value==undefined){
			value=this.next.reduce((r,a)=>(r==undefined ? a.get(...arguments) : r),undefined)
		}

		return value
	}

	_invokeOnBasedOn(path){
		let value=super._invokeFromBasedOn(...arguments)
		if(value==undefined){
			value=this.next.reduce((r,a)=>(r==undefined ? a.invoke(...arguments) : r),undefined)
		}

		return value
	}

	inherit(...next){
		if(next.length==0)
			return this
		let cloned=Object.create(this)
		cloned.next=next
		var i=cloned.next.findIndex(a=>a.id=="*")
		if(i!=-1){
			cloned.next.push(cloned.next.splice(i,1)[0])
		}
		return cloned
	}
}

export default class Style extends Linkable{
	constructor(node={attribs:{},children:[]}, styles, selector){
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

	_convert(node={attribs:{},children:[]}, target, map, selector){
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
	
	clone(){
		const {styles, name, basedOn, id, next, p,  r}=this
		const cloned=new this.constructor(undefined,styles)
		return Object.assign(cloned,{basedOn, p, r, next})
	}
}
