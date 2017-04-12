export function insert(docx, selection,inserting,getNode,renderChanged){
	let {start:{id,at},end}=selection
	if(id==end.id){
		if(typeof(inserting)=="string"){
			if(inserting.indexOf("\n")==-1 && inserting.indexOf("\r")==-1)
				return insertStringWithoutSelection(...arguments)
			else
				return insertStringWithCarriageWithoutSelection(...arguments)
		}else{

		}
	}else{

	}
}

function insertStringWithoutSelection(docx, selection,inserting,getNode,renderChanged){
	let {start:{id,at},end}=selection
	const target=getNode(docx,id)
	
	let text=target.text()
	target.text(text.substring(0,at)+inserting+text.substr(end.at))
	at+=inserting.length
	renderChanged(target.get(0))
	
	return {selection:{start:{id,at},end:{id,at}}}
}


export function remove(docx, selection,removing,getNode,renderChanged){
	let {start:{id,at},end}=selection
	if(id==end.id){
		if(typeof(removing)=="number"){
			return removeInRunWithoutSelection(...arguments)
		}else{

		}
	}else{

	}
}

function removeInRunWithoutSelection(docx, selection,removing,getNode,renderChanged){
	let {start:{id,at}}=selection
	const target=getNode(docx,id)
	let text=target.text()
	target.text(text.substring(0,at-removing)+text.substr(at))
	at-=removing
	
	renderChanged(target.get(0))
	return {selection:{start:{id,at},end:{id,at}}}
}

