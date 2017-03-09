const Stylable={	
	getDefault(type){
		switch(type){
		case "document":
			return this.find(`w\\:docDefaults w\\:rPr,w\\:docDefaults w\\:pPr`)
		case "table":
		case "paragraph":
			return this.find(`w\\:style[w\\:type=${type}][w\\:default=1]`)
		case "inline":
			return this.find(`w\\:style[w\\:type=character][w\\:default=1]`)
		case "list":
			return this.find(`w\\:style[w\\:type=numbering][w\\:default=1]`)
		}
	},
	
	getStyle(id){
		return this.find(`w\\:style[w:styleId="${id}"]`)
	},
	
	getParentStyle(){
		let parentId=this.find("w\\:basedOn").attr("w:val")
		if(parentId)
			return this.end().getStyle(parentId)
		else
			return null
	}
}

export default function makeStylable(docx){
	Object.assign(docx.officeDocument.styles.prototype,Stylable)
	return docx.officeDocument.styles()
}