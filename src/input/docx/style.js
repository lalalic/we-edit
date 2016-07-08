export default class{
	constructor(wordModel, doc){
		let metadata=null, parentStyle
		let type=wordModel.type
		if(type.substr(0,6)=='style.'){
			type=type.split(".").pop()
			let id=wordModel.id
			let basedOn=(wordModel.getParentStyle()||{}).id
			let isDefault=wordModel.isDefault()
			parentStyle=id ? doc.cloneStyle(basedOn) : {}
			metadata={type,id,basedOn, isDefault}
		}else if(wordModel.getStyleId){
			let basedOn=wordModel.getStyleId()
			parentStyle=doc.cloneStyle(basedOn)
			metadata={type,basedOn}
		}else{
			metadata={type}
			parentStyle={}
		}

		parentStyle.metadata=metadata
		this.style=parentStyle
	}

	visit(value,name,category){
		if(!name)
			return
		let categorized=this.style
		if(category){
			categorized=this.style[category]
			if(!categorized){
				this.style[category]=categorized={}
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
