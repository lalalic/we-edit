export default function getClientRect(el){
	if(!el)
		return {left:0,top:0,width:0,height:0}
	let {left,top,bottom,right,width,height}=el.getBoundingClientRect()
	let {scrollX,scrollY}=window
	return {
		left:left+scrollX, right: right+scrollX,
		top:top+scrollY, bottom: bottom+scrollY,
		height,width}
}
