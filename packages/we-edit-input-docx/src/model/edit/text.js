import Base from "./base"

export class Text extends Base{
	template(){
		return `<w:r><w:t></w:t></w:r>`
	}

	create(props,reducer,target){
		const createdNode=super.create(...arguments)
		const {id:createdId}=reducer.renderChanged(createdNode)
		let created=reducer.$(`#${createdId}`).appendTo(target)
		let cursor=created.findFirst('text').attr('id')
		return {id:cursor,at:0}
	}

	children(text){
		this.node.text(text)
		if(text.startsWith(" ") || text.endsWith(" ")){
			this.node.attr("xml:space","preserve")
		}
	}

	got(nodeName){
		return super.got(nodeName,"w:r", "w:rPr")
	}

	fonts(fonts){
		this.got("w:rFonts").attr("w:ascii",fonts)
	}

	size(size){
		this.got("w:sz").attr("w:val",parseInt(size)*2)
		this.got("w:szCs").attr("w:val",parseInt(size)*2)
	}

	bold(b){
		this._toggle("w:b",b)
	}

	italic(b){
		this._toggle("w:i",b)
	}

	vanish(b){
		this._toggle("w:vanish",b)
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
		this._toggle("w:strike",b)
	}

	_toggle(k,b){
		let node=this.got(k)
		if(b){
			node.attr("w:val","1")
		}else{
			node.remove()
		}
	}

	_clear(){
		let r=this.node.closest("w\\:r")
		let rPr=r.children("w\\:rPr")
		rPr.remove()
	}
}
