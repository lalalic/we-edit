export default class{
	constructor(wordModel, doc){
		let metadata=null, parentStyle
		let type=wordModel.type
		if(type.substr(0,6)=='style.'){
			type=type.split(".").pop()
			let id=wordModel.id
			let basedOn=(wordModel.getParentStyle()||{}).id
			let isDefault=wordModel.isDefault()
			switch(type){
			case 'document':
				parentStyle={}
			break
			case 'table':
				let target=wordModel.getTarget()
				if(target!='table'){
					parentStyle=doc.contentProps.documentStyles[id]
					basedOn=parentStyle.metadata.basedOn
					if(basedOn){
						let basedOnTableStyle=doc.cloneStyle(basedOn)
						if(basedOnTableStyle[target])
							parentStyle[target]=basedOnTableStyle[target]
						else
							parentStyle[target]={}
					}else{
						parentStyle[target]={}
					}
					this.target=target
					this.style=parentStyle
					return
				}else{

				}
			default:
				parentStyle=basedOn ? doc.cloneStyle(basedOn) : doc.cloneDocumentDefaultStyle()
			}

			metadata={type,id,basedOn, isDefault}
		}else if(wordModel.getStyleId){
			let basedOn=wordModel.getStyleId()
			parentStyle=basedOn ? doc.cloneStyle(basedOn) : doc.cloneDefaultStyle(type)
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
