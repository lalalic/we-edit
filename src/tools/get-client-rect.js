export default function getClientRect(el){
	if(!el)
		return {left:0,top:0,width:0,height:0}
	let {left,top,bottom,right,width,height}=el.getBoundingClientRect()
	let {scrollX,scrollY}=window
	let i=Math.floor
	return {
		left:i(left+scrollX), right: i(right+scrollX),
		top:i(top+scrollY), bottom: i(bottom+scrollY),
		height,width}
}
