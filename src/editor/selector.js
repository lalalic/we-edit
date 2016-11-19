let contents={}

export const recordContent=content=>contents[content.id]=content

export const getContent=id=>contents[id]

export const getContentClientBoundBox=(id, at)=>{
	let found, from
	let texts=document.querySelectorAll(`svg text[data-content="${id}"][end]`)
	for(let i=0, len=texts.length; i<len; i++){
		let a=texts[i]
		let end=parseInt(a.getAttribute('end'))
		let length=a.textContent.length
		let start=end-length
		if(at=>start && at<end){
			found=a
			from=start
			break
		}
	}

	if(!found)
		throw new Error(`can't found text(${id},${at})`)
	let {top,left}=found.getBoundingClientRect()
	return {top,left,from}
}
