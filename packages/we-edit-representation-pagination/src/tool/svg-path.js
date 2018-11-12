import parse from "parse-svg-path"
import simplify from "simplify-path"
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
			.map(a=>a.map(([x,y])=>[Math.ceil(x), Math.ceil(y)]))
			.map(a=>simplify(a,this.tolerance))
			.reduce((all,a)=>[...all,...a],[])
	})

	intersects(line){
		const points=this.segments()
		return points.slice(1)
			.map(([x2,y2],i)=>{
				const [x1,y1]=points[i]
				return {x1,y1,x2,y2}
			})
			.map(line1=>line_line_intersect(line1,line))
			.filter(a=>!!a)
	}
}

function line_line_intersect(line1, line2) {
	var x1 = line1.x1, x2 = line1.x2, x3 = line2.x1, x4 = line2.x2;
	var y1 = line1.y1, y2 = line1.y2, y3 = line2.y1, y4 = line2.y2;
	var pt_denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
	var pt_x_num = (x1*y2 - y1*x2) * (x3 - x4) - (x1 - x2) * (x3*y4 - y3*x4);
	var pt_y_num = (x1*y2 - y1*x2) * (y3 - y4) - (y1 - y2) * (x3*y4 - y3*x4);
	if (pt_denom == 0) {
		//return "parallel"
	}else{
		var pt = {
			x: pt_x_num / pt_denom,
			y: pt_y_num / pt_denom
		}

		const between=(a,b1,b2)=>((a >= b1) && (a <= b2))||((a >= b2) && (a <= b1))

		if ( between(pt.x, x1, x2)
			&& between(pt.y, y1, y2)
			&& between(pt.x, x3, x4)
			&& between(pt.y, y3, y4)) {
				return pt
		} else {
			//return "not in range"
		}
	}
}
