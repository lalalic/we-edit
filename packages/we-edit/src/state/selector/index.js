import {List} from "immutable"
import { parseIds } from "../../tools/content-id"

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

export function getUI(state){
	const {selectionStyle, ...ui}=state.get("ui")
	return ui
}

export function getStatistics(state){
	return state.get("statistics")
}

export function getFile(state){
	return state.get("doc")
}

export function getContent(state,id){
	return state.getIn(parseIds(`content.${id}`))
}

export function getParentId(content,id){
	return content.getIn([id,"parent"])
}

export function getWorkers(state){
	return state.get('workers')
}

export function traverse(content, f, start="root", right=false){
	const [id,node]=[start,content.get(start)]
	if(!node)
		return null
	const children=node.get("children")
	if(children instanceof List){
		return !!children[`find${right ? "Last" :""}`](k=>{
			const node=content.get(k)
			if(!node){
				debugger
				console.warn(!!node,`${k} not in content, but parent[${id}] includes it as child`)
				return false
			}
			const result=f(node)
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
	const parentId=getParentId(content,start)
	if(parentId){
		const parent=content.get(parentId)
		const siblings=parent.get("children")
		const index=siblings.indexOf(start)
		const prevs=siblings.slice(0,index)
		const found=!!prevs.findLast((k)=>{
			const result=f(content.get(k))
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
	const parentId=getParentId(content,start)
	if(parentId){
		const parent=content.get(parentId)
		const siblings=parent.get("children")
		const index=siblings.indexOf(start)
		const nexts=siblings.slice(index+1)
		const found=!!nexts.find((k,i)=>{
			const result=f(content.get(k))
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
