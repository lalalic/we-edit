import {List} from "immutable"

export function getSelection(state){
	return state.get("selection").toJS()
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

export function getContentStyle(state, editorId, contentId){
	let el=document.querySelector(`#${editorId} [data-content='${contentId}']`)
	return {
		fonts:el.getAttribute("font-family"),
		size: parseInt(el.getAttribute("font-size")),
		bold: el.getAttribute("font-weight")=="700",
		italic: el.getAttribute("font-style")=="italic"
	}
}

export function getStyles(state){
	return state.getIn("content.root.props.styles".split("."))
}

export function findFirstCursorable(content){
	const visit=(a,id)=>{
		if(["header","footer"].indexOf(a.type)!=-1)
			return null
		if(["text","image"].indexOf(a.type)!=-1)
			return id
		return a.children.reduce((found,child)=> found || visit(content.get(child).toJS(), child),null)
	}
	return visit(content.get("root").toJS())
}

const cursorables=["text","image"]
export function nextCursorable(state,id){
	let found=traverseNext(state.get("content"),n=>cursorables.includes(n.type),id)
	return found ? found.props.id : null
}

export function prevCursorable(state,id){
	let found=traversePrev(state.get("content"),n=>cursorables.includes(n.type),id)
	return found ? found.props.id : null
}

export function getNode(docId, id,at){
	let nodes=document.querySelectorAll(`#${docId} [data-content="${id}"]`)
	if(nodes.length==1 || at==undefined || at<0)
		return nodes[0]

	for(let i=0, len=nodes.length; i<len; i++){
		let a=nodes[i]
		let end=parseInt(a.dataset.endAt)
		let length=a.textContent.length
		let start=end-length
		if(start<=at && at<=end)
			return a
	}
}

export function traverse(content, f, start="root"){
	let {id,node}={start,content.get(start)}
	let children=node.get("children")
	if(children instanceof List){
		return !!children.find(k=>{
			if(f(content.get(k))===true){
				return true
			}else{
				return traverse(content,f,k,true)
			}
		})
	}
}

export function traversePrev(content, f, start="root"){
	let parentId=getParentId(start)
	if(parentId){
		let siblings=content.get(parentId).get("children")
		if(slibings instanceof List){
			let index=siblings.indexOf(start)
			let prevs=siblings.slice(0,index)
			return !!prevs.find(k=>{
				if(f(content.get(k)===true)){
					return true
				}else{
					return traversePrev(content,f,k)
				}

			})
		}
	}
}

export function traverseNext(content, f, start="root"){
	let parentId=getParentId(start)
	if(parentId){
		let siblings=content.get(parentId).get("children")
		if(slibings instanceof List){
			let index=siblings.indexOf(start)
			let nexts=siblings.slice(index+1)
			return !!nexts.find(k=>{
				if(f(content.get(k)===true)){
					return true
				}else{
					return traversePrev(content,f,k)
				}

			})
		}
	}
}
