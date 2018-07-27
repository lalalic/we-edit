import Editor from "./base"

export default class extends Editor{
	got(nodeName){
		return super.got(nodeName, "w:p", "w:pPr")
	}
	
	align(type){
		this.got("w:jc").attr("w:val",type)
	}
}