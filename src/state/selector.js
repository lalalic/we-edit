const composers={}

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

export function recordComposer(composer,t){
	let editorId=composer.context.docId
	let contentId=composer.props.id
	if(!(t=composers[editorId]))
		t=composers[editorId]={}
	t[contentId]=composer
}

//experimental
export function getParentId(state,id){
	return Object.keys(composers).reduce((found, k)=>{
		if(found)
			return found
		
		let adoc=composers[k]
		let me=adoc[id]
		if(me){
			let parent=me.context.parent
			if(parent)
				return parent.props.id
		}
	},undefined)
}

export function getContentStyle(state, editorId, contentId){
	let {children,id,namedStyle,...style}=composers[editorId][contentId].props
	return style
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

function findCursorableIn(composer, direction=""){
	if(composer.constructor.cursorable())
		return composer
	return composer.computed.children[`reduce${direction}`]((state,next)=>{
		if(state)
			return state
		return findCursorableIn(next, direction)
	},null)
}

export function nextCursorable(state,id){
	let {active}=getSelection(state)
	let components=composers[active]
	let current=components[id]
	let parent=current.context.parent

	let children=parent.computed.children
	let index=children.findIndex(a=>a==current)
	let found=children[index+1]
	while(!found && parent.context.parent){
		current=parent
		parent=parent.context.parent
		children=parent.computed.children
		index=children.findIndex(a=>a==current)
		found=children.filter((a,i)=>i>index).reduce((state,next)=>{
			if(state)
				return state
			return findCursorableIn(next)
		},null)
	}

	return found ? found.props.id : null
}

export function prevCursorable(state,id){
	let {active}=getSelection(state)
	let components=composers[active]
	let current=components[id]
	let parent=current.context.parent

	let children=parent.computed.children
	let index=children.findIndex(a=>a==current)
	let found=children[index-1]
	while(!found && parent.context.parent){
		current=parent
		parent=parent.context.parent
		children=parent.computed.children
		index=children.findIndex(a=>a==current)
		found=children.filter((a,i)=>i<index).reduceRight((state,next)=>{
			if(state)
				return state
			return findCursorableIn(next,"Right")
		},null)
	}

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
