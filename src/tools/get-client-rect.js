export default function getClientRect(el){
	let {left,top,bottom,right,width,height}=el.getBoundingClientRect()
	let {scrollX,scrollY}=window
	return {
		left:left+scrollX, right: right+scrollX,
		top:top+scrollY, bottom: bottom+scrollY,
		height,width}
}
