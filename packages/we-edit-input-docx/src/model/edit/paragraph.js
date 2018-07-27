import Editor from "./base"

export default class extends Editor{
	got(nodeName){
		let content=this.node.closest("w\\:p")
		let pr=content.children("w\\:pPr")
		if(pr.length==0){
			content.append(`<w:pPr/>`)
			pr=content.children("w\\:pPr")
		}
		let selector=nodeName.replace(":", "\\:")
		let target=pr.children(selector)
		if(target.length==0){
			pr.append(`<${nodeName}/>`)
			target=pr.children(selector)
		}
		return target
	}
	
	align(type){
		this.got("w:jc").attr("w:val",type)
	}
}