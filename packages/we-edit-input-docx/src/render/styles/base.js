import get from "lodash.get"
import invoke from "lodash.invoke"

/**
 * Word Style is 
 * ** inheritable by basedOn
 * ** mixins paragraph's style indicated by mixins
 * 
 */
export class Getable{
	constructor(node, styles, selector){
		this.styles=styles
		this.docx=selector?.docx||styles?.['*']?.docx
	}

	/**@Todo: make real hash for edior to calculate element changes */
	hashCode(){
		return 1
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


class Mixinable extends Getable{
	constructor(){
		super(...arguments)
		this.mixins=[]
	}

	_getFromBasedOn(path){
		let value=super._getFromBasedOn(...arguments)
		if(value==undefined){
			value=this.mixins.reduce((r,a)=>{
				if(r==undefined){
					try{
						return a.get(...arguments)
					}catch(e){
						return this.styles['*'].get(...arguments)
					}
				} 
				return r
			},undefined)
		}

		return value
	}

	_invokeOnBasedOn(path){
		const _invokeFromBasedOn=super._invokeOnBasedOn
		let value=_invokeFromBasedOn.call(this,...arguments)
		if(value==undefined){
			value=this.mixins.reduce((r,a)=>(r==undefined ? a.invoke(...arguments) : r),undefined)
		}

		return value
	}

	mixin(...mixins){
		if(mixins.length==0)
			return this
		const cloned=Object.create(this)
		cloned.mixins=mixins.filter(a=>!!a)
		const i=cloned.mixins.findIndex(a=>a.id=="*")
		if(i!=-1){
			cloned.mixins.push(cloned.mixins.splice(i,1)[0])
		}
		return cloned
	}
}

export default class Style extends Mixinable{
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
			case "link":
				return this._link=a.attribs["w:val"]
			}
		})
		if(!this.basedOn)
			;//this.basedOn="*"
		else
			this.cache=new Map()
	}

	get isStyle(){
		return true
	}

	_convert(node={attribs:{},children:[]}, target, map, selector){
		let pr=target ? node.children.find(a=>a.name==target) : node
		if(pr){
			return pr.children.reduce((style,a)=>{
				const key=map[a.name]
				if(key){
					const value=selector.selectValue(a)
					if(value!==undefined)
						style[key]=value
				}
				return style
			},{})
		}
	}
	
	clone(){
		const {styles, name, basedOn, id, mixins, p,  r}=this
		const cloned=new this.constructor(undefined,styles)
		return Object.assign(cloned,{basedOn, p, r, mixins})
	}

	getLink(){
		return this.styles[this._link]
	}
}
