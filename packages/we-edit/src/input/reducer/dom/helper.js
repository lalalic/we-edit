import Base from "./base"

export default class Helper extends Base{
	element(id){
		return {id,type:this.$('#'+id).attr('type')}
	}

	isAtStart({id,at=0}){
		return at==0
	}

	isAtEnd({id,at=0}){
		const target=this.$('#'+id)
		const type=target.attr('type')
		return (type=="text" && at>=target.text().length) || (type!="text" && at==1)
	}

	/*start at beginning of node, end at ending of node
	seperated to </>(<|/></|>)</>
	*/
	seperateSelection(){
		const {start,end}=this.selection
		if(start.id==end.id&&start.at==end.at){
			return
		}

		if(this.isAtStart(end)){//go to end of prev cursorable
			const newEnder=this.$('#'+end.id).prevCursorable()
			end.id=newEnder.attr('id')
			end.at=newEnder.attr('type')=="text" ? newEnder.text().length : 1
			this.cursorAt(start.id,start.at, end.id,end.at)
		}

		if(this.isAtEnd(start)){
			start.id=this.$('#'+start.id).nextCursorable().attr('id')
			start.at=0
			this.cursorAt(start.id,start.at,end.id,end.at)
		}


		if(start.id==end.id){//entity
			const starter=this.$('#'+start.id)
			if(starter.type=="text"){
				if(start.at==0 && end.at>=starter.text().length){
					return
				}
			}else if(start.at==0 && end.at==1){
				return
			}
		}

		if(!(start.id==end.id && start.at==end.at)){
			if(!this.isAtEnd(end)){
				const [newEnd]=this.file.splitNode(this.element(end.id),end.at, start.id==end.id)
				end.id=newEnd.id
				end.at=newEnd.at
				this.cursorAt(start.id,start.at,end.id,end.at)
			}else{//extend to closest parent ending()
				const parents=this.$('#'+end.id).parentsUntil(this.$('#'+start.id).parents())
				if(parents.length>0){
					const i=parents.toArray().findIndex(id=>this.$('#'+id).parent().children().last().attr('id')!=id)
					if(i>0){
						this.cursorAt(start.id, start.at, parents.eq(i-1).attr('id'), 1)
					}else if(i==-1){
						this.cursorAt(start.id, start.at, parents.last().attr('id'), 1)
					}
				}
			}

			if(!this.isAtStart(start)){
				const end=this.selection.end
				const [,{id,at}]=this.file.splitNode(this.element(start.id),start.at)
				if(end.id==start.id){
					end.id=id
					end.at=end.at-(start.at-at)
				}
				start.id=id
				start.at=at
				this.cursorAt(start.id,start.at, end.id, end.at)
			}else{//extend to closest parent beginning
				const end=this.selection.end
				const parents=this.$('#'+start.id).parentsUntil(this.$('#'+end.id).parents())
				if(parents.length>0){
					const i=parents.toArray().findIndex(id=>this.$('#'+id).parent().children().first().attr('id')!=id)
					if(i>0){
						this.cursorAt(parents.eq(i-1).attr('id'), 0, end.id, end.at)
					}else if(i==-1){
						this.cursorAt(parents.last().attr('id'), 0, end.id, end.at)
					}
				}
			}
		}
	}

	insert_text(inserting, shiftKey){
		const {start:{id,at}}=this.selection
		const target=this.$('#'+id)
		const text=target.text()
        if(inserting.indexOf("\r")==-1 && inserting.indexOf("\n")==-1){
			if(inserting.length==1 && inserting.charCodeAt(0)==9){//tab
				const atBeginningOfP=at==0 && target.closest("p").findFirst(a=>!a.props.children || typeof(a.props.children)=="string").is(target)
				if(atBeginningOfP){
					this.file.updateNode(this.element(target.closest("paragraph").attr("id")),{tab:{shiftKey}})
					return
				}else if(at>0 && text.length>at){
					const [,end]=this.file.splitNode(this.element(id), at)
					this.cursorAt(end.id,0)
					this.file.updateNode(this.element(end.id),{tab:{shiftKey}})
				}else{
					this.file.updateNode(this.element(id),{tab:{shiftKey,at}})
				}

			}else{
				target.text(text.substring(0,at)+inserting+text.substr(at))
	    		this.cursorAt(id,at+inserting.length)
			}
            return
        }else{
			const pieces=inserting.split(/[\r\n]+/g)
    		const [p,p1]=target.splitUpTo("paragraph",at)
			target.text(text.substring(0,at)+pieces.shift())
			p1.findFirst("text").text(pieces.pop()+text.substr(at))
			pieces.reverse().forEach(piece=>{
				target.constructUp(p)
					.insertAfter(p)
					.findFirst("text")
					.text(piece)
			})
			this.cursorAt(p1.findFirst("text").attr("id"),0)
        }
	}

