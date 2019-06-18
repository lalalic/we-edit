import Base from "./base"

export class Text extends Base{
	template(){
		return `<w:t></w:t>`
	}

	update({id},changing){
		this.apply({id, ...changing})
		const container=this.node.parent().closest('[xxid]')
		if(container.length){
	        this.file.renderChanged(container)
		}else{
			//in process
		}
	}

	create(props,{id,at=0}){
		var cursor
        super.create(props)
        const r=this.node.wrap("<w:r></w:r>").parent()
        this.file.renderChanged(r,($,el)=>{
            const r0=this.file.getNode(id).closest("w\\:r")
            if(r0.length){
                r0[`${at==0 ? "before" : "after"}`](r)
            }else{
                r.appendTo(this.file.getNode(id))
            }
            this.file.renderChanged(r.parent().closest(`[xxid]`))
            cursor=this.node.attr("xxid")
        })

		return {id:cursor,at:(props.children||"").length}
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

	split(at,firstKeepId=true){
		const text=this.node.text()
		at=at<0 ? text.length+at : at
		if(at>=text.length || at==0){
			return [{id:this.node.attr('xxid'),at:at},{id:this.node.attr('xxid'),at:at}]
		}
		this.node.text(text.substring(0,at))
		const r0=this.node.closest("w\\:r")
		var r1=r0.clone()
		r1.find("w\\:t").remove()
		r1=r1.append(this.node.clone().text(text.substring(at))).insertAfter(r0)
		;((r)=>{
			r.removeAttr('xxid')
			r.find('[xxid]').removeAttr('xxid')
		})(firstKeepId ? r1 : r0);

		this.file.renderChanged(r0.parent().closest(`[xxid]`))
		return [{id:this.node.attr('xxid'),at:at},{id:r1.find("w\\:t").attr('xxid'), at:0}]
	}

	remove(){
		this.node.remove()
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

	tab({shiftKey,at=0}){

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
