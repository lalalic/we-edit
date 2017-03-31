export function getSelection(state){
	return state.get("selection")
}

export function getFile(state){
	return state.get("doc")
}

export function getContent(state,id){
	return state.get("content").get(id)
}

export function getComposers(state){
	return state.get("composers")
}

export function getContentStyle(state, editorId, contentId){
	const composers=state.get("composers")
	let {children,id,namedStyle,...style}=composers[editorId][contentId].props
	return style
}

export function findTextIn(content, direction=""){
	if(typeof(content.getContent())=='string')
		return content
	return content.computed.children[`reduce${direction}`]((state,next)=>{
		if(state)
			return state
		return findTextIn(next, direction)
	},null)
}

export function getNextTextOf(state,id){
	let current=getContent(state,id)
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
			return findTextIn(next)
		},null)
	}

	return found
}

export function getPrevTextOf(state,id){
	let current=getContent(id)
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
			return findTextIn(next,"Right")
		},null)
	}

	return found
}
