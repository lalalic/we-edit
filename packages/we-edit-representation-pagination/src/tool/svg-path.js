import parse from "parse-svg-path"
import simplify from "simplify-svg-path"
import contours from "svg-path-contours"
import memoize from "memoize-one"

export default class{
	constructor(d,tolerance){
		this.path=parse(d)
		this.tolerance=tolerance
	}
	
	bounds=memoize(()=>{
		return this.segments()
			.reduce(({left,top,right,bottom},[x,y])=>({
					left:Math.min(left,x),
					top:Math.min(top,y),
					right:Math.max(right,x),
					bottom:Math.max(bottom,y)
				}),{
					left:Number.MAX_SAFE_INTEGER,
					top:Number.MAX_SAFE_INTEGER,
					right:Number.MIN_SAFE_INTEGER,
					bottom:Number.MIN_SAFE_INTEGER,
				})
	})
	
	segments=memoize(()=>{
		return contours(this.path)
			.map(a=>a.map(([x,y])=>[Math.ceil(x), Math.ceil(y)])
			.map(a=>simplify(a,this.tolerance))
			.reduce((all,a)=>[...all,...a],[])
	})
}