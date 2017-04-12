import invoke from "lodash.invoke"

export function insert(docx, selection,inserting,getNode,renderChanged){
	let {start:{id,at},end}=selection
	let path=[]
	if(id==end.id){
		path.push("withoutSelection")
		if(typeof(inserting)=="string"){
			path.push("string")
			if(inserting.indexOf("\n")==-1 && inserting.indexOf("\r")==-1)
				path.push("withoutNewLine")
			else
				path.push("withNewLine")
		}else{

		}
	}else{

	}

	return invoke(text.insert,path.join("."),...arguments)
}

export function remove(docx, selection,removing,getNode,renderChanged){
	let {start:{id,at},end}=selection
	let path=[]
	if(id==end.id){
		path.push("withoutSelection")
	}else{
		path.push("withSelection")
	}

	return invoke(text.remove,path.join("."),...arguments)
}


const text={
	insert:{
		withoutSelection:{
			string:{
				withoutNewLine(docx, {start:{id,at}},inserting,getNode,renderChanged){
					const target=getNode(docx,id)

					let text=target.text()
					target.text(text.substring(0,at)+inserting+text.substr(at))
					at+=inserting.length
					renderChanged(target.get(0))

					return {selection:{start:{id,at},end:{id,at}}}
				},
				withNewLine(docx, {start:{id,at}},inserting,getNode,renderChanged){
					let target=getNode(docx,id)
					let text=target.text()
					target.text()

					let r=target.closest("w\\:r")
					let p=target.closest("w\\:p")

					let emptyR=r.clone()
					console.assert(emptyP.attribs.id==undefined)
					r.find("w\\:t").text("")

					let emptyP=p.clone()
					console.assert(emptyP.attribs.id==undefined)
					p.find("w\\:r").remove()

					let secondFirstT=emptyR.clone().find("w\\:t")
					let secondHalf=emptyP.clone()
						.append(secondFirstT)
						.append(target.nextAll())

					let pieces=inserting.split(/[\r\n]+/g)
					let first=0, last=pieces.length-1
					let cursorId, cursorAt

					pieces.reduceRight((changed,a,i)=>{
						switch(i){
						case first:
							target.text(text.substring(0,at)+a)
							changed.push(p)
						break
						case last:
							secondFirstT.text(a+text.substr(at))
							changed.push(secondHalf.insertAfter(p))
							cursorAt=a.length
						break
						default:
							changed.push(emptyP.clone().append(emptyR.clone().find("w\\:t").text(a)).insertAfter(p))
						}
						return changed
					},[]).forEach(a=>renderChanged(a.get(0)))
					cursorId=secondFirstT.attr("id")

					return {selection:{start:{id:cursorId, at:cursorAt}, end: {id:cursorId, at:cursorAt}}}

				}
			},
			range:{

			},
			clipboard:{

			}
		},
		withSection:{
			string:{
				withoutNewLine(docx, {start:{id,at}},inserting,getNode,renderChanged){
					let changed=text.remove.withSelection(...arguments)
					let changed1=text.insert.withoutSelection.string
							.withoutNewLine(docx,changed.selection,inserting,getNode,renderChanged)
					return {...changed, ...changed1}
				},
				withNewLine(docx, {start:{id,at}},inserting,getNode,renderChanged){
					let changed=text.remove.withSelection(...arguments)
					let changed1=text.insert.withoutSelection.string
							.withNewLine(docx,changed.selection,inserting,getNode,renderChange)
					return {...changed,...changed1}
				}
			},
			range:{

			},
			clipboard:{

			}
		}
	},
	remove:{
		withoutSelection(docx, {start:{id,at}},removing,getNode,renderChanged){
			const target=getNode(docx,id)
			let text=target.text()
			target.text(text.substring(0,at-removing)+text.substr(at))
			at-=removing

			renderChanged(target.get(0))
			return {selection:{start:{id,at},end:{id,at}}}
		},
		withSelection(docx, {start,end},removing,getNode,renderChanged){
			const target0=getNode(docx,start.id)
			const target1=getNode(docx,end.id)
			const ancestor=target0.parentsUntil(target1.parentsUntil()).last().parent()
			let ancestors0=target0.parentsUntil(ancestor)
			let ancestors1=target1.parentsUntil(ancestor)

			let removed=[]
			let willRemove=a=>removed.push([a.attribs.id,a.parent.attribs.id])

			ancestors0.last().nextUntil(ancestors1.last()).each(a=>willRemove(a)).remove()

			ancestor0.each(a=>a.nextAll().each(a=>willRemove(a)).remove())
			ancestors1.each(a=>a.prevAll().each(a=>willRemove(a)).remove())

			let text=target0.text()
			target0.text(text.substring(0,start.at))

			text=target1.text()
			target1.text(text.substr(end.at))


			ancestors0.last().append(ancestors1.last().children())

			renderChanged(target0)
			renderChanged(target1)

			let id=target.attr("id"),at:0
			return {
				selection:{start:{id,at},end:{id,at}},
				removed
			}
		}
	}
}
