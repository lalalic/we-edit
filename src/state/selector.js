export function getContent(state,id){
	return state.get("content").get(id)
}

export function getContentClientBoundBox(texts, at, id){
	let found, from
	for(let i=0, len=texts.length; i<len; i++){
		let a=texts[i]
		let end=parseInt(a.getAttribute('end'))
		let length=a.textContent.length
		let start=end-length
		if(start<=at && at<end){
			found=a
			from=start
			break
		}
	}

	if(!found){
		console.warn(`can't found text(${id},${at})`)
		return {top:0,left:0,from:0}
	}
	let {top,left}=found.getBoundingClientRect()
	return {top,left,from}
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


export default {getContent, getContentClientBoundBox}
