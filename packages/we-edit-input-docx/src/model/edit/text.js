import Base from "./base"

export class Text extends Base{
	children(text){
		this.node.text(text)
		if(text.startsWith(" ") || text.endsWith(" ")){
			this.node.attr("xml:space","preserve")
		}
	}
	
	got(nodeName){
		let r=this.node.closest("w\\:r")
		let rPr=r.children("w\\:rPr")
		if(rPr.length==0){
			r.append(`<w:rPr/>`)
			rPr=r.children("w\\:rPr")
		}
		let selector=nodeName.replace(":", "\\:")
		let target=rPr.children(selector)
		if(target.length==0){
			rPr.append(`<${nodeName}/>`)
			target=rPr.children(selector)
		}
		return target
	}
	
	fonts(fonts){
		this.got("w:rFonts").attr("w:ascii",fonts)
	}
	
	size(size){
		this.got("w:sz").attr("w:val",parseInt(size)*2)
		this.got("w:szCs").attr("w:val",parseInt(size)*2)
	}
	
	bold(b){
		this.got("w:b").attr("w:val",b ? "1" : "0")
	}
	
	italic(b){
		this.got("w:i").attr("w:val",b ? "1" : "0")
	}
	
	vanish(b){
		this.got("w:vanish").attr("w:val",b ? "1" : "0")
	}
	
	color(color,a, attr="w:color"){
		let node=this.got(attr)
		if(color){
			node.attr("w:val", color)
		}else{
			node.remove()
		}
	}
	
	highlight(color,a){
		this.color(color,a,"w:highlight")
	}
	
	border(){
		let node=this.got("w:bdr")
		if(!node.attr("w:val")){
			node.replaceWith(`<w:bdr w:val="single" w:sz="4" w:space="0" w:color="auto"/>`)
		}else{
			node.remove()
		}
	}
	
	underline(type){
		let node=this.got("w:u")
		if(type){
			node.attr("w:val",type)
		}else{
			node.remove()
		}
	}
	
	strike(b){
		this.got("w:strike").attr("w:val",b ? "1" : "0")
	}
	
	_clear(){
		let r=this.node.closest("w\\:r")
		let rPr=r.children("w\\:rPr")
		rPr.remove()
	}
}