	merge(contents){
		const {start:{id,at}}=this.selection
		var target=this.$('#'+id)
		const renderedContents=contents.map(a=>this.file.attach(a))
		if(renderedContents.length==1){
			const single=this.$('#'+renderedContents[0])
			if(single.attr('type')=="paragraph"){
				renderedContents.splice(0,1,...single.children().toArray())
			}
		}
		const isInline=this.$(renderedContents).filter("paragraph,table,frame").length==0
		if(isInline){
			const inParagraphTopParentId=target.parentsUntil("paragraph").toArray().pop()
			if(inParagraphTopParentId){
				const topParent=this.$('#'+inParagraphTopParentId)
				target.splitUpTo('#'+inParagraphTopParentId,at)
				renderedContents.reverse().forEach((a,i)=>{
					topParent.after(this.$(`#${a}`))
				})
			}else{
				if(!this.isAtStart({id,at}) && !this.isAtEnd({id,at})){
					const [,second]=this.file.splitNode(this.element(id),at)
					target=this.$('#'+second.id)
				}
				renderedContents.reverse().forEach((a,i)=>{
					target.before(this.$(`#${a}`))
				})
			}
		}else{
			const p=target.closest("paragraph")
			target.splitUpTo("paragraph",at)
			const firstId=renderedContents.unshift()
			const lastId=renderedContents.pop()


			const last=this.$('#'+lastId)
			if(last.attr('type')=="paragraph"){
				p.next().prepend(last.children)
			}else{
				p.next().before(last)
			}

			renderedContents.reverse().forEach(a=>p.after(this.$('#')+a))

			const first=this.$('#'+firstId)
			if(first.attr('type')=="paragraph"){
				p.append(first.children())
			}else{
				p.after(first)
			}
		}

	}

	removeSelection(){
		const {start,end}=this.selection
		if(start.id==end.id){
			if(start.at!=end.at){
				const target=this.$(`#${start.id}`)
				target.tailor(start.at,end.at)
				if(this.$(`#${start.id}`).length>0){
					this.cursorAt(start.id,start.at)
				}
			}
		}else{
			this.seperateSelection()
			const {start,end}=this.selection
			const target0=this.$('#'+start.id)
			const target1=this.$("#"+end.id)
			const cursorAfterRemove=target1.nextCursorable().add(target0.prevCursorable()).eq(0)

			const ancestor=target0.parentsUntil(target1.parentsUntil()).last().parent()
			if(ancestor.length>0){
				let ancestors0=target0.parentsUntil(ancestor)
				if(ancestors0.length==0){
					ancestors0=ancestors0.add(target0)
				}
				let ancestors1=target1.parentsUntil(ancestor)
				if(ancestors1.length==0){
					ancestors1=ancestors1.add(target1)
				}
				const top0=ancestors0.last()
				const top1=ancestors1.last()

				top0.nextUntil(top1).remove()
				ancestors0.not(target0).not(top0).each((i,a)=>this.$('#'+a.get("id")).nextAll().remove())
				ancestors1.not(target1).not(top1).each((i,a)=>this.$('#'+a.get("id")).prevAll().remove())
			}

			target0.remove()
			target1.remove()

			this.cursorAt(cursorAfterRemove.attr('id'),0)//it's not correct if the original end at entity end
		}
	}

	backspaceParagraph(){
		const {start:{id}}=this.selection
		const paragraph=this.$(`#${id}`).closest('paragraph').attr('id')
		this.file.updateNode(this.element(paragraph),{onBackspace:true})
	}

	clone(keepId){
		const {start,end}=this.selection
		if(start.id==end.id){
			const target=this.$(`#${start.id}`)
			if(start.at!=end.at){
				const cloned=target.clone()
				if(target.attr('type')=="text")
					return cloned.text(target.text().substring(start.at,end.at))
				else
					return cloned
			}else if(target.attr('type')!="text"){
				return target.clone()
			}else{
				return target.eq(1)//empty
			}
		}else{
			this.seperateSelection()
			const {start,end}=this.selection
			if(start.id==end.id){
				return this.clone(keepId)
			}
			const target0=this.$('#'+start.id)
			const target1=this.$("#"+end.id)

			const ancestor=target0.closest(target1.parents())
			if(ancestor.length>0){
				let ancestors0=target0.parentsUntil(ancestor)
				if(ancestors0.length==0){
					ancestors0=ancestors0.add(target0)
				}
				let ancestors1=target1.parentsUntil(ancestor)
				if(ancestors1.length==0){
					ancestors1=ancestors1.add(target1)
				}
				const top0=ancestors0.last()
				const top1=ancestors1.last()

				const clonedSiblings=top0.nextUntil(top1).clone()

				const cloneOutter=node=>{
					return node.constructUp(node)
				}

				const cloneTop=(top, target, ancestors,atEnd)=>{
					const parents=ancestors.not(target)
					if(parents.length==0)
					 	return target.clone()
					return target.add(parents.not(top)).toArray().reduce((clonedA,a)=>{
					 	const A=this.$('#'+a)
						const parent=cloneOutter(A.parent())
						parent.append(clonedA)
						if(atEnd){
							parent.append(A.nextAll().clone())
						}else{
							parent.prepend(A.prevAll().clone())
						}
						return parent
					},target.clone())
				}

				const clonedTop0=cloneTop(top0, target0, ancestors0,true)
				const clonedTop1=cloneTop(top1, target1, ancestors1,false)

				return clonedTop0.add(clonedSiblings).add(clonedTop1)
			}else{
				throw new Error(`something wrong: can't find range(${start} to ${end}) ancestor`)
			}
		}
	}

}
