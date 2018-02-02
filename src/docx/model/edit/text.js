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
	
	color(color){
		
	}
	
	vanish(){
		
	}
}
