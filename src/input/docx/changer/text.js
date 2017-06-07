import Base from "state/reducer/text"
import mixin from "./mixin"

export class text extends Base{
	constructor(state,renderChanged){
		super(state)
		mixin.bind(this)(renderChanged)
	}

	insert_withoutSelection_string_withoutNewLine(inserting){
		let {start:{id,at}}=this.selection
		const target=this.getNode(id)

		this.save4Undo(target)

		let text=target.text()
		target.text(text.substring(0,at)+inserting+text.substr(at))
		at+=inserting.length

		this.renderChanged(target.get(0))

		this.updateSelection(id,at)
	}

	//{type:"text/INSERT", payload:"hello\r\nworld"}
	insert_withoutSelection_string_withNewLine(inserting){
		const {start:{id,at}}=this.selection
		let target=this.getNode(id)

		let text=target.text()

		let r=target.closest("w\\:r")
		let p=target.closest("w\\:p")

		let pId=p.attr("id")
		let parentId=this.getParentId(pId)

		let emptyR=r.clone(), emptyP=p.clone()
		console.assert(emptyR.attr("id")==undefined)
		emptyR.find("w\\:t").text("")
		emptyP.find("w\\:r").remove()

		let pieces=inserting.split(/[\r\n]+/g)
		let first=0, last=pieces.length-1
		let cursorId, cursorAt

		pieces.reduceRight((b,piece,i)=>{
			switch(i){
			case first:{
					target.text(text.substring(0,at)+piece)
					this.renderChanged(p.get(0))
					break
				}
			case last:{
					let r0=emptyR.clone(), t0=r0.find("w\\:t")
					t0.text(piece+text.substr(at))
					let p0=emptyP.clone()

					p0.append(r0)
					 .append(r.nextAll())
					 .insertAfter(p)

					 //@TODO: p0!=p.next(), it's weird, so use p.next().get(0)
 					p0=p.next()
					t0=p0.find("w\\:t").eq(0)

					let rendered=this.renderChanged(p0.get(0))
					this.updateChildren(parentId, children=>children.splice(children.indexOf(pId)+1,0,rendered.id))
					this.updateSelection(t0.attr("id"), piece.length)
					break
				}
			default:{
					let r0=emptyR.clone()
					r0.find("w\\:t").text(piece)

					let p0=emptyP.clone()
					p0.append(r0)
					  .insertAfter(p)

					 p0=p.next()

					let rendered=this.renderChanged(p0.get(0))
					this.updateChildren(parentId, children=>children.splice(children.indexOf(pId)+1,0,rendered.id))
				}
			}
		},1)
	}

	remove_withoutSelection_backspace(removing){
		let {start:{id,at}}=this.selection
		const target=this.getNode(id)

		this.save4Undo(target)

		let text=target.text()
		target.text(text.substring(0,at-removing)+text.substr(at))
		at-=removing

		this.renderChanged(target.get(0))
		this.updateSelection(id,at)
	}
	
	remove_withoutSelection_backspace_headOf_text(){
		
	}
	
	remove_withoutSelection_backspace_headOf_paragraph(){
		
	}

	remove_withoutSelection_delete(removing){
		let {start:{id,at}}=this.selection
		const target=this.getNode(id)

		this.save4Undo(target)

		let text=target.text()
		target.text(text.substring(0,at)+text.substr(at-removing))

		this.renderChanged(target.get(0))
	}

	remove_withSelection(){
		const {start,end}=this.selection
		const target0=this.getNode(start.id)
		if(start.id==end.id){
			this.save4Undo(target0)

			let text=target0.text()
			target0.text(text.substring(0,start.at)+text.substring(end.at))
			this.renderChanged(target0.parent().get(0))
			this.updateSelection(start.id,start.at)
		}else{
			const $=this.file.officeDocument.content
			const target1=this.getNode(end.id)
			const ancestor=target0.parentsUntil(target1.parentsUntil()).last().parent()
			
			let ancestors0=target0.parentsUntil(ancestor)
			let ancestors1=target1.parentsUntil(ancestor)
			let top0=ancestors0.last()
			let top1=ancestors1.last()
			
			let ancestorId=this.getParentId(this.id(top0))
			console.assert(!!ancestorId)
			
			let removingTops=top0.nextUntil(top1)
			
			//save for undo
			switch(ancestor.prop("name")){
			case "w:p"://render whole, and save whole for undo
			case "w:r":
				this.save4Undo(ancestor)
			break
			default:
				removingTops.each((i,el)=>{
					let $el=$(el)
					this.save4Undo($el)
					this.updateChildren(ancestorId,this.id($el))
				})

				this.save4Undo(top0)
				this.save4Undo(top1)
			break
			}
			
			{//remove
				removingTops.remove()
				ancestors0.not(top0).each((i,a)=>$(a).nextAll().remove())
				ancestors1.not(top1).each((i,a)=>$(a).prevAll().remove())

				let text=target0.text()
				target0.text(text.substring(0,start.at))

				text=target1.text()
				target1.text(text.substr(end.at))
			}

			switch(ancestor.prop("name")){
			case "w:p":
			case "w:r":
				this.renderChanged(ancestor.get(0))
			break
			//cross paragraph/run
			default:
				//then merge
				this.renderChanged(top0.get(0))
				this.renderChanged(top1.get(0))
			break
			}

			this.updateSelection(start.id,start.at)
		}
	}
}
