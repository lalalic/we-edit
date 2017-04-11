if(!Element.prototype.getClientRect)
Element.prototype.getClientRect=function(){
	let {left,top,width,height}=this.getBoundingClientRect()
	return {left:left+window.scrollX, top:top+window.scrollY, height,width}
}
