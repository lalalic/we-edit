export default class Style{
	constructor(node, styles, selector){
		this.styles=styles
		node.children.forEach(a=>{
			switch(a.name.split(":").pop()){
			case "name":
				return this.name=a.attribs["w:value"]
			case "rStyle":
			case "pStyle":
			case "basedOn":
				return this.basedOn=a.attribs["w:value"]
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
					style[key]=selector.props(a)
				return style
			},style)
		}
	}

	get(path){
		if(this.cache && this.cache.has(path))
			return this.cache.get(path)

		let value=_.get(this.style,path)

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

	get parent(){
		let t
		if(this.basedOn && (t=this.styles[this.basedOn]))
			return t
	}
}
