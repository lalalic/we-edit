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

export function getSelectionStyle(state){
	return state.get("ui").selectionStyle
}

export function getStatistics(state){
	return state.get("statistics")
}

export function getFile(state){
	return state.get("doc")
}

export function getContent(state,id){
	return state.getIn(`content.${id}`.split("."))
}

export function getParentId(content,id){
	return content.getIn([id,"parent"])
}

export function traverse(content, f, start="root", right=false){
	let [id,node]=[start,content.get(start)]
	if(!node)
		return null
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
		let found=!!prevs.findLast((k)=>{
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

export function firstCursorable(content){
	var found
	traverseNext(content, n=>{
		if(n.get('type')=="paragraph"){
			found=n.get('id')
			return true
		}
	})
	return found
}
