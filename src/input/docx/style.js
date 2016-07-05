export default class{
	constructor(wordModel, doc){
		let metadata=null,basedOn, parentStyle
		if(typeof(wordModel)!='string'){
			let type=wordModel.type.split(".").pop()
			let id=wordModel.id
			basedOn=(wordModel.getParentStyle()||{}).id
			let isDefault=wordModel.isDefault()
			parentStyle=id ? doc.cloneStyle(basedOn) : {}
			metadata={type,id,basedOn, isDefault}
		}else{
			basedOn=wordModel
			parentStyle=doc.cloneStyle(basedOn)
			metadata={basedOn}
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
