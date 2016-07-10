export default class{
	constructor(wordModel, doc){
		let metadata=null, basedOn=null
		let type=wordModel.type
		this.style=doc.createStyle()
		if(type.substr(0,6)=='style.'){
			type=type.split(".").pop()
			basedOn=(wordModel.getParentStyle()||{}).id
			let id=wordModel.id
			let isDefault=wordModel.isDefault()
			switch(type){
			case 'table':
				let target=wordModel.getTarget()
				if(target!='table'){
					this.style=doc.contentProps.documentStyles[id]
					this.style[target]=doc.createStyle()
					this.target=target
					break
				}
			default:
				this.style.metadata={type,id,basedOn, isDefault}
			}
		}else if(wordModel.getStyleId){
			basedOn=wordModel.getStyleId()
			if(!basedOn)
				basedOn=doc.getTypeDefaultStyleId(type)
			this.style.metadata={basedOn}
		}else{
			this.style.metadata={}
		}
	}

	visit(value,name,category){
		if(!name)
			return
		let style=this.target ? this.style[this.target] :this.style
		let categorized=style
		if(category){
			categorized=style[category]
			if(!categorized){
				style[category]=categorized={}
			}
		}
		let oldValue=categorized[name]

		switch(typeof(oldValue)){
		case 'object':
			if(typeof(value)=='object'){
				categorized[name]=Object.assign(value,oldValue)
			}else{
				console.warn("you'd better check it.")
			}
		break
		default:
			categorized[name]=value
		}
	}
}
