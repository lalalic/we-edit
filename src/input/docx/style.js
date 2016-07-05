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
		}else if(type=='section'){
			metadata={type}
			parentStyle={}
		}else if(type=='image'){
			metadata={type}
			parentStyle={}
		}else{
			let basedOn=wordModel.getStyleId()
			parentStyle=doc.cloneStyle(basedOn)
			metadata={type,basedOn}
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
		categorized[name]=value
	}
}
