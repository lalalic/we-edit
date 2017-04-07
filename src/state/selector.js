const composers={}

export function getSelection(state){
	return state.get("selection")
}

export function getFile(state){
	return state.get("doc")
}

export function getContent(state,id){
	return state.get("content").get(id)
}

export function recordComposer(composer,t){
	let editorId=composer.context.docId
	let contentId=composer.props.id
	if(!(t=composers[editorId]))
		t=composers[editorId]={}
	t[contentId]=composer
}

export function getContentStyle(state, editorId, contentId){
	let {children,id,namedStyle,...style}=composers[editorId][contentId].props
	return style
}

export function getStyles(state){
	return state.get("content").get("root").get("props").get("styles")
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
