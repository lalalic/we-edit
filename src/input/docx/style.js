const Stylable={	
	getDefault(type){
		switch(type){
		case "document":
			return this.find(`w\\:docDefaults`)
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
		return this.find(`w\\:style[w\\:styleId=${id}]`)
	},
	
	getParentStyle(){
		let parentId=this.find("w\\:basedOn").attr("w:val")
		if(parentId)
			return this.end().getStyle(parentId)
		else
			return null
	}
}

export default function makeStylable({docx, props}){
	let $=docx.officeDocument.styles.root()
	Object.assign(docx.officeDocument.styles.prototype,Stylable)
	docx.officeDocument.styles.prototype.key=function(path){
		let current=this
		let node=current.find(path).get(0)
		while(!node){
			current=current.getParentStyle()
			if(current)
				node=current.find(path).get(0)
			else
				break
		}
		
		if(node)
			return props.selectValue(node)
		
		return null
	}
	docx.officeDocument.content.prototype.getParentStyle=function(){
		let styleId=this.find(">w\\:tblStyle,>w\\:pStyle,>w\\:rStyle").attr("w:val")
		let style=null
		if(styleId){
			style=$.getStyle(styleId)
		}else{
			styleId={tblPr:"table",pPr:"paragraph",rPr:"character"}[this.prop("name").split(":").pop()]
			style=$.getDefault(styleId)
		}
		
		return style
	}
	
	docx.officeDocument.content.prototype.key=function(path){
		let current=this
		let node=current.find(path).get(0)
		while(!node){
			current=current.getParentStyle()
			if(current)
				node=current.find(path).get(0)
			else
				break
		}
		
		if(node)
			return props.selectValue(node)
		
		return null
	}
	
	
	return $
}