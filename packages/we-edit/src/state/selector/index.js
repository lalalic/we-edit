import {List} from "immutable"

export function getUndos(state){
	return state.get("undos")
}

export function getRedos(state){
	return state.get("redos")
}

export function getSelection(state){
	return state.get("selection").toJS()
}

export function getSelectionStyle(state,type, ...more){
	return state.get("ui").selectionStyle.props(type, ...more)
}

export function getFile(state){
	return state.get("doc")
}

export function getContent(state,id){
	return state.getIn(`content.${id}`.split("."))
}

//experimental
export function getChanged(state){
	return state.get("violent").changing
}

export function getParentId(content,id){
	return content.getIn([id,"parent"])
}

export function traverse(content, f, start="root", right=false){
	let [id,node]=[start,content.get(start)]
	let children=node.get("children")
	if(children instanceof List){
		return !!children[`find${right ? "Last" :""}`](k=>{
			let node=content.get(k)
			if(!node){
				debugger
			}
			console.assert(!!node,`${k} not in content, but parent[${id}] includes it as child`)
			let result=f(node)
			if(result===true){
				return true
			}else if(result===false){
				return false
			}else{
				return !!traverse(content,f,k,right)
			}
		})
	}
}

export function traversePrev(content, f, start="root"){
	let parentId=getParentId(content,start)
	if(parentId){
		let parent=content.get(parentId)
		let siblings=parent.get("children")
		let index=siblings.indexOf(start)
		let prevs=siblings.slice(0,index)
		let found=!!prevs.findLast((k,i)=>{
			let result=f(content.get(k))
			if(result===true){
				return true
			}else if(result===false){
				return false
			}else{
				return !!traverse(content,f,k,true)
			}

		})

		if(!found){
			traversePrev(content,f,parentId)
		}
	}
}

export function traverseNext(content, f, start="root"){
	let parentId=getParentId(content,start)
	if(parentId){
		let parent=content.get(parentId)
		let siblings=parent.get("children")
		let index=siblings.indexOf(start)
		let nexts=siblings.slice(index+1)
		let found=!!nexts.find((k,i)=>{
			let result=f(content.get(k))
			if(result===true){
				return true
			}else if(result===false){
				return false
			}else{
				return !!traverse(content,f,k)
			}

		})

		if(!found){
			traverseNext(content,f,parentId)
		}
	}
}

const cursorables=["text","image"]
export function firstCursorable(content){
	const excludes=["header","footer"]
	let found
	traverse(content,(n,k=n.get("id"),type=n.get("type"))=>{
		if(excludes.includes(type)){
			return false
		}
		if(cursorables.includes(type)){
			found=k
			return true
		}
	})
	return found
}

export function nextCursorable(state,id){
	let found
	traverseNext(state.get("content"),(n,k=n.get("id"),type=n.get("type"))=>{
		if(cursorables.includes(type)){
			if(type=="text"){
				if(n.get("children").length>0){
					found=k
					return true
				}
			}else{
				found=k
				return true
			}
		}
	},id)
	return found
}

export function prevCursorable(state,id){
	let found
	traversePrev(state.get("content"),(n,k=n.get("id"),type=n.get("type"))=>{
		if(cursorables.includes(type)){
			if(type=="text"){
				if(n.get("children").length>0){
					found=k
					return true
				}
			}else{
				found=k
				return true
			}
		}
	},id)
	return found
}


export function nextSelectable(state,id){
	return nextCursorable(...arguments)
}

export function prevSelectable(state,id){
	return prevSelectable(...arguments)
}
